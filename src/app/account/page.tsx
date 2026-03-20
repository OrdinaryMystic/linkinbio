import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account (coming soon)",
  description:
    "A future overview of client account details, upcoming sessions, and resources.",
  alternates: {
    canonical: `${SITE_URL}/account`,
  },
};

export default function AccountPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Client account
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-700">
        This will eventually be the home for your account overview—sessions,
        notes, and saved tools. For now, access details will be shared directly
        via email after your reading.
      </p>
      <p className="mt-4 text-xs text-slate-500">
        Portal functionality is intentionally not built yet.
      </p>
    </div>
  );
}

