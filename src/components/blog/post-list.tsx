import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DEFAULT_AUTHOR_SLUG, getAuthorBySlug } from "@/data/authors";
import type { BlogPostFrontmatter, MarkdownListItem } from "@/lib/content";
import { formatSlugLabel } from "@/lib/blog-taxonomy-utils";

type PostListProps = {
  posts: MarkdownListItem<BlogPostFrontmatter>[];
  emptyMessage: string;
  columns?: 1 | 2;
  showAuthorMeta?: boolean;
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

export function PostList({
  posts,
  emptyMessage,
  showAuthorMeta = true,
  basePath = "/blog",
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)]">{emptyMessage}</p>
    );
  }

  return (
    <section className="divide-y divide-[var(--color-rule)] border-t-2 border-[var(--color-ink)]">
      {posts.map((post) => {
        const author = showAuthorMeta
          ? getAuthorBySlug(post.frontmatter.author)
          : null;
        const hasAuthor = Boolean(author) && author!.slug !== DEFAULT_AUTHOR_SLUG;

        return (
          <article
            key={post.slug}
            className="grid gap-4 py-8 first:pt-10 md:grid-cols-[10rem_1fr] md:gap-10"
          >
            {/* Metadata rail */}
            <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 md:flex-col md:items-start md:gap-3">
              <time
                dateTime={post.frontmatter.date}
                className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]"
              >
                {formatDate(post.frontmatter.date)}
              </time>
              {post.frontmatter.category ? (
                <>
                  <span
                    className="hidden h-px w-6 bg-[var(--color-oxblood)] md:block"
                    aria-hidden
                  />
                  <Link
                    href={`/blog/categories/${post.frontmatter.category}`}
                    className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
                  >
                    {formatSlugLabel(post.frontmatter.category)}
                  </Link>
                </>
              ) : null}
              {hasAuthor ? (
                <Link
                  href={`/authors/${author!.slug}`}
                  className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {author!.name}
                </Link>
              ) : null}
            </div>

            {/* Content */}
            <div>
              <h3 className="font-heading text-2xl font-semibold leading-[1.15] tracking-tight text-[var(--color-ink)] sm:text-[1.7rem]">
                <Link
                  href={`${basePath}/${post.slug}`}
                  className="transition-colors hover:text-[var(--color-oxblood)]"
                >
                  {post.frontmatter.title}
                </Link>
              </h3>
              {post.frontmatter.description ? (
                <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)] line-clamp-3">
                  {post.frontmatter.description}
                </p>
              ) : null}
              <Link
                href={`${basePath}/${post.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-oxblood)] transition-colors hover:text-[var(--color-oxblood-hover)]"
              >
                Read Article
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
