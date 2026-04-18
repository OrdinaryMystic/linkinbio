"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/button";
import { recommendedResources, type ResourceCategory } from "@/data/resources";
import { DIGITAL_TAROT_APP_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

type CategoryFilter = "All" | ResourceCategory;

const categoryFilters: CategoryFilter[] = [
  "All",
  "Astrology",
  "Tarot",
  "Spirituality",
];

export function ResourcesPageContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [booksOpen, setBooksOpen] = useState(true);
  const [digitalOpen, setDigitalOpen] = useState(true);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return recommendedResources;
    return recommendedResources.filter(
      (resource) => resource.category === activeCategory,
    );
  }, [activeCategory]);

  const books = filtered.filter((resource) => resource.type === "Book");
  const digital = filtered.filter((resource) => resource.type === "Digital");

  const handleRecommendedClick = (
    title: string,
    category: ResourceCategory,
    type: "Book" | "Digital",
    url: string,
  ) => {
    trackEvent("external_link_click", {
      location: "recommended_resources",
      resource_title: title,
      resource_category: category,
      resource_type: type,
      url,
    });
  };

  return (
    <div>
      {/* Header */}
      <header className="mb-10 sm:mb-14">
        <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
          <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
          Resources
        </span>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight leading-[1.05] text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
          Resource Hub for Ordinary Mystics
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          Clean, minimal tools that help you track readings, patterns, and experiments.
        </p>
      </header>

      {/* Ordinary Mystic Tools */}
      <section className="mb-16 sm:mb-20">
        <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
          <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
          Ordinary Mystic Tools
        </span>
        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight leading-[1.1] text-[var(--color-ink)] sm:text-4xl">
          Tools to support your readings
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          I&apos;m a Notion-certified template creator and power user, and have been using Notion personally and professionally for 10+ years. I&apos;ve built and sold templates, consulted for companies on Notion, and believe it&apos;s the best tool for organizing anything, which makes it a great resource for tracking your tarot readings. Browse my Notion templates and other online tools below.
        </p>

        <div className="mt-12 grid border-y border-[var(--color-ink)] md:grid-cols-3 md:divide-x md:divide-[var(--color-rule)]">
          <div className="flex flex-col gap-5 border-b border-[var(--color-rule)] p-7 md:border-b-0 md:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Notion Template &middot; $12
              </p>
              <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight leading-snug text-[var(--color-ink)]">
                Simple Tarot Journal
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              A searchable Notion template to log readings and card pulls, build a living card library, and surface past insights when you need them.
            </p>
            <div className="mt-auto pt-1">
              <Link
                href="https://ordinarymystic.gumroad.com/l/tarotjournal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button" size="sm" className="rounded-none">
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 border-b border-[var(--color-rule)] p-7 md:border-b-0 md:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Notion Template &middot; $32
              </p>
              <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight leading-snug text-[var(--color-ink)]">
                Complete Tarot Dashboard
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Advanced Notion system to track readings in full detail, with upright and reversed cards, contextual meanings, and statistics that deepen your practice over time.
            </p>
            <div className="mt-auto pt-1">
              <Link
                href="https://ordinarymystic.gumroad.com/l/tarotdashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button" size="sm" className="rounded-none">
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-7 md:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Free Web App
              </p>
              <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight leading-snug text-[var(--color-ink)]">
                Digital Tarot
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              A free desktop web app to shuffle, pull, and rearrange tarot cards. Currently in beta; mobile view is not yet supported.
            </p>
            <div className="mt-auto pt-1">
              <Link
                href={DIGITAL_TAROT_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-none"
                  rightIcon={<ExternalLink className="h-4 w-4" />}
                >
                  Try Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Library */}
      <section id="recommended-resources">
        <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
          <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
          Recommended
        </span>
        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight leading-[1.1] text-[var(--color-ink)] sm:text-4xl">
          Recommended library
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          A curated set of books and digital tools I consistently recommend.
        </p>

        {/* Filter tabs */}
        <div className="mt-8 border-y border-[var(--color-rule)]">
          <div className="flex flex-wrap divide-x divide-[var(--color-rule)]">
            {categoryFilters.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors ${
                    isActive
                      ? "bg-[var(--color-ink)] text-[var(--color-bone)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-oxblood)]"
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Books */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setBooksOpen((open) => !open)}
            className="group flex w-full items-center justify-between border-b-2 border-[var(--color-ink)] pb-3 text-left"
            aria-expanded={booksOpen}
          >
            <span className="inline-flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)] transition-colors group-hover:text-[var(--color-oxblood-hover)]">
                Books
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
                {String(books.length).padStart(2, "0")}
              </span>
            </span>
            <ChevronDown
              className={`h-4 w-4 text-[var(--color-muted)] transition-transform ${
                booksOpen ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              booksOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!booksOpen}
          >
            <div className="grid md:grid-cols-3 md:divide-x md:divide-[var(--color-rule)]">
              {books.map((resource, index) => (
                <article
                  key={resource.url}
                  className={`flex flex-col pt-8 pb-6 md:px-6 md:pb-2 md:first:pl-0 md:last:pr-0 ${
                    index < books.length - 1
                      ? "border-b border-[var(--color-rule)] md:border-b-0"
                      : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
                      {resource.category}
                    </span>
                    {resource.isAffiliate ? (
                      <a
                        href="#affiliate-disclosure"
                        aria-label="View affiliate disclosure"
                        className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                      >
                        <sup className="text-[11px] font-semibold">†</sup>
                      </a>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight leading-snug text-[var(--color-ink)]">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {resource.description}
                  </p>
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleRecommendedClick(
                        resource.title,
                        resource.category,
                        resource.type,
                        resource.url,
                      )
                    }
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
                  >
                    Learn More
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Digital */}
        <div className="mt-12">
          <button
            type="button"
            onClick={() => setDigitalOpen((open) => !open)}
            className="group flex w-full items-center justify-between border-b-2 border-[var(--color-ink)] pb-3 text-left"
            aria-expanded={digitalOpen}
          >
            <span className="inline-flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)] transition-colors group-hover:text-[var(--color-oxblood-hover)]">
                Tools &amp; Digital
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
                {String(digital.length).padStart(2, "0")}
              </span>
            </span>
            <ChevronDown
              className={`h-4 w-4 text-[var(--color-muted)] transition-transform ${
                digitalOpen ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              digitalOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!digitalOpen}
          >
            <div className="grid md:grid-cols-3 md:divide-x md:divide-[var(--color-rule)]">
              {digital.map((resource, index) => (
                <article
                  key={resource.url}
                  className={`flex flex-col pt-8 pb-6 md:px-6 md:pb-2 md:first:pl-0 md:last:pr-0 ${
                    index < digital.length - 1
                      ? "border-b border-[var(--color-rule)] md:border-b-0"
                      : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
                      {resource.category}
                    </span>
                    {resource.isAffiliate ? (
                      <a
                        href="#affiliate-disclosure"
                        aria-label="View affiliate disclosure"
                        className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                      >
                        <sup className="text-[11px] font-semibold">†</sup>
                      </a>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight leading-snug text-[var(--color-ink)]">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {resource.description}
                  </p>
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleRecommendedClick(
                        resource.title,
                        resource.category,
                        resource.type,
                        resource.url,
                      )
                    }
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
                  >
                    Learn More
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div
          id="affiliate-disclosure"
          className="mt-14 border-t border-[var(--color-rule)] pt-5"
        >
          <p className="text-xs leading-relaxed text-[var(--color-muted)]">
            <span className="font-semibold text-[var(--color-ink)]">
              <sup className="mr-0.5">†</sup>Full Disclosure:
            </span>{" "}
            Resources marked with a dagger are affiliate links. These are tools and books I personally use and would recommend regardless of any kickback. If you choose to purchase through these links, I may receive a small commission at no extra cost to you. This support helps keep the Ordinary Mystic lights on. Thank you for the support on my journey and yours.
          </p>
        </div>
      </section>
    </div>
  );
}
