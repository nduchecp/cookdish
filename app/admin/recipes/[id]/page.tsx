"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  ChefHat,
  Clock,
  Flame,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sparkles,
} from "lucide-react";
import { NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";

export default function AdminEditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const isNew = id === "new";

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Nigerian Soups");
  const [area, setArea] = useState("Nigerian");
  const [prepTime, setPrepTime] = useState(20);
  const [cookTime, setCookTime] = useState(40);
  const [difficulty, setDifficulty] = useState("Medium");
  const [servings, setServings] = useState(4);
  const [imageUrl, setImageUrl] = useState("");

  const [ingredients, setIngredients] = useState<Array<{ name: string; amount: string }>>([
    { name: "", amount: "" },
  ]);
  const [instructions, setInstructions] = useState<string[]>([""]);

  useEffect(() => {
    if (isNew) {
      setTitle("");
      setDescription("");
      setCategory("Nigerian Soups");
      setArea("Nigerian");
      setPrepTime(20);
      setCookTime(30);
      setDifficulty("Medium");
      setServings(4);
      setImageUrl("");
      setIngredients([{ name: "", amount: "" }]);
      setInstructions([""]);
      return;
    }

    const existing = NIGERIAN_LOCAL_DISHES.find((r) => r.id === id) || NIGERIAN_LOCAL_DISHES[0];
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description || "");
      setCategory(existing.category || "Nigerian Soups");
      setArea(existing.area || "Nigerian");
      setPrepTime(existing.prepTimeMinutes || 20);
      setCookTime(existing.cookTimeMinutes || 40);
      setDifficulty(existing.difficulty || "Medium");
      setServings(existing.servings || 4);
      setImageUrl(existing.image || "");
      setIngredients(existing.ingredients || []);
      setInstructions(existing.instructions || []);
    }
  }, [id, isNew]);

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { name: "", amount: "" }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: "name" | "amount", value: string) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAddInstruction = () => {
    setInstructions((prev) => [...prev, ""]);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    setInstructions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      router.push("/admin/recipes");
    }, 1500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-4xl mx-auto pb-16">
      {/* Floating Sticky Action Header */}
      <div className="bg-white/90 backdrop-blur-md sticky top-16 z-20 p-4 sm:px-6 rounded-3xl border border-[#EFE6DD] shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/recipes"
            className="p-2.5 rounded-full bg-[#FAF8F5] border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0">
            <span className="text-[#E8734A] text-[10px] font-extrabold tracking-widest uppercase block">
              {isNew ? "Create Recipe" : "Recipe Editor"}
            </span>
            <h1 className="text-base sm:text-lg font-extrabold text-[#1F1D1B] truncate">
              {isNew ? (title || "New Catalog Recipe") : (title || "Edit Recipe")}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isNew && (
            <Link
              href={`/recipe/user/${id}`}
              target="_blank"
              className="hidden sm:inline-flex bg-[#FAF8F5] border border-[#EFE6DD] hover:border-[#E8734A] text-[#1F1D1B] text-xs font-bold px-4 py-2.5 rounded-xl transition-all items-center gap-1.5 shadow-2xs"
            >
              <Eye className="w-4 h-4 text-[#E8734A]" />
              <span>Preview</span>
            </Link>
          )}
          <button
            type="submit"
            form="recipe-edit-form"
            className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{isNew ? "Publish Recipe" : "Save Recipe"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2.5 animate-in fade-in duration-200 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            {isNew
              ? "New recipe created and published successfully! Returning to catalog..."
              : "Recipe modifications saved successfully! Returning to catalog..."}
          </span>
        </div>
      )}

      {/* Main Edit Form */}
      <form id="recipe-edit-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: General Identity & Meta */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6DD] shadow-xs space-y-6">
          <div className="border-b border-[#EFE6DD] pb-4">
            <h3 className="text-base font-extrabold text-[#1F1D1B] uppercase tracking-wider flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-[#E8734A]" />
              <span>Recipe Identity & Metadata</span>
            </h3>
            <p className="text-xs text-[#6E6B68] pt-0.5">
              Core details displayed on recipe hero cards and search filters
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Authentic Nigerian Egusi Soup"
                className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of dish origin, key flavors, and serving suggestion..."
                className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                >
                  <option value="Nigerian Soups">Nigerian Soups</option>
                  <option value="Nigerian Rice & Stews">Nigerian Rice & Stews</option>
                  <option value="Nigerian Grills & Small Chops">Nigerian Grills & Small Chops</option>
                  <option value="Nigerian Bakery & Snacks">Nigerian Bakery & Snacks</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Cuisine Region
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Nigerian, Italian, Mexican"
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Prep Time (Mins)
                </label>
                <input
                  type="number"
                  min={1}
                  value={prepTime}
                  onChange={(e) => setPrepTime(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Cook Time (Mins)
                </label>
                <input
                  type="number"
                  min={1}
                  value={cookTime}
                  onChange={(e) => setCookTime(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Servings Yield
                </label>
                <input
                  type="number"
                  min={1}
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-mono text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Atomic Ingredients Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6DD] shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#1F1D1B] uppercase tracking-wider">
                Atomic Ingredients ({ingredients.length})
              </h3>
              <p className="text-xs text-[#6E6B68]">
                Must be single atomic rows with 1 ingredient per line
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-[#FAF8F5] border border-[#EFE6DD] hover:border-[#E8734A] text-[#1F1D1B] text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Plus className="w-4 h-4 text-[#E8734A]" />
              <span>Add Ingredient</span>
            </button>
          </div>

          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2.5 items-center">
                <input
                  type="text"
                  placeholder="Ingredient name (e.g. Ground Egusi)"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(idx, "name", e.target.value)}
                  className="flex-2 bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
                <input
                  type="text"
                  placeholder="Amount (e.g. 2 cups)"
                  value={ing.amount}
                  onChange={(e) => handleIngredientChange(idx, "amount", e.target.value)}
                  className="flex-1 bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                  title="Remove Ingredient"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Step-by-Step Directions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6DD] shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#1F1D1B] uppercase tracking-wider">
                Step-by-Step Directions ({instructions.length})
              </h3>
              <p className="text-xs text-[#6E6B68]">
                Format step titles with durations (e.g. 'Step Title (25 mins): Body text...')
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddInstruction}
              className="bg-[#FAF8F5] border border-[#EFE6DD] hover:border-[#E8734A] text-[#1F1D1B] text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Plus className="w-4 h-4 text-[#E8734A]" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="space-y-4">
            {instructions.map((step, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 rounded-2xl bg-[#FAF8F5] border border-[#EFE6DD]">
                <span className="w-7 h-7 rounded-full bg-white border border-[#EFE6DD] text-[#E8734A] font-extrabold text-xs flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={step}
                  onChange={(e) => handleInstructionChange(idx, e.target.value)}
                  placeholder="Step title (X mins): Detailed instruction text..."
                  className="flex-1 bg-white border border-[#EFE6DD] rounded-xl px-4 py-2.5 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(idx)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors mt-1 shrink-0 cursor-pointer"
                  title="Remove Step"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
