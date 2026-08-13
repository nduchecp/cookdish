"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  Command,
  Menu,
  X,
  Plus,
} from "lucide-react";
import CookDishLogo from "@/components/CookDishLogo";

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
    badgeColor: "bg-[#E8734A]/10 text-[#E8734A] border border-[#E8734A]/20",
  },
  {
    name: "Moderation Desk",
    href: "/admin/moderation",
    icon: ShieldAlert,
    badge: "5",
    badgeColor: "bg-rose-500 text-white font-extrabold shadow-xs",
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderKanban,
    badge: "5",
    badgeColor: "bg-[#FAF8F5] text-[#6E6B68] border border-[#EFE6DD]",
  },
  {
    name: "User Directory",
    href: "/admin/users",
    icon: Users,
    badge: "128",
    badgeColor: "bg-[#FAF8F5] text-[#6E6B68] border border-[#EFE6DD]",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1D1B] flex flex-col md:flex-row w-full font-sans antialiased selection:bg-[#E8734A] selection:text-white">
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden bg-white border-b border-[#EFE6DD] p-4 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <Link href="/admin" className="flex items-center gap-3">
          <CookDishLogo size={36} />
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-[#1F1D1B]">CookDish</span>
            <span className="bg-[#E8734A] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-2xs">
              Admin
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1 border border-emerald-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>App</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#FAF8F5] text-[#1F1D1B] hover:bg-[#FDF6EF] border border-[#EFE6DD] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin Clean Executive Sidebar */}
      <aside
        className={`bg-white text-[#1F1D1B] transition-all duration-300 flex flex-col justify-between z-30 shrink-0 border-r border-[#EFE6DD] shadow-xs ${
          collapsed ? "w-full md:w-20" : "w-full md:w-64"
        } ${mobileMenuOpen ? "block" : "hidden md:flex"}`}
      >
        <div>
          {/* Sidebar Top Brand Header with Vector Logo */}
          <div className="p-4 sm:p-5 border-b border-[#EFE6DD] flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <CookDishLogo size={40} />
              {!collapsed && (
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-[#1F1D1B]">
                      CookDish
                    </span>
                    <span className="bg-[#E8734A] text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md tracking-wider shadow-2xs">
                      Admin
                    </span>
                  </div>
                  <span className="text-[10px] text-[#6E6B68] font-semibold block truncate pt-0.5">
                    Executive Control Hub
                  </span>
                </div>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1.5 rounded-xl text-[#6E6B68] hover:text-[#1F1D1B] hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#EFE6DD]"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-3.5 space-y-6">
            <div>
              {!collapsed && (
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6E6B68] px-3 block mb-2">
                  Navigation
                </span>
              )}
              <nav className="space-y-1.5">
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
                      className={`relative flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all group ${
                        isActive
                          ? "bg-[#E8734A] text-white shadow-sm"
                          : "text-[#6E6B68] hover:bg-[#FDF6EF] hover:text-[#1F1D1B]"
                      }`}
                      title={collapsed ? item.name : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-white" : "text-[#E8734A] group-hover:scale-110"
                          } transition-transform`}
                        />
                        {!collapsed && <span className="truncate">{item.name}</span>}
                      </div>

                      {!collapsed && item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            item.badgeColor || (isActive ? "bg-white/20 text-white" : "bg-[#FAF8F5] text-[#6E6B68]")
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
          </div>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3.5 border-t border-[#EFE6DD] space-y-2.5">
          {/* Switch to Live Consumer App */}
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <ExternalLink className="w-4 h-4 shrink-0 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              {!collapsed && <span className="truncate">View Consumer App</span>}
            </div>
            {!collapsed && (
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                Live
              </span>
            )}
          </Link>

          {/* Admin Profile Chip */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE6DD]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-xl bg-[#E8734A] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                  CP
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <span className="font-extrabold text-xs text-[#1F1D1B] block truncate">
                    Chef Promise
                  </span>
                  <span className="text-[10px] text-[#6E6B68] block truncate font-medium">
                    Super Admin
                  </span>
                </div>
              )}
            </div>

            {!collapsed && (
              <Link
                href="/auth/login"
                className="p-1.5 text-[#6E6B68] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Exit Admin"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Enterprise Top Navbar with Brand Logo */}
        <header className="bg-white/90 backdrop-blur-md border-b border-[#EFE6DD] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
              <input
                type="search"
                placeholder="Search recipes, users, categories..."
                className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-[#1F1D1B] placeholder-[#6E6B68] focus:outline-none focus:border-[#E8734A] focus:ring-1 focus:ring-[#E8734A]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* System Status Pill */}
            <div className="hidden lg:inline-flex items-center gap-2 text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-full shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>DB Connected • System Normal</span>
            </div>

            {/* Notification Center Trigger */}
            <button
              type="button"
              className="relative p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] hover:bg-white transition-colors cursor-pointer"
              title="5 Items Requiring Moderation"
            >
              <Bell className="w-4 h-4 text-[#6E6B68]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            </button>

            {/* New Recipe Action Button */}
            <Link
              href="/admin/recipes/new"
              className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-extrabold px-4.5 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Recipe</span>
            </Link>
          </div>
        </header>

        {/* Active Route Screen Container */}
        <main className="p-4 sm:p-8 flex-1 w-full max-w-7xl mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
