import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sessions (coming soon)",
  description:
    "A placeholder page for future access to past and upcoming sessions.",
  alternates: {
    canonical: `${SITE_URL}/account/sessions`,
  },
};

export default function SessionsPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Sessions
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-700">
        In the future, this page will list your upcoming and past sessions with
        links to notes and recordings where appropriate.
      </p>
      <p className="mt-4 text-xs text-slate-500">
        For now, session details are shared directly and securely after your
        reading.
      </p>
    </div>
  );
}

