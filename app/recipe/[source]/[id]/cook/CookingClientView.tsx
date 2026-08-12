"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  CheckCircle,
  Lightbulb,
  Clock,
  RotateCcw,
  Volume2,
  VolumeX,
  Bell,
} from "lucide-react";
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

export function extractMinutesFromStep(step: string): number {
  const match = step.match(/\((\d+)\s*(?:-\s*\d+)?\s*mins?\)/i);
  if (match && match[1]) {
    const mins = parseInt(match[1], 10);
    if (!isNaN(mins) && mins > 0) return mins;
  }
  return 5;
}

/**
 * Web Audio API Chime Synthesizer
 * Plays high-clarity 0ms latency audio beeps/chimes without external mp3 files
 */
export function playAudioChime(type: "completion" | "timerDone" | "victory") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "completion") {
      // Crisp 2-note ding-ding chime for completing a step
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now); // C5
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, now + 0.12); // E5
      gain2.gain.setValueAtTime(0.4, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.45);
    } else if (type === "timerDone") {
      // 3-note chime for timer completion
      const now = ctx.currentTime;
      [880, 1046.5, 1318.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.5, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.35);
      });
    } else if (type === "victory") {
      // Victory fanfare chime for completing recipe
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);
        gain.gain.setValueAtTime(0.4, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.5);
      });
    }
  } catch (err) {
    console.error("Audio chime playback error:", err);
  }
}

