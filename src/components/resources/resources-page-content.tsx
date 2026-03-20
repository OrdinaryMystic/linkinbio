"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
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

const categoryBadgeClasses: Record<ResourceCategory, string> = {
  Astrology: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Tarot: "bg-violet-50 text-violet-700 ring-violet-200",
  Spirituality: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

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
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Resource Hub for Ordinary Mystics
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
          Clean, minimal tools that help you track readings, patterns, and
          experiments.
        </p>
      </header>

      <section>
        <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Tools to support your readings
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700">
          I&apos;m a Notion-certified template creator and power user, and have
          been using Notion personally and professionally for 10+ years.
          I&apos;ve built and sold templates, I&apos;ve been a Notion consultant
          for companies, and I believe this is the #1 tool for organizing
          anything. That makes it a great resource for tracking your Tarot
          readings! Browse my Notion templates and other online tools below.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col p-0 overflow-hidden">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-100">
              <Image
                src="/images/resource/simple_tarot_journal.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <CardHeader className="space-y-2 px-6 pt-4">
              <CardTitle>Simple Tarot Journal</CardTitle>
              <CardDescription>
                A simple, searchable Notion template to log readings and card
                pulls, build a living card library, and surface past insights
                when you need them.
              </CardDescription>
              <p className="text-xs text-slate-500">Simple & searchable</p>
              <p className="text-sm font-medium text-slate-700">$12</p>
            </CardHeader>
            <CardFooter className="mt-auto px-6 pb-6">
              <Link
                href="https://ordinarymystic.gumroad.com/l/tarotjournal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button" size="sm">
                  Buy now
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="flex flex-col p-0 overflow-hidden">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-100">
              <Image
                src="/images/resource/complete_tarot_dashboard.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <CardHeader className="space-y-2 px-6 pt-4">
              <CardTitle>Complete Tarot Dashboard</CardTitle>
              <CardDescription>
                Advanced Notion system to track readings in full detail—upright
                and reversed cards, contextual meanings, and statistics so your
                practice deepens over time.
              </CardDescription>
              <p className="text-xs text-slate-500">Advanced & flexible</p>
              <p className="text-sm font-medium text-slate-700">$32</p>
            </CardHeader>
            <CardFooter className="mt-auto px-6 pb-6">
              <Link
                href="https://ordinarymystic.gumroad.com/l/tarotdashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button" size="sm">
                  Buy now
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="flex flex-col p-0 overflow-hidden">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-100">
              <Image
                src="/images/resource/digital_tarot.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <CardHeader className="space-y-2 px-6 pt-4">
              <CardTitle>Digital Tarot</CardTitle>
              <CardDescription>
                A free online desktop simulator app to shuffle, pull, and
                rearrange Tarot cards. This website is in beta, and mobile view
                is not currently supported.
              </CardDescription>
              <p className="text-xs text-slate-500">Free web app</p>
            </CardHeader>
            <CardFooter className="mt-auto px-6 pb-6">
              <Link
                href={DIGITAL_TAROT_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  size="sm"
                  rightIcon={<ExternalLink className="h-4 w-4" />}
                >
                  Try now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      <hr className="border-slate-200" />

      <section id="recommended-resources" className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recommended library
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
            A curated set of books and digital tools I consistently recommend.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition",
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 text-slate-700 hover:border-slate-500",
                ].join(" ")}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setBooksOpen((open) => !open)}
              className="flex w-full cursor-pointer items-center justify-between border-b border-slate-200 pb-2 text-left"
              aria-expanded={booksOpen}
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Books ({books.length})
              </span>
              <span className="relative h-4 w-4 cursor-pointer text-slate-500">
                <ChevronDown
                  className={[
                    "absolute inset-0 h-4 w-4 transition-all duration-250",
                    booksOpen
                      ? "opacity-0 -translate-y-1"
                      : "opacity-100 translate-y-0",
                  ].join(" ")}
                />
                <ChevronUp
                  className={[
                    "absolute inset-0 h-4 w-4 transition-all duration-250",
                    booksOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1",
                  ].join(" ")}
                />
              </span>
            </button>

            <div
              className={[
                "overflow-hidden transition-all duration-300 ease-out",
                booksOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
              aria-hidden={!booksOpen}
            >
              <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-3">
                {books.map((resource) => (
                  <article
                    key={resource.url}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <h3 className="flex items-start gap-1.5 text-base font-semibold text-slate-900">
                      <span>{resource.title}</span>
                      {resource.isAffiliate && (
                        <a
                          href="#affiliate-disclosure"
                          aria-label="View affiliate disclosure"
                          className="mt-0.5 text-amber-500 transition-colors hover:text-amber-600"
                        >
                          <Star className="h-3.5 w-3.5 fill-current" />
                        </a>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {resource.description}
                    </p>
                    <div className="mt-3">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset",
                          categoryBadgeClasses[resource.category],
                        ].join(" ")}
                      >
                        {resource.category}
                      </span>
                    </div>
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
                      className="mt-4 inline-flex text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                    >
                      Learn More →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setDigitalOpen((open) => !open)}
              className="flex w-full cursor-pointer items-center justify-between border-b border-slate-200 pb-2 text-left"
              aria-expanded={digitalOpen}
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Tools & Digital ({digital.length})
              </span>
              <span className="relative h-4 w-4 cursor-pointer text-slate-500">
                <ChevronDown
                  className={[
                    "absolute inset-0 h-4 w-4 transition-all duration-250",
                    digitalOpen
                      ? "opacity-0 -translate-y-1"
                      : "opacity-100 translate-y-0",
                  ].join(" ")}
                />
                <ChevronUp
                  className={[
                    "absolute inset-0 h-4 w-4 transition-all duration-250",
                    digitalOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1",
                  ].join(" ")}
                />
              </span>
            </button>

            <div
              className={[
                "overflow-hidden transition-all duration-300 ease-out",
                digitalOpen
                  ? "max-h-[3000px] opacity-100"
                  : "max-h-0 opacity-0",
              ].join(" ")}
              aria-hidden={!digitalOpen}
            >
              <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-3">
                {digital.map((resource) => (
                  <article
                    key={resource.url}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <h3 className="flex items-start gap-1.5 text-base font-semibold text-slate-900">
                      <span>{resource.title}</span>
                      {resource.isAffiliate && (
                        <a
                          href="#affiliate-disclosure"
                          aria-label="View affiliate disclosure"
                          className="mt-0.5 text-amber-500 transition-colors hover:text-amber-600"
                        >
                          <Star className="h-3.5 w-3.5 fill-current" />
                        </a>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {resource.description}
                    </p>
                    <div className="mt-3">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset",
                          categoryBadgeClasses[resource.category],
                        ].join(" ")}
                      >
                        {resource.category}
                      </span>
                    </div>
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
                      className="mt-4 inline-flex text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                    >
                      Learn More →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          id="affiliate-disclosure"
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600"
        >
          <span className="inline-flex items-baseline gap-1 font-semibold text-slate-700 align-baseline">
            <Star className="relative top-px h-3 w-3 fill-amber-500 text-amber-500" />
            Full Disclosure:
          </span>{" "}
          Resources marked with a star icon are affiliate links. These are
          tools and books I personally use and would recommend regardless of any
          kickback. If you choose to purchase through these links, I may receive
          a small commission at no extra cost to you. This support helps keep
          the Ordinary Mystic lights on—thank you for the support on my journey
          and yours!
        </div>
      </section>
    </div>
  );
}
