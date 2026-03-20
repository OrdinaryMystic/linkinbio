import Image from "next/image";
import Link from "next/link";
import { CalendarDays, FolderOpen, User } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/card";
import { getAuthorBySlug } from "@/data/authors";
import type { BlogPostFrontmatter, MarkdownListItem } from "@/lib/content";
import { formatSlugLabel } from "@/lib/blog-taxonomy-utils";

type PostListProps = {
  posts: MarkdownListItem<BlogPostFrontmatter>[];
  emptyMessage: string;
  columns?: 1 | 2;
  showAuthorMeta?: boolean;
};

export function PostList({
  posts,
  emptyMessage,
  columns = 2,
  showAuthorMeta = true,
}: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-sm text-slate-600">{emptyMessage}</p>;
  }

  return (
    <section className={columns === 1 ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
      {posts.map((post) => (
        <Card key={post.slug} className="flex gap-4 p-4 sm:flex-row">
          <div className="relative h-24 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-32 sm:w-40">
            <Image
              src={post.frontmatter.image ?? "/images/placeholder-blog-1.svg"}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-3">
            <CardHeader className="mb-0">
              <CardTitle>
                <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">
                  {post.frontmatter.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(post.frontmatter.date).toLocaleDateString()}
                </p>
                {showAuthorMeta ? (
                  <p className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <Link
                      href={`/authors/${getAuthorBySlug(post.frontmatter.author).slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {getAuthorBySlug(post.frontmatter.author).name}
                    </Link>
                  </p>
                ) : null}
                <p className="flex items-center gap-1.5">
                  <FolderOpen className="h-3.5 w-3.5" />
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
                </p>
              </div>
              <CardFooter className="mt-0">
              <Link href={`/blog/${post.slug}`}>
                <Button size="sm">Read Post</Button>
              </Link>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}
