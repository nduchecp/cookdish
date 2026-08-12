"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, CheckCircle, Lightbulb, Clock, RotateCcw } from "lucide-react";
import { NormalizedRecipe } from "@/lib/api/themealdb";

interface CookingClientViewProps {
  recipe: NormalizedRecipe;
  source: string;
  id: string;
}

export function parseStepText(step: string) {
  const match = step.match(/^([^(]+)(?:\(([^)]+)\))?:\s*(.*)$/);
  if (match) {
    return {
      title: match[1].trim(),
      time: match[2] ? match[2].trim() : null,
      body: match[3].trim(),
    };
  }
  return {
    title: null,
    time: null,
    body: step,
  };
}

export default function CookingClientView({ recipe, source, id }: CookingClientViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins step timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const steps = recipe.instructions && recipe.instructions.length > 0
    ? recipe.instructions
    : [
        "Gather all ingredients listed in the recipe overview.",
        "Prep ingredients by chopping, measuring, and seasoning.",
        "Cook over medium heat until tender and thoroughly cooked.",
        "Plate, garnish, and serve hot."
      ];

  const totalSteps = steps.length;
  const currentInstruction = steps[currentStep];
  const parsedStep = parseStepText(currentInstruction);

  // Guaranteed React Timer Countdown Effect (Dependency: isTimerRunning ONLY)
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setIsTimerRunning(false);
      setTimerSeconds(300);
      const mainContainer = document.getElementById("cook-scroll-container");
      if (mainContainer) mainContainer.scrollTop = 0;
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setIsTimerRunning(false);
      setTimerSeconds(300);
      const mainContainer = document.getElementById("cook-scroll-container");
      if (mainContainer) mainContainer.scrollTop = 0;
    }
  };

  const handleToggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(300);
  };

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-[120] bg-[#1F1D1B] text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#E8734A] text-white flex items-center justify-center shadow-lg animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-md">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8734A]">Meal Completed!</span>
          <h1 className="text-3xl font-extrabold">{recipe.title}</h1>
          <p className="text-sm text-white/80">
            Great job, Chef! Your dish is cooked and ready to enjoy.
          </p>
        </div>
        <div className="flex gap-4 pt-4">
          <Link
            href={`/recipe/${source}/${id}`}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl font-bold transition-all border border-white/20 touch-manipulation"
          >
            Back to Recipe
          </Link>
          <Link
            href="/"
            className="bg-[#E8734A] hover:bg-[#D66239] text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-md touch-manipulation"
          >
            Home Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      id="cook-scroll-container"
      className="fixed inset-0 z-[100] bg-[#1F1D1B] text-white flex flex-col justify-between overflow-y-auto touch-manipulation pb-24"
    >
      {/* Scrollable Content Wrapper */}
      <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center w-full pt-2">
          <Link
            href={`/recipe/${source}/${id}`}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10 active:scale-95 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="text-center px-4">
            <span className="text-xs font-extrabold text-[#E8734A] uppercase tracking-wider block truncate max-w-[200px] sm:max-w-xs">
              {recipe.title}
            </span>
            <h2 className="text-xs font-semibold text-white/70">
              Step {currentStep + 1} of {totalSteps}
            </h2>
          </div>
          <div className="w-10" />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#E8734A] h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Image Thumbnail */}
        <div className="relative h-48 sm:h-64 w-full rounded-3xl overflow-hidden border border-white/10 shadow-lg bg-black/40 shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#E8734A] px-3 py-1 rounded-full">
              Step {currentStep + 1} Instructions
            </span>
          </div>
        </div>

        {/* Step Card Text with Separated Title & Time Header */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 backdrop-blur-md flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#E8734A]">
                {parsedStep.title || `Step ${currentStep + 1}`}
              </h3>
              {parsedStep.time && (
                <span className="inline-flex items-center gap-1.5 bg-[#E8734A]/20 border border-[#E8734A]/40 text-[#E8734A] text-xs font-bold px-3.5 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{parsedStep.time}</span>
                </span>
              )}
            </div>

            <p className="text-base sm:text-xl font-medium leading-relaxed text-white/95">
              {parsedStep.body}
            </p>
          </div>

          {/* Chef Tip Callout */}
          <div className="flex items-start gap-3 bg-[#E8734A]/10 border border-[#E8734A]/30 p-4 rounded-2xl">
            <Lightbulb className="w-5 h-5 text-[#E8734A] shrink-0 mt-0.5" />
            <div className="text-xs text-white/90">
              <span className="font-bold text-[#E8734A] block mb-0.5">Chef's Tip</span>
              Keep heat controlled and taste test seasoning before proceeding to the next step.
            </div>
          </div>

          {/* Interactive Step Timer */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Clock className="w-5 h-5 text-[#E8734A]" />
              <span className="font-bold">Step Timer: {formatTime(timerSeconds)}</span>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleToggleTimer}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#E8734A] text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-[#D66239] active:scale-95 transition-all shadow-md text-sm cursor-pointer touch-manipulation"
              >
                {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                <span>{isTimerRunning ? "Pause Timer" : "Start Timer"}</span>
              </button>
              <button
                type="button"
                onClick={handleResetTimer}
                aria-label="Reset Timer"
                className="p-3.5 bg-white/10 hover:bg-white/20 active:scale-95 rounded-2xl text-white transition-all border border-white/10 cursor-pointer touch-manipulation"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Controls */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-[#1F1D1B] border-t border-white/10 p-4 sm:p-5 z-[110] shadow-2xl">
        <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={handlePrevStep}
            className="flex-1 border border-white/20 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 active:scale-95 transition-all text-sm cursor-pointer bg-white/5 touch-manipulation"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous Step</span>
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="flex-1 bg-[#E8734A] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#D66239] active:scale-95 transition-all shadow-lg text-sm cursor-pointer touch-manipulation"
          >
            <span>{currentStep === totalSteps - 1 ? "Finish Cooking" : "Next Step"}</span>
            {currentStep === totalSteps - 1 ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
