import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RelatedPostsCarousel({
  items,
  basePath = "/blog",
}: RelatedPostsCarouselProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
        <span className="h-px w-6 bg-[var(--color-oxblood)]" aria-hidden />
        Related
      </span>
      <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
        Continue Reading
      </h2>

      <div className="mt-8 grid border-t border-[var(--color-rule)] md:grid-cols-3 md:divide-x md:divide-[var(--color-rule)]">
        {items.map((item, index) => {
          const author = getAuthorBySlug(item.frontmatter.author);
          const hasAuthor = author.slug !== DEFAULT_AUTHOR_SLUG;
          return (
            <article
              key={item.slug}
              className={`flex flex-col pt-6 pb-2 md:px-6 md:first:pl-0 md:last:pr-0 ${
                index < items.length - 1
                  ? "border-b border-[var(--color-rule)] pb-6 md:border-b-0 md:pb-2"
                  : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <time
                  dateTime={item.frontmatter.date}
                  className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]"
                >
                  {formatDate(item.frontmatter.date)}
                </time>
                {item.frontmatter.category ? (
                  <>
                    <span
                      className="h-px w-4 bg-[var(--color-oxblood)]"
                      aria-hidden
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
                      {formatSlugLabel(item.frontmatter.category)}
                    </span>
                  </>
                ) : null}
              </div>
              <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight leading-snug text-[var(--color-ink)]">
                <Link
                  href={`${basePath}/${item.slug}`}
                  className="transition-colors hover:text-[var(--color-oxblood)]"
                >
                  {item.frontmatter.title}
                </Link>
              </h3>
              {hasAuthor ? (
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
                  By {author.name}
                </p>
              ) : null}
              <Link
                href={`${basePath}/${item.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
              >
                Read Article
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
