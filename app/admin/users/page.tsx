"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Shield,
  ShieldAlert,
  Ban,
  UserCheck,
  Filter,
  X,
  AlertTriangle,
  Mail,
  Calendar,
  ShieldCheck,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "chef" | "user";
  status: "active" | "suspended" | "banned";
  statusReason?: string;
  joinedDate: string;
  recipesCount: number;
  avatar: string;
}

const INITIAL_USERS: AdminUser[] = [
  {
    id: "usr-1",
    name: "Chef Promise",
    email: "chef.promise@cookdish.app",
    role: "admin",
    status: "active",
    joinedDate: "Feb 2026",
    recipesCount: 14,
    avatar: "👨‍🍳",
  },
  {
    id: "usr-[#E8734A]",
    name: "Chidi Nwachukwu",
    email: "chidi.n@example.com",
    role: "chef",
    status: "active",
    joinedDate: "Jan 2026",
    recipesCount: 6,
    avatar: "🍳",
  },
  {
    id: "usr-3",
    name: "Amaka Okafor",
    email: "amaka.foodie@example.com",
    role: "user",
    status: "active",
    joinedDate: "Mar 2026",
    recipesCount: 2,
    avatar: "🥘",
  },
  {
    id: "usr-4",
    name: "Spam Account",
    email: "bot.user@example.com",
    role: "user",
    status: "suspended",
    statusReason: "Repeated spam recipe submissions.",
    joinedDate: "Apr 2026",
    recipesCount: 0,
    avatar: "🚫",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Action Modal State
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [actionType, setActionType] = useState<"suspend" | "ban" | "activate">("suspend");
  const [reasonInput, setReasonInput] = useState("");

  const openActionModal = (user: AdminUser, type: "suspend" | "ban" | "activate") => {
    setSelectedUser(user);
    setActionType(type);
    setReasonInput("");
  };

  const handleConfirmAction = () => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              status: actionType === "activate" ? "active" : actionType === "suspend" ? "suspended" : "banned",
              statusReason: actionType === "activate" ? undefined : reasonInput.trim() || "Violation of community guidelines.",
            }
          : u
      )
    );

    setSelectedUser(null);
    setReasonInput("");
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || u.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 sm:space-y-8 w-full pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[#E8734A] text-xs font-extrabold tracking-widest uppercase block">
            User Supervision
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B] tracking-tight">
            User Directory ({users.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B68] font-medium">
            Search registered accounts, manage roles, and enforce moderation suspensions or bans
          </p>
        </div>
      </div>

      {/* Toolbar Search & Status Filter */}
      <div className="bg-white p-4 rounded-3xl border border-[#EFE6DD] shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6B68]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, email, or role..."
            className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#6E6B68] shrink-0" />
          {["all", "active", "suspended", "banned"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border ${
                statusFilter === status
                  ? "bg-[#E8734A] text-white border-[#E8734A] shadow-2xs"
                  : "bg-[#FAF8F5] text-[#6E6B68] border-[#EFE6DD] hover:text-[#1F1D1B]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Enterprise Users Table */}
      <div className="bg-white rounded-3xl border border-[#EFE6DD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EFE6DD] text-[#6E6B68] font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-4 px-6">User Profile</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Joined</th>
                <th className="py-4 px-4">Authored</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6DD]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#EFE6DD] flex items-center justify-center text-lg shrink-0 shadow-2xs">
                        {user.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-[#1F1D1B] block text-xs truncate">
                            {user.name}
                          </span>
                          {user.role === "admin" && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <span className="text-[11px] text-[#6E6B68] block truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : user.role === "chef"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border inline-block ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : user.status === "suspended"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {user.status}
                      </span>
                      {user.statusReason && (
                        <span className="text-[10px] text-rose-600 block pt-0.5 truncate max-w-xs font-medium">
                          "{user.statusReason}"
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-[#6E6B68]">
                    {user.joinedDate}
                  </td>

                  <td className="py-4 px-4 font-bold text-[#1F1D1B]">
                    {user.recipesCount} recipes
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {user.status === "active" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => openActionModal(user, "suspend")}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-xl font-extrabold text-[11px] transition-colors cursor-pointer"
                          >
                            Suspend
                          </button>
                          <button
                            type="button"
                            onClick={() => openActionModal(user, "ban")}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl font-extrabold text-[11px] transition-colors cursor-pointer"
                          >
                            Ban
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openActionModal(user, "activate")}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-xl font-extrabold text-[11px] transition-colors cursor-pointer"
                        >
                          Reactivate Account
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-[#EFE6DD] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-[#EFE6DD] pb-3">
              <h3 className="text-lg font-extrabold text-[#1F1D1B] capitalize">
                {actionType} User Account
              </h3>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="p-1.5 text-[#6E6B68] hover:text-[#1F1D1B] rounded-xl hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#6E6B68]">
              Target Account: <strong className="text-[#1F1D1B]">{selectedUser.name} ({selectedUser.email})</strong>
            </p>

            {actionType !== "activate" ? (
              <div className="space-y-2">
                <label className="block text-xs font-extrabold text-[#1F1D1B] uppercase tracking-wider">
                  Mandatory Reason for {actionType} *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  placeholder="Specify violation reason (e.g. repeated spam, offensive content, copyright infringement)..."
                  className="w-full bg-[#FAF8F5] border border-[#EFE6DD] rounded-2xl p-3.5 text-xs font-medium text-[#1F1D1B] focus:outline-none focus:border-[#E8734A]"
                />
              </div>
            ) : (
              <p className="text-xs text-[#6E6B68] bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                Are you sure you want to restore full platform access for <strong>{selectedUser.name}</strong>?
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="flex-1 bg-[#FAF8F5] border border-[#EFE6DD] text-[#1F1D1B] text-xs font-bold py-3.5 rounded-2xl hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`flex-1 text-white text-xs font-extrabold py-3.5 rounded-2xl shadow-xs capitalize cursor-pointer active:scale-95 ${
                  actionType === "activate"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : actionType === "suspend"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                Confirm {actionType}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
