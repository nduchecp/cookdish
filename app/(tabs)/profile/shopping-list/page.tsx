"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, Trash2 } from "lucide-react";

const INITIAL_ITEMS = [
  { id: "1", name: "Chicken Breast", amount: "500g", checked: false },
  { id: "2", name: "Soy Sauce", amount: "2 tbsp", checked: true },
  { id: "3", name: "Garlic Cloves", amount: "4 heads", checked: false },
  { id: "4", name: "Heavy Cream", amount: "200ml", checked: false },
];

export default function ShoppingListPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const clearChecked = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="p-2 rounded-xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F1D1B]">Shopping List</h1>
            <p className="text-[#6E6B68] text-sm">Aggregated ingredients from your planned meals</p>
          </div>
        </div>
        <button
          onClick={clearChecked}
          className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1 bg-white border border-rose-100 px-3 py-2 rounded-xl shadow-sm"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Checked</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#EFE6DD] divide-y divide-[#EFE6DD] shadow-sm overflow-hidden">
        {items.map((item) => (
          <label
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#FDF6EF] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  item.checked
                    ? "bg-[#E8734A] border-[#E8734A] text-white"
                    : "border-[#6E6B68] bg-white"
                }`}
              >
                {item.checked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
              </div>
              <span
                className={`font-semibold text-sm ${
                  item.checked ? "line-through text-[#6E6B68]" : "text-[#1F1D1B]"
                }`}
              >
                {item.name}
              </span>
            </div>
            <span className="text-xs font-bold text-[#6E6B68] bg-[#FDF6EF] px-2.5 py-1 rounded-lg">
              {item.amount}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
