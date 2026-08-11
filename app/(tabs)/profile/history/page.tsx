import Link from "next/link";
import { ArrowLeft, History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="p-2 rounded-xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F1D1B]">Cooking History</h1>
          <p className="text-[#6E6B68] text-sm">Log of meals you've completed in Cooking Mode</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-[#EFE6DD] text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#FDF6EF] text-[#E8734A] flex items-center justify-center mx-auto">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#1F1D1B]">No Completed Meals Yet</h3>
        <p className="text-sm text-[#6E6B68] max-w-sm mx-auto">
          Start cooking a recipe in Cooking Mode to automatically log it in your history.
        </p>
      </div>
    </div>
  );
}
