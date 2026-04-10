import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/config";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks for your order",
  description: "Your written report order is confirmed. You'll receive your PDF once it's ready.",
  alternates: {
    canonical: `${SITE_URL}/book/thanks/report`,
  },
};

export default function ThanksReportPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
        Thanks for your order!
      </h1>
      <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink)]">
        <p>
          Your <strong>written report</strong> order
          is confirmed. I should have what I need—if I need any follow-up info,
          I&apos;ll get in touch.
        </p>
        <p>
          If you have questions before you hear from me, reach out at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-[var(--color-oxblood)] underline-offset-4 hover:text-[var(--color-oxblood-hover)] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
      <p>
        <Link
          href="/"
          className="text-sm font-medium text-[var(--color-oxblood)] underline-offset-4 hover:text-[var(--color-oxblood-hover)] hover:underline"
        >
          Back to home
        </Link>
      </p>
    </div>
  );
}
