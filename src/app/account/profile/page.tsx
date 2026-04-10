import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Profile (coming soon)",
  description:
    "A placeholder page for future profile settings in the Ordinary Mystic client portal.",
  alternates: {
    canonical: `${SITE_URL}/account/profile`,
  },
};

export default function ProfilePage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
        Profile
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-ink)]">
        This page will eventually let you review and update basic profile
        details once the client portal is live.
      </p>
      <p className="mt-4 text-xs text-[var(--color-muted)]">
        For now, everything is handled directly via email after your session.
      </p>
    </div>
  );
}

