"use client";

import React from "react";

export default function CookDishLogo({
  className = "w-9 h-9",
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-tr from-[#E8734A] via-[#F28E6B] to-[#F59E0B] p-2 flex items-center justify-center text-white shadow-sm shrink-0 border border-white/20 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-white drop-shadow-xs"
      >
        {/* Pot Base */}
        <path d="M6 12h12v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-5z" fill="currentColor" fillOpacity="0.2" />
        <path d="M4 12h16" />
        <path d="M12 4v4" />
        <path d="M9 6v2" />
        <path d="M15 6v2" />
        <path d="M6 12v5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-5" />
      </svg>
    </div>
  );
}
