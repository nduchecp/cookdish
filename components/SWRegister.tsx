"use client";

import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("CookDish Service Worker registered successfully:", reg.scope);
          })
          .catch((err) => {
            console.error("CookDish Service Worker registration failed:", err);
          });
      });
    }
  }, []);

  return null;
}
