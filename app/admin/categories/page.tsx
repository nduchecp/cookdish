"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  Soup,
  Utensils,
  Flame,
  Cookie,
  Globe,
  Search,
  CheckCircle2,
  X,
  Layers,
  AlertTriangle,
  ExternalLink,
  Grid,
  List,
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  recipeCount: number;
  iconName: string;
  color: string;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-soups",
    name: "Soups & Swallows",
    slug: "nigerian-soups",
    description: "Traditional Nigerian heritage soups (Oha, Egusi, Ogbono, Okra) paired with Pounded Yam & Swallow.",
    recipeCount: 5,
    iconName: "Soup",
    color: "from-[#E8734A] to-[#D66239]",
  },
  {
    id: "cat-rice",
    name: "Rice & Stews",
    slug: "rice-stews",
    description: "Smoky Party Jollof Rice, Ofada Rice with Ayamase Stew, and spicy fried rice delicacies.",
    recipeCount: 3,
    iconName: "Utensils",
    color: "from-[#1F1D1B] to-[#33302C]",
  },
  {
    id: "cat-grills",
    name: "Grills & Suya",
    slug: "grills-chops",
    description: "Night market spicy beef suya skewers, peppered goat meat (asun), and night chops.",
    recipeCount: 2,
    iconName: "Flame",
    color: "from-[#E8734A] to-[#F28E6B]",
  },
  {
    id: "cat-snacks",
    name: "Bakery & Snacks",
    slug: "snacks-breakfast",
    description: "Crunchy chin chin, golden puff-puff, savory beef meat pies, and steamed corn & bean moi moi.",
    recipeCount: 3,
    iconName: "Cookie",
    color: "from-[#3A3530] to-[#1F1D1B]",
  },
  {
    id: "cat-international",
    name: "International Cuisines",
    slug: "international",
    description: "Global classics including Italian Pasta Carbonara, Japanese Chicken Teriyaki Bowls & Mexican Beef Tacos.",
    recipeCount: 3,
    iconName: "Globe",
    color: "from-[#2563EB] to-[#1D4ED8]",
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form local state
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formIcon, setFormIcon] = useState("Soup");

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormName("");
    setFormSlug("");
    setFormDescription("");
    setFormIcon("Soup");
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDescription(cat.description);
    setFormIcon(cat.iconName);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const generatedSlug = formSlug.trim() || formName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                name: formName.trim(),
                slug: generatedSlug,
                description: formDescription.trim(),
                iconName: formIcon,
              }
            : c
        )
      );
    } else {
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: formName.trim(),
        slug: generatedSlug,
        description: formDescription.trim(),
        recipeCount: 0,
        iconName: formIcon,
        color: "from-[#E8734A] to-[#F28E6B]",
      };
      setCategories((prev) => [...prev, newCat]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      setCategories((prev) => prev.filter((c) => c.id !== deletingId));
      setDeletingId(null);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-8 w-full pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
            Taxonomy Supervision
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B] tracking-tight">
            Recipe Categories ({categories.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B68] font-medium">
            Manage category taxonomy groupings live across consumer search & categories page
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-extrabold px-5 py-3 rounded-2xl flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Category</span>
        </button>
      </div>

      {/* Toolbar Search & View Toggle */}
      <div className="bg-white p-4 rounded-3xl border border-[#EFE6DD] shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter categories by name or slug..."
            className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs font-bold text-[#6E6B68]">
            Showing {filteredCategories.length} categories
          </span>

          <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#EFE6DD]">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-white text-[#E8734A] shadow-2xs"
                  : "text-[#6E6B68] hover:text-[#1F1D1B]"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === "table"
                  ? "bg-white text-[#E8734A] shadow-2xs"
                  : "text-[#6E6B68] hover:text-[#1F1D1B]"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EFE6DD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Category Header Card Banner */}
                <div className={`bg-gradient-to-r ${cat.color} p-6 text-white flex justify-between items-start relative overflow-hidden`}>
                  <div className="space-y-1 relative z-10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block">
                      /{cat.slug}
                    </span>
                    <h3 className="text-xl font-extrabold text-white">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 border border-white/20 relative z-10 shadow-xs">
                    {cat.iconName === "Soup" && <Soup className="w-5 h-5" />}
                    {cat.iconName === "Utensils" && <Utensils className="w-5 h-5" />}
                    {cat.iconName === "Flame" && <Flame className="w-5 h-5" />}
                    {cat.iconName === "Cookie" && <Cookie className="w-5 h-5" />}
                    {cat.iconName === "Globe" && <Globe className="w-5 h-5" />}
                    {cat.iconName === "Layers" && <Layers className="w-5 h-5" />}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-xs text-[#524F4C] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[#6E6B68] font-medium">Indexed Content:</span>
                    <span className="font-extrabold text-[#1F1D1B] bg-[#FAF8F5] border border-[#EFE6DD] px-3 py-1 rounded-full">
                      {cat.recipeCount} recipe{cat.recipeCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-3 border-t border-[#EFE6DD] flex items-center justify-between text-xs">
                <Link
                  href={`/categories/${cat.slug}`}
                  target="_blank"
                  className="text-[#E8734A] font-extrabold hover:underline flex items-center gap-1"
                >
                  <span>Preview Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(cat)}
                    className="p-2 rounded-xl text-[#6E6B68] hover:text-[#1F1D1B] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingId(cat.id)}
                    className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-[#EFE6DD] shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EFE6DD] text-[#6E6B68] font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-4">URL Slug</th>
                <th className="py-4 px-4">Description</th>
                <th className="py-4 px-4">Recipes</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6DD]">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                  <td className="py-4 px-6 font-extrabold text-[#1F1D1B]">
                    {cat.name}
                  </td>
                  <td className="py-4 px-4 font-mono text-[#6E6B68]">
                    /{cat.slug}
                  </td>
                  <td className="py-4 px-4 text-[#524F4C] max-w-xs truncate">
                    {cat.description}
                  </td>
                  <td className="py-4 px-4 font-bold text-[#1F1D1B]">
                    {cat.recipeCount} recipes
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(cat)}
                        className="p-2 rounded-xl text-[#6E6B68] hover:text-[#1F1D1B] hover:bg-[#FAF8F5]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingId(cat.id)}
                        className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50"
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
      )}

      {/* Create / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-[#EFE6DD] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#EFE6DD] pb-4">
              <h3 className="text-xl font-extrabold text-[#1F1D1B]">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#6E6B68] hover:text-[#1F1D1B] rounded-xl hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                    if (!editingCategory) {
                      setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                    }
                  }}
                  placeholder="e.g. Soups & Swallows"
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-semibold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="e.g. nigerian-soups"
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-mono text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief description for category Hub page..."
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Category Icon
                </label>
                <select
                  value={formIcon}
                  onChange={(e) => setFormIcon(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                >
                  <option value="Soup">Soup (Traditional Soups)</option>
                  <option value="Utensils">Utensils (Rice & Stews)</option>
                  <option value="Flame">Flame (Grills & Suya)</option>
                  <option value="Cookie">Cookie (Bakery & Snacks)</option>
                  <option value="Globe">Globe (International Cuisines)</option>
                  <option value="Layers">Layers (General)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-[#FAF8F5] border border-[#EFE6DD] text-[#1F1D1B] text-xs font-bold py-3.5 rounded-2xl hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#E8734A] text-white text-xs font-bold py-3.5 rounded-2xl hover:bg-[#D66239] shadow-xs cursor-pointer"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-[#EFE6DD] shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#1F1D1B]">Delete Category?</h3>
              <p className="text-xs text-[#6E6B68] pt-1">
                Are you sure you want to remove this category? Recipes under this category will be unassigned.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 bg-[#FAF8F5] border border-[#EFE6DD] text-[#1F1D1B] text-xs font-bold py-3 rounded-2xl"
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
