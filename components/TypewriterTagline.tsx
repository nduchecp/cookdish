"use client";

import { useState, useEffect } from "react";

const PHRASES = [
  "Discover authentic Nigerian, African & international dishes",
  "Cook with simple ingredients & interactive step timers",
  "Explore Party Jollof, Egusi, Suya, Nkwobi & more",
  "Save favorite recipes & auto-generate shopping lists",
  "Master 50+ local West African soups, rice & delicacies"
];

export default function TypewriterTagline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetPhrase = PHRASES[phraseIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && currentText === targetPhrase) {
      // Pause at full phrase
      typingSpeed = 2500;
    } else if (isDeleting && currentText === "") {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      typingSpeed = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(targetPhrase.slice(0, currentText.length + 1));
        if (currentText === targetPhrase) {
          setIsDeleting(true);
        }
      } else {
        setCurrentText(targetPhrase.slice(0, currentText.length - 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <div className="hidden lg:flex items-center bg-white/90 border border-[#EFE6DD] px-4 py-1.5 rounded-full text-xs font-semibold text-[#6E6B68] shadow-xs">
      <span className="text-[#E8734A] font-extrabold mr-1">✦</span>
      <span className="text-[#1F1D1B] min-h-[16px] inline-block font-medium">
        {currentText}
      </span>
      <span className="w-1.5 h-3.5 bg-[#E8734A] inline-block ml-0.5 animate-pulse rounded-xs" />
    </div>
  );
}
