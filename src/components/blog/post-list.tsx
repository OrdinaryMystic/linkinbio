import Link from "next/link";
import { CalendarDays, FolderOpen, User } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle } from "@/components/card";
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

export function PostList({
  posts,
  emptyMessage,
  columns = 2,
  showAuthorMeta = true,
  basePath = "/blog",
}: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-sm text-[var(--color-muted)]">{emptyMessage}</p>;
  }

  return (
    <section className={columns === 1 ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
      {posts.map((post) => (
        <Card key={post.slug} className="flex flex-col gap-4 p-4">
          <div className="flex min-w-0 flex-1 flex-col">
            <CardHeader className="mb-2">
              <CardTitle>
                <Link href={`${basePath}/${post.slug}`} className="hover:underline underline-offset-4">
                  {post.frontmatter.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <div className="mt-auto flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
              <div className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)] sm:w-auto sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                  {new Date(post.frontmatter.date).toLocaleDateString()}
                </span>
                {showAuthorMeta &&
                getAuthorBySlug(post.frontmatter.author).slug !== DEFAULT_AUTHOR_SLUG ? (
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 shrink-0" />
                    <Link
                      href={`/authors/${getAuthorBySlug(post.frontmatter.author).slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {getAuthorBySlug(post.frontmatter.author).name}
                    </Link>
                  </span>
                ) : null}
                <span className="flex items-center gap-1.5">
                  <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                  {post.frontmatter.category ? (
                    <Link
                      href={`/blog/categories/${post.frontmatter.category}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {formatSlugLabel(post.frontmatter.category)}
                    </Link>
                  ) : (
                    "Uncategorized"
                  )}
                </span>
              </div>
              <Link href={`${basePath}/${post.slug}`} className="block w-full sm:w-auto sm:flex-shrink-0">
                <Button size="sm" variant="outline" className="w-full justify-center whitespace-nowrap sm:w-auto">Read Post</Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}
