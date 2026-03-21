import Link from "next/link";
import Image from "next/image";
import { CalendarDays, FolderOpen, User } from "lucide-react";
import { PostList } from "@/components/blog/post-list";
import { DEFAULT_AUTHOR_SLUG, getAuthorBySlug } from "@/data/authors";
import type { BlogPostFrontmatter, MarkdownListItem } from "@/lib/content";
import {
  filterPostsBySearchTagAndArchive,
  formatSlugLabel,
  getArchiveGroups,
  getCategoryCounts,
  getTagCounts,
} from "@/lib/blog-taxonomy-utils";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";

function monthName(month: string) {
  const value = Number(month);
  if (!Number.isInteger(value) || value < 1 || value > 12) return month;
  return new Date(2000, value - 1, 1).toLocaleString("en-US", { month: "long" });
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
  const subcategoryCounts = [...new Set(posts.map((post) => post.frontmatter.subcategory).filter(Boolean))]
    .map((subcategory) => ({
      subcategory: subcategory as string,
      count: posts.filter((post) => post.frontmatter.subcategory === subcategory).length,
    }))
    .sort((a, b) => b.count - a.count || a.subcategory.localeCompare(b.subcategory));
  const tagCounts = getTagCounts(posts);
  const archives = getArchiveGroups(posts);

  return (
    <div className="space-y-5">
      {featuredPost ? (
        <Card className="flex flex-col gap-4 p-4 sm:flex-row">
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-52 sm:w-72 sm:aspect-auto">
            <Image
              src={featuredPost.frontmatter.image ?? "/images/placeholder-blog-1.svg"}
              alt={featuredPost.frontmatter.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <CardHeader className="mb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Featured Post
              </p>
              <CardTitle>
                <Link
                  href={`${basePath}/${featuredPost.slug}`}
                  className="hover:underline underline-offset-4"
                >
                  {featuredPost.frontmatter.title}
                </Link>
              </CardTitle>
              <CardDescription>{featuredPost.frontmatter.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
              <div className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 sm:w-auto sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                  {new Date(featuredPost.frontmatter.date).toLocaleDateString()}
                </span>
                {getAuthorBySlug(featuredPost.frontmatter.author).slug !==
                DEFAULT_AUTHOR_SLUG ? (
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 shrink-0" />
                    <Link
                      href={`/authors/${getAuthorBySlug(featuredPost.frontmatter.author).slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {getAuthorBySlug(featuredPost.frontmatter.author).name}
                    </Link>
                  </span>
                ) : null}
                <span className="flex items-center gap-1.5">
                  <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                  {featuredPost.frontmatter.category ? (
                    <Link
                      href={`/blog/categories/${featuredPost.frontmatter.category}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {formatSlugLabel(featuredPost.frontmatter.category)}
                    </Link>
                  ) : (
                    "Uncategorized"
                  )}
                </span>
              </div>
              <Link href={`${basePath}/${featuredPost.slug}`} className="block w-full sm:w-auto sm:flex-shrink-0">
                <Button size="sm" className="w-full justify-center whitespace-nowrap sm:w-auto">Read Post</Button>
              </Link>
            </CardFooter>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
        <PostList posts={restPosts} emptyMessage={emptyMessage} columns={1} basePath={basePath} />

        <aside className="space-y-5 rounded-xl border border-slate-200 bg-white p-4">
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {sidebarPrimary === "subcategories" ? "Subcategories" : "Categories"}
            </h2>
            <ul className="space-y-1 text-sm text-slate-700">
              {sidebarPrimary === "subcategories"
                ? subcategoryCounts.map(({ subcategory, count }) => (
                    <li key={subcategory}>
                      <Link
                        href={`/blog/subcategories/${subcategory}`}
                        className="flex items-center justify-between rounded px-2 py-1 hover:bg-slate-100"
                      >
                        <span>{formatSlugLabel(subcategory)}</span>
                        <span className="text-xs text-slate-500">{count}</span>
                      </Link>
                    </li>
                  ))
                : categoryCounts.map(({ category, count }) => (
                    <li key={category}>
                      <Link
                        href={`/blog/categories/${category}`}
                        className="flex items-center justify-between rounded px-2 py-1 hover:bg-slate-100"
                      >
                        <span>{formatSlugLabel(category)}</span>
                        <span className="text-xs text-slate-500">{count}</span>
                      </Link>
                    </li>
                  ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Archives
            </h2>
            <div className="space-y-2">
              {archives.map((group) => (
                <details key={group.year} className="rounded px-2 py-1">
                  <summary className="cursor-pointer text-sm font-medium text-slate-700">
                    {group.year}
                  </summary>
                  <ul className="mt-2 space-y-1 pl-4">
                    {group.months.map(({ month, count }) => (
                      <li key={`${group.year}-${month}`}>
                        <Link
                          href={`${currentPath}?archive=${group.year}-${month}`}
                          className="flex items-center justify-between rounded px-2 py-1 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          <span>{monthName(month)}</span>
                          <span className="text-xs text-slate-500">{count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {tagCounts.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`${currentPath}?tag=${tag}`}
                  className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-100"
                >
                  {formatSlugLabel(tag)} ({count})
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
