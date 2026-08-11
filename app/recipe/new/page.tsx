"use client";

import Link from "next/link";
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AddRecipePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);

  return (
    <div className="min-h-screen bg-[#FDF6EF] p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F1D1B]">Create Recipe</h1>
            <p className="text-[#6E6B68] text-sm">Share your culinary creation with CookDish</p>
          </div>
        </div>

        <form className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6DD] space-y-6 shadow-sm">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#1F1D1B]">Recipe Title</label>
            <input
              type="text"
              placeholder="e.g. Homemade Spaghetti Carbonara"
              className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl p-3.5 text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
            />
          </div>

          {/* Photo Upload Area */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#1F1D1B]">Recipe Photo</label>
            <div className="border-2 border-dashed border-[#EFE6DD] rounded-3xl p-8 text-center bg-[#FDF6EF] cursor-pointer hover:border-[#E8734A] transition-colors">
              <Upload className="w-8 h-8 text-[#E8734A] mx-auto mb-2" />
              <span className="text-sm font-bold text-[#1F1D1B] block">Upload Photo</span>
              <span className="text-xs text-[#6E6B68]">PNG, JPG up to 10MB</span>
            </div>
          </div>

          {/* Times & Servings */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1F1D1B] mb-1">Prep (mins)</label>
              <input
                type="number"
                placeholder="15"
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-xl p-3 text-[#1F1D1B] focus:border-[#E8734A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1F1D1B] mb-1">Cook (mins)</label>
              <input
                type="number"
                placeholder="30"
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-xl p-3 text-[#1F1D1B] focus:border-[#E8734A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1F1D1B] mb-1">Servings</label>
              <input
                type="number"
                placeholder="4"
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-xl p-3 text-[#1F1D1B] focus:border-[#E8734A]"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#EFE6DD]">
            <button
              type="button"
              className="w-full bg-[#E8734A] text-white py-4 rounded-2xl font-bold hover:bg-[#D66239] transition-all shadow-md"
            >
              Publish Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
