"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ShoppingBag,
  History,
  Settings,
  ChevronRight,
  LogOut,
  Heart,
  Bookmark,
  ChefHat,
  Award,
  Flame,
  Sparkles,
  Share2,
  Edit3,
  Sliders,
  ShieldCheck,
  Check,
  Utensils
} from "lucide-react";

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://cookdish.app/profile/chef-promise");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">Profile & Culinary Hub</h1>
          <p className="text-xs sm:text-sm text-[#6E6B68]">Manage your cooking history, meal plans, and preferences</p>
        </div>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 text-xs font-bold bg-white border border-[#EFE6DD] text-[#1F1D1B] px-3.5 py-2 rounded-2xl hover:border-[#E8734A] transition-all shadow-xs cursor-pointer active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#E8734A]" />}
          <span>{copied ? "Link Copied!" : "Share Profile"}</span>
        </button>
      </div>

      {/* Hero Chef Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-[#EFE6DD] bg-gradient-to-br from-[#1F1D1B] via-[#2D2A26] to-[#1F1D1B] text-white p-6 sm:p-8 shadow-md">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8734A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#E8734A]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar Ring */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#E8734A] to-[#F59E0B] p-1 shadow-lg">
              <div className="w-full h-full rounded-[22px] bg-[#1F1D1B] flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-white border border-white/10">
                👨‍🍳
              </div>
            </div>
            <span className="absolute -bottom-2 -right-2 bg-[#E8734A] text-white p-1.5 rounded-xl text-xs font-bold border-2 border-[#1F1D1B] shadow-sm">
              <Sparkles className="w-4 h-4 fill-white" />
            </span>
          </div>

          {/* User Meta Information */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#E8734A] text-white px-3 py-1 rounded-full shadow-xs">
                Master Executive Chef
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Account
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Chef Promise</h2>
              <p className="text-xs sm:text-sm text-white/70 font-medium">chef.promise@cookdish.app • Joined Feb 2026</p>
            </div>

            <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
              Passionate about authentic West African traditional delicacies, smoky Jollof rice, and global fusion home cooking.
            </p>
          </div>
        </div>
      </div>

      {/* Culinary Stats Grid (4 Cards across Desktop, 2 on Mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Link
          href="/profile/history"
          className="bg-white rounded-3xl p-5 border border-[#EFE6DD] hover:border-[#E8734A] transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#E8734A] flex items-center justify-center group-hover:bg-[#E8734A] group-hover:text-white transition-colors">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">+3 this week</span>
          </div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">14</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Recipes Cooked</span>
        </Link>

        <Link
          href="/my-recipes"
          className="bg-white rounded-3xl p-5 border border-[#EFE6DD] hover:border-[#E8734A] transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <Heart className="w-5 h-5 fill-rose-500 group-hover:fill-white" />
            </div>
            <span className="text-[10px] font-bold text-[#6E6B68] bg-[#FDF6EF] px-2 py-0.5 rounded-full border border-[#EFE6DD]">Saved</span>
          </div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">12</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Favorite Dishes</span>
        </Link>

        <Link
          href="/my-recipes"
          className="bg-white rounded-3xl p-5 border border-[#EFE6DD] hover:border-[#E8734A] transition-all shadow-xs group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <ChefHat className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#6E6B68] bg-[#FDF6EF] px-2 py-0.5 rounded-full border border-[#EFE6DD]">Authored</span>
          </div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">4</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Custom Recipes</span>
        </Link>

        <div className="bg-white rounded-3xl p-5 border border-[#EFE6DD] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">Active</span>
          </div>
          <span className="block text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">7 Days</span>
          <span className="text-xs font-semibold text-[#6E6B68]">Cooking Streak</span>
        </div>
      </div>

      {/* Culinary Preferences & Tags Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[#1F1D1B] uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#E8734A]" />
            <span>Dietary & Spice Badges</span>
          </h3>
          <Link href="/profile/settings" className="text-xs font-bold text-[#E8734A] hover:underline">
            Edit Prefs
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-xs font-bold bg-[#FDF6EF] text-[#1F1D1B] border border-[#EFE6DD] px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            🌶️ Extra Spicy (Habanero Lover)
          </span>
          <span className="text-xs font-bold bg-[#FDF6EF] text-[#1F1D1B] border border-[#EFE6DD] px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-[#E8734A]" /> Nigerian Traditional Cuisine
          </span>
          <span className="text-xs font-bold bg-[#FDF6EF] text-[#1F1D1B] border border-[#EFE6DD] px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            💪 High Protein Focus
          </span>
          <span className="text-xs font-bold bg-[#FDF6EF] text-[#1F1D1B] border border-[#EFE6DD] px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            🥑 Low Carb Swallow Options
          </span>
        </div>
      </div>

      {/* Profile Navigation Hub Rows */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-[#6E6B68] uppercase tracking-wider px-2">
          Culinary Workspaces & Tools
        </h3>

        <div className="bg-white rounded-3xl border border-[#EFE6DD] overflow-hidden divide-y divide-[#EFE6DD] shadow-xs">
          {/* Meal Planner */}
          <Link
            href="/profile/planner"
            className="flex items-center justify-between p-5 hover:bg-[#FDF6EF] transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD] group-hover:bg-[#E8734A] group-hover:text-white transition-all shadow-xs">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-[#1F1D1B] block text-base group-hover:text-[#E8734A] transition-colors">
                  Weekly Meal Planner
                </span>
                <span className="text-xs text-[#6E6B68] font-medium">
                  Organize breakfast, lunch & dinner slots • <strong className="text-[#E8734A]">3 scheduled</strong>
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
          </Link>

          {/* Shopping List */}
          <Link
            href="/profile/shopping-list"
            className="flex items-center justify-between p-5 hover:bg-[#FDF6EF] transition-colors group"
          >
            <div className="flex items-[#E8734A] gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD] group-hover:bg-[#E8734A] group-hover:text-white transition-all shadow-xs">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-[#1F1D1B] block text-base group-hover:text-[#E8734A] transition-colors">
                  Smart Shopping List
                </span>
                <span className="text-xs text-[#6E6B68] font-medium">
                  Aggregated ingredient checklist • <strong className="text-emerald-600">8 items pending</strong>
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
          </Link>

          {/* Cooking History */}
          <Link
            href="/profile/history"
            className="flex items-center justify-between p-5 hover:bg-[#FDF6EF] transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD] group-hover:bg-[#E8734A] group-hover:text-white transition-all shadow-xs">
                <History className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-[#1F1D1B] block text-base group-hover:text-[#E8734A] transition-colors">
                  Cooking History & Log
                </span>
                <span className="text-xs text-[#6E6B68] font-medium">
                  Review past completed meals • Last cooked <strong className="text-[#1F1D1B]">Egusi Soup</strong>
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
          </Link>

          {/* Settings */}
          <Link
            href="/profile/settings"
            className="flex items-center justify-between p-5 hover:bg-[#FDF6EF] transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center border border-[#EFE6DD] group-hover:bg-[#E8734A] group-hover:text-white transition-all shadow-xs">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-[#1F1D1B] block text-base group-hover:text-[#E8734A] transition-colors">
                  App Settings & Preferences
                </span>
                <span className="text-xs text-[#6E6B68] font-medium">
                  Metric/Imperial units, dark mode, dietary filters
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
          </Link>
        </div>
      </div>

      {/* Prominent High-End Full-Width Sign Out Action Button */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-4 text-center border-t border-[#EFE6DD]">
        <button
          type="button"
          className="w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center gap-2.5 text-rose-600 font-extrabold text-sm bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 px-8 py-4 rounded-2xl transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out of Account</span>
        </button>

        <p className="text-xs text-[#6E6B68]">
          CookDish App v2.5.0 • Live Vercel Release
        </p>
      </div>
    </div>
  );
}
