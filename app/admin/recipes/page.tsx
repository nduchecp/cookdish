"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ExternalLink,
  Clock,
  Star,
  CheckCircle2,
  AlertTriangle,
  X,
  Filter,
} from "lucide-react";
import { NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState(NIGERIAN_LOCAL_DISHES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categoriesList = ["All", "Nigerian Soups", "Nigerian Rice & Stews", "Nigerian Grills & Small Chops", "Nigerian Bakery & Snacks", "International"];

  const filteredRecipes = recipes.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.area?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      selectedCategory === "All" || r.category === selectedCategory || (selectedCategory === "International" && r.category === "International");

    return matchesSearch && matchesCat;
  });

  const handleDeleteConfirm = () => {
    if (deletingId) {
      setRecipes((prev) => prev.filter((r) => r.id !== deletingId));
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
            Catalog Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B] tracking-tight">
            Recipe Catalog ({recipes.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B68] font-medium">
            Edit, moderate, and publish recipes across the global CookDish database
          </p>
        </div>

        <Link
          href="/admin/recipes/new"
          className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-extrabold px-5 py-3 rounded-2xl flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Recipe</span>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-[#EFE6DD] shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, ingredients, category..."
            className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-[#6E6B68] shrink-0" />
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-[#E8734A] text-white border-[#E8734A] shadow-2xs"
                  : "bg-[#FDF6EF] text-[#6E6B68] border-[#EFE6DD] hover:text-[#1F1D1B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Management Table */}
      <div className="bg-white rounded-3xl border border-[#EFE6DD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FDF6EF] border-b border-[#EFE6DD] text-[#6E6B68] font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-4 px-6">Recipe</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Prep / Cook</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6DD]">
              {filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-[#FDF6EF]/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-12 h-12 rounded-2xl object-cover border border-[#EFE6DD] shrink-0"
                      />
                      <div className="min-w-0 max-w-xs">
                        <span className="font-extrabold text-[#1F1D1B] block text-xs truncate group-hover:text-[#E8734A] transition-colors">
                          {recipe.title}
                        </span>
                        <span className="text-[11px] text-[#6E6B68] truncate block">
                          {recipe.ingredients.length} ingredients • {recipe.instructions.length} steps
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-semibold text-[#1F1D1B] bg-[#FDF6EF] border border-[#EFE6DD] px-2.5 py-1 rounded-xl">
                      {recipe.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-semibold text-[#6E6B68]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E8734A]" />
                      <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 font-bold text-[#1F1D1B]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{recipe.rating}</span>
                      <span className="text-[#6E6B68] text-[10px]">({recipe.reviewsCount})</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Published</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/recipe/${recipe.source}/${recipe.id}`}
                        target="_blank"
                        className="p-2 rounded-xl text-[#6E6B68] hover:text-[#1F1D1B] hover:bg-[#FDF6EF] transition-colors"
                        title="View Live Recipe"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/recipes/${recipe.id}`}
                        className="p-2 rounded-xl text-[#6E6B68] hover:text-[#E8734A] hover:bg-orange-50 transition-colors"
                        title="Edit Recipe"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeletingId(recipe.id)}
                        className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Recipe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-[#EFE6DD] shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#1F1D1B]">Delete Recipe?</h3>
              <p className="text-xs text-[#6E6B68] pt-1">
                Are you sure you want to delete this recipe? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 bg-[#FDF6EF] border border-[#EFE6DD] text-[#1F1D1B] text-xs font-bold py-3 rounded-2xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-3 rounded-2xl shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
