import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/config";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks for booking",
  description: "Your recorded reading is confirmed. You'll receive your video and notes once it's ready.",
  alternates: {
    canonical: `${SITE_URL}/book/thanks/recorded`,
  },
};

export default function ThanksRecordedPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
        Thanks for booking!
      </h1>
      <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink)]">
        <p>
          Your <strong>recorded reading</strong> is
          confirmed. I should have everything I need from you—if I need any
          follow-up or clarification, I&apos;ll get in touch.
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
