"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun, Globe, Tag } from "lucide-react";

export default function SettingsPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Vegetarian"]);

  const DIETARY_TAGS = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Dairy-Free", "Low Carb"];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="p-2 rounded-xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F1D1B]">Settings</h1>
          <p className="text-[#6E6B68] text-sm">App preferences & measurement units</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] space-y-6 shadow-sm">
        {/* Unit System */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#1F1D1B] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#E8734A]" />
            <span>Unit System</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setUnit("metric")}
              className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                unit === "metric"
                  ? "bg-[#E8734A] text-white border-[#E8734A]"
                  : "bg-white text-[#6E6B68] border-[#EFE6DD]"
              }`}
            >
              Metric (g, ml, °C)
            </button>
            <button
              onClick={() => setUnit("imperial")}
              className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                unit === "imperial"
                  ? "bg-[#E8734A] text-white border-[#E8734A]"
                  : "bg-white text-[#6E6B68] border-[#EFE6DD]"
              }`}
            >
              Imperial (oz, cups, °F)
            </button>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="space-y-2 pt-4 border-t border-[#EFE6DD]">
          <label className="text-sm font-bold text-[#1F1D1B] flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#E8734A]" />
            <span>Dietary Preferences</span>
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {DIETARY_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    isSelected
                      ? "bg-[#1F1D1B] text-white border-[#1F1D1B]"
                      : "bg-white text-[#6E6B68] border-[#EFE6DD]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
