import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Utensils,
  Clock,
  Calendar,
  ShoppingBag,
  Flame,
  ChefHat,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Star,
  ChevronRight,
  Play
} from "lucide-react";
import { NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";

export default function LandingPage() {
  const featuredRecipes = NIGERIAN_LOCAL_DISHES.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#141312] text-white flex flex-col font-sans antialiased overflow-x-hidden">
      {/* 1. STANDALONE NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-[#1F1D1B]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E8734A] to-[#F59E0B] flex items-center justify-center text-xl font-extrabold text-white shadow-lg group-hover:scale-105 transition-transform">
              🍳
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block">CookDish</span>
              <span className="text-[10px] text-[#E8734A] font-bold block -mt-1">Culinary Platform</span>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-white/70">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#recipes" className="hover:text-white transition-colors">Recipes Catalog</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Community</a>
            <Link href="/home" className="hover:text-[#E8734A] transition-colors">Browse App</Link>
          </nav>

          {/* Auth Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="text-xs font-bold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 transition-all active:scale-95"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-[#E8734A] hover:bg-[#D66239] text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <Sparkles className="w-3.5 h-3.5 fill-white" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. DYNAMIC HERO SECTION WITH SUBTLE ANIMATIONS */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E8734A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#E8734A]" />
              <span className="text-xs font-bold text-white/90">
                ★ 4.9/5 Rating from 10,000+ Passionate Home Chefs
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master Authentic <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#E8734A] via-[#F59E0B] to-[#E8734A] bg-clip-text text-transparent">
                African & Global
              </span>{" "}
              Home Cooking
            </h1>

            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Discover step-by-step traditional recipes, immersive fullscreen cooking mode, weekly drag-and-drop meal planning, and automated smart shopping lists.
            </p>

            {/* Conversion Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/auth/signup"
                className="w-full sm:w-auto bg-[#E8734A] hover:bg-[#D66239] text-white px-8 py-4 rounded-2xl text-sm font-extrabold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start Cooking Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/home"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/10 px-8 py-4 rounded-2xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#E8734A] fill-[#E8734A]" />
                <span>Explore App Feed</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Showcase Cards (Clean, Glassmorphism Cards WITHOUT Pills) */}
          <div className="lg:col-span-5 relative space-y-4">
            {/* Main Featured Dish Card (Egusi Soup) */}
            <div className="bg-[#1F1D1B]/80 border border-white/15 rounded-3xl p-5 shadow-2xl backdrop-blur-xl hover:border-[#E8734A]/50 transition-all space-y-4 group">
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-black/40">
                <img
                  src={NIGERIAN_LOCAL_DISHES[0].image}
                  alt={NIGERIAN_LOCAL_DISHES[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-white">{NIGERIAN_LOCAL_DISHES[0].title}</h3>
                <p className="text-xs text-white/70 line-clamp-2">{NIGERIAN_LOCAL_DISHES[0].description}</p>
                <div className="flex justify-between items-center text-xs font-bold text-[#E8734A] pt-1">
                  <span>Prep: {NIGERIAN_LOCAL_DISHES[0].prepTimeMinutes + NIGERIAN_LOCAL_DISHES[0].cookTimeMinutes} mins</span>
                  <span>{NIGERIAN_LOCAL_DISHES[0].difficulty}</span>
                </div>
              </div>
            </div>

            {/* Secondary Split Showcase Cards (Jollof & Suya) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1F1D1B]/80 border border-white/15 rounded-2xl p-3 shadow-lg backdrop-blur-md space-y-2">
                <img
                  src={NIGERIAN_LOCAL_DISHES[5].image}
                  alt={NIGERIAN_LOCAL_DISHES[5].title}
                  className="w-full h-24 rounded-xl object-cover"
                />
                <h4 className="text-xs font-bold text-white line-clamp-1">{NIGERIAN_LOCAL_DISHES[5].title}</h4>
              </div>

              <div className="bg-[#1F1D1B]/80 border border-white/15 rounded-2xl p-3 shadow-lg backdrop-blur-md space-y-2">
                <img
                  src={NIGERIAN_LOCAL_DISHES[7].image}
                  alt={NIGERIAN_LOCAL_DISHES[7].title}
                  className="w-full h-24 rounded-xl object-cover"
                />
                <h4 className="text-xs font-bold text-white line-clamp-1">{NIGERIAN_LOCAL_DISHES[7].title}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITION SHOWCASE */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#1A1817]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Everything You Need for Perfect Meals
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Designed for home cooks, food lovers, and culinary enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#1F1D1B]/80 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#E8734A] transition-all group backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#E8734A]/10 text-[#E8734A] flex items-center justify-center group-hover:bg-[#E8734A] group-hover:text-white transition-colors">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white">Authentic Cultural Recipes</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Step-by-step traditional recipes including Igbo Oha Soup, Ogbono, Okra, Egusi, Party Jollof, Suya, Chin Chin & Meat Pie.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1F1D1B]/80 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#E8734A] transition-all group backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#E8734A]/10 text-[#E8734A] flex items-center justify-center group-hover:bg-[#E8734A] group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white">Fullscreen Cooking Mode</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Immersive cooking assistant with step navigation and built-in countdown timers for hands-free kitchen guidance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1F1D1B]/80 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#E8734A] transition-all group backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#E8734A]/10 text-[#E8734A] flex items-center justify-center group-hover:bg-[#E8734A] group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white">Weekly Meal Planner</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Organize your weekly menu with one-click recipe scheduling across Breakfast, Lunch, Dinner & Snack slots.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#1F1D1B]/80 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#E8734A] transition-all group backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-[#E8734A]/10 text-[#E8734A] flex items-center justify-center group-hover:bg-[#E8734A] group-hover:text-white transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white">Smart Shopping List</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Automated ingredient checklist aggregated directly from your scheduled meals for effortless market runs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECIPE PREVIEW CATALOG SHOWCASE */}
      <section id="recipes" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Explore Trending Recipes</h2>
              <p className="text-xs sm:text-sm text-white/70">Authentic delicacies crafted with step-by-step perfection.</p>
            </div>
            <Link
              href="/home"
              className="text-xs font-extrabold text-[#E8734A] hover:underline flex items-center gap-1"
            >
              <span>View All Recipes</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.source}/${recipe.id}`}
                className="bg-[#1F1D1B]/80 border border-white/10 rounded-3xl p-4 space-y-3 hover:border-[#E8734A] transition-all group backdrop-blur-md shadow-xl"
              >
                <div className="relative h-44 rounded-2xl overflow-hidden bg-black/40">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-[#E8734A] transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 mt-1">{recipe.description}</p>
                </div>

                <div className="flex justify-between items-center text-xs font-bold text-white/60 border-t border-white/10 pt-3">
                  <span>{recipe.category}</span>
                  <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS & SOCIAL PROOF */}
      <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#1A1817]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Loved by Passionate Cooks</h2>
            <p className="text-xs sm:text-sm text-white/70">Join thousands of home chefs cooking authentic meals daily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1F1D1B]/80 border border-white/10 rounded-3xl p-6 space-y-4 shadow-md backdrop-blur-md">
              <div className="flex gap-1 text-[#F59E0B]">
                {"★".repeat(5)}
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                &quot;The Igbo Oha Soup recipe was 100% authentic! The fullscreen cooking assistant made timing the thickener and leaves effortless.&quot;
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                <div className="w-8 h-8 rounded-full bg-[#E8734A] text-white flex items-center justify-center font-bold text-xs">
                  👨‍🍳
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Chef Amaka</span>
                  <span className="text-[10px] text-white/50">Verified User</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1F1D1B]/80 border border-white/10 rounded-3xl p-6 space-y-4 shadow-md backdrop-blur-md">
              <div className="flex gap-1 text-[#F59E0B]">
                {"★".repeat(5)}
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                &quot;The weekly meal planner automatically generated my shopping list for party Jollof and Suya. Saved me so much time at the market!&quot;
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                <div className="w-8 h-8 rounded-full bg-[#E8734A] text-white flex items-center justify-center font-bold text-xs">
                  👨‍🍳
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Chef Tunde</span>
                  <span className="text-[10px] text-white/50">Verified User</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1F1D1B]/80 border border-white/10 rounded-3xl p-6 space-y-4 shadow-md backdrop-blur-md">
              <div className="flex gap-1 text-[#F59E0B]">
                {"★".repeat(5)}
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                &quot;Clean design, fast performance, and beautiful step-by-step instructions. My family loved theEgusi Soup!&quot;
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                <div className="w-8 h-8 rounded-full bg-[#E8734A] text-white flex items-center justify-center font-bold text-xs">
                  👨‍🍳
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Chef Promise</span>
                  <span className="text-[10px] text-white/50">Master Chef</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HIGH-CONVERSION BOTTOM CALL TO ACTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#E8734A] via-[#D66239] to-[#E8734A] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative z-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Ready to Elevate Your Home Cooking?</h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto font-medium">
            Join thousands of home chefs today. Create your account to access meal planning, shopping lists, and authentic recipes.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/signup"
              className="bg-[#1F1D1B] hover:bg-black text-white px-8 py-4 rounded-2xl text-sm font-extrabold transition-all shadow-md active:scale-95"
            >
              Create Chef Account
            </Link>
            <Link
              href="/auth/signin"
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-2xl text-sm font-bold transition-all active:scale-95 border border-white/20"
            >
              Sign In to Account
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-white/10 bg-[#141312] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">CookDish App</span>
            <span>• Authentic Culinary Platform</span>
          </div>
          <div className="flex gap-6">
            <Link href="/home" className="hover:text-white transition-colors">Browse App</Link>
            <Link href="/auth/signin" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-white transition-colors">Sign Up</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Super Admin</Link>
          </div>
          <p>© 2026 CookDish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
