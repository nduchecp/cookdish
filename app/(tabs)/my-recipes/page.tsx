"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, FolderHeart, ChefHat, Plus, Clock, Star, Heart } from "lucide-react";

export default function MyRecipesPage() {
  const [activeTab, setActiveTab] = useState<"saved" | "authored" | "collections">("saved");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F1D1B]">My Recipe Hub</h1>
          <p className="text-[#6E6B68] text-sm mt-1">Your saved favorites, authored recipes & collections</p>
        </div>
        <Link
          href="/recipe/new"
          className="bg-[#E8734A] text-white px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-[#D66239] transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Recipe</span>
        </Link>
      </div>

      {/* 3 Unified Sub-tabs */}
      <div className="flex border-b border-[#EFE6DD] gap-6">
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "saved"
              ? "border-[#E8734A] text-[#E8734A]"
              : "border-transparent text-[#6E6B68] hover:text-[#1F1D1B]"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>
        <button
          onClick={() => setActiveTab("authored")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "authored"
              ? "border-[#E8734A] text-[#E8734A]"
              : "border-transparent text-[#6E6B68] hover:text-[#1F1D1B]"
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>My Recipes</span>
        </button>
        <button
          onClick={() => setActiveTab("collections")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "collections"
              ? "border-[#E8734A] text-[#E8734A]"
              : "border-transparent text-[#6E6B68] hover:text-[#1F1D1B]"
          }`}
        >
          <FolderHeart className="w-4 h-4" />
          <span>Collections</span>
        </button>
      </div>

      {/* Tab Content Panes */}
      {activeTab === "saved" && (
        <div className="bg-white rounded-3xl p-8 border border-[#EFE6DD] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-[#E8734A]" />
          </div>
          <h3 className="text-lg font-bold text-[#1F1D1B]">No Saved Recipes Yet</h3>
          <p className="text-sm text-[#6E6B68] max-w-sm mx-auto">
            Tap the heart icon on any recipe card across Home or Search to add it to your saved bookmarks.
          </p>
        </div>
      )}

      {activeTab === "authored" && (
        <div className="bg-white rounded-3xl p-8 border border-[#EFE6DD] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center mx-auto">
            <ChefHat className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1F1D1B]">Share Your Signature Dish</h3>
          <p className="text-sm text-[#6E6B68] max-w-sm mx-auto">
            Create and publish your own recipes to mix into the community discovery feed.
          </p>
          <div className="pt-2">
            <Link
              href="/recipe/new"
              className="inline-flex items-center gap-2 bg-[#1F1D1B] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#33302C] transition-all"
            >
              <Plus className="w-4 h-4 text-[#E8734A]" />
              <span>Create Recipe</span>
            </Link>
          </div>
        </div>
      )}

      {activeTab === "collections" && (
        <div className="bg-white rounded-3xl p-8 border border-[#EFE6DD] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center mx-auto">
            <FolderHeart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1F1D1B]">Create Folder Collections</h3>
          <p className="text-sm text-[#6E6B68] max-w-sm mx-auto">
            Organize saved and authored recipes into custom folders (e.g. "Sunday Brunch", "Quick Dinners").
          </p>
        </div>
      )}
    </div>
  );
}
