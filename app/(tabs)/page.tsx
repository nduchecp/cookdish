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
  Globe,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChefHat,
  ShoppingBag,
  Award,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { searchAllRecipeAPIs, NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";
import { NormalizedRecipe } from "@/lib/api/themealdb";

const FILTER_TABS = [
  { name: "All Dishes", filter: "All", icon: Layers },
  { name: "Soups & Swallows", filter: "Soups", icon: Soup },
  { name: "Rice & Stews", filter: "Rice & Stews", icon: Utensils },
  { name: "Grills & Suya", filter: "Grills & Chops", icon: Flame },
  { name: "Snacks & Bakery", filter: "Snacks", icon: Cookie },
  { name: "International", filter: "International", icon: Globe },
];

export default function HomeLandingPage() {
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

  // Category Filtering logic
  const traditionalSoups = allRecipes.filter(
    (r) =>
      r.category === "Nigerian Soups" ||
      r.category === "Nigerian Swallows" ||
      r.title.toLowerCase().includes("soup") ||
      r.title.toLowerCase().includes("yam") ||
      r.title.toLowerCase().includes("okra") ||
      r.title.toLowerCase().includes("egusi") ||
      r.title.toLowerCase().includes("oha") ||
      r.title.toLowerCase().includes("ogbono")
  );

  const riceDishes = allRecipes.filter(
    (r) =>
      r.category === "Nigerian Rice & Stews" ||
      r.title.toLowerCase().includes("jollof") ||
      r.title.toLowerCase().includes("rice") ||
      r.title.toLowerCase().includes("stew")
  );

  const grillsAndChops = allRecipes.filter(
    (r) =>
      r.category === "Nigerian Grills & Small Chops" ||
      r.title.toLowerCase().includes("suya") ||
      r.title.toLowerCase().includes("asun") ||
      r.title.toLowerCase().includes("peppered")
  );

  const snacksAndBakery = allRecipes.filter(
    (r) =>
      r.category === "Nigerian Bakery & Snacks" ||
      r.title.toLowerCase().includes("pie") ||
      r.title.toLowerCase().includes("puff") ||
      r.title.toLowerCase().includes("chin chin")
  );

  const internationalRecipes = allRecipes.filter(
    (r) => r.source !== "user" && r.area !== "Nigerian"
  );

  const getActiveRecipes = () => {
    if (activeFilter === "Soups") return traditionalSoups.length > 0 ? traditionalSoups : allRecipes;
    if (activeFilter === "Rice & Stews") return riceDishes.length > 0 ? riceDishes : allRecipes;
    if (activeFilter === "Grills & Chops") return grillsAndChops.length > 0 ? grillsAndChops : allRecipes;
    if (activeFilter === "Snacks") return snacksAndBakery.length > 0 ? snacksAndBakery : allRecipes;
    if (activeFilter === "International") return internationalRecipes.length > 0 ? internationalRecipes : allRecipes;
    return allRecipes;
  };

  const heroRecipe = NIGERIAN_LOCAL_DISHES.find((r) => r.id === "ng-jollof") || NIGERIAN_LOCAL_DISHES[0];
  const activeRecipes = getActiveRecipes();

  return (
    <div className="space-y-10 sm:space-y-14 w-full pb-12">
      {/* 🌟 1. AESTHETIC HIGH-CONVERTING HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden border border-[#EFE6DD] bg-gradient-to-br from-[#1F1D1B] via-[#2A2724] to-[#1F1D1B] text-white p-6 sm:p-12 shadow-xl">
        {/* Ambient Glowing Background Orbs */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#E8734A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & High-Converting Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-xs">
              <span className="text-base">🇳🇬</span>
              <span className="text-[#E8734A]">#1 Authentic</span> Culinary & Cooking Platform
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Master Authentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8734A] to-[#F59E0B]">Culinary Heritage</span> with Ease.
            </h1>

            <p className="text-xs sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Explore 50+ verified West African traditional delicacies, auto-generate market shopping lists, schedule weekly meal plans, and cook like an Executive Chef with instant 0ms touch controls.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#recipe-explorer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E8734A] text-white font-extrabold px-7 py-4 rounded-2xl text-sm shadow-md hover:bg-[#D66239] transition-all cursor-pointer active:scale-95"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore 50+ Recipes</span>
              </a>

              <Link
                href={`/recipe/${heroRecipe.source}/${heroRecipe.id}/cook`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-extrabold px-6 py-4 rounded-2xl text-sm border border-white/20 transition-all cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4 text-[#E8734A]" />
                <span>Launch Cooking Assistant</span>
              </Link>
            </div>

            {/* Quick Micro-Trust Badges */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-white/70 font-semibold border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Tested Recipes</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>0ms Mobile Timer</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Smart Market Checklist</span>
              </span>
            </div>
          </div>

          {/* Right Column: Hero Floating Dish Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-t from-black/80 to-transparent p-2 shadow-2xl group">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden">
                <img
                  src={heroRecipe.image}
                  alt={heroRecipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B] via-transparent to-transparent opacity-90" />

                <span className="absolute top-3 left-3 bg-[#E8734A] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                  Chef Featured Dish
                </span>

                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <h3 className="text-lg font-extrabold text-white leading-snug">
                    {heroRecipe.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/90 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E8734A]" />
                      {heroRecipe.prepTimeMinutes + heroRecipe.cookTimeMinutes} mins
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {heroRecipe.rating} (50+ reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 2. PLATFORM METRICS BARS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#EFE6DD] shadow-xs text-center space-y-1">
          <span className="block text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">50+</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Authentic & Global Dishes</span>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-[#EFE6DD] shadow-xs text-center space-y-1">
          <span className="block text-2xl sm:text-3xl font-extrabold text-[#E8734A]">100%</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Cultural Accuracy Tested</span>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-[#EFE6DD] shadow-xs text-center space-y-1">
          <span className="block text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">14k+</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Meals Cooked by Users</span>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-[#EFE6DD] shadow-xs text-center space-y-1">
          <span className="block text-2xl sm:text-3xl font-extrabold text-amber-500">4.9 ★</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Average Chef Rating</span>
        </div>
      </div>

      {/* ⚡ 3. WHY COOKDISH FEATURES SHOWCASE */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-[#E8734A] uppercase tracking-widest">
            Built for Passionate Home Cooks
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">
            Why Chefs & Home Cooks Love CookDish
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] space-y-3 shadow-xs hover:border-[#E8734A] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD] text-xl font-bold">
              🇳🇬
            </div>
            <h3 className="text-base font-extrabold text-[#1F1D1B]">Cultural Accuracy</h3>
            <p className="text-xs text-[#6E6B68] leading-relaxed">
              Authentic Igbo Oha Soup, Yoruba Amala/Gbegiri, Hausa Suya, and separated Ogbono & Okra soups.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] space-y-3 shadow-xs hover:border-[#E8734A] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#1F1D1B]">Fullscreen Mode</h3>
            <p className="text-xs text-[#6E6B68] leading-relaxed">
              Voice-guided/touch-optimized step timer with 0ms instant mobile response and zero latency.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] space-y-3 shadow-xs hover:border-[#E8734A] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#1F1D1B]">Smart Shopping List</h3>
            <p className="text-xs text-[#6E6B68] leading-relaxed">
              Auto-aggregates market ingredients from weekly meal plans into organized category lists.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] space-y-3 shadow-xs hover:border-[#E8734A] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD]">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#1F1D1B]">Multi-API Engine</h3>
            <p className="text-xs text-[#6E6B68] leading-relaxed">
              Concurrent search engine aggregating recipes across 5 global recipe APIs in real time.
            </p>
          </div>
        </div>
      </section>

      {/* 🔍 4. INTERACTIVE SEARCH & CATEGORY DISCOVERY HUB */}
      <section id="recipe-explorer" className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
              Recipe Discovery Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">
              Find What You Want to Cook Today
            </h2>
          </div>

          {/* Real Interactive Mobile Search Bar */}
          <form onSubmit={handleHomeSearchSubmit} className="flex gap-2 w-full md:w-80">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8734A]" />
              <input
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                value={homeQuery}
                onChange={(e) => setHomeQuery(e.target.value)}
                placeholder="Search Egusi, Jollof, Oha, Suya..."
                className="w-full bg-white border border-[#EFE6DD] rounded-2xl pl-10 pr-4 py-2.5 text-[#1F1D1B] placeholder-[#6E6B68] text-xs font-medium focus:outline-none focus:border-[#E8734A] shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1F1D1B] text-white px-3.5 py-2.5 rounded-2xl flex items-center justify-center hover:bg-[#33302C] active:scale-95 transition-all shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#E8734A]" />
            </button>
          </form>
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#EFE6DD]">
          {FILTER_TABS.map((item) => {
            const Icon = item.icon;
            const isActive = activeFilter === item.filter;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveFilter(item.filter)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
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

        {/* Recipe Grid Cards */}
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
      </section>

      {/* 🚀 5. HIGH-CONVERTING BOTTOM CALL TO ACTION CARD */}
      <section className="bg-gradient-to-r from-[#1F1D1B] via-[#2A2724] to-[#1F1D1B] rounded-3xl p-8 sm:p-12 text-white border border-[#EFE6DD] text-center space-y-4 shadow-lg">
        <h2 className="text-2xl sm:text-4xl font-extrabold">Ready to Elevate Your Cooking?</h2>
        <p className="text-white/80 text-xs sm:text-base max-w-xl mx-auto font-medium">
          Organize your weekly meals, auto-generate market lists, and launch fullscreen step-by-step cooking timers.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/profile/planner"
            className="w-full sm:w-auto bg-[#E8734A] text-white px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold hover:bg-[#D66239] transition-all shadow-md active:scale-95"
          >
            Start Meal Planning
          </Link>
          <Link
            href="/profile/shopping-list"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold border border-white/20 transition-all active:scale-95"
          >
            View Market Shopping List
          </Link>
        </div>
      </section>
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
            type="button"
            onClick={() => onToggleFav(recipe.id)}
            aria-label="Save to favorites"
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#1F1D1B] hover:scale-110 transition-all shadow-xs cursor-pointer"
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
          <span>Cook</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
