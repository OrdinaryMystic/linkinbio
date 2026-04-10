import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client portal login (coming soon)",
  description:
    "A future home for clients to access sessions, notes, and tools. Not active yet.",
  alternates: {
    canonical: `${SITE_URL}/login`,
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
        Client portal login
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-ink)]">
        This space will eventually host sign-in for clients to access past
        sessions, notes, and tools. For now, everything is handled manually
        after your reading.
      </p>
      <p className="mt-4 text-xs text-[var(--color-muted)]">
        Coming soon — no authentication or accounts are active yet.
      </p>
    </div>
  );
}

