import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsubscribed",
  robots: { index: false },
};

export default function UnsubscribedPage() {
  return (
    <div className="py-24 text-center max-w-md mx-auto">
      <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
        <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
        Unsubscribed
      </span>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
        You&rsquo;re off the list.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
        No more emails from me. If you ever want back in, the door&rsquo;s open.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
      >
        Back to Ordinary Mystic
      </Link>
    </div>
  );
}
