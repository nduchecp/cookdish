"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Soup, Utensils, Flame, Cookie, Globe } from "lucide-react";
import { getTheMealDBCategories, MealDBCategory } from "@/lib/api/themealdb";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<MealDBCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      setLoading(true);
      const data = await getTheMealDBCategories();
      setCategories(data);
      setLoading(false);
    }
    loadCategories();
  }, []);

  return (
    <div className="space-y-6 w-full pb-12">
      <div className="space-y-1">
        <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
          Culinary Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1B] tracking-tight">
          Recipe Categories
        </h1>
        <p className="text-[#6E6B68] text-sm font-medium">
          Explore by traditional Nigerian soups, rice & stews, grills, snacks, or global international cuisines
        </p>
      </div>

      {/* Featured Category Groupings Grid (Reflecting All Seeded Recipe Groupings) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Soups & Swallows */}
        <Link
          href="/categories/nigerian-soups"
          className="relative bg-gradient-to-r from-[#E8734A] via-[#ED7D55] to-[#D66239] text-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between group overflow-hidden"
        >
          <div className="space-y-1 max-w-[80%] z-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
              Soups & Swallows
            </h2>
            <p className="text-xs text-white/85 font-medium leading-normal line-clamp-1">
              Oha, Egusi, Ogbono, Okra Soup & Pounded Yam
            </p>
          </div>
          <Soup className="w-8 h-8 text-white/85 group-hover:text-white group-hover:scale-110 transition-all shrink-0 ml-3 z-10" />
        </Link>

        {/* 2. Rice & Stews */}
        <Link
          href="/categories/rice-stews"
          className="relative bg-gradient-to-r from-[#1F1D1B] via-[#2D2A27] to-[#33302C] text-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between group overflow-hidden"
        >
          <div className="space-y-1 max-w-[80%] z-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
              Rice & Stews
            </h2>
            <p className="text-xs text-white/85 font-medium leading-normal line-clamp-1">
              Smoky Party Jollof, Ofada Rice & Ayamase Stew
            </p>
          </div>
          <Utensils className="w-8 h-8 text-white/85 group-hover:text-white group-hover:scale-110 transition-all shrink-0 ml-3 z-10" />
        </Link>

        {/* 3. Grills & Suya */}
        <Link
          href="/categories/grills-chops"
          className="relative bg-gradient-to-r from-[#E8734A] via-[#F28E6B] to-[#E8734A] text-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between group overflow-hidden"
        >
          <div className="space-y-1 max-w-[80%] z-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
              Grills & Suya
            </h2>
            <p className="text-xs text-white/85 font-medium leading-normal line-clamp-1">
              Spicy Beef Suya, Peppered Goat Meat (Asun) & Night Chops
            </p>
          </div>
          <Flame className="w-8 h-8 text-white/85 group-hover:text-white group-hover:scale-110 transition-all shrink-0 ml-3 z-10" />
        </Link>

        {/* 4. Bakery & Snacks */}
        <Link
          href="/categories/snacks-breakfast"
          className="relative bg-gradient-to-r from-[#3A3530] via-[#2D2A27] to-[#1F1D1B] text-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between group overflow-hidden"
        >
          <div className="space-y-1 max-w-[80%] z-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
              Bakery & Snacks
            </h2>
            <p className="text-xs text-white/85 font-medium leading-normal line-clamp-1">
              Chin Chin, Puff-Puff, Beef Meat Pie & Beans Moi Moi
            </p>
          </div>
          <Cookie className="w-8 h-8 text-white/85 group-hover:text-white group-hover:scale-110 transition-all shrink-0 ml-3 z-10" />
        </Link>

        {/* 5. International Cuisines */}
        <Link
          href="/categories/international"
          className="relative bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between group overflow-hidden sm:col-span-2"
        >
          <div className="space-y-1 max-w-[80%] z-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
              International Cuisines
            </h2>
            <p className="text-xs text-white/85 font-medium leading-normal line-clamp-1">
              Italian Carbonara, Japanese Teriyaki Rice Bowls, Mexican Beef Tacos & Global Classics
            </p>
          </div>
          <Globe className="w-8 h-8 text-white/85 group-hover:text-white group-hover:scale-110 transition-all shrink-0 ml-3 z-10" />
        </Link>
      </div>

      {/* Global Category Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-36 rounded-3xl bg-white animate-pulse border border-[#EFE6DD]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.idCategory}
              href={`/categories/${cat.strCategory.toLowerCase()}`}
              className="bg-white rounded-3xl p-5 border border-[#EFE6DD] shadow-xs hover:border-[#E8734A] hover:shadow-md transition-all text-center group flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-20 h-20 relative flex items-center justify-center bg-[#FDF6EF] rounded-2xl group-hover:scale-105 transition-transform">
                <img src={cat.strCategoryThumb} alt={cat.strCategory} className="object-contain max-h-16" />
              </div>
              <div>
                <h3 className="font-bold text-[#1F1D1B] group-hover:text-[#E8734A] transition-colors">
                  {cat.strCategory}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
