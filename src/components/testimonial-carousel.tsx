"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { TestimonialItem } from "@/data/testimonials";

type TestimonialCarouselProps = {
  items: TestimonialItem[];
  intervalMs?: number;
};

export function TestimonialCarousel({ items, intervalMs = 5000 }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const total = items.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);

    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || total <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, prefersReducedMotion, total]);

  const active = useMemo(() => items[activeIndex], [items, activeIndex]);

  if (!active) return null;

  const goTo = (index: number) => setActiveIndex((index + total) % total);
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div
        className="p-6 sm:p-8"
        style={{
          backgroundColor: "var(--color-bone-raised)",
          border: "1px solid var(--color-rule)",
        }}
        aria-live="polite"
      >
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Image
            src={active.avatarSrc}
            alt={`${active.name} headshot`}
            width={88}
            height={88}
            className="h-[5.5rem] w-[5.5rem] rounded-full object-cover"
            style={{ border: "1px solid var(--color-rule)" }}
          />
          <div>
            <p className="text-base leading-relaxed text-[var(--color-ink)]">&ldquo;{active.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-[var(--color-ink)]">{active.name}</p>
            <p className="text-sm text-[var(--color-muted)]">{active.context}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors"
          style={{ border: "1px solid var(--color-rule)" }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              className="h-2.5 w-2.5 rounded-full transition-all"
              style={{
                backgroundColor: index === activeIndex ? "var(--color-ink)" : "var(--color-rule)",
              }}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors"
          style={{ border: "1px solid var(--color-rule)" }}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
