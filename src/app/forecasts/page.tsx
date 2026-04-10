import type { Metadata } from "next";
import { ForecastsIndex } from "@/components/forecasts/forecasts-index";
import { type BlogPostFrontmatter, type MarkdownListItem, getAllForecasts } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Forecasts",
  description:
    "Seasonal and monthly astrology forecasts with transit breakdowns and rising-sign guides.",
  alternates: {
    canonical: `${SITE_URL}/forecasts`,
  },
};

function parseDateOnly(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function classifyForecasts(posts: MarkdownListItem<BlogPostFrontmatter>[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const current: MarkdownListItem<BlogPostFrontmatter>[] = [];
  const upcoming: MarkdownListItem<BlogPostFrontmatter>[] = [];
  const past: MarkdownListItem<BlogPostFrontmatter>[] = [];

  for (const post of posts) {
    const start = parseDateOnly(post.frontmatter.forecastStart);
    const end = parseDateOnly(post.frontmatter.forecastEnd);

    if (!start || !end) {
      past.push(post);
      continue;
    }

    if (today < start) {
      upcoming.push(post);
    } else if (today > end) {
      past.push(post);
    } else {
      current.push(post);
    }
  }

  current.sort((a, b) => {
    const aEnd = parseDateOnly(a.frontmatter.forecastEnd)?.getTime() ?? 0;
    const bEnd = parseDateOnly(b.frontmatter.forecastEnd)?.getTime() ?? 0;
    return aEnd - bEnd;
  });

  upcoming.sort((a, b) => {
    const aStart = parseDateOnly(a.frontmatter.forecastStart)?.getTime() ?? 0;
    const bStart = parseDateOnly(b.frontmatter.forecastStart)?.getTime() ?? 0;
    return aStart - bStart;
  });

  past.sort((a, b) => {
    const aEnd = parseDateOnly(a.frontmatter.forecastEnd)?.getTime() ?? 0;
    const bEnd = parseDateOnly(b.frontmatter.forecastEnd)?.getTime() ?? 0;
    return bEnd - aEnd;
  });

  return { current, upcoming, past };
}

export default async function ForecastsIndexPage() {
  const posts = await getAllForecasts();
  const buckets = classifyForecasts(posts);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Forecasts
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-ink)]">
          Seasonal and monthly astrology forecasts with transit breakdowns, key
          dates, and rising-sign guides.
        </p>
      </header>

      <ForecastsIndex
        current={buckets.current}
        upcoming={buckets.upcoming}
        past={buckets.past}
      />
    </div>
  );
}
