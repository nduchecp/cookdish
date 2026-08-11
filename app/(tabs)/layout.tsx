"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bookmark,
  User,
  PlusCircle,
  UtensilsCrossed,
  Grid,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import TypewriterTagline from "@/components/TypewriterTagline";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Categories", href: "/categories", icon: Grid },
  { name: "Search", href: "/search", icon: Search },
  { name: "Saved", href: "/my-recipes", icon: Bookmark },
  { name: "Profile", href: "/profile", icon: User },
];

const SECONDARY_NAV = [
  { name: "Meal Planner", href: "/profile/planner", icon: Calendar },
  { name: "Shopping List", href: "/profile/shopping-list", icon: ShoppingBag },
];

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDF6EF] text-[#1F1D1B] antialiased">
      {/* Desktop Sidebar (Fixed 64w for md screens and up) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#EFE6DD] p-5 lg:p-6 justify-between fixed h-screen z-30 shadow-xs">
        <div className="space-y-6 lg:space-y-7">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-[#E8734A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#1F1D1B] tracking-tight">
                Cook<span className="text-[#E8734A]">Dish</span>
              </span>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#008751]">
                RECIPE STUDIO NG
              </span>
            </div>
          </Link>

          {/* Primary Nav Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E6B68] px-3 mb-1.5 block">
              Menu
            </span>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-semibold text-sm transition-all ${
                      isActive
                        ? "bg-[#E8734A] text-white shadow-sm"
                        : "text-[#6E6B68] hover:bg-[#FDF6EF] hover:text-[#1F1D1B]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Planning Tools */}
          <div className="space-y-1 pt-2 border-t border-[#EFE6DD]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E6B68] px-3 mb-1.5 block">
              Kitchen Tools
            </span>
            <nav className="space-y-1">
              {SECONDARY_NAV.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all ${
                      isActive
                        ? "bg-[#1F1D1B] text-white shadow-sm"
                        : "text-[#6E6B68] hover:bg-[#FDF6EF] hover:text-[#1F1D1B]"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#E8734A]" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Sidebar Actions */}
        <div className="space-y-3 pt-4 border-t border-[#EFE6DD]">
          <Link
            href="/recipe/new"
            className="flex items-center justify-center gap-2 w-full bg-[#E8734A] text-white py-3 px-4 rounded-2xl font-bold hover:bg-[#D66239] transition-all shadow-md text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Recipe</span>
          </Link>

          {/* User Profile Mini Badge */}
          <Link
            href="/profile"
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#FDF6EF] transition-all border border-transparent hover:border-[#EFE6DD]"
          >
            <div className="w-9 h-9 rounded-full bg-[#E8734A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              P
            </div>
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-bold text-[#1F1D1B] block truncate">Chef Promise</span>
              <span className="text-[10px] text-[#6E6B68] block">Pro Member</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen w-full overflow-x-hidden">
        {/* Top Header Bar (Unified max-w-6xl alignment with main content) */}
        <header className="sticky top-0 z-20 bg-[#FDF6EF]/90 backdrop-blur-md border-b border-[#EFE6DD] w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
            {/* Mobile Brand Logo */}
            <div className="flex items-center gap-3 md:hidden">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E8734A] flex items-center justify-center text-white shadow-sm">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <span className="text-lg font-extrabold text-[#1F1D1B]">
                  Cook<span className="text-[#E8734A]">Dish</span>
                </span>
              </Link>
            </div>

            {/* Typewriter Interactive Tagline (Desktop) */}
            <TypewriterTagline />

            {/* Header Right User Profile Badge */}
            <div className="flex items-center">
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-white border border-[#EFE6DD] px-3 py-1.5 rounded-full hover:border-[#E8734A] transition-all shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#E8734A] text-white flex items-center justify-center font-bold text-[10px]">
                  P
                </div>
                <span className="text-xs font-bold text-[#1F1D1B]">Chef Promise</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Body Container (Unified max-w-6xl alignment & comfortable top padding) */}
        <main className="flex-1 pb-24 md:pb-12 pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EFE6DD] py-2 px-3 z-40 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto relative">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-1 px-2.5 rounded-xl text-[11px] font-semibold transition-all ${
                  isActive ? "text-[#E8734A] scale-105" : "text-[#6E6B68]"
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
