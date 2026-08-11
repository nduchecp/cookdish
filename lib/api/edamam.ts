import { NormalizedRecipe } from "./themealdb";

const EDAMAM_APP_ID = process.env.NEXT_PUBLIC_EDAMAM_APP_ID || "b2bd26c9";
const EDAMAM_APP_KEY = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY || "e2a95163d3cdb40e5b21d91cfd45693d";
const BASE_URL = "https://api.edamam.com/api/recipes/v2";

const EDAMAM_CACHE = new Map<string, NormalizedRecipe>();

export interface EdamamHit {
  recipe: {
    uri?: string;
    label: string;
    image: string;
    source: string;
    url: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    ingredientLines: string[];
    calories: number;
    totalTime: number;
    cuisineType?: string[];
    mealType?: string[];
  };
}

export function normalizeEdamamRecipe(hit: EdamamHit, index: number): NormalizedRecipe {
  const r = hit.recipe;
  const ingredients = r.ingredientLines.map((line) => ({
    name: line,
    amount: "As specified",
  }));

  const tags = [...(r.dietLabels || []), ...(r.healthLabels || [])].slice(0, 4);
  const cleanId = `edamam-${index}-${encodeURIComponent((r.label || "recipe").toLowerCase().replace(/[^a-z0-9]/g, "-"))}`;

  const normalized: NormalizedRecipe = {
    id: cleanId,
    source: "edamam",
    title: r.label,
    description: `Published by ${r.source}. Diet & Health Labels: ${tags.join(", ") || "Standard"}.`,
    image: r.image,
    category: r.mealType?.[0] || r.cuisineType?.[0] || "Global",
    area: r.cuisineType?.[0] || "Global",
    instructions: [
      `Full step-by-step preparation guidelines available at ${r.source}.`,
      "1. Gather and measure all ingredient lines as listed.",
      "2. Prep ingredients (chop, slice, season) according to standard culinary techniques.",
      "3. Cook thoroughly, taste test seasoning, and serve hot."
    ],
    ingredients,
    prepTimeMinutes: 15,
    cookTimeMinutes: r.totalTime ? Math.max(15, r.totalTime - 15) : 35,
    servings: r.yield || 4,
    difficulty: "Medium",
    rating: 4.8,
    reviewsCount: 125,
  };

  EDAMAM_CACHE.set(cleanId, normalized);
  return normalized;
}

/**
 * Get cached Edamam recipe by ID
 */
export function getEdamamRecipeById(id: string): NormalizedRecipe | null {
  return EDAMAM_CACHE.get(id) || null;
}

/**
 * Search Edamam Recipe API
 */
export async function searchEdamam(query: string = ""): Promise<NormalizedRecipe[]> {
  if (!EDAMAM_APP_ID || !EDAMAM_APP_KEY) {
    return [];
  }

  const searchQuery = query.trim() || "chicken";

  try {
    const url = `${BASE_URL}?type=public&q=${encodeURIComponent(searchQuery)}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
    const res = await fetch(url, {
      headers: {
        "Edamam-Account-User": EDAMAM_APP_ID,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`Edamam API returned HTTP ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (!data.hits) return [];
    return data.hits.map((hit: EdamamHit, idx: number) => normalizeEdamamRecipe(hit, idx));
  } catch (error) {
    console.error("Error fetching from Edamam API:", error);
    return [];
  }
}
