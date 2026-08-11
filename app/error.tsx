"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Search, ArrowLeft } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FDF6EF] text-[#1F1D1B] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EFE6DD] shadow-xl text-center space-y-6">
        {/* Animated Warning Icon Badge */}
        <div className="w-20 h-20 rounded-full bg-[#E8734A]/10 text-[#E8734A] flex items-center justify-center mx-auto border border-[#E8734A]/20 animate-pulse">
          <AlertTriangle className="w-10 h-10" />
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8734A]">
            Kitchen Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Oops! Something went wrong in the kitchen
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B68] leading-relaxed">
            We encountered an unexpected issue while loading recipe data. Don't worry, your saved recipes and meal plans are completely safe.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 bg-[#E8734A] hover:bg-[#D66239] text-white py-3.5 px-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 bg-[#1F1D1B] hover:bg-[#33302C] text-white py-3.5 px-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md text-sm"
          >
            <Home className="w-4 h-4 text-[#E8734A]" />
            <span>Back Home</span>
          </Link>
        </div>

        {/* Footer Support Link */}
        <div className="pt-4 border-t border-[#EFE6DD]">
          <Link
            href="/search"
            className="text-xs text-[#6E6B68] hover:text-[#E8734A] font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search all recipes instead</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
