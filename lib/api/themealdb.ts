export interface MealDBMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  [key: string]: any;
}

export interface MealDBCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealDBArea {
  strArea: string;
}

export interface MealDBIngredientItem {
  idIngredient: string;
  strIngredient: string;
  strDescription?: string;
  strType?: string;
}

export interface NormalizedRecipe {
  id: string;
  source: "themealdb" | "user" | "dummyjson" | "spoonacular" | "edamam";
  title: string;
  description?: string;
  image: string;
  category: string;
  area?: string;
  instructions: string[];
  ingredients: { name: string; amount: string }[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  reviewsCount: number;
  youtubeUrl?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_THEMEALDB_API_URL || "https://www.themealdb.com/api/json/v1/1";

/**
 * Normalizes raw TheMealDB meal payload into CookDish's unified recipe model
 */
export function normalizeMealDBMeal(meal: MealDBMeal): NormalizedRecipe {
  const ingredients: { name: string; amount: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingName = meal[`strIngredient${i}`];
    const ingMeasure = meal[`strMeasure${i}`];
    if (ingName && ingName.trim() !== "") {
      ingredients.push({
        name: ingName.trim(),
        amount: ingMeasure ? ingMeasure.trim() : "To taste",
      });
    }
  }

  const instructions = meal.strInstructions
    ? meal.strInstructions
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
    : ["Follow standard recipe instructions."];

  const idNum = parseInt(meal.idMeal, 10) || 100;
  const rating = Number((4.5 + (idNum % 5) * 0.1).toFixed(1));
  const reviewsCount = 50 + (idNum % 200);
  const difficulty: "Easy" | "Medium" | "Hard" =
    idNum % 3 === 0 ? "Easy" : idNum % 3 === 1 ? "Medium" : "Hard";

  return {
    id: meal.idMeal,
    source: "themealdb",
    title: meal.strMeal,
    description: `${meal.strArea || "International"} style ${meal.strCategory?.toLowerCase() || "recipe"}.`,
    image: meal.strMealThumb,
    category: meal.strCategory || "General",
    area: meal.strArea,
    instructions,
    ingredients,
    prepTimeMinutes: 15 + (idNum % 15),
    cookTimeMinutes: 20 + (idNum % 30),
    servings: 4,
    difficulty,
    rating,
    reviewsCount,
    youtubeUrl: meal.strYoutube,
  };
}

// ==========================================
// 1. SEARCH ENDPOINTS
// ==========================================

/** Search meals by name: search.php?s=Arrabiata */
export async function searchTheMealDBByName(name: string = ""): Promise<NormalizedRecipe[]> {
  try {
    const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.meals) return [];
    return data.meals.map(normalizeMealDBMeal);
  } catch (error) {
    console.error("Error searching TheMealDB by name:", error);
    return [];
  }
}

/** Backward compatibility alias */
export const searchTheMealDB = searchTheMealDBByName;

/** Search meals by first letter: search.php?f=a */
export async function searchTheMealDBByFirstLetter(letter: string): Promise<NormalizedRecipe[]> {
  try {
    const res = await fetch(`${BASE_URL}/search.php?f=${encodeURIComponent(letter)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.meals) return [];
    return data.meals.map(normalizeMealDBMeal);
  } catch (error) {
    console.error("Error searching TheMealDB by letter:", error);
    return [];
  }
}

// ==========================================
// 2. LOOKUP ENDPOINTS
// ==========================================

/** Lookup meal details by specific ID: lookup.php?i=52772 */
export async function getTheMealDBRecipeById(id: string): Promise<NormalizedRecipe | null> {
  try {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.meals || data.meals.length === 0) return null;
    return normalizeMealDBMeal(data.meals[0]);
  } catch (error) {
    console.error(`Error looking up meal ${id} from TheMealDB:`, error);
    return null;
  }
}

/** Get a single random meal: random.php */
export async function getRandomTheMealDBRecipe(): Promise<NormalizedRecipe | null> {
  try {
    const res = await fetch(`${BASE_URL}/random.php`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.meals || data.meals.length === 0) return null;
    return normalizeMealDBMeal(data.meals[0]);
  } catch (error) {
    console.error("Error fetching random meal from TheMealDB:", error);
    return null;
  }
}

// ==========================================
// 3. FILTER ENDPOINTS
// ==========================================

/** Filter by main ingredient: filter.php?i=chicken_breast */
export async function filterTheMealDBByIngredient(ingredient: string): Promise<NormalizedRecipe[]> {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.meals) return [];
    return data.meals.map((m: any) => ({
      id: m.idMeal,
      source: "themealdb" as const,
      title: m.strMeal,
      image: m.strMealThumb,
      category: ingredient,
      instructions: [],
      ingredients: [],
      prepTimeMinutes: 15,
      cookTimeMinutes: 25,
      servings: 4,
      difficulty: "Medium" as const,
      rating: 4.8,
      reviewsCount: 88,
    }));
  } catch (error) {
    console.error(`Error filtering by ingredient ${ingredient}:`, error);
    return [];
  }
}

/** Filter by category: filter.php?c=Seafood */
export async function filterTheMealDBByCategory(category: string): Promise<NormalizedRecipe[]> {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.meals) return [];
    return data.meals.map((m: any) => ({
      id: m.idMeal,
      source: "themealdb" as const,
      title: m.strMeal,
      image: m.strMealThumb,
      category,
      instructions: [],
      ingredients: [],
      prepTimeMinutes: 20,
      cookTimeMinutes: 25,
      servings: 4,
      difficulty: "Medium" as const,
      rating: 4.8,
      reviewsCount: 95,
    }));
  } catch (error) {
    console.error(`Error filtering by category ${category}:`, error);
    return [];
  }
}

/** Backward compatibility alias */
export const getTheMealDBRecipesByCategory = filterTheMealDBByCategory;

/** Filter by area/cuisine: filter.php?a=Canadian */
export async function filterTheMealDBByArea(area: string): Promise<NormalizedRecipe[]> {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.meals) return [];
    return data.meals.map((m: any) => ({
      id: m.idMeal,
      source: "themealdb" as const,
      title: m.strMeal,
      image: m.strMealThumb,
      category: area,
      area,
      instructions: [],
      ingredients: [],
      prepTimeMinutes: 20,
      cookTimeMinutes: 30,
      servings: 4,
      difficulty: "Medium" as const,
      rating: 4.9,
      reviewsCount: 110,
    }));
  } catch (error) {
    console.error(`Error filtering by area ${area}:`, error);
    return [];
  }
}

// ==========================================
// 4. LIST DATA ENDPOINTS
// ==========================================

/** List all meal categories: categories.php */
export async function getTheMealDBCategories(): Promise<MealDBCategory[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories.php`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories from TheMealDB:", error);
    return [];
  }
}

/** List all areas/cuisines: list.php?a=list */
export async function getTheMealDBAreas(): Promise<MealDBArea[]> {
  try {
    const res = await fetch(`${BASE_URL}/list.php?a=list`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching areas from TheMealDB:", error);
    return [];
  }
}

/** List all ingredients: list.php?i=list */
export async function getTheMealDBIngredients(): Promise<MealDBIngredientItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/list.php?i=list`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching ingredients list from TheMealDB:", error);
    return [];
  }
}

/** Secondary Free Recipe API (DummyJSON Recipes API fallback) */
export async function fetchDummyJsonRecipes(): Promise<NormalizedRecipe[]> {
  try {
    const res = await fetch("https://dummyjson.com/recipes?limit=10", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.recipes) return [];

    return data.recipes.map((r: any) => ({
      id: String(r.id),
      source: "dummyjson" as const,
      title: r.name,
      image: r.image,
      category: r.mealType?.[0] || "General",
      area: r.cuisine || "International",
      instructions: r.instructions || [],
      ingredients: r.ingredients?.map((ing: string) => ({ name: ing, amount: "1 portion" })) || [],
      prepTimeMinutes: r.prepTimeMinutes || 15,
      cookTimeMinutes: r.cookTimeMinutes || 20,
      servings: r.servings || 4,
      difficulty: r.difficulty === "Easy" ? "Easy" : r.difficulty === "Medium" ? "Medium" : "Hard",
      rating: r.rating || 4.7,
      reviewsCount: r.reviewCount || 40,
    }));
  } catch (error) {
    console.error("Error fetching DummyJSON recipes:", error);
    return [];
  }
}
