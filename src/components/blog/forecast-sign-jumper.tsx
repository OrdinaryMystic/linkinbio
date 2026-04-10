"use client";

const RISING_SIGNS = [
  { id: "aries-rising", label: "Aries", symbol: "♈" },
  { id: "taurus-rising", label: "Taurus", symbol: "♉" },
  { id: "gemini-rising", label: "Gemini", symbol: "♊" },
  { id: "cancer-rising", label: "Cancer", symbol: "♋" },
  { id: "leo-rising", label: "Leo", symbol: "♌" },
  { id: "virgo-rising", label: "Virgo", symbol: "♍" },
  { id: "libra-rising", label: "Libra", symbol: "♎" },
  { id: "scorpio-rising", label: "Scorpio", symbol: "♏" },
  { id: "sagittarius-rising", label: "Sagittarius", symbol: "♐" },
  { id: "capricorn-rising", label: "Capricorn", symbol: "♑" },
  { id: "aquarius-rising", label: "Aquarius", symbol: "♒" },
  { id: "pisces-rising", label: "Pisces", symbol: "♓" },
];

export function ForecastSignJumper() {
  function handleClick(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.setAttribute("open", "");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="overflow-hidden rounded px-5 py-4" style={{ backgroundColor: "var(--color-bone-raised)" }}>
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-bone)] opacity-80">
        Rising Sign Forecast
      </p>
      <p className="mt-1 text-sm font-medium text-[var(--color-bone)]">
        Jump to your rising sign
      </p>
      <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-bone)] opacity-70">
        Don&apos;t know yours? You need your birth time.{" "}
        <a
          href="/blog/why-birth-time"
          className="underline underline-offset-2 hover:opacity-100"
        >
          Here&apos;s why it matters.
        </a>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {RISING_SIGNS.map((sign) => (
          <button
            key={sign.id}
            type="button"
            onClick={() => handleClick(sign.id)}
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-left text-sm font-medium text-[var(--color-bone)] transition-colors hover:bg-white/20 hover:border-white/30"
          >
            <span className="text-base leading-none" aria-hidden>
              {sign.symbol}
            </span>
            <span>{sign.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
