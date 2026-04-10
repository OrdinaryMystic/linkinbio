"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { DEFAULT_AUTHOR_SLUG, getAuthorBySlug } from "@/data/authors";
import type { BlogPostFrontmatter } from "@/lib/content";
import { formatSlugLabel } from "@/lib/blog-taxonomy-utils";

type RelatedPostItem = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
};

type RelatedPostsCarouselProps = {
  items: RelatedPostItem[];
  basePath?: string;
};

export function RelatedPostsCarousel({ items, basePath = "/blog" }: RelatedPostsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const active = items[activeIndex];
  const goTo = (index: number) => setActiveIndex((index + items.length) % items.length);

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)]">
        Related Posts
      </h2>

      <Card className="flex flex-col gap-4 p-4 sm:flex-row">
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded bg-[var(--color-bone-raised)] sm:h-36 sm:w-44 sm:aspect-auto">
          <Image
            src={active.frontmatter.image ?? "/images/placeholder-blog-1.svg"}
            alt={active.frontmatter.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          <CardHeader className="mb-0">
            <CardTitle>{active.frontmatter.title}</CardTitle>
            <CardDescription>
              {new Date(active.frontmatter.date).toLocaleDateString()}
              {getAuthorBySlug(active.frontmatter.author).slug !==
              DEFAULT_AUTHOR_SLUG
                ? ` · ${getAuthorBySlug(active.frontmatter.author).name}`
                : ""}
              {active.frontmatter.category
                ? ` · ${formatSlugLabel(active.frontmatter.category)}`
                : ""}
            </CardDescription>
          </CardHeader>

          <CardFooter className="mt-0 w-full">
            <Link href={`${basePath}/${active.slug}`} className="block w-full sm:w-auto">
              <Button size="sm" className="w-full justify-center whitespace-nowrap sm:w-auto">Read Post</Button>
            </Link>
          </CardFooter>
        </div>
      </Card>

      {items.length > 1 ? (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-bone)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bone-raised)]"
            aria-label="Previous related post"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  index === activeIndex ? "bg-[var(--color-ink)]" : "bg-[var(--color-rule)] hover:bg-[var(--color-muted)]"
                }`}
                aria-label={`Go to related post ${index + 1}`}
                aria-pressed={index === activeIndex}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-bone)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bone-raised)]"
            aria-label="Next related post"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
