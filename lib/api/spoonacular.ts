import { NormalizedRecipe } from "./themealdb";

const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "";
const BASE_URL = "https://api.spoonacular.com/recipes";

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
  extendedIngredients?: { original: string; name: string; amount: number; unit: string }[];
  analyzedInstructions?: { steps: { number: number; step: string }[] }[];
  cuisines?: string[];
  dishTypes?: string[];
}

export const FALLBACK_JOLLOF_RECIPES: Record<string, NormalizedRecipe> = {
  "sp-jollof-1": {
    id: "sp-jollof-1",
    source: "spoonacular",
    title: "Authentic Nigerian Jollof Rice",
    description: "Smoky, rich long-grain parboiled rice cooked in a seasoned tomato, habanero, and red bell pepper base.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80",
    category: "African",
    area: "Nigerian",
    instructions: [
      "Blend red bell peppers, scotch bonnets, tomatoes, and onions until smooth and thick.",
      "Fry sliced onions in vegetable oil, add tomato paste and fried pepper puree; cook until oil separates.",
      "Pour in rich chicken broth, thyme, curry powder, bay leaves, and salt; bring to a rolling boil.",
      "Wash parboiled long-grain rice thoroughly with warm water and stir into the seasoned pot.",
      "Cover tightly with foil and lid; cook on low heat until steam infuses smoky flavor and rice is perfectly tender."
    ],
    ingredients: [
      { name: "Long Grain Parboiled Rice", amount: "4 cups" },
      { name: "Red Bell Peppers (Tatashe)", amount: "4 large" },
      { name: "Scotch Bonnet Peppers (Rodo)", amount: "2-3" },
      { name: "Tomato Paste", amount: "100g" },
      { name: "Rich Chicken Stock", amount: "3 cups" },
      { name: "Curry Powder & Thyme", amount: "1 tbsp each" },
      { name: "Bay Leaves", amount: "3 leaves" },
      { name: "Vegetable Oil", amount: "1/2 cup" }
    ],
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    servings: 6,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 340,
  },
  "sp-jollof-2": {
    id: "sp-jollof-2",
    source: "spoonacular",
    title: "Ghanaian Style Jollof Rice",
    description: "Fragrant aromatic basmati rice infusing ginger, garlic, cloves, and rich tomato stew base.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    category: "African",
    area: "Ghanaian",
    instructions: [
      "Saute finely diced onions with minced ginger, garlic, and crushed anise seeds in warm oil.",
      "Add concentrated tomato puree and cook down until deep dark red and fragrant.",
      "Add seasoned beef broth, nutmeg, and all-purpose seasoning; bring to a boil.",
      "Stir in washed aromatic Basmati rice, seal pot and steam on low heat until fluffy and fragrant."
    ],
    ingredients: [
      { name: "Aromatic Basmati Rice", amount: "4 cups" },
      { name: "Fresh Ginger & Garlic Paste", amount: "2 tbsp" },
      { name: "Tomato Puree", amount: "150g" },
      { name: "Rich Beef Broth", amount: "3.5 cups" },
      { name: "Anise Seeds & Nutmeg", amount: "1 tsp" },
      { name: "Onions & Vegetable Oil", amount: "2 medium" }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    servings: 6,
    difficulty: "Medium",
    rating: 4.9,
    reviewsCount: 280,
  }
};

/**
 * Normalizes Spoonacular recipe object to CookDish's unified recipe shape
 */
export function normalizeSpoonacularRecipe(recipe: SpoonacularRecipe): NormalizedRecipe {
  const ingredients = recipe.extendedIngredients
    ? recipe.extendedIngredients.map((ing) => ({
        name: ing.name || ing.original,
        amount: `${ing.amount || ""} ${ing.unit || ""}`.trim() || "To taste",
      }))
    : [{ name: "Standard seasoning", amount: "To taste" }];

  const instructions =
    recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0
      ? recipe.analyzedInstructions[0].steps.map((s) => s.step)
      : recipe.summary
      ? [recipe.summary.replace(/<[^>]*>?/gm, "")]
      : ["Follow standard cooking steps."];

  return {
    id: String(recipe.id),
    source: "spoonacular",
    title: recipe.title,
    description: recipe.summary ? recipe.summary.replace(/<[^>]*>?/gm, "").slice(0, 140) + "..." : "Authentic recipe.",
    image: recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    category: recipe.dishTypes?.[0] || recipe.cuisines?.[0] || "African",
    area: recipe.cuisines?.[0] || "African",
    instructions,
    ingredients,
    prepTimeMinutes: 15,
    cookTimeMinutes: recipe.readyInMinutes ? Math.max(10, recipe.readyInMinutes - 15) : 30,
    servings: recipe.servings || 4,
    difficulty: "Medium",
    rating: 4.9,
    reviewsCount: 150,
  };
}

/**
 * Search Spoonacular recipes API
 */
export async function searchSpoonacular(query: string = "Jollof Rice"): Promise<NormalizedRecipe[]> {
  if (!SPOONACULAR_API_KEY) {
    if (query.toLowerCase().includes("jollof") || query.toLowerCase().includes("african") || query === "") {
      return Object.values(FALLBACK_JOLLOF_RECIPES);
    }
    return [];
  }

  try {
    const url = `${BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${encodeURIComponent(query)}&addRecipeInformation=true&fillIngredients=true&number=8`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return Object.values(FALLBACK_JOLLOF_RECIPES);
    const data = await res.json();
    if (!data.results) return Object.values(FALLBACK_JOLLOF_RECIPES);
    return data.results.map(normalizeSpoonacularRecipe);
  } catch (error) {
    console.error("Error fetching from Spoonacular API:", error);
    return Object.values(FALLBACK_JOLLOF_RECIPES);
  }
}

/**
 * Lookup Spoonacular recipe by ID
 */
export async function getSpoonacularRecipeById(id: string): Promise<NormalizedRecipe | null> {
  if (FALLBACK_JOLLOF_RECIPES[id]) {
    return FALLBACK_JOLLOF_RECIPES[id];
  }

  if (!SPOONACULAR_API_KEY) {
    return Object.values(FALLBACK_JOLLOF_RECIPES)[0] || null;
  }

  try {
    const url = `${BASE_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK_JOLLOF_RECIPES[id] || null;
    const data = await res.json();
    return normalizeSpoonacularRecipe(data);
  } catch (error) {
    console.error(`Error looking up Spoonacular recipe ${id}:`, error);
    return FALLBACK_JOLLOF_RECIPES[id] || null;
  }
}
