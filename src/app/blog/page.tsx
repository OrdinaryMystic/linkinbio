import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getAllBlogPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Short, grounded essays on tarot, astrology, and reflective practice—without the theatrics.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const posts = await getAllBlogPosts();
  const resolvedSearchParams = searchParams ?? {};
  const tag = Array.isArray(resolvedSearchParams?.tag)
    ? resolvedSearchParams?.tag[0]
    : resolvedSearchParams?.tag;
  const archive = Array.isArray(resolvedSearchParams?.archive)
    ? resolvedSearchParams?.archive[0]
    : resolvedSearchParams?.archive;

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Blog
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
          Essays and notes on tarot, astrology, and reflective tools—written for
          people who like nuance more than predictions.
        </p>
      </header>

      <BlogExplorer
        posts={posts}
        currentPath="/blog"
        activeTag={tag}
        activeArchive={archive}
        emptyMessage="No posts match your current search."
      />
    </div>
  );
}
