import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { BLOG_CATEGORIES } from "@/data/blog-taxonomy";
import { getAllBlogPosts } from "@/lib/content";
import { getContentPageBySlug } from "@/lib/content-pages";
import { filterPostsBySingleValue, formatSlugLabel } from "@/lib/blog-taxonomy-utils";
import { SITE_URL } from "@/lib/site";

type Params = { category: string };

export async function generateStaticParams() {
  return Object.keys(BLOG_CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const pageContent = await getContentPageBySlug("src/content/taxonomy/categories", category);
  const categoryConfig = BLOG_CATEGORIES[category];

  return {
    title: pageContent?.title ?? categoryConfig?.title ?? formatSlugLabel(category),
    description:
      pageContent?.description ??
      categoryConfig?.description ??
      `Posts in ${formatSlugLabel(category)}.`,
    alternates: {
      canonical: `${SITE_URL}/blog/categories/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const { category } = await params;
  const categoryConfig = BLOG_CATEGORIES[category];
  if (!categoryConfig) notFound();
  const tag = Array.isArray(searchParams?.tag) ? searchParams?.tag[0] : searchParams?.tag;
  const archive = Array.isArray(searchParams?.archive)
    ? searchParams?.archive[0]
    : searchParams?.archive;

  const [posts, pageContent] = await Promise.all([
    getAllBlogPosts(),
    getContentPageBySlug("src/content/taxonomy/categories", category),
  ]);
  const filteredPosts = filterPostsBySingleValue(posts, "category", category);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-[var(--color-oxblood)]">Category</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          {pageContent?.title ?? categoryConfig.title ?? formatSlugLabel(category)}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ink)]">
          {pageContent?.description ?? categoryConfig.description}
        </p>
      </header>

      <BlogExplorer
        posts={filteredPosts}
        currentPath={`/blog/categories/${category}`}
        activeTag={tag}
        activeArchive={archive}
        sidebarPrimary="subcategories"
        emptyMessage="No posts are currently assigned to this category."
      />
    </div>
  );
}
