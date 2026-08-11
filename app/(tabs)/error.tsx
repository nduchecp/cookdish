"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Search } from "lucide-react";

export default function TabErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Tab Error caught:", error);
  }, [error]);

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#EFE6DD] shadow-sm text-center space-y-5 max-w-lg mx-auto my-8">
      <div className="w-14 h-14 rounded-full bg-[#E8734A]/10 text-[#E8734A] flex items-center justify-center mx-auto border border-[#E8734A]/20">
        <AlertCircle className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-[#1F1D1B]">Failed to load content</h2>
        <p className="text-xs text-[#6E6B68]">
          We couldn't retrieve the recipe feed. Please check your internet connection or try again.
        </p>
      </div>
      <div className="flex gap-3 justify-center pt-2">
        <button
          onClick={() => reset()}
          className="bg-[#E8734A] hover:bg-[#D66239] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Reload Feed</span>
        </button>
        <Link
          href="/search"
          className="bg-[#FDF6EF] border border-[#EFE6DD] hover:border-[#E8734A] text-[#1F1D1B] px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5 text-[#E8734A]" />
          <span>Search Recipes</span>
        </Link>
      </div>
    </div>
  );
}
