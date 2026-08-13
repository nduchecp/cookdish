"use client";

import Link from "next/link";
import {
  UtensilsCrossed,
  Users,
  ShieldAlert,
  FolderKanban,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Eye,
  FileText,
  Sparkles,
  ChevronRight,
  Activity,
  Zap,
  Filter,
  BarChart3,
  Server,
  Layers,
  ChevronRightIcon,
  Home,
} from "lucide-react";

export default function AdminOverviewPage() {
  const stats = [
    {
      title: "Total Catalog Recipes",
      value: "16",
      change: "+18.7%",
      changePeriod: "vs last month",
      changeType: "positive",
      icon: UtensilsCrossed,
      color: "bg-orange-50 text-[#E8734A] border-orange-200/80",
      accent: "bg-[#E8734A]",
      href: "/admin/recipes",
    },
    {
      title: "Active Registered Users",
      value: "128",
      change: "+24.2%",
      changePeriod: "vs last month",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-50 text-blue-600 border-blue-200/80",
      accent: "bg-blue-600",
      href: "/admin/users",
    },
    {
      title: "Pending Moderation",
      value: "3",
      change: "Requires Action",
      changePeriod: "submitted today",
      changeType: "warning",
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-200/80",
      accent: "bg-amber-500",
      href: "/admin/moderation",
    },
    {
      title: "Open Community Reports",
      value: "2",
      change: "High Priority",
      changePeriod: "flagged content",
      changeType: "alert",
      icon: ShieldAlert,
      color: "bg-rose-50 text-rose-600 border-rose-200/80",
      accent: "bg-rose-500",
      href: "/admin/moderation?tab=reports",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "moderation",
      title: "New User Recipe Submitted for Review",
      details: "Spicy Beef Suya Roll Wrap submitted by @chef_chidi",
      time: "10 mins ago",
      author: "@chef_chidi",
      avatar: "👨‍🍳",
      badge: "Pending Review",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: 2,
      type: "report",
      title: "Community Report Flagged",
      details: "Reported for incorrect cook duration on 'Party Jollof Rice'",
      time: "45 mins ago",
      author: "@john_doe",
      avatar: "👤",
      badge: "Open Flag",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      id: 3,
      type: "category",
      title: "Category Taxonomy Updated",
      details: "'International Cuisines' category published with 3 seed recipes",
      time: "2 hours ago",
      author: "System Admin",
      avatar: "⚙️",
      badge: "Taxonomy Live",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: 4,
      type: "recipe",
      title: "Recipe Approved & Verified",
      details: "'Classic Italian Spaghetti Carbonara' published to main feed",
      time: "5 hours ago",
      author: "@chef_promise",
      avatar: "🍳",
      badge: "Published",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const categoriesOverview = [
    { name: "Soups & Swallows", count: 5, total: 16, percentage: 31, color: "bg-[#E8734A]" },
    { name: "Rice & Stews", count: 3, total: 16, percentage: 19, color: "bg-amber-500" },
    { name: "Grills & Suya", count: 2, total: 16, percentage: 13, color: "bg-rose-500" },
    { name: "Bakery & Snacks", count: 3, total: 16, percentage: 19, color: "bg-purple-500" },
    { name: "International Cuisines", count: 3, total: 16, percentage: 19, color: "bg-blue-500" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* UX Breadcrumb Trail */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#6E6B68]">
        <Link href="/admin" className="flex items-center gap-1 hover:text-[#E8734A] transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Admin</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#6E6B68]/60" />
        <span className="text-[#1F1D1B] font-extrabold">Executive Overview</span>
      </nav>

      {/* Top Welcome Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#1F1D1B] via-[#2D2A26] to-[#1F1D1B] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-md">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#E8734A] text-white px-3 py-1 rounded-full shadow-xs">
              Executive Dashboard
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Control
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Chef Promise 👨‍🍳
          </h1>
          <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
            Monitor real-time recipe metrics, manage category taxonomy, and review pending moderation items.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0 w-full sm:w-auto">
          <Link
            href="/admin/categories"
            className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-extrabold px-4 py-3 rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95"
          >
            <FolderKanban className="w-4 h-4 text-[#E8734A]" />
            <span>Categories</span>
          </Link>
          <Link
            href="/admin/moderation"
            className="flex-1 sm:flex-none bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-extrabold px-5 py-3 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Moderation Desk</span>
          </Link>
        </div>
      </div>

      {/* 4 Enterprise Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-xs hover:shadow-md hover:border-[#E8734A] hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${stat.color} transition-transform group-hover:scale-105 shadow-2xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#6E6B68] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EFE6DD] group-hover:border-[#E8734A]/40 transition-colors">
                    <span>Manage</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E8734A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div className="pt-5 space-y-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1B] tracking-tight block">
                    {stat.value}
                  </span>
                  <h3 className="text-xs font-extrabold text-[#6E6B68] uppercase tracking-wider">
                    {stat.title}
                  </h3>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE6DD] mt-4 flex items-center justify-between text-xs">
                <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {stat.change}
                </span>
                <span className="text-[11px] text-[#6E6B68] font-medium">
                  {stat.changePeriod}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid: Activity Stream & Category Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Left Column: Live Activity Feed */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6DD] shadow-xs space-y-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#EFE6DD] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#E8734A]" />
                <h2 className="text-lg font-extrabold text-[#1F1D1B]">
                  Platform Activity Audit Log
                </h2>
              </div>
              <p className="text-xs text-[#6E6B68] font-medium pt-0.5">
                Real-time stream of recipe submissions, flags, and taxonomy edits
              </p>
            </div>

            <Link
              href="/admin/moderation"
              className="text-xs font-extrabold text-[#E8734A] hover:underline flex items-center gap-1"
            >
              <span>Moderation Desk</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE6DD] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-[#E8734A] hover:bg-white hover:shadow-xs group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-[#EFE6DD] flex items-center justify-center text-lg shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {item.avatar}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-[11px] font-bold text-[#6E6B68]">
                        {item.time}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#1F1D1B] truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#6E6B68] font-medium line-clamp-1">
                      {item.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EFE6DD]">
                  <Link
                    href="/admin/moderation"
                    className="w-full sm:w-auto text-center bg-white border border-[#EFE6DD] hover:border-[#E8734A] hover:bg-[#E8734A] hover:text-white text-[#1F1D1B] text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-2xs"
                  >
                    Take Action
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Taxonomy Breakdown & Server Status */}
        <div className="space-y-6 lg:col-span-1">
          {/* Category Distribution */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE6DD] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#EFE6DD] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#1F1D1B] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#E8734A]" />
                  <span>Category Taxonomy</span>
                </h3>
                <p className="text-xs text-[#6E6B68]">
                  Density breakdown by category
                </p>
              </div>
              <Link
                href="/admin/categories"
                className="text-xs font-extrabold text-[#E8734A] hover:underline"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-4">
              {categoriesOverview.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#1F1D1B]">
                    <span className="truncate max-w-[180px]">{cat.name}</span>
                    <span className="text-[#6E6B68] text-[11px] font-mono">{cat.count} recipes ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#FAF8F5] border border-[#EFE6DD] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/admin/categories"
              className="w-full bg-[#1F1D1B] hover:bg-[#33302C] text-white py-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E8734A]" />
              <span>Create / Edit Category</span>
            </Link>
          </div>

          {/* Quick Infrastructure Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-[#1F1D1B] uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-600" />
              <span>System Health</span>
            </h4>
            <div className="space-y-2 text-xs font-semibold text-[#6E6B68]">
              <div className="flex justify-between items-center bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EFE6DD]">
                <span>API Status</span>
                <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">Operational</span>
              </div>
              <div className="flex justify-between items-center bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EFE6DD]">
                <span>Search Aggregator</span>
                <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">3 Providers Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
