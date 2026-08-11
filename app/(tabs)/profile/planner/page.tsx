import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, Plus, ShoppingBag } from "lucide-react";

export default function MealPlannerPage() {
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="p-2 rounded-xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F1D1B]">Meal Planner</h1>
            <p className="text-[#6E6B68] text-sm">Plan your weekly menu</p>
          </div>
        </div>
        <Link
          href="/profile/shopping-list"
          className="bg-[#E8734A] text-white px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-[#D66239] transition-all flex items-center gap-2 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Shopping List</span>
        </Link>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {DAYS.map((day, idx) => (
          <div
            key={day}
            className="bg-white rounded-2xl p-4 border border-[#EFE6DD] flex flex-col justify-between space-y-4 min-h-[140px] shadow-sm"
          >
            <span className="font-extrabold text-[#1F1D1B] text-sm border-b border-[#EFE6DD] pb-1">
              {day}
            </span>
            <button className="flex items-center justify-center gap-1 border-2 border-dashed border-[#EFE6DD] text-[#6E6B68] rounded-xl py-3 text-xs font-semibold hover:border-[#E8734A] hover:text-[#E8734A] transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Meal</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
