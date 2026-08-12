"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Heart,
  Clock,
  Star,
  Flame,
  ArrowRight,
  Soup,
  Utensils,
  Cookie,
  Layers,
} from "lucide-react";
import { useState, useEffect } from "react";
import { searchAllRecipeAPIs, NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";
import { NormalizedRecipe } from "@/lib/api/themealdb";

const FILTER_TABS = [
  { name: "All Dishes", filter: "All", icon: Layers },
  { name: "Soups & Swallows", filter: "Soups", icon: Soup },
  { name: "Rice & Stews", filter: "Rice & Stews", icon: Utensils },
  { name: "Grills & Suya", filter: "Grills & Chops", icon: Flame },
  { name: "Bakery & Snacks", filter: "Snacks", icon: Cookie },
];

export default function HomeFeed() {
  const router = useRouter();
  const [allRecipes, setAllRecipes] = useState<NormalizedRecipe[]>(NIGERIAN_LOCAL_DISHES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [homeQuery, setHomeQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const fetchedRecipes = await searchAllRecipeAPIs("");
      if (fetchedRecipes && fetchedRecipes.length > 0) {
        setAllRecipes(fetchedRecipes);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleHomeSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(homeQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  // Category filtering matching seeded data groupings
  const traditionalSoups = allRecipes.filter(
    (r) =>
      r.category === "Nigerian Soups" ||
      r.category === "Nigerian Swallows" ||
      r.title.toLowerCase().includes("soup") ||
      r.title.toLowerCase().includes("yam") ||
      r.title.toLowerCase().includes("okra") ||
      r.title.toLowerCase().includes("egusi") ||
      r.title.toLowerCase().includes("oha") ||
      r.title.toLowerCase().includes("banga") ||
      r.title.toLowerCase().includes("ogbono")
  );

  const riceDishes = allRecipes.filter(
    (r) =>
      r.category === "Nigerian Rice & Stews" ||
      r.title.toLowerCase().includes("jollof") ||
      r.title.toLowerCase().includes("rice") ||
      r.title.toLowerCase().includes("stew") ||
      r.title.toLowerCase().includes("ofada")
  );

  const grillsAndChops = allRecipes.filter(
    (r) =>
      r.category === "Nigerian Grills & Small Chops" ||
      r.title.toLowerCase().includes("asun") ||
      r.title.toLowerCase().includes("nkwobi") ||
      r.title.toLowerCase().includes("suya") ||
      r.title.toLowerCase().includes("snail") ||
      r.title.toLowerCase().includes("peppered")
  );

  const snacksAndBakery = allRecipes.filter(
    (r) =>
      r.category === "Nigerian Bakery & Snacks" ||
      r.category === "Nigerian Snacks & Breakfast" ||
      r.category === "Nigerian Porridges" ||
      r.title.toLowerCase().includes("moi moi") ||
      r.title.toLowerCase().includes("puff") ||
      r.title.toLowerCase().includes("chin chin") ||
      r.title.toLowerCase().includes("pie") ||
      r.title.toLowerCase().includes("akara") ||
      r.title.toLowerCase().includes("ewa")
  );

  // Return active filtered recipes list
  const getActiveRecipes = () => {
    if (activeFilter === "Soups") return traditionalSoups.length > 0 ? traditionalSoups : allRecipes;
    if (activeFilter === "Rice & Stews") return riceDishes.length > 0 ? riceDishes : allRecipes;
    if (activeFilter === "Grills & Chops") return grillsAndChops.length > 0 ? grillsAndChops : allRecipes;
    if (activeFilter === "Snacks") return snacksAndBakery.length > 0 ? snacksAndBakery : allRecipes;
    return allRecipes;
  };

  const heroRecipe = NIGERIAN_LOCAL_DISHES.find((r) => r.id === "ng-jollof") || NIGERIAN_LOCAL_DISHES[0];
  const activeRecipes = getActiveRecipes();

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* Header Welcome Text */}
      <div className="space-y-1">
        <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
          Welcome Back, Chef
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1B] tracking-tight">
          Cook with <span className="text-[#E8734A]">Simple</span> Ingredients
        </h1>
      </div>

      {/* Real Interactive Mobile Search Bar */}
      <form onSubmit={handleHomeSearchSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#E8734A]" />
          <input
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            autoCorrect="off"
            value={homeQuery}
            onChange={(e) => setHomeQuery(e.target.value)}
            placeholder="Search Oha, Egusi, Jollof, Suya, Moi Moi..."
            className="w-full bg-white border border-[#EFE6DD] rounded-2xl pl-12 pr-4 py-3.5 text-[#1F1D1B] placeholder-[#6E6B68] text-sm font-medium focus:outline-none focus:border-[#E8734A] focus:ring-2 focus:ring-[#E8734A]/20 transition-all shadow-xs"
          />
        </div>
        <button
          type="submit"
          aria-label="Submit Search"
          className="bg-[#1F1D1B] text-white px-4 py-3.5 rounded-2xl flex items-center justify-center hover:bg-[#33302C] active:scale-95 transition-all shadow-xs"
        >
          <SlidersHorizontal className="w-5 h-5 text-[#E8734A]" />
        </button>
      </form>

      {/* Featured Recipe Hero Banner */}
      {heroRecipe && (
        <div className="relative rounded-3xl bg-gradient-to-r from-[#E8734A] via-[#F28E6B] to-[#1F1D1B] p-6 sm:p-8 text-white overflow-hidden shadow-md">
          <div className="relative z-10 max-w-md space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white inline-block">
              Chef Featured Dish
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {heroRecipe.title}
            </h2>
            <p className="text-white/90 text-xs sm:text-sm line-clamp-2">
              {heroRecipe.description}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href={`/recipe/${heroRecipe.source}/${heroRecipe.id}`}
                className="inline-flex items-center justify-center bg-white text-[#1F1D1B] font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs hover:bg-[#FDF6EF] transition-all"
              >
                View Recipe & Ingredients
              </Link>
              <Link
                href={`/recipe/${heroRecipe.source}/${heroRecipe.id}/cook`}
                className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all border border-white/20"
              >
                <span>Start Cooking</span>
                <ArrowRight className="w-4 h-4 text-[#E8734A]" />
              </Link>
            </div>
          </div>

          <img
            src={heroRecipe.image}
            alt={heroRecipe.title}
            className="absolute right-0 top-0 bottom-0 w-1/2 object-cover opacity-45 sm:opacity-55"
          />
        </div>
      )}

      {/* Category Filter Tabs Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#EFE6DD]">
        {FILTER_TABS.map((item) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.filter;

          return (
            <button
              key={item.name}
              onClick={() => setActiveFilter(item.filter)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? "border-[#E8734A] text-[#E8734A]"
                  : "border-transparent text-[#6E6B68] hover:text-[#1F1D1B]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#E8734A]" : "text-[#6E6B68]"}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Direct Clean Grid Display (Guaranteed recipes at all times) */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 rounded-3xl bg-white animate-pulse border border-[#EFE6DD]" />
          ))}
        </div>
      ) : activeRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeRecipes.map((recipe) => (
            <RecipeCard
              key={`${recipe.source}-${recipe.id}`}
              recipe={recipe}
              isFav={favorites.includes(recipe.id)}
              onToggleFav={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-[#EFE6DD] text-center space-y-3">
          <p className="text-sm font-semibold text-[#6E6B68]">
            No recipes found in this category right now.
          </p>
        </div>
      )}
    </div>
  );
}

function RecipeCard({
  recipe,
  isFav,
  onToggleFav,
}: {
  recipe: NormalizedRecipe;
  isFav: boolean;
  onToggleFav: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#EFE6DD] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-[#F3EAE1]">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={() => onToggleFav(recipe.id)}
            aria-label="Save to favorites"
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#1F1D1B] hover:scale-110 transition-all shadow-xs"
          >
            <Heart
              className={`w-5 h-5 ${
                isFav ? "fill-[#E8734A] text-[#E8734A]" : "text-[#1F1D1B]"
              }`}
            />
          </button>
          <span className="absolute bottom-3 left-3 bg-[#1F1D1B]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
            {recipe.category}
          </span>
          {recipe.area && (
            <span className="absolute top-3 left-3 bg-[#E8734A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              {recipe.area}
            </span>
          )}
        </div>

        <div className="p-5 space-y-2">
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
          <p className="text-xs text-[#524F4C] line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-[#EFE6DD] flex justify-between items-center text-xs text-[#6E6B68]">
        <div className="flex items-center gap-1.5 font-medium">
          <Clock className="w-4 h-4 text-[#E8734A]" />
          <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
        </div>

        <Link
          href={`/recipe/${recipe.source}/${recipe.id}/cook`}
          className="bg-[#FDF6EF] border border-[#EFE6DD] hover:border-[#E8734A] hover:bg-[#E8734A] hover:text-white text-[#1F1D1B] font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
        >
          <span>Start Cooking</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
