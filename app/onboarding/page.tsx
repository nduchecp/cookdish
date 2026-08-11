"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    title: "Discover Delicious Recipes",
    highlight: "Delicious",
    description: "Explore thousands of meals from top food sources and passionate home chefs.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cook with Simple Ingredients",
    highlight: "Simple",
    description: "Interactive step-by-step cooking mode with timers and scaling.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Plan Meals & Grocery Lists",
    highlight: "Plan",
    description: "Schedule your week and automatically generate smart shopping lists.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
  },
];

export default function OnboardingPage() {
  const [slide, setSlide] = useState(0);

  return (
    <div className="min-h-screen bg-[#FDF6EF] flex flex-col justify-between p-6 sm:p-10 max-w-lg mx-auto">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E8734A] text-white flex items-center justify-center">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-[#1F1D1B] tracking-tight">CookDish</span>
        </div>
        {slide < SLIDES.length - 1 && (
          <Link href="/auth/login" className="text-xs font-bold text-[#6E6B68] hover:text-[#E8734A]">
            Skip
          </Link>
        )}
      </div>

      {/* Main Slide Card */}
      <div className="space-y-6 text-center my-auto py-6">
        <div className="h-64 sm:h-80 w-full rounded-3xl overflow-hidden shadow-lg border border-[#EFE6DD] bg-[#F3EAE1]">
          <img
            src={SLIDES[slide].image}
            alt={SLIDES[slide].title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1B]">
            {SLIDES[slide].title}
          </h1>
          <p className="text-sm text-[#6E6B68] leading-relaxed max-w-xs mx-auto">
            {SLIDES[slide].description}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 pt-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                slide === idx ? "w-6 bg-[#E8734A]" : "w-2 bg-[#EFE6DD]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div>
        {slide < SLIDES.length - 1 ? (
          <button
            onClick={() => setSlide((prev) => prev + 1)}
            className="w-full bg-[#E8734A] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#D66239] transition-all shadow-md"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="w-full bg-[#1F1D1B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#33302C] transition-all shadow-md"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 text-[#E8734A]" />
          </Link>
        )}
      </div>
    </div>
  );
}
