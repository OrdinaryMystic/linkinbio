"use client";

import { useEffect } from "react";

/**
 * Static redirect: /tools → /resources (used because server redirects don't work with static export).
 */
export default function ToolsRedirectPage() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    window.location.replace(`${base}/resources`);
  }, []);

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-600">
      Redirecting to Resources…
    </div>
  );
}