export default function CookingClientView({ recipe, source, id }: CookingClientViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

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
  const stepDurationMins = extractMinutesFromStep(currentInstruction);

  // Dynamic Timer Initial State synchronized to step's real duration
  const [timerSeconds, setTimerSeconds] = useState(stepDurationMins * 60);

  // Synchronize timer when step changes
  useEffect(() => {
    const mins = extractMinutesFromStep(steps[currentStep]);
    setTimerSeconds(mins * 60);
    setIsTimerRunning(false);

    if (isVoiceEnabled) {
      speakStep(steps[currentStep], currentStep + 1);
    }
  }, [currentStep]);

  // Victory audio chime when finished
  useEffect(() => {
    if (isFinished) {
      playAudioChime("victory");
    }
  }, [isFinished]);

  // Guaranteed React Timer Countdown Effect (Dependency: isTimerRunning ONLY)
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          playTimerAlarm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Speech Synthesis Voice Assistant
  const speakStep = (stepText: string, stepNum: number) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const parsed = parseStepText(stepText);
      const textToSpeak = parsed.title
        ? `Step ${stepNum}: ${parsed.title}. ${parsed.body}`
        : `Step ${stepNum}: ${parsed.body}`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playTimerAlarm = () => {
    playAudioChime("timerDone");
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const alarmText = `Timer complete for step ${currentStep + 1}! Check your cooking.`;
      const utterance = new SpeechSynthesisUtterance(alarmText);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVoiceMode = () => {
    if (!isVoiceEnabled) {
      setIsVoiceEnabled(true);
      speakStep(currentInstruction, currentStep + 1);
    } else {
      setIsVoiceEnabled(false);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      playAudioChime("completion"); // Play audio chime sound per completed instruction!
      setCurrentStep((prev) => prev + 1);
      const mainContainer = document.getElementById("cook-scroll-container");
      if (mainContainer) mainContainer.scrollTop = 0;
    } else {
      playAudioChime("victory"); // Play victory fanfare chime on final step!
      setIsFinished(true);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      const mainContainer = document.getElementById("cook-scroll-container");
      if (mainContainer) mainContainer.scrollTop = 0;
    }
  };

  const handleToggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(stepDurationMins * 60);
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
      className="fixed inset-0 z-[100] bg-[#FDF6EF] text-[#1F1D1B] flex flex-col justify-between overflow-y-auto touch-manipulation pb-28"
    >
      {/* Scrollable Content Wrapper */}
      <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center w-full pt-2">
          <Link
            href={`/recipe/${source}/${id}`}
            className="p-3 rounded-2xl bg-white border border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A] transition-colors shadow-xs active:scale-95 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="text-center px-4">
            <span className="text-xs font-extrabold text-[#E8734A] uppercase tracking-wider block truncate max-w-[180px] sm:max-w-xs">
              {recipe.title}
            </span>
            <h2 className="text-xs font-semibold text-[#6E6B68]">
              Step {currentStep + 1} of {totalSteps}
            </h2>
          </div>

          {/* Hands-Free Voice Assistant Toggle Button */}
          <button
            type="button"
            onClick={toggleVoiceMode}
            className={`p-3 rounded-2xl border transition-all shadow-xs flex items-center gap-1.5 cursor-pointer touch-manipulation ${
              isVoiceEnabled
                ? "bg-[#E8734A] text-white border-[#E8734A] animate-pulse"
                : "bg-white border-[#EFE6DD] text-[#1F1D1B] hover:border-[#E8734A]"
            }`}
            title={isVoiceEnabled ? "Hands-Free Voice On" : "Turn Voice Assistant On"}
          >
            {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-[#6E6B68]" />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#EFE6DD] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#E8734A] h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Image Thumbnail */}
        <div className="relative h-48 sm:h-60 w-full rounded-3xl overflow-hidden border border-[#EFE6DD] shadow-sm bg-[#F3EAE1] shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#E8734A] text-white px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" />
              <span>Step {currentStep + 1} Instructions</span>
            </span>
          </div>
        </div>

        {/* Step Card Text aligned with Website Warm Theme */}
        <div className="bg-white border border-[#EFE6DD] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header Row: Step Title + Matching Time Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE6DD] pb-3.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F1D1B]">
                {parsedStep.title || `Step ${currentStep + 1}`}
              </h3>
              {parsedStep.time && (
                <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-[#E8734A] text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-2xs">
                  <Clock className="w-4 h-4" />
                  <span>{parsedStep.time}</span>
                </span>
              )}
            </div>

            {/* Instruction Body */}
            <p className="text-base sm:text-xl font-medium leading-relaxed text-[#1F1D1B]">
              {parsedStep.body}
            </p>
          </div>

          {/* Chef Tip Callout */}
          <div className="flex items-start gap-3 bg-[#FDF6EF] border border-[#EFE6DD] p-4 rounded-2xl">
            <Lightbulb className="w-5 h-5 text-[#E8734A] shrink-0 mt-0.5" />
            <div className="text-xs text-[#6E6B68]">
              <span className="font-bold text-[#E8734A] block mb-0.5">Chef's Tip</span>
              Keep heat controlled and taste test seasoning before proceeding to the next step.
            </div>
          </div>

          {/* Hands-Free Voice Reader Button */}
          <button
            type="button"
            onClick={() => {
              playAudioChime("completion");
              speakStep(currentInstruction, currentStep + 1);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#FDF6EF] hover:bg-[#E8734A] hover:text-white border border-[#EFE6DD] text-[#1F1D1B] py-3 rounded-2xl text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95 touch-manipulation"
          >
            <Volume2 className="w-4 h-4 text-[#E8734A]" />
            <span>Read Step Aloud (Hands-Free)</span>
          </button>

          {/* Interactive Step Timer (Matched 100% to Step Duration) */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EFE6DD]">
            <div className="flex items-center gap-2 text-sm text-[#1F1D1B]">
              <Clock className="w-5 h-5 text-[#E8734A]" />
              <span className="font-extrabold">Step Timer: {formatTime(timerSeconds)}</span>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleToggleTimer}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#E8734A] text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-[#D66239] active:scale-95 transition-all shadow-xs text-sm cursor-pointer touch-manipulation"
              >
                {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                <span>{isTimerRunning ? "Pause Timer" : "Start Timer"}</span>
              </button>
              <button
                type="button"
                onClick={handleResetTimer}
                aria-label="Reset Timer"
                className="p-3.5 bg-white hover:bg-[#FDF6EF] active:scale-95 rounded-2xl text-[#1F1D1B] transition-all border border-[#EFE6DD] shadow-2xs cursor-pointer touch-manipulation"
                title={`Reset to ${stepDurationMins} mins`}
              >
                <RotateCcw className="w-5 h-5 text-[#6E6B68]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Controls Aligned with App Theme */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-[#EFE6DD] p-4 sm:p-5 z-[110] shadow-2xl">
        <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={handlePrevStep}
            className="flex-1 border border-[#EFE6DD] py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FDF6EF] active:scale-95 transition-all text-sm cursor-pointer bg-white text-[#1F1D1B] shadow-2xs touch-manipulation"
          >
            <ChevronLeft className="w-5 h-5 text-[#6E6B68]" />
            <span>Previous Step</span>
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="flex-1 bg-[#E8734A] text-white py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-[#D66239] active:scale-95 transition-all shadow-md text-sm cursor-pointer touch-manipulation"
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
