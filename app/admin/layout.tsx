"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShieldAlert,
  FolderKanban,
  Users,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Sparkles,
  ChefHat,
} from "lucide-react";

// TODO: gate this route once auth/roles exist (e.g. check profiles.role !== 'admin' redirect)

const ADMIN_NAV_ITEMS = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Recipe Catalog",
    href: "/admin/recipes",
    icon: UtensilsCrossed,
    badge: "16",
  },
  {
    name: "Moderation Desk",
    href: "/admin/moderation",
    icon: ShieldAlert,
    badge: "5",
    badgeColor: "bg-rose-500 text-white",
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderKanban,
    badge: "5",
  },
  {
    name: "User Directory",
    href: "/admin/users",
    icon: Users,
    badge: "128",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#1F1D1B] flex flex-col md:flex-row w-full font-sans antialiased">
      {/* Admin Executive Sidebar */}
      <aside
        className={`bg-[#1F1D1B] text-white transition-all duration-300 flex flex-col justify-between z-30 shrink-0 ${
          collapsed ? "w-full md:w-20" : "w-full md:w-64"
        }`}
      >
        <div>
          {/* Sidebar Top Brand Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E8734A] to-[#F59E0B] flex items-center justify-center text-white shadow-md shrink-0 font-extrabold text-xl">
                🍳
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-white">
                      CookDish
                    </span>
                    <span className="bg-[#E8734A] text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md tracking-wider">
                      Admin
                    </span>
                  </div>
                  <span className="text-[10px] text-white/60 font-semibold block truncate">
                    Control Center
                  </span>
                </div>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Nav Items Rail */}
          <nav className="p-3 space-y-1.5">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all group ${
                    isActive
                      ? "bg-[#E8734A] text-white shadow-md"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        isActive ? "text-white" : "text-[#E8734A] group-hover:scale-110"
                      } transition-transform`}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        item.badgeColor || (isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/80")
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {/* Switch to Consumer App */}
          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group"
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            {!collapsed && <span className="truncate">View Live App</span>}
          </Link>

          {/* Admin Profile Chip */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#E8734A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                CP
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <span className="font-bold text-xs text-white block truncate">
                    Chef Promise
                  </span>
                  <span className="text-[10px] text-white/50 block truncate">
                    Super Admin
                  </span>
                </div>
              )}
            </div>

            {!collapsed && (
              <Link
                href="/auth/login"
                className="p-1.5 text-white/50 hover:text-rose-400 transition-colors"
                title="Exit Admin"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-[#EFE6DD] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
              <input
                type="search"
                placeholder="Search recipes, users, categories..."
                className="w-full bg-[#FDF6EF] border border-[#EFE6DD] rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-[#1F1D1B] placeholder-[#6E6B68] focus:outline-none focus:border-[#E8734A] focus:ring-1 focus:ring-[#E8734A]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick System Badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Normal</span>
            </span>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2.5 rounded-xl bg-[#FDF6EF] border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors"
              title="5 Pending Moderation Items"
            >
              <Bell className="w-4 h-4 text-[#6E6B68]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            <Link
              href="/admin/recipes/new"
              className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <ChefHat className="w-4 h-4" />
              <span className="hidden sm:inline">New Recipe</span>
            </Link>
          </div>
        </header>

        {/* Page View Body */}
        <main className="p-4 sm:p-8 flex-1 w-full max-w-7xl mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
