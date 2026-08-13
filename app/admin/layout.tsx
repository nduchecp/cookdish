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
  HelpCircle,
  Menu,
  X,
  Plus,
} from "lucide-react";

// TODO: gate this route once auth/roles exist (e.g. check profiles.role !== 'admin' redirect)

const ADMIN_NAV_ITEMS = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
    shortcut: "⌘1",
  },
  {
    name: "Recipe Catalog",
    href: "/admin/recipes",
    icon: UtensilsCrossed,
    badge: "16",
    badgeColor: "bg-[#E8734A]/20 text-[#E8734A] border border-[#E8734A]/30",
    shortcut: "⌘2",
  },
  {
    name: "Moderation Desk",
    href: "/admin/moderation",
    icon: ShieldAlert,
    badge: "5",
    badgeColor: "bg-rose-500 text-white animate-pulse shadow-xs",
    shortcut: "⌘3",
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderKanban,
    badge: "5",
    badgeColor: "bg-white/10 text-white/80 border border-white/10",
    shortcut: "⌘4",
  },
  {
    name: "User Directory",
    href: "/admin/users",
    icon: Users,
    badge: "128",
    badgeColor: "bg-white/10 text-white/80 border border-white/10",
    shortcut: "⌘5",
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
  const [searchOpen, setSearchOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1D1B] flex flex-col md:flex-row w-full font-sans antialiased selection:bg-[#E8734A] selection:text-white">
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden bg-[#0F172A] text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E8734A] to-[#F59E0B] flex items-center justify-center text-white font-extrabold text-base shadow-sm">
            🍳
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm tracking-tight text-white">CookDish</span>
            <span className="bg-[#E8734A] text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md">
              Admin
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold flex items-center gap-1 border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>App</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin Executive Dark Sidebar */}
      <aside
        className={`bg-[#0F172A] text-white transition-all duration-300 flex flex-col justify-between z-30 shrink-0 border-r border-slate-800/80 ${
          collapsed ? "w-full md:w-20" : "w-full md:w-64"
        } ${mobileMenuOpen ? "block" : "hidden md:flex"}`}
      >
        <div>
          {/* Sidebar Top Brand Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between">
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
                  <span className="text-[10px] text-slate-400 font-medium block truncate pt-0.5">
                    Executive Control Center
                  </span>
                </div>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
              title={collapsed ? "Expand Sidebar (⌘B)" : "Collapse Sidebar (⌘B)"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Rails */}
          <div className="p-3 space-y-6">
            <div>
              {!collapsed && (
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-2">
                  Main Navigation
                </span>
              )}
              <nav className="space-y-1">
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
                      className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                        isActive
                          ? "bg-gradient-to-r from-[#E8734A] to-[#F28E6B] text-white shadow-md shadow-[#E8734A]/20"
                          : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
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

                      {!collapsed && (
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                item.badgeColor || (isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-300 border border-slate-700")
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          {/* View Live Consumer App Button */}
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <ExternalLink className="w-4 h-4 shrink-0 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              {!collapsed && <span className="truncate">View Consumer App</span>}
            </div>
            {!collapsed && (
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                Live
              </span>
            )}
          </Link>

          {/* Admin Profile User Card */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-xl bg-[#E8734A] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  CP
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0F172A]" />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <span className="font-bold text-xs text-white block truncate">
                    Chef Promise
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate font-medium">
                    Super Admin
                  </span>
                </div>
              )}
            </div>

            {!collapsed && (
              <Link
                href="/auth/login"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
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
        {/* Enterprise Top Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-[#EFE6DD] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-full bg-[#FAF8F5] border border-[#EFE6DD] hover:border-[#E8734A]/50 rounded-xl pl-3.5 pr-3 py-2 text-xs font-medium text-[#6E6B68] flex items-center justify-between transition-all group shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Search className="w-4 h-4 text-[#6E6B68] group-hover:text-[#E8734A] transition-colors" />
                <span className="truncate">Search recipes, users, categories...</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-white border border-[#EFE6DD] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#6E6B68] font-bold">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </button>
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
              className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
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
