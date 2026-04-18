"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  WEEKEND_PROMO_END,
  WEEKEND_PROMO_END_DISPLAY,
  isWeekendPromoActive,
} from "@/lib/promo";

const DISMISS_KEY = "om:weekend-tarot-promo:dismissed";

export function WeekendPromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isWeekendPromoActive()) return;
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    setVisible(true);

    // Auto-hide the moment the promo expires, even if the tab stays open.
    const msUntilExpiry = WEEKEND_PROMO_END.getTime() - Date.now();
    if (msUntilExpiry <= 0) {
      setVisible(false);
      return;
    }
    const timeout = setTimeout(() => setVisible(false), msUntilExpiry);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_KEY, "1");
    }
    setVisible(false);
  };

  return (
    <div
      className="relative z-[60]"
      style={{
        backgroundColor: "var(--color-oxblood)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
      }}
      role="region"
      aria-label="Weekend sale announcement"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/book#written-tarot"
          className="flex-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-bone)] transition-opacity hover:opacity-90 sm:text-[11px] sm:tracking-[0.25em]"
        >
          Written Tarot Readings on Sale This Weekend Only
          <span className="mx-2 opacity-70" aria-hidden>
            &middot;
          </span>
          <span className="opacity-90">Ends {WEEKEND_PROMO_END_DISPLAY}</span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss weekend sale announcement"
          className="shrink-0 text-[var(--color-bone)] opacity-80 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
