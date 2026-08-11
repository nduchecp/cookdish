"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, ShoppingBag, Trash2, Search, X, Check, Utensils, Clock, Sparkles } from "lucide-react";
import { NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";
import { NormalizedRecipe } from "@/lib/api/themealdb";

interface PlannedMealItem {
  id: string;
  day: string;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  recipe: NormalizedRecipe;
}

export default function MealPlannerPage() {
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Pre-populated initial planned meals
  const [plannedMeals, setPlannedMeals] = useState<PlannedMealItem[]>([
    {
      id: "plan-1",
      day: "Mon",
      mealType: "Lunch",
      recipe: NIGERIAN_LOCAL_DISHES[0], // Egusi Soup
    },
    {
      id: "plan-2",
      day: "Wed",
      mealType: "Dinner",
      recipe: NIGERIAN_LOCAL_DISHES[5], // Party Jollof
    },
    {
      id: "plan-3",
      day: "Fri",
      mealType: "Dinner",
      recipe: NIGERIAN_LOCAL_DISHES[7], // Beef Suya
    },
  ]);

  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<"Breakfast" | "Lunch" | "Dinner" | "Snack">("Lunch");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddMealModal = (day: string) => {
    setActiveDay(day);
    setIsModalOpen(true);
    setSearchQuery("");
  };

  const handleSelectRecipe = (recipe: NormalizedRecipe) => {
    if (!activeDay) return;

    const newMeal: PlannedMealItem = {
      id: `plan-${Date.now()}`,
      day: activeDay,
      mealType: selectedMealType,
      recipe,
    };

    setPlannedMeals((prev) => [...prev, newMeal]);
    setIsModalOpen(false);
  };

  const handleRemoveMeal = (id: string) => {
    setPlannedMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const filteredRecipes = NIGERIAN_LOCAL_DISHES.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="p-2.5 rounded-2xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">Weekly Meal Planner</h1>
            <p className="text-[#6E6B68] text-xs sm:text-sm">Organize your weekly menu & schedule dish slots</p>
          </div>
        </div>

        <Link
          href="/profile/shopping-list"
          className="bg-[#E8734A] text-white px-5 py-3 rounded-2xl text-sm font-bold hover:bg-[#D66239] transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Go to Shopping List ({plannedMeals.length} planned)</span>
        </Link>
      </div>

      {/* Days Grid (7 Columns on Large Screens, Responsive Stack on Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {DAYS.map((day) => {
          const dayMeals = plannedMeals.filter((m) => m.day === day);
          return (
            <div
              key={day}
              className="bg-white rounded-3xl p-4 border border-[#EFE6DD] flex flex-col justify-between space-y-4 min-h-[220px] shadow-xs hover:border-[#E8734A]/50 transition-all"
            >
              {/* Day Header */}
              <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-2">
                <span className="font-extrabold text-[#1F1D1B] text-base">{day}</span>
                <span className="text-[10px] font-bold bg-[#FDF6EF] text-[#E8734A] px-2 py-0.5 rounded-full border border-[#EFE6DD]">
                  {dayMeals.length} {dayMeals.length === 1 ? "meal" : "meals"}
                </span>
              </div>

              {/* Planned Meal Cards List */}
              <div className="space-y-3 flex-1">
                {dayMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="relative group bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl p-2.5 space-y-1.5 shadow-2xs"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider bg-[#E8734A] text-white px-2 py-0.5 rounded-md">
                        {meal.mealType}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMeal(meal.id)}
                        className="text-[#6E6B68] hover:text-rose-600 transition-colors p-1"
                        title="Remove meal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex gap-2 items-center">
                      <img
                        src={meal.recipe.image}
                        alt={meal.recipe.title}
                        className="w-9 h-9 rounded-xl object-cover shrink-0 border border-[#EFE6DD]"
                      />
                      <p className="text-xs font-bold text-[#1F1D1B] leading-tight line-clamp-2">
                        {meal.recipe.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Meal Trigger Button */}
              <button
                type="button"
                onClick={() => openAddMealModal(day)}
                className="w-full flex items-center justify-center gap-1.5 border-2 border-dashed border-[#EFE6DD] text-[#E8734A] rounded-2xl py-3 text-xs font-bold hover:border-[#E8734A] hover:bg-[#FDF6EF] transition-all cursor-pointer active:scale-95 mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Meal</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Meal Recipe Picker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-5 border border-[#EFE6DD] shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-[#1F1D1B]">
                  Schedule Meal for {activeDay}
                </h3>
                <p className="text-xs text-[#6E6B68]">Select meal slot and pick a dish</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#FDF6EF] text-[#6E6B68] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Meal Type Radio Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1F1D1B] block">Meal Time</label>
              <div className="grid grid-cols-4 gap-2">
                {(["Breakfast", "Lunch", "Dinner", "Snack"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedMealType(type)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                      selectedMealType === type
                        ? "bg-[#E8734A] text-white border-[#E8734A]"
                        : "bg-[#FDF6EF] text-[#1F1D1B] border-[#EFE6DD] hover:border-[#E8734A]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#6E6B68] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search recipe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
              />
            </div>

            {/* Recipe List */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  type="button"
                  onClick={() => handleSelectRecipe(recipe)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-[#EFE6DD] hover:border-[#E8734A] hover:bg-[#FDF6EF] transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-10 h-10 rounded-xl object-cover border border-[#EFE6DD]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#1F1D1B] group-hover:text-[#E8734A] transition-colors">
                        {recipe.title}
                      </h4>
                      <span className="text-[10px] text-[#6E6B68]">
                        {recipe.category} • {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                      </span>
                    </div>
                  </div>
                  <Plus className="w-4 h-4 text-[#E8734A] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
