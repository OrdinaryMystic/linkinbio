"use client";

import { useEffect } from "react";

export function ScrollOnHash({ hash }: { hash: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== hash) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const el = document.getElementById(hash.replace("#", ""));
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [hash]);

  return null;
}
