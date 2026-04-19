import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Subscribe – The Weekly Letter",
  description:
    "A short weekly letter on the astrological weather — what's in the sky, what's worth paying attention to, and how to think about the week in front of you.",
  alternates: {
    canonical: `${SITE_URL}/subscribe`,
  },
};

export default function SubscribePage() {
  return (
    // Compensate for layout's pt-10 pb-16 so the dark section is flush
    <div className="-mt-10 -mb-16 pb-0">
      <section
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-screen flex items-center"
        style={{ backgroundColor: "#1a1614" }}
      >
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
          {/* Kicker */}
          <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9a8d7d]">
            <span className="h-px w-6 bg-[#3a312b]" aria-hidden />
            Weekly Letter
            <span className="h-px w-6 bg-[#3a312b]" aria-hidden />
          </span>

          {/* Heading */}
          <h1 className="mt-8 font-heading text-4xl font-semibold tracking-tight sm:text-5xl text-[var(--color-bone)] leading-[1.05]">
            The Week, Astrologically
          </h1>

          {/* Divider */}
          <div
            className="mx-auto mt-8 h-px w-12 bg-[var(--color-oxblood)]"
            aria-hidden
          />

          {/* Description */}
          <p className="mt-8 text-base sm:text-lg leading-relaxed max-w-lg mx-auto font-heading italic text-[#c9bba8]">
            What&rsquo;s in the sky, what&rsquo;s worth paying attention to,
            and how to think about the week in front of you.
          </p>
          <p className="mt-5 text-sm leading-relaxed max-w-md mx-auto text-[#9a8d7d]">
            No cosmic inevitabilities. No vague predictions. Just pattern
            recognition delivered on Sunday, plus occasional updates on Querent
            as it takes shape.
          </p>

          {/* Form */}
          <div className="mt-12">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
