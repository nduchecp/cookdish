"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone, X, Share } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const inStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(inStandalone);
    if (inStandalone) return;

    // Detect iOS user agent
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Show prompt on first visit if not installed
    const hasSeenPrompt = sessionStorage.getItem("cookdish_pwa_dismissed");
    if (!hasSeenPrompt) {
      setShowPrompt(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      alert("To install CookDish on iPhone/iPad:\n1. Tap the Share button in Safari\n2. Scroll down & select 'Add to Home Screen'");
    } else {
      alert("To install CookDish App:\nTap your browser menu (...) and select 'Install App' or 'Add to Home Screen'");
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("cookdish_pwa_dismissed", "true");
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 max-w-md mx-auto z-[90] bg-[#1F1D1B] text-white p-4 sm:p-5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-2xl bg-[#E8734A] text-white flex items-center justify-center shrink-0 shadow-md">
          {isIOS ? <Share className="w-5 h-5" /> : <Smartphone className="w-6 h-6" />}
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E8734A] block">
            Install App
          </span>
          <h4 className="text-sm font-extrabold text-white truncate">
            Install CookDish App
          </h4>
          <p className="text-xs text-white/80 line-clamp-1">
            {isIOS ? "Tap Share → Add to Home Screen" : "Add to home screen for offline cooking"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleInstallClick}
          className="bg-[#E8734A] hover:bg-[#D66239] text-white text-xs font-extrabold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-95 touch-manipulation cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{isIOS ? "How" : "Install"}</span>
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss Install Prompt"
          className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
