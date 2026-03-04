"use client";

import { useEffect } from "react";

/**
 * Static redirect: /resources → /tools (used because server redirects don't work with static export).
 */
export default function ResourcesRedirectPage() {

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    window.location.replace(`${base}/tools`);
  }, []);

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-600">
      Redirecting to Tools…
    </div>
  );
}
