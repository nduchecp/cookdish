import Link from "next/link";
import { UtensilsCrossed, Home, Search, Flame, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FDF6EF] text-[#1F1D1B] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EFE6DD] shadow-xl text-center space-y-6">
        {/* Animated 404 Badge */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="w-24 h-24 rounded-full bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD] shadow-inner">
            <UtensilsCrossed className="w-10 h-10" />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-[#1F1D1B] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-white">
            404
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8734A]">
            Recipe Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            This dish isn't on our menu yet
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B68] leading-relaxed">
            The page or recipe you are looking for may have been moved, renamed, or is currently being prepped in the kitchen.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 bg-[#E8734A] hover:bg-[#D66239] text-white py-3.5 px-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Explore Home</span>
          </Link>
          <Link
            href="/search"
            className="flex-1 bg-[#1F1D1B] hover:bg-[#33302C] text-white py-3.5 px-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md text-sm"
          >
            <Search className="w-4 h-4 text-[#E8734A]" />
            <span>Search Dishes</span>
          </Link>
        </div>

        {/* Quick Suggestion */}
        <div className="pt-4 border-t border-[#EFE6DD]">
          <Link
            href="/categories/nigerian"
            className="text-xs text-[#6E6B68] hover:text-[#E8734A] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-[#E8734A]" />
            <span>Browse Popular Nigerian Cuisines 🇳🇬</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
