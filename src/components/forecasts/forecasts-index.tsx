"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle } from "@/components/card";
import type { BlogPostFrontmatter, MarkdownListItem } from "@/lib/content";

type ForecastStatus = "verified-true" | "verified-false" | "unverified";

type ForecastBuckets = {
  current: MarkdownListItem<BlogPostFrontmatter>[];
  upcoming: MarkdownListItem<BlogPostFrontmatter>[];
  past: MarkdownListItem<BlogPostFrontmatter>[];
};

type ForecastScope = "seasonal" | "monthly" | "weekly" | "daily" | "annual";

function parseDateOnly(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateLabel(value?: string): string | null {
  const date = parseDateOnly(value);
  if (!date) return null;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getWindowLabel(frontmatter: BlogPostFrontmatter): string {
  const start = formatDateLabel(frontmatter.forecastStart);
  const end = formatDateLabel(frontmatter.forecastEnd);

  if (start && end && start !== end) return `Forecast for ${start} through ${end}`;
  if (start && end && start === end) return `Forecast for ${start}`;
  if (start) return `Forecast for ${start}`;
  if (end) return `Forecast through ${end}`;
  return "Forecast window pending";
}

function getVerificationStatus(frontmatter: BlogPostFrontmatter): ForecastStatus {
  if (
    frontmatter.verificationStatus === "verified-true" ||
    frontmatter.verificationStatus === "verified-false" ||
    frontmatter.verificationStatus === "unverified"
  ) {
    return frontmatter.verificationStatus;
  }
  return "unverified";
}

function getScope(frontmatter: BlogPostFrontmatter): ForecastScope | null {
  const scope = frontmatter.forecastScope;
  if (
    scope === "seasonal" ||
    scope === "monthly" ||
    scope === "weekly" ||
    scope === "daily" ||
    scope === "annual"
  ) {
    return scope;
  }
  return null;
}

function getScopeBadge(scope: ForecastScope): { label: string; className: string } {
  switch (scope) {
    case "annual":
      return { label: "Annual", className: "bg-violet-100 text-violet-800 border-violet-200" };
    case "seasonal":
      return { label: "Seasonal", className: "bg-indigo-100 text-indigo-800 border-indigo-200" };
    case "monthly":
      return { label: "Monthly", className: "bg-sky-100 text-sky-800 border-sky-200" };
    case "weekly":
      return { label: "Weekly", className: "bg-amber-100 text-amber-800 border-amber-200" };
    case "daily":
      return { label: "Daily", className: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    default:
      return { label: "Forecast", className: "bg-[var(--color-bone-raised)] text-[var(--color-ink)] border-[var(--color-rule)]" };
  }
}

function getStatusStyles(status: ForecastStatus): {
  cardClass: string;
  label: string;
  icon: ReactNode;
} {
  if (status === "verified-true") {
    return {
      cardClass: "border-emerald-200 bg-emerald-50/60",
      label: "Verified Accurate",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden />,
    };
  }
  if (status === "verified-false") {
    return {
      cardClass: "border-rose-200 bg-rose-50/60",
      label: "Verified Inaccurate",
      icon: <XCircle className="h-4 w-4 text-rose-600" aria-hidden />,
    };
  }
  return {
    cardClass: "border-[var(--color-rule)] bg-[var(--color-bone)]",
    label: "Unverified",
    icon: null,
  };
}

function CurrentForecastCard({
  post,
}: {
  post: MarkdownListItem<BlogPostFrontmatter>;
}) {
  const { slug, frontmatter } = post;
  const scope = getScope(frontmatter);
  const scopeBadge = scope ? getScopeBadge(scope) : null;

  return (
    <div
      className="overflow-hidden rounded border"
      style={{
        borderColor: "var(--color-brand-light-border)",
        background:
          "linear-gradient(to bottom right, var(--color-brand-light) 0%, var(--color-brand-light-mid) 50%, var(--color-brand-light) 100%)",
      }}
    >
      <div className="flex flex-col gap-0 lg:flex-row">
        <div className="relative h-60 w-full shrink-0 lg:h-auto lg:w-1/2">
          <Image
            src={frontmatter.image ?? "/images/placeholder-blog-1.svg"}
            alt={frontmatter.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="current-forecast-banner__image-overlay absolute inset-0" />
          {scopeBadge ? (
            <span
              className={`absolute left-3 top-3 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${scopeBadge.className}`}
            >
              {scopeBadge.label}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
          <div className="space-y-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-brand-muted)" }}
            >
              Current Forecast
            </p>
            <h2 className="font-heading text-xl font-bold leading-snug tracking-tight text-[var(--color-ink)] sm:text-2xl">
              <Link href={`/forecasts/${slug}`} className="hover:underline underline-offset-4">
                {frontmatter.title}
              </Link>
            </h2>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{getWindowLabel(frontmatter)}</p>
            {frontmatter.description ? (
              <p className="text-sm leading-relaxed text-[var(--color-ink)]">{frontmatter.description}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)] sm:w-auto">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Written: {new Date(frontmatter.date).toLocaleDateString()}
              </span>
            </div>
            <Link href={`/forecasts/${slug}`} className="shrink-0">
              <Button size="sm">Read Forecast</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForecastCard({
  post,
  showVerification = false,
}: {
  post: MarkdownListItem<BlogPostFrontmatter>;
  showVerification?: boolean;
}) {
  const { slug, frontmatter } = post;
  const scope = getScope(frontmatter);
  const scopeBadge = scope ? getScopeBadge(scope) : null;
  const status = getVerificationStatus(frontmatter);
  const statusStyles = getStatusStyles(status);
  const cardClass = showVerification ? statusStyles.cardClass : "border-[var(--color-rule)] bg-[var(--color-bone)]";

  return (
    <Card key={slug} className={`flex h-full flex-col p-4 ${cardClass}`}>
      <div className="relative h-40 w-full overflow-hidden rounded bg-[var(--color-bone-raised)]">
        <Image
          src={frontmatter.image ?? "/images/placeholder-blog-1.svg"}
          alt={frontmatter.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {scopeBadge ? (
          <span
            className={`absolute left-2 top-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${scopeBadge.className}`}
          >
            {scopeBadge.label}
          </span>
        ) : null}
      </div>
      <CardHeader className="mb-2 mt-3">
        <CardTitle>
          <Link href={`/forecasts/${slug}`} className="hover:underline underline-offset-4">
            {frontmatter.title}
          </Link>
        </CardTitle>
        <p className="text-sm font-semibold text-[var(--color-ink)]">{getWindowLabel(frontmatter)}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Written: {new Date(frontmatter.date).toLocaleDateString()}
          </span>
          {showVerification ? (
            <span className="inline-flex items-center gap-1.5 font-medium">
              {statusStyles.icon}
              {statusStyles.label}
            </span>
          ) : null}
        </div>
      </CardHeader>
      <div className="mt-auto">
        <Link href={`/forecasts/${slug}`} className="block w-full">
          <Button size="sm" className="w-full justify-center">
            Read Forecast
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function CurrentForecastCarousel({
  posts,
}: {
  posts: MarkdownListItem<BlogPostFrontmatter>[];
}) {
  const [index, setIndex] = useState(0);
  const total = posts.length;
  const active = posts[index];

  if (!active) return null;

  return (
    <section className="space-y-3">
      <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl">
        Current Forecasts
      </h2>
      <CurrentForecastCard post={active} />
      {total > 1 ? (
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-bone)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bone-raised)]"
            onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
            aria-label="Previous current forecast"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <div className="flex items-center gap-2">
            {posts.map((post, dotIndex) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => setIndex(dotIndex)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  dotIndex === index ? "bg-[var(--color-ink)]" : "bg-[var(--color-rule)] hover:bg-[var(--color-muted)]"
                }`}
                aria-label={`Show current forecast ${dotIndex + 1}`}
                aria-pressed={dotIndex === index}
              />
            ))}
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-bone)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bone-raised)]"
            onClick={() => setIndex((prev) => (prev + 1) % total)}
            aria-label="Next current forecast"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : null}
    </section>
  );
}

export function ForecastsIndex({ current, upcoming, past }: ForecastBuckets) {
  const hasAnything = useMemo(
    () => current.length > 0 || upcoming.length > 0 || past.length > 0,
    [current.length, past.length, upcoming.length],
  );

  if (!hasAnything) {
    return <p className="text-sm text-[var(--color-muted)]">No forecasts yet.</p>;
  }

  return (
    <div className="space-y-10">
      {current.length > 0 ? <CurrentForecastCarousel posts={current} /> : null}

      {upcoming.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Upcoming Forecasts
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((post) => (
              <ForecastCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {past.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Past Forecasts
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {past.map((post) => (
              <ForecastCard key={post.slug} post={post} showVerification />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

