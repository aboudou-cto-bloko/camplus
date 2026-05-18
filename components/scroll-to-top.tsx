"use client";
import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return null;
}
