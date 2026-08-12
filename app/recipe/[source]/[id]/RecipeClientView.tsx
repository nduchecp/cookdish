"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Play, Clock, Users, CheckCircle2, Video } from "lucide-react";
import { NormalizedRecipe } from "@/lib/api/themealdb";

interface RecipeClientViewProps {
  recipe: NormalizedRecipe;
  source: string;
  id: string;
}

export default function RecipeClientView({ recipe, source, id }: RecipeClientViewProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-[#FDF6EF] pb-28 sm:pb-12 w-full">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto p-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="p-2.5 rounded-full bg-white border border-[#EFE6DD] text-[#1F1D1B] shadow-xs hover:border-[#E8734A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Save to favorites"
            className={`p-2.5 rounded-full bg-white border border-[#EFE6DD] shadow-xs transition-all ${
              isFavorite ? "text-[#E8734A] border-[#E8734A]" : "text-[#1F1D1B] hover:text-[#E8734A]"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-[#E8734A]" : ""}`} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Hero Banner (Fully Responsive Across Mobile, Tablet, Laptop, Desktop) */}
        <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-3xl overflow-hidden border border-[#EFE6DD] shadow-sm bg-[#F3EAE1]">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6 sm:p-8 lg:p-10">
            <div className="text-white space-y-2 max-w-3xl">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-[#E8734A] text-white px-3 py-1 rounded-full inline-block shadow-xs">
                {recipe.area ? `${recipe.area} Cuisine` : "Global Recipe"}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {recipe.title}
              </h1>
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                Category: {recipe.category}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Recipe Meta Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EFE6DD] shadow-xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-[#6E6B68]">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#E8734A]" />
              <div>
                <span className="block text-[10px] font-extrabold uppercase text-[#6E6B68]">Total Time</span>
                <span className="font-bold text-[#1F1D1B]">
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-[#E8734A]" />
              <div>
                <span className="block text-[10px] font-extrabold uppercase text-[#6E6B68]">Servings</span>
                <div className="flex items-center gap-1 font-bold text-[#1F1D1B]">
                  <span>{recipe.servings * servingsMultiplier} servings</span>
                  <button
                    onClick={() => setServingsMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 1))}
                    className="text-[10px] bg-[#FDF6EF] border border-[#EFE6DD] px-2 py-0.5 rounded-lg text-[#E8734A] hover:bg-[#E8734A] hover:text-white transition-colors ml-1 font-bold"
                  >
                    {servingsMultiplier}x
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {recipe.youtubeUrl && (
              <a
                href={recipe.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 transition-colors"
                title="Watch Video Tutorial"
              >
                <Video className="w-5 h-5" />
              </a>
            )}
            <Link
              href={`/recipe/${source}/${id}/cook`}
              className="flex-1 md:flex-none bg-[#E8734A] text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-[#D66239] transition-all flex items-center justify-center gap-2 shadow-xs text-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Cooking</span>
            </Link>
          </div>
        </div>

        {/* Responsive Grid Layout (1 col on mobile, 3 cols on laptop & desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Column 1: Ingredients Checklist (1 col on desktop) */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] space-y-4 shadow-xs lg:col-span-1">
            <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-3">
              <h2 className="text-lg font-extrabold text-[#1F1D1B]">
                Ingredients ({recipe.ingredients.length})
              </h2>
              <span className="text-xs text-[#6E6B68] font-semibold">
                {checkedIngredients.length}/{recipe.ingredients.length} done
              </span>
            </div>

            {recipe.ingredients.length > 0 ? (
              <div className="space-y-2.5">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = checkedIngredients.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                        isChecked
                          ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                          : "bg-[#FDF6EF] border-[#EFE6DD] text-[#1F1D1B]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            isChecked ? "text-emerald-600 fill-emerald-100" : "text-[#E8734A]"
                          }`}
                        />
                        <span className={`font-semibold text-xs truncate ${isChecked ? "line-through opacity-75" : ""}`}>
                          {ing.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#6E6B68] bg-white px-2 py-0.5 rounded-lg border border-[#EFE6DD] shrink-0">
                        {ing.amount}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-[#6E6B68]">Follow standard ingredients for this dish.</p>
            )}
          </div>

          {/* Column 2: Preparation Directions (2 cols on desktop) */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] space-y-4 shadow-xs lg:col-span-2">
            <h2 className="text-lg font-extrabold text-[#1F1D1B] border-b border-[#EFE6DD] pb-3">
              Step-by-Step Directions
            </h2>
            <div className="space-y-3">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-3.5 p-4 rounded-2xl bg-[#FDF6EF] border border-[#EFE6DD]">
                  <span className="font-extrabold text-[#E8734A] text-xs bg-white w-7 h-7 rounded-full flex items-center justify-center border border-[#EFE6DD] shrink-0 shadow-xs">
                    {idx + 1}
                  </span>
                  <p className="text-[#1F1D1B] text-xs sm:text-sm font-medium leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
