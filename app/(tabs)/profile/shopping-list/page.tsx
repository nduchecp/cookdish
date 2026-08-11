"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, Trash2, Plus, RefreshCw, Utensils, CheckCircle2 } from "lucide-react";
import { NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";

interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  recipeName?: string;
  category: "Soups & Swallows" | "Rice & Stews" | "Grills & Snacks" | "General Pantry";
  checked: boolean;
}

// Real ingredients aggregated from authentic dishes (Egusi, Jollof, Oha, Suya, Pounded Yam)
const REAL_NIGERIAN_INGREDIENTS: ShoppingItem[] = [
  {
    id: "ing-1",
    name: "Ground Egusi (Melon Seeds)",
    amount: "2 cups",
    recipeName: "Authentic Egusi Soup",
    category: "Soups & Swallows",
    checked: false,
  },
  {
    id: "ing-2",
    name: "Red Palm Oil",
    amount: "1.5 cups",
    recipeName: "Egusi & Oha Soup",
    category: "Soups & Swallows",
    checked: false,
  },
  {
    id: "ing-3",
    name: "Fresh Oha Leaves",
    amount: "2 bunches",
    recipeName: "Traditional Igbo Oha Soup",
    category: "Soups & Swallows",
    checked: false,
  },
  {
    id: "ing-4",
    name: "Smoked Catfish & Stockfish",
    amount: "2 cups total",
    recipeName: "Egusi & Ogbono Soup",
    category: "Soups & Swallows",
    checked: true,
  },
  {
    id: "ing-5",
    name: "White Puna Yam Tuber",
    amount: "1 medium tuber (1.5kg)",
    recipeName: "Pounded Yam",
    category: "Soups & Swallows",
    checked: false,
  },
  {
    id: "ing-6",
    name: "Long-Grain Parboiled Rice",
    amount: "4 cups",
    recipeName: "Smoky Party Jollof Rice",
    category: "Rice & Stews",
    checked: false,
  },
  {
    id: "ing-7",
    name: "Tatashe (Red Bell Peppers) & Rodo",
    amount: "8 tatashe, 5 habaneros",
    recipeName: "Party Jollof & Asun",
    category: "Rice & Stews",
    checked: false,
  },
  {
    id: "ing-8",
    name: "Authentic Suya Yaji Spice Mix",
    amount: "1/2 cup",
    recipeName: "Spicy Beef Suya",
    category: "Grills & Snacks",
    checked: false,
  },
  {
    id: "ing-9",
    name: "Flank Steak / Beef Sirloin",
    amount: "600g",
    recipeName: "Spicy Beef Suya",
    category: "Grills & Snacks",
    checked: false,
  },
  {
    id: "ing-10",
    name: "Ground Crayfish & Seasoning Cubes",
    amount: "1/2 cup crayfish, 6 cubes",
    recipeName: "General Pantry",
    category: "General Pantry",
    checked: true,
  },
];

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>(REAL_NIGERIAN_INGREDIENTS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      amount: newItemAmount.trim() || "1 pack",
      category: "General Pantry",
      checked: false,
    };

    setItems((prev) => [newItem, ...prev]);
    setNewItemName("");
    setNewItemAmount("");
  };

  const clearChecked = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  const resetDefaultList = () => {
    setItems(REAL_NIGERIAN_INGREDIENTS);
  };

  const categories = ["All", "Soups & Swallows", "Rice & Stews", "Grills & Snacks", "General Pantry"];

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((i) => i.category === activeCategory);

  const completedCount = items.filter((i) => i.checked).length;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="p-2.5 rounded-2xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">Smart Shopping List</h1>
            <p className="text-[#6E6B68] text-xs sm:text-sm">
              Aggregated ingredients from your planned meals ({items.length} items)
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetDefaultList}
            className="text-[#6E6B68] hover:text-[#E8734A] text-xs font-bold flex items-center gap-1.5 bg-white border border-[#EFE6DD] px-3.5 py-2.5 rounded-2xl shadow-xs transition-colors cursor-pointer"
            title="Reset default recipe list"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset List</span>
          </button>
          {completedCount > 0 && (
            <button
              type="button"
              onClick={clearChecked}
              className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1.5 bg-rose-50 border border-rose-100 px-3.5 py-2.5 rounded-2xl shadow-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Checked ({completedCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Add Custom Ingredient Form */}
      <form onSubmit={handleAddItem} className="bg-white rounded-3xl p-4 border border-[#EFE6DD] shadow-xs flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Add extra ingredient (e.g., Maggi cubes, Salt)..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
        />
        <input
          type="text"
          placeholder="Amount (e.g., 1 pack)"
          value={newItemAmount}
          onChange={(e) => setNewItemAmount(e.target.value)}
          className="w-full sm:w-36 bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
        />
        <button
          type="submit"
          className="bg-[#E8734A] text-white px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-[#D66239] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </form>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? "bg-[#1F1D1B] text-white border-[#1F1D1B]"
                : "bg-white text-[#6E6B68] border-[#EFE6DD] hover:border-[#E8734A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ingredients List */}
      <div className="bg-white rounded-3xl border border-[#EFE6DD] divide-y divide-[#EFE6DD] shadow-xs overflow-hidden">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#FDF6EF] transition-colors select-none"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    item.checked
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-[#6E6B68] bg-white"
                  }`}
                >
                  {item.checked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                </div>
                <div>
                  <span
                    className={`font-bold text-sm block ${
                      item.checked ? "line-through text-[#6E6B68] opacity-75" : "text-[#1F1D1B]"
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.recipeName && (
                    <span className="text-[10px] text-[#6E6B68] font-semibold">
                      Dish: {item.recipeName}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs font-bold text-[#6E6B68] bg-[#FDF6EF] border border-[#EFE6DD] px-3 py-1 rounded-xl">
                {item.amount}
              </span>
            </label>
          ))
        ) : (
          <div className="p-8 text-center text-[#6E6B68] text-xs font-medium space-y-2">
            <ShoppingBag className="w-8 h-8 text-[#E8734A] mx-auto opacity-40" />
            <p>No ingredients found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
