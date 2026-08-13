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
} from "lucide-react";

export default function AdminOverviewPage() {
  const stats = [
    {
      title: "Total Recipes",
      value: "16",
      change: "+3 this week",
      changeType: "positive",
      icon: UtensilsCrossed,
      color: "bg-orange-50 text-[#E8734A] border-orange-200",
      href: "/admin/recipes",
    },
    {
      title: "Total Users",
      value: "128",
      change: "+12 this month",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      href: "/admin/users",
    },
    {
      title: "Pending Moderation",
      value: "3",
      change: "Requires review",
      changeType: "warning",
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      href: "/admin/moderation",
    },
    {
      title: "Open User Reports",
      value: "2",
      change: "Flagged content",
      changeType: "alert",
      icon: ShieldAlert,
      color: "bg-rose-50 text-rose-600 border-rose-200",
      href: "/admin/moderation?tab=reports",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "moderation",
      title: "New User Recipe Submitted for Review",
      details: "Spicy Beef Suya Roll submitted by @chef_chidi",
      time: "10 mins ago",
      status: "pending",
      badge: "Pending Review",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: 2,
      type: "report",
      title: "Recipe Flagged by Community",
      details: "Reported for incorrect cooking time on 'Party Jollof Rice'",
      time: "45 mins ago",
      status: "flagged",
      badge: "Open Report",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      id: 3,
      type: "category",
      title: "Category Created",
      details: "'International Cuisines' category added with 3 seed recipes",
      time: "2 hours ago",
      status: "approved",
      badge: "Category Live",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: 4,
      type: "recipe",
      title: "Recipe Approved & Published",
      details: "'Classic Italian Spaghetti Carbonara' is now live on feed",
      time: "5 hours ago",
      status: "approved",
      badge: "Published",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const categoriesOverview = [
    { name: "Soups & Swallows", count: 5, status: "Active" },
    { name: "Rice & Stews", count: 3, status: "Active" },
    { name: "Grills & Suya", count: 2, status: "Active" },
    { name: "Bakery & Snacks", count: 3, status: "Active" },
    { name: "International Cuisines", count: 3, status: "Active" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* Top Welcome Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
            Admin Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B] tracking-tight">
            Executive Control Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B68] font-medium">
            Monitor system metrics, moderate user content, and manage taxonomy
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <Link
            href="/admin/categories"
            className="bg-white border border-[#EFE6DD] hover:border-[#E8734A] text-[#1F1D1B] text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <FolderKanban className="w-4 h-4 text-[#E8734A]" />
            <span>Categories</span>
          </Link>
          <Link
            href="/admin/moderation"
            className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Moderation Desk</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary Count Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-3xl p-5 border border-[#EFE6DD] shadow-xs hover:shadow-md hover:border-[#E8734A] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${stat.color} transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6E6B68] group-hover:text-[#E8734A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <div className="pt-4 space-y-1">
                <span className="text-3xl font-extrabold text-[#1F1D1B]">
                  {stat.value}
                </span>
                <h3 className="text-xs font-bold text-[#6E6B68]">
                  {stat.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-[#EFE6DD] mt-3 flex items-center justify-between text-[11px] font-semibold">
                <span className="text-[#6E6B68]">{stat.change}</span>
                <span className="text-[#E8734A] font-bold">Manage →</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Activity Feed & Categories Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Left Column: Recent Activity Feed */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-xs space-y-5 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#EFE6DD] pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#1F1D1B]">
                Recent Platform Activity
              </h2>
              <p className="text-xs text-[#6E6B68]">
                Real-time log of moderation requests, reports, and recipe additions
              </p>
            </div>
            <Link
              href="/admin/moderation"
              className="text-xs font-bold text-[#E8734A] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#FDF6EF] border border-[#EFE6DD] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all hover:border-[#E8734A]"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-medium text-[#6E6B68]">
                      {item.time}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#1F1D1B] truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#6E6B68] font-medium truncate">
                    {item.details}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                  <Link
                    href="/admin/moderation"
                    className="flex-1 sm:flex-none text-center bg-white border border-[#EFE6DD] hover:border-[#E8734A] text-[#1F1D1B] text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                  >
                    Action
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Taxonomy Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE6DD] shadow-xs space-y-5 lg:col-span-1">
          <div className="flex items-center justify-between border-b border-[#EFE6DD] pb-4">
            <div>
              <h2 className="text-base font-extrabold text-[#1F1D1B]">
                Taxonomy & Categories
              </h2>
              <p className="text-xs text-[#6E6B68]">
                Active recipe category distribution
              </p>
            </div>
            <Link
              href="/admin/categories"
              className="text-xs font-bold text-[#E8734A] hover:underline"
            >
              Edit
            </Link>
          </div>

          <div className="space-y-3">
            {categoriesOverview.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FDF6EF] border border-[#EFE6DD]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#EFE6DD] text-[#E8734A] flex items-center justify-center font-bold text-xs">
                    {cat.count}
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#1F1D1B] block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-[#6E6B68] font-medium">
                      {cat.count} recipe{cat.count === 1 ? "" : "s"} indexed
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {cat.status}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/admin/categories"
            className="w-full bg-[#1F1D1B] hover:bg-[#33302C] text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#E8734A]" />
            <span>Manage All Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
