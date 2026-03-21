import Image from "next/image";
import Link from "next/link";
import { CalendarDays, FolderOpen, User } from "lucide-react";
import { Button } from "@/components/button";
import { DEFAULT_AUTHOR_SLUG, getAuthorBySlug } from "@/data/authors";
import type { BlogPostFrontmatter, MarkdownListItem } from "@/lib/content";
import { formatSlugLabel } from "@/lib/blog-taxonomy-utils";

type Props = {
  post: MarkdownListItem<BlogPostFrontmatter>;
  basePath?: string;
};

export function CurrentForecastBanner({ post, basePath = "/blog" }: Props) {
  const { frontmatter, slug } = post;
  const author = getAuthorBySlug(frontmatter.author);

  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-sm"
      style={{
        borderColor: "var(--color-brand-light-border)",
        background: "linear-gradient(to bottom right, var(--color-brand-light) 0%, var(--color-brand-light-mid) 50%, var(--color-brand-light) 100%)",
      }}
    >
      <div className="flex flex-col gap-0 sm:flex-row">
        <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-64">
          <Image
            src={frontmatter.image ?? "/images/placeholder-blog-1.svg"}
            alt={frontmatter.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 256px"
          />
          <div className="current-forecast-banner__image-overlay absolute inset-0" />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
          <div className="space-y-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-brand-muted)" }}
            >
              Current Forecast
            </p>
            <h2 className="font-heading text-xl font-black leading-snug tracking-tight text-slate-900 sm:text-2xl">
              <Link
                href={`${basePath}/${slug}`}
                className="hover:underline underline-offset-4"
              >
                {frontmatter.title}
              </Link>
            </h2>
            {frontmatter.description ? (
              <p className="text-sm leading-relaxed text-slate-700">
                {frontmatter.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex w-full flex-wrap items-center justify-start gap-x-3 gap-y-1 text-xs text-slate-600 sm:w-auto">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                {new Date(frontmatter.date).toLocaleDateString()}
              </span>
              {author.slug !== DEFAULT_AUTHOR_SLUG ? (
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 shrink-0" />
                  <Link
                    href={`/authors/${author.slug}`}
                    className="underline-offset-2 hover:underline"
                  >
                    {author.name}
                  </Link>
                </span>
              ) : null}
              <span className="flex items-center gap-1.5">
                <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                {frontmatter.category ? (
                  <Link
                    href={`/blog/categories/${frontmatter.category}`}
                    className="underline-offset-2 hover:underline"
                  >
                    {formatSlugLabel(frontmatter.category)}
                  </Link>
                ) : (
                  "Uncategorized"
                )}
              </span>
            </div>
            <Link href={`${basePath}/${slug}`} className="shrink-0">
              <Button size="sm">Read the Forecast</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
