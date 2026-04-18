import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { PostList } from "@/components/blog/post-list";
import type { BlogPostFrontmatter, MarkdownListItem } from "@/lib/content";
import {
  filterPostsBySearchTagAndArchive,
  formatSlugLabel,
  getArchiveGroups,
  getCategoryCounts,
  getTagCounts,
} from "@/lib/blog-taxonomy-utils";

function monthName(month: string) {
  const value = Number(month);
  if (!Number.isInteger(value) || value < 1 || value > 12) return month;
  return new Date(2000, value - 1, 1).toLocaleString("en-US", { month: "long" });
}

function formatFeaturedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type BlogExplorerProps = {
  posts: MarkdownListItem<BlogPostFrontmatter>[];
  currentPath: string;
  activeTag?: string;
  activeArchive?: string;
  sidebarPrimary?: "categories" | "subcategories";
  emptyMessage: string;
  skipFeatured?: boolean;
  basePath?: string;
};

export function BlogExplorer({
  posts,
  currentPath,
  activeTag,
  activeArchive,
  sidebarPrimary = "categories",
  emptyMessage,
  skipFeatured = false,
  basePath = "/blog",
}: BlogExplorerProps) {
  const filteredPosts = filterPostsBySearchTagAndArchive(
    posts,
    "",
    activeTag,
    activeArchive,
  );
  const shouldShowFeatured = !skipFeatured && filteredPosts.length > 1;
  const featuredIndex = shouldShowFeatured
    ? filteredPosts.findIndex((post) => post.frontmatter.featured)
    : -1;
  const featuredPost = shouldShowFeatured
    ? featuredIndex >= 0
      ? filteredPosts[featuredIndex]
      : filteredPosts[0]
    : undefined;
  const restPosts =
    featuredPost === undefined
      ? filteredPosts
      : filteredPosts.filter((post) => post.slug !== featuredPost.slug);

  const categoryCounts = getCategoryCounts(posts);
  const subcategoryCounts = [
    ...new Set(
      posts.map((post) => post.frontmatter.subcategory).filter(Boolean),
    ),
  ]
    .map((subcategory) => ({
      subcategory: subcategory as string,
      count: posts.filter((post) => post.frontmatter.subcategory === subcategory)
        .length,
    }))
    .sort(
      (a, b) => b.count - a.count || a.subcategory.localeCompare(b.subcategory),
    );
  const tagCounts = getTagCounts(posts);
  const archives = getArchiveGroups(posts);

  const primaryItems =
    sidebarPrimary === "subcategories"
      ? subcategoryCounts.map((entry) => ({
          href: `/blog/subcategories/${entry.subcategory}`,
          label: formatSlugLabel(entry.subcategory),
          count: entry.count,
        }))
      : categoryCounts.map((entry) => ({
          href: `/blog/categories/${entry.category}`,
          label: formatSlugLabel(entry.category),
          count: entry.count,
        }));

  return (
    <div className="space-y-14">
      {/* FEATURED LEDE */}
      {featuredPost ? (
        <article className="border-t-2 border-[var(--color-ink)] pt-8 sm:pt-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
              Featured
            </span>
            <span
              className="h-px flex-1 bg-[var(--color-rule)]"
              aria-hidden
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
              {formatFeaturedDate(featuredPost.frontmatter.date)}
            </span>
          </div>
          <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight leading-[1.1] text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
            <Link
              href={`${basePath}/${featuredPost.slug}`}
              className="transition-colors hover:text-[var(--color-oxblood)]"
            >
              {featuredPost.frontmatter.title}
            </Link>
          </h2>
          {featuredPost.frontmatter.description ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg line-clamp-3">
              {featuredPost.frontmatter.description}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {featuredPost.frontmatter.category ? (
              <Link
                href={`/blog/categories/${featuredPost.frontmatter.category}`}
                className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-oxblood)]"
              >
                {formatSlugLabel(featuredPost.frontmatter.category)}
              </Link>
            ) : null}
            <span className="h-px flex-1 bg-[var(--color-rule)]" aria-hidden />
            <Link
              href={`${basePath}/${featuredPost.slug}`}
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
            >
              Read Article
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </article>
      ) : null}

      {/* LIST + SIDEBAR */}
      <div className="grid gap-12 lg:grid-cols-[1fr_17rem] lg:items-start lg:gap-14">
        <PostList
          posts={restPosts}
          emptyMessage={emptyMessage}
          columns={1}
          basePath={basePath}
        />

        <aside className="space-y-10 lg:sticky lg:top-20 lg:self-start lg:border-l lg:border-[var(--color-rule)] lg:pl-10">
          <section>
            <h2 className="border-b-2 border-[var(--color-ink)] pb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
              {sidebarPrimary === "subcategories" ? "Subcategories" : "Categories"}
            </h2>
            <ul className="divide-y divide-[var(--color-rule)]">
              {primaryItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-baseline justify-between gap-3 py-3 transition-colors"
                  >
                    <span className="font-heading text-base text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-oxblood)]">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                      {String(item.count).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="border-b-2 border-[var(--color-ink)] pb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
              Archives
            </h2>
            <ul className="divide-y divide-[var(--color-rule)]">
              {archives.map((group) => {
                const total = group.months.reduce(
                  (acc, m) => acc + m.count,
                  0,
                );
                return (
                  <li key={group.year}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-3 py-3 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-2 font-heading text-base font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-oxblood)]">
                          <ChevronRight
                            className="h-3 w-3 text-[var(--color-muted)] transition-transform group-open:rotate-90"
                            aria-hidden
                          />
                          {group.year}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                          {String(total).padStart(2, "0")}
                        </span>
                      </summary>
                      <ul className="mb-3 ml-2 border-l border-[var(--color-rule)] pl-4">
                        {group.months.map(({ month, count }) => (
                          <li key={month}>
                            <Link
                              href={`${currentPath}?archive=${group.year}-${month}`}
                              className="flex items-baseline justify-between gap-3 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-oxblood)]"
                            >
                              <span>{monthName(month)}</span>
                              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                                {count}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2 className="border-b-2 border-[var(--color-ink)] pb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)]">
              Tags
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm leading-relaxed">
              {tagCounts.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`${currentPath}?tag=${tag}`}
                  className="group inline-flex items-baseline gap-1 text-[var(--color-ink)] transition-colors hover:text-[var(--color-oxblood)]"
                >
                  <span className="underline-offset-4 group-hover:underline">
                    {formatSlugLabel(tag)}
                  </span>
                  <sup className="text-[10px] font-semibold text-[var(--color-muted)]">
                    {count}
                  </sup>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
