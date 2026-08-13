"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  Search,
  Filter,
  X,
  User,
} from "lucide-react";

interface PendingRecipeItem {
  id: string;
  title: string;
  author: string;
  category: string;
  submittedAt: string;
  ingredientsCount: number;
  image: string;
}

interface ReportedItem {
  id: string;
  recipeTitle: string;
  recipeId: string;
  reportsCount: number;
  reporter: string;
  reason: string;
  reportedAt: string;
  status: "open" | "dismissed" | "removed";
}

const INITIAL_PENDING_RECIPES: PendingRecipeItem[] = [
  {
    id: "mod-1",
    title: "Spicy Beef Suya Roll Wrap",
    author: "@chef_chidi",
    category: "Nigerian Grills & Small Chops",
    submittedAt: "15 mins ago",
    ingredientsCount: 6,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mod-2",
    title: "Crispy Fried Yam & Spicy Pepper Sauce",
    author: "@foodie_amaka",
    category: "Nigerian Bakery & Snacks",
    submittedAt: "2 hours ago",
    ingredientsCount: 4,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mod-3",
    title: "Seafood Okra Stew with Prawns",
    author: "@tasty_lagos",
    category: "Nigerian Soups",
    submittedAt: "5 hours ago",
    ingredientsCount: 8,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
  },
];

const INITIAL_REPORTS: ReportedItem[] = [
  {
    id: "rep-1",
    recipeTitle: "Smoky Nigerian Party Jollof Rice",
    recipeId: "ng-jollof",
    reportsCount: 3,
    reporter: "@john_doe",
    reason: "Incorrect preparation time listed; states 10 mins instead of 50 mins.",
    reportedAt: "1 hour ago",
    status: "open",
  },
  {
    id: "rep-2",
    recipeTitle: "Peppered Goat Meat (Asun)",
    recipeId: "ng-asun",
    reportsCount: 1,
    reporter: "@sarah_c",
    reason: "Duplicate ingredient entry for scotch bonnet peppers.",
    reportedAt: "4 hours ago",
    status: "open",
  },
];

export default function AdminModerationPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "reports">("pending");
  const [pendingRecipes, setPendingRecipes] = useState(INITIAL_PENDING_RECIPES);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [searchQuery, setSearchQuery] = useState("");

  // Reject Modal state
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprovePending = (id: string) => {
    setPendingRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleConfirmReject = () => {
    if (rejectingId) {
      setPendingRecipes((prev) => prev.filter((r) => r.id !== rejectingId));
      setRejectingId(null);
      setRejectReason("");
    }
  };

  const handleDismissReport = (id: string) => {
    setReports((prev) => prev.filter((rep) => rep.id !== id));
  };

  const handleRemoveReportedContent = (id: string) => {
    setReports((prev) => prev.filter((rep) => rep.id !== id));
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
            Content Supervision
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B] tracking-tight">
            Moderation Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B68] font-medium">
            Review user-submitted recipes and resolve community flags
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-[#EFE6DD] shadow-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === "pending"
                ? "bg-[#E8734A] text-white shadow-xs"
                : "text-[#6E6B68] hover:text-[#1F1D1B]"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Review ({pendingRecipes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === "reports"
                ? "bg-[#E8734A] text-white shadow-xs"
                : "text-[#6E6B68] hover:text-[#1F1D1B]"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Reported Content ({reports.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Pending Review */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingRecipes.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#EFE6DD] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-[#F3EAE1]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#1F1D1B]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#6E6B68] font-semibold">
                        <span className="text-[#E8734A] font-bold">{item.author}</span>
                        <span>{item.submittedAt}</span>
                      </div>
                      <h4 className="text-base font-extrabold text-[#1F1D1B] line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#6E6B68]">
                        Submitted with {item.ingredientsCount} atomic ingredients.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-[#EFE6DD] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleApprovePending(item.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRejectingId(item.id);
                        setRejectReason("");
                      }}
                      className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-[#EFE6DD] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-extrabold text-[#1F1D1B]">Desk Cleared!</h3>
              <p className="text-xs text-[#6E6B68]">No user-submitted recipes pending moderation.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Reported Content */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          {reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        <span>{rep.reportsCount} Report{rep.reportsCount === 1 ? "" : "s"}</span>
                      </span>
                      <span className="text-xs font-bold text-[#1F1D1B] truncate">
                        Recipe: {rep.recipeTitle}
                      </span>
                    </div>

                    <p className="text-xs text-[#524F4C] bg-[#FDF6EF] p-3 rounded-2xl border border-[#EFE6DD] font-medium leading-relaxed">
                      "{rep.reason}"
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#6E6B68]">
                      <span>Reporter: <strong className="text-[#1F1D1B]">{rep.reporter}</strong></span>
                      <span>•</span>
                      <span>Flagged {rep.reportedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 border-[#EFE6DD] pt-3 md:pt-0">
                    <button
                      type="button"
                      onClick={() => handleDismissReport(rep.id)}
                      className="flex-1 md:flex-none bg-[#FDF6EF] border border-[#EFE6DD] hover:bg-gray-100 text-[#1F1D1B] px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Dismiss Report
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveReportedContent(rep.id)}
                      className="flex-1 md:flex-none bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Remove Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-[#EFE6DD] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-extrabold text-[#1F1D1B]">No Open Reports</h3>
              <p className="text-xs text-[#6E6B68]">All community reports have been resolved.</p>
            </div>
          )}
        </div>
      )}

      {/* Reject Reason Input Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#EFE6DD] shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-3">
              <h3 className="text-base font-extrabold text-[#1F1D1B]">Rejection Feedback</h3>
              <button
                type="button"
                onClick={() => setRejectingId(null)}
                className="p-1 text-[#6E6B68] hover:text-[#1F1D1B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1">
                Reason for Rejection *
              </label>
              <textarea
                rows={3}
                required
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Explain why this submission was rejected (e.g. incomplete instructions, low image quality)..."
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-2xl p-3 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectingId(null)}
                className="flex-1 bg-[#FDF6EF] border border-[#EFE6DD] text-[#1F1D1B] text-xs font-bold py-3 rounded-2xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-3 rounded-2xl shadow-xs"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
