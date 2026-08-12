"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Utensils,
  Flame,
  Activity,
  Plus,
  Search,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Sparkles,
  RefreshCcw,
  X,
  Check,
  Eye,
  Sliders,
  ChevronRight
} from "lucide-react";
import { NIGERIAN_LOCAL_DISHES } from "@/lib/api/recipes";
import { NormalizedRecipe } from "@/lib/api/themealdb";

// Registered User Details Schema (Every user is called Chef {username})
interface RegisteredUser {
  id: string;
  username: string;
  email: string;
  dateJoined: string;
  favoritesCount: number;
  mealsCookedCount: number;
  status: "Active" | "Suspended";
}

const INITIAL_REGISTERED_USERS: RegisteredUser[] = [
  {
    id: "usr-1",
    username: "Promise",
    email: "chef.promise@cookdish.app",
    dateJoined: "Feb 10, 2026",
    favoritesCount: 12,
    mealsCookedCount: 14,
    status: "Active",
  },
  {
    id: "usr-2",
    username: "Amaka",
    email: "amaka.igbo@gmail.com",
    dateJoined: "Feb 08, 2026",
    favoritesCount: 19,
    mealsCookedCount: 22,
    status: "Active",
  },
  {
    id: "usr-3",
    username: "Tunde",
    email: "tunde.yoruba@yahoo.com",
    dateJoined: "Feb 05, 2026",
    favoritesCount: 8,
    mealsCookedCount: 11,
    status: "Active",
  },
  {
    id: "usr-4",
    username: "Chidi",
    email: "chidi.cooks@outlook.com",
    dateJoined: "Jan 28, 2026",
    favoritesCount: 15,
    mealsCookedCount: 18,
    status: "Active",
  },
  {
    id: "usr-5",
    username: "Fatima",
    email: "fatima.hausa@gmail.com",
    dateJoined: "Jan 20, 2026",
    favoritesCount: 6,
    mealsCookedCount: 9,
    status: "Active",
  },
];

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "recipes" | "apis">("overview");
  const [users, setUsers] = useState<RegisteredUser[]>(INITIAL_REGISTERED_USERS);
  const [recipes, setRecipes] = useState<NormalizedRecipe[]>(NIGERIAN_LOCAL_DISHES);

  // Recipe Creator Form State
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Nigerian Soups");
  const [newArea, setNewArea] = useState("Nigerian");
  const [newImage, setNewImage] = useState("");
  const [newPrepTime, setNewPrepTime] = useState(20);
  const [newCookTime, setNewCookTime] = useState(30);
  const [newServings, setNewServings] = useState(4);
  const [newDifficulty, setNewDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [newDescription, setNewDescription] = useState("");
  const [newIngredientsText, setNewIngredientsText] = useState("");
  const [newInstructionsText, setNewInstructionsText] = useState("");

  // Search States
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("");

  // User Actions
  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Recipe Actions
  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedIngredients = newIngredientsText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const parts = line.split(":");
        return {
          name: parts[0]?.trim() || line.trim(),
          amount: parts[1]?.trim() || "As needed",
        };
      });

    const parsedInstructions = newInstructionsText
      .split("\n")
      .filter((line) => line.trim() !== "");

    const createdRecipe: NormalizedRecipe = {
      id: `custom-${Date.now()}`,
      source: "user",
      title: newTitle.trim(),
      description: newDescription.trim() || `Authentic ${newCategory} recipe.`,
      image: newImage.trim() || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      category: newCategory,
      area: newArea,
      prepTimeMinutes: Number(newPrepTime) || 20,
      cookTimeMinutes: Number(newCookTime) || 30,
      servings: Number(newServings) || 4,
      difficulty: newDifficulty,
      rating: 5.0,
      reviewsCount: 1,
      ingredients: parsedIngredients.length > 0 ? parsedIngredients : [{ name: "Ingredients listed in instructions", amount: "1 pack" }],
      instructions: parsedInstructions.length > 0 ? parsedInstructions : ["Cook over medium heat until tender.", "Serve hot."],
    };

    setRecipes((prev) => [createdRecipe, ...prev]);
    setIsAddRecipeOpen(false);

    // Reset Form
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
    setNewIngredientsText("");
    setNewInstructionsText("");
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const filteredRecipes = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(recipeSearchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(recipeSearchQuery.toLowerCase()) ||
      r.area?.toLowerCase().includes(recipeSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Super Admin Control Center Tabs Bar */}
      <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === "overview"
              ? "bg-[#E8734A] text-white border-[#E8734A] shadow-md"
              : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>System Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === "users"
              ? "bg-[#E8734A] text-white border-[#E8734A] shadow-md"
              : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Users ({users.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("recipes")}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === "recipes"
              ? "bg-[#E8734A] text-white border-[#E8734A] shadow-md"
              : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Recipe Database ({recipes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("apis")}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === "apis"
              ? "bg-[#E8734A] text-white border-[#E8734A] shadow-md"
              : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>API Health & Cache</span>
        </button>
      </div>

      {/* 1. OVERVIEW ANALYTICS VIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Key Metrics Cards (4 Grid Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-white/70">
                <span className="text-xs font-bold uppercase tracking-wider">Total Registered Users</span>
                <Users className="w-5 h-5 text-[#E8734A]" />
              </div>
              <span className="text-3xl font-extrabold text-white block">{users.length}</span>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span>↑ 100% Registered Chef Accounts</span>
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-white/70">
                <span className="text-xs font-bold uppercase tracking-wider">Managed Recipes</span>
                <Utensils className="w-5 h-5 text-[#E8734A]" />
              </div>
              <span className="text-3xl font-extrabold text-white block">{recipes.length}</span>
              <p className="text-[11px] text-white/60 font-semibold">Nigerian & Global Cuisine</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-white/70">
                <span className="text-xs font-bold uppercase tracking-wider">Meals Cooked Total</span>
                <Flame className="w-5 h-5 text-[#E8734A]" />
              </div>
              <span className="text-3xl font-extrabold text-white block">74</span>
              <p className="text-[11px] text-emerald-400 font-semibold">↑ Active Cooking Sessions</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-white/70">
                <span className="text-xs font-bold uppercase tracking-wider">API Health Status</span>
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-extrabold text-emerald-400 block flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> 100% Operational
              </span>
              <p className="text-[11px] text-white/60 font-semibold">TheMealDB, Spoonacular, Edamam</p>
            </div>
          </div>

          {/* Quick Actions & Recent Users */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions Panel */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 lg:col-span-1">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E8734A]" />
                <span>Super Admin Quick Actions</span>
              </h3>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsAddRecipeOpen(true)}
                  className="w-full flex items-center justify-between bg-[#E8734A] text-white p-4 rounded-2xl font-bold hover:bg-[#D66239] transition-all text-xs shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Plus className="w-5 h-5" />
                    <span>Create & Publish Recipe</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("users")}
                  className="w-full flex items-center justify-between bg-white/10 text-white p-4 rounded-2xl font-bold hover:bg-white/20 transition-all text-xs border border-white/10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#E8734A]" />
                    <span>Manage Registered Users</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("recipes")}
                  className="w-full flex items-center justify-between bg-white/10 text-white p-4 rounded-2xl font-bold hover:bg-white/20 transition-all text-xs border border-white/10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-[#E8734A]" />
                    <span>Browse Recipe Catalog</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Registered Users Preview Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 lg:col-span-2">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#E8734A]" />
                  <span>Recent Registered Users</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("users")}
                  className="text-xs font-bold text-[#E8734A] hover:underline"
                >
                  View All ({users.length})
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-white/80">
                  <thead className="text-[10px] font-extrabold uppercase tracking-wider text-white/50 border-b border-white/10">
                    <tr>
                      <th className="pb-3">Chef User</th>
                      <th className="pb-3">Email Address</th>
                      <th className="pb-3">Meals Cooked</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {users.slice(0, 4).map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 font-bold text-white flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-[#E8734A] text-white flex items-center justify-center text-xs font-extrabold">
                            👨‍🍳
                          </span>
                          Chef {user.username}
                        </td>
                        <td className="py-3 text-white/70">{user.email}</td>
                        <td className="py-3 font-bold text-[#E8734A]">{user.mealsCookedCount} meals</td>
                        <td className="py-3">
                          <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. REGISTERED USERS DETAILS TABLE VIEW */}
      {activeTab === "users" && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#E8734A]" />
                <span>Registered Users Directory ({users.length})</span>
              </h2>
              <p className="text-xs text-white/60">Every registered user is displayed with Chef username and cooking activity details.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search chef or email..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#E8734A]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/90">
              <thead className="text-[10px] font-extrabold uppercase tracking-wider text-white/50 border-b border-white/10 bg-white/5">
                <tr>
                  <th className="p-4">Chef Username</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Date Joined</th>
                  <th className="p-4">Favorites</th>
                  <th className="p-4">Meals Cooked</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E8734A] to-[#F59E0B] text-white flex items-center justify-center font-extrabold shadow-sm text-sm shrink-0">
                        👨‍🍳
                      </div>
                      <div>
                        <span className="block font-bold text-white">Chef {user.username}</span>
                        <span className="text-[10px] text-white/50">ID: {user.id}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/80">{user.email}</td>
                    <td className="p-4 text-white/70">{user.dateJoined}</td>
                    <td className="p-4 font-bold text-rose-400">{user.favoritesCount} saved</td>
                    <td className="p-4 font-bold text-[#E8734A]">{user.mealsCookedCount} sessions</td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(user.id)}
                        className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border cursor-pointer transition-all ${
                          user.status === "Active"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                            : "bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => deleteUser(user.id)}
                        className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-white/70 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. RECIPE DATABASE & CREATOR VIEW */}
      {activeTab === "recipes" && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#E8734A]" />
                <span>Managed Recipe Database ({recipes.length})</span>
              </h2>
              <p className="text-xs text-white/60">Create, edit, or remove dishes from the active recipe menu.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search recipe..."
                  value={recipeSearchQuery}
                  onChange={(e) => setRecipeSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsAddRecipeOpen(true)}
                className="bg-[#E8734A] text-white px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-[#D66239] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create Recipe</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 relative group backdrop-blur-sm hover:border-[#E8734A]/50 transition-all"
              >
                <div className="relative h-36 w-full rounded-xl overflow-hidden bg-black/40">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-extrabold uppercase bg-[#E8734A] text-white px-2.5 py-1 rounded-full shadow-xs">
                    {recipe.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteRecipe(recipe.id)}
                    className="absolute top-2 right-2 p-2 rounded-xl bg-black/60 text-white hover:bg-rose-600 transition-colors"
                    title="Delete recipe"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-white line-clamp-1">{recipe.title}</h3>
                  <p className="text-[11px] text-white/70 line-clamp-2 mt-0.5">{recipe.description}</p>
                </div>

                <div className="flex justify-between items-center text-[10px] font-bold text-white/60 border-t border-white/10 pt-2">
                  <span>Origin: {recipe.area || "Nigerian"}</span>
                  <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. API HEALTH & CACHE MONITOR VIEW */}
      {activeTab === "apis" && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Multi-API Integration Health Monitor</span>
              </h2>
              <p className="text-xs text-white/60">Live connectivity metrics for external recipe providers.</p>
            </div>
            <button
              type="button"
              className="bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Ping All APIs</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">TheMealDB API</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-emerald-400 font-bold">100% Operational</p>
              <span className="text-[10px] text-white/50 block">Latency: 120ms</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Spoonacular API</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-emerald-400 font-bold">100% Operational</p>
              <span className="text-[10px] text-white/50 block">Latency: 185ms</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Edamam Recipe API</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-emerald-400 font-bold">100% Operational</p>
              <span className="text-[10px] text-white/50 block">Latency: 210ms</span>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW RECIPE MODAL */}
      {isAddRecipeOpen && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F1D1B] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#E8734A]" />
                <h3 className="text-lg font-extrabold text-white">Create New Recipe</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddRecipeOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecipe} className="space-y-4 text-xs text-white/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-white block">Recipe Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Traditional Igbo Ofe Akwu"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#E8734A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-white block">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#2A2725] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#E8734A]"
                  >
                    <option value="Nigerian Soups">Nigerian Soups</option>
                    <option value="Nigerian Rice & Stews">Nigerian Rice & Stews</option>
                    <option value="Nigerian Swallows">Nigerian Swallows</option>
                    <option value="Nigerian Grills & Small Chops">Nigerian Grills & Small Chops</option>
                    <option value="Nigerian Bakery & Snacks">Nigerian Bakery & Snacks</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-white block">Cultural Heritage / Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Igbo, Yoruba, Hausa, Nigerian"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#E8734A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-white block">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#E8734A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-white block">Prep Time (mins)</label>
                  <input
                    type="number"
                    value={newPrepTime}
                    onChange={(e) => setNewPrepTime(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-white block">Cook Time (mins)</label>
                  <input
                    type="number"
                    value={newCookTime}
                    onChange={(e) => setNewCookTime(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-3 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-white block">Servings</label>
                  <input
                    type="number"
                    value={newServings}
                    onChange={(e) => setNewServings(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-3 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-white block">Description</label>
                <textarea
                  rows={2}
                  placeholder="Short description of dish..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#E8734A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-white block">Ingredients (One per line: Name : Amount)</label>
                <textarea
                  rows={4}
                  placeholder="Egusi Seeds : 2 cups&#10;Palm Oil : 1/2 cup&#10;Spinach : 3 cups"
                  value={newIngredientsText}
                  onChange={(e) => setNewIngredientsText(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#E8734A] font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-white block">Step-by-Step Instructions (One step per line)</label>
                <textarea
                  rows={4}
                  placeholder="Blend egusi seeds with warm water into paste.&#10;Heat palm oil in pot and fry egusi.&#10;Pour in beef stock and simmer."
                  value={newInstructionsText}
                  onChange={(e) => setNewInstructionsText(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#E8734A] font-mono text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddRecipeOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-[#E8734A] hover:bg-[#D66239] text-white font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Publish Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
