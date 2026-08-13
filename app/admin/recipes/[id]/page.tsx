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

  const [ingredients, setIngredients] = useState<Array<{ name: string; amount: string }>>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  useEffect(() => {
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
  }, [id]);

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
    <div className="space-y-6 sm:space-y-8 w-full max-w-4xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#EFE6DD] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/recipes"
            className="p-2.5 rounded-full bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
              Admin Recipe Editor
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F1D1B] tracking-tight">
              Edit Recipe: {title || "Recipe"}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          form="recipe-edit-form"
          className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-extrabold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Recipe saved successfully! Redirecting back to catalog...</span>
        </div>
      )}

      {/* Main Edit Form */}
      <form id="recipe-edit-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Recipe Overview */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#1F1D1B] uppercase tracking-wider border-b border-[#EFE6DD] pb-3 flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-[#E8734A]" />
            <span>General Information</span>
          </h3>

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
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
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
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
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
                  className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
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
                  className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
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
                  className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
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
                  className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
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
                  className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-bold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-3 text-xs font-mono text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Atomic Ingredients Checklist */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-3">
            <h3 className="text-sm font-extrabold text-[#1F1D1B] uppercase tracking-wider">
              Atomic Ingredients ({ingredients.length})
            </h3>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="text-xs font-bold text-[#E8734A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Ingredient</span>
            </button>
          </div>

          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Ingredient name (e.g. Ground Egusi)"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(idx, "name", e.target.value)}
                  className="flex-2 bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
                <input
                  type="text"
                  placeholder="Amount (e.g. 2 cups)"
                  value={ing.amount}
                  onChange={(e) => handleIngredientChange(idx, "amount", e.target.value)}
                  className="flex-1 bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Step-by-Step Directions */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-3">
            <h3 className="text-sm font-extrabold text-[#1F1D1B] uppercase tracking-wider">
              Step-by-Step Directions ({instructions.length})
            </h3>
            <button
              type="button"
              onClick={handleAddInstruction}
              className="text-xs font-bold text-[#E8734A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="space-y-3">
            {instructions.map((step, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="w-7 h-7 rounded-full bg-[#FDF6EF] border border-[#EFE6DD] text-[#E8734A] font-extrabold text-xs flex items-center justify-center shrink-0 mt-2">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={step}
                  onChange={(e) => handleInstructionChange(idx, e.target.value)}
                  placeholder="Step title (X mins): Detailed instruction text..."
                  className="flex-1 bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl px-4 py-2.5 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(idx)}
                  className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors mt-1"
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
