import Link from "next/link";
import { ArrowLeft, ShieldCheck, ChefHat, LayoutDashboard, Utensils, Users, Database, Sparkles } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#141312] text-white flex flex-col font-sans antialiased">
      {/* Top Super Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#1F1D1B]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10 active:scale-95 flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 text-[#E8734A]" />
            <span className="hidden sm:inline">Back to App</span>
          </Link>
          <div className="h-5 w-px bg-white/15 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E8734A] text-white flex items-center justify-center font-extrabold shadow-sm text-sm">
              👑
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
                CookDish Super Admin
                <span className="text-[10px] font-extrabold uppercase bg-[#E8734A] text-white px-2 py-0.5 rounded-full shadow-xs">
                  Super Admin
                </span>
              </span>
              <span className="text-[11px] text-white/60 block -mt-0.5">Control Center & System Moderation</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Super Admin Mode</span>
          </span>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {children}
      </main>
    </div>
  );
}
