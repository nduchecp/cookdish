"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone, X, Share } from "lucide-react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const inStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(inStandalone);
    if (inStandalone) return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

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
      alert("To install CookDish on iPhone/iPad:\n1. Tap Share button in Safari\n2. Select 'Add to Home Screen'");
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
    <div className="fixed bottom-20 sm:bottom-6 left-3 right-3 max-w-xs sm:max-w-sm mx-auto z-[90] bg-[#1F1D1B]/95 text-white p-3 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md flex items-center justify-between gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-[#E8734A] text-white flex items-center justify-center shrink-0 shadow-xs">
          {isIOS ? <Share className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-extrabold text-white truncate">
            Install CookDish App
          </h4>
          <p className="text-[10px] text-white/75 truncate">
            {isIOS ? "Tap Share → Add to Home Screen" : "Add to home screen"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleInstallClick}
          className="bg-[#E8734A] hover:bg-[#D66239] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all active:scale-95 touch-manipulation cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isIOS ? "How" : "Install"}</span>
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss Install Prompt"
          className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
