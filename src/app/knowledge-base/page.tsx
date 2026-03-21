import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getAllKnowledgeBase } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description:
    "Reference guides and how-to articles on tarot, astrology, and reflective practice.",
  alternates: {
    canonical: `${SITE_URL}/knowledge-base`,
  },
};

export default async function KnowledgeBaseIndexPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const posts = await getAllKnowledgeBase();
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
          Knowledge Base
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
          Reference guides and how-to articles on tarot, astrology, and reflective
          practice.
        </p>
      </header>

      <BlogExplorer
        posts={posts}
        currentPath="/knowledge-base"
        activeTag={tag}
        activeArchive={archive}
        emptyMessage="No articles yet."
        basePath="/knowledge-base"
      />
    </div>
  );
}
