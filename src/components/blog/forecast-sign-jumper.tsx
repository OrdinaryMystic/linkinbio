"use client";

const RISING_SIGNS = [
  { id: "aries-rising", label: "Aries" },
  { id: "taurus-rising", label: "Taurus" },
  { id: "gemini-rising", label: "Gemini" },
  { id: "cancer-rising", label: "Cancer" },
  { id: "leo-rising", label: "Leo" },
  { id: "virgo-rising", label: "Virgo" },
  { id: "libra-rising", label: "Libra" },
  { id: "scorpio-rising", label: "Scorpio" },
  { id: "sagittarius-rising", label: "Sagittarius" },
  { id: "capricorn-rising", label: "Capricorn" },
  { id: "aquarius-rising", label: "Aquarius" },
  { id: "pisces-rising", label: "Pisces" },
];

export function ForecastSignJumper() {
  function handleClick(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.setAttribute("open", "");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mt-8 border-y-2 border-[var(--color-ink)] bg-[var(--color-bone-raised)] px-6 py-8 sm:px-8 sm:py-9">
      <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
        <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
        Rising Sign Forecast
      </span>
      <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight leading-[1.15] text-[var(--color-ink)]">
        Jump to your rising sign
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
        Don&apos;t know yours? You need your birth time.{" "}
        <a
          href="/blog/why-birth-time"
          className="text-[var(--color-oxblood)] underline underline-offset-[3px] transition-colors hover:text-[var(--color-oxblood-hover)]"
        >
          Here&apos;s why it matters.
        </a>
      </p>
      <div className="mt-6 grid grid-cols-2 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {RISING_SIGNS.map((sign) => (
          <button
            key={sign.id}
            type="button"
            onClick={() => handleClick(sign.id)}
            className="group flex items-center justify-between gap-2 bg-[var(--color-bone)] px-4 py-3 text-left font-heading text-[0.9375rem] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bone-raised)] hover:text-[var(--color-oxblood)]"
          >
            <span>{sign.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
