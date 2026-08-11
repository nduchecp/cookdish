import Link from "next/link";
import { Calendar, ShoppingBag, History, Settings, ChevronRight, LogOut, Heart, Bookmark, ChefHat } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#1F1D1B]">Profile & Account</h1>

      {/* User Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#E8734A] text-white flex items-center justify-center text-2xl font-extrabold shadow-md">
          C
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1F1D1B]">Chef User</h2>
          <p className="text-sm text-[#6E6B68]">chef@cookdish.app</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <Link
          href="/my-recipes"
          className="bg-white rounded-2xl p-4 border border-[#EFE6DD] text-center hover:border-[#E8734A] transition-all shadow-sm"
        >
          <span className="block text-2xl font-extrabold text-[#E8734A]">12</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Favorites</span>
        </Link>
        <Link
          href="/my-recipes"
          className="bg-white rounded-2xl p-4 border border-[#EFE6DD] text-center hover:border-[#E8734A] transition-all shadow-sm"
        >
          <span className="block text-2xl font-extrabold text-[#1F1D1B]">4</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Authored</span>
        </Link>
        <Link
          href="/my-recipes"
          className="bg-white rounded-2xl p-4 border border-[#EFE6DD] text-center hover:border-[#E8734A] transition-all shadow-sm"
        >
          <span className="block text-2xl font-extrabold text-[#1F1D1B]">2</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Collections</span>
        </Link>
      </div>

      {/* Profile Menu Navigation Rows */}
      <div className="bg-white rounded-3xl border border-[#EFE6DD] overflow-hidden divide-y divide-[#EFE6DD] shadow-sm">
        <Link
          href="/profile/planner"
          className="flex items-center justify-between p-4.5 hover:bg-[#FDF6EF] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#1F1D1B] block">Meal Planner</span>
              <span className="text-xs text-[#6E6B68]">Plan weekly meals & slots</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
        </Link>

        <Link
          href="/profile/shopping-list"
          className="flex items-center justify-between p-4.5 hover:bg-[#FDF6EF] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#1F1D1B] block">Shopping List</span>
              <span className="text-xs text-[#6E6B68]">Aggregated ingredients checklist</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
        </Link>

        <Link
          href="/profile/history"
          className="flex items-center justify-between p-4.5 hover:bg-[#FDF6EF] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#1F1D1B] block">Cooking History</span>
              <span className="text-xs text-[#6E6B68]">Log of completed recipes</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
        </Link>

        <Link
          href="/profile/settings"
          className="flex items-center justify-between p-4.5 hover:bg-[#FDF6EF] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#1F1D1B] block">Settings</span>
              <span className="text-xs text-[#6E6B68]">Units, theme, dietary prefs</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
        </Link>
      </div>

      {/* Attribution & Sign Out */}
      <div className="space-y-3 text-center pt-2">
        <p className="text-xs text-[#6E6B68]">
          Recipes powered by <a href="https://www.themealdb.com" target="_blank" rel="noreferrer" className="text-[#E8734A] font-semibold hover:underline">TheMealDB</a>
        </p>
        <button className="inline-flex items-center gap-2 text-rose-600 font-bold text-sm hover:underline">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
