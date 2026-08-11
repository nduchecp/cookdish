"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Clock, Star, Heart, Loader2 } from "lucide-react";
import { searchAllRecipeAPIs } from "@/lib/api/recipes";
import { NormalizedRecipe } from "@/lib/api/themealdb";

const POPULAR_SEARCHES = [
  "Party Jollof",
  "Egusi Soup",
  "Oha Soup",
  "Suya",
  "Moi Moi",
  "Puff-Puff",
  "Meat Pie",
  "Asun",
  "Akara",
  "Nkwobi",
  "Fried Rice",
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<NormalizedRecipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      const data = await searchAllRecipeAPIs(query);
      setResults(data);
      setLoading(false);
    }

    const timer = setTimeout(() => {
      performSearch();
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1F1D1B]">Search Recipes & Delicacies</h1>
        <p className="text-[#6E6B68] text-sm mt-1">
          Search Oha, Egusi, Jollof, Suya, Moi Moi, Puff-Puff, Meat Pie & more
        </p>
      </div>

      {/* Mobile-Optimized Search Input Bar */}
      <form onSubmit={(e) => e.preventDefault()} className="relative w-full">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#E8734A]" />
        <input
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, ingredients or categories..."
          className="w-full bg-white border border-[#EFE6DD] rounded-2xl pl-12 pr-10 py-3.5 text-[#1F1D1B] placeholder-[#6E6B68] text-sm font-medium focus:outline-none focus:border-[#E8734A] focus:ring-2 focus:ring-[#E8734A]/20 transition-all shadow-xs"
        />
        {loading && (
          <Loader2 className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#E8734A] animate-spin" />
        )}
      </form>

      {/* Quick Search Suggestion Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6E6B68]">Popular Searches</span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs ${
                query.toLowerCase() === term.toLowerCase()
                  ? "bg-[#E8734A] text-white"
                  : "bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A]"
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Direct Search Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-white animate-pulse border border-[#EFE6DD]" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((recipe) => (
            <div
              key={`${recipe.source}-${recipe.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-[#EFE6DD] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-[#F3EAE1]">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#1F1D1B]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {recipe.category}
                  </span>
                  {recipe.area && (
                    <span className="absolute top-3 left-3 bg-[#E8734A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {recipe.area}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-[#6E6B68] font-medium">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-[#1F1D1B]">{recipe.rating}</span>
                      <span>({recipe.reviewsCount})</span>
                    </div>
                    <Link href={`/recipe/${recipe.source}/${recipe.id}`}>
                      <h4 className="text-lg font-bold text-[#1F1D1B] group-hover:text-[#E8734A] transition-colors line-clamp-1">
                        {recipe.title}
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-[#EFE6DD] flex justify-between items-center text-xs text-[#6E6B68]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#E8734A]" />
                  <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                </div>
                <span className="font-semibold text-[#1F1D1B] px-2.5 py-0.5 bg-[#FDF6EF] rounded-md border border-[#EFE6DD]">
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-[#EFE6DD] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1F1D1B]">No Recipes Found</h3>
          <p className="text-sm text-[#6E6B68] max-w-sm mx-auto">
            We couldn't find matches for "{query}". Try searching for "Party Jollof", "Egusi Soup", "Suya", "Moi Moi", or "Puff-Puff".
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="h-64 rounded-3xl bg-white animate-pulse border border-[#EFE6DD]" />}>
      <SearchPageContent />
    </Suspense>
  );
}
