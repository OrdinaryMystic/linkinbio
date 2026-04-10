import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/post-list";
import { getAllBlogPosts } from "@/lib/content";
import { getContentPageBySlug, getContentPages } from "@/lib/content-pages";
import { filterPostsBySingleValue, formatSlugLabel } from "@/lib/blog-taxonomy-utils";
import { SITE_URL } from "@/lib/site";

type Params = { subcategory: string };

export async function generateStaticParams() {
  return getContentPages("src/content/taxonomy/categories")
    .filter((page) => Boolean(page.parent))
    .map((page) => ({ subcategory: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { subcategory } = await params;
  const pageContent = await getContentPageBySlug("src/content/taxonomy/categories", subcategory);

  return {
    title: pageContent?.title ?? formatSlugLabel(subcategory),
    description: pageContent?.description ?? `Posts in ${formatSlugLabel(subcategory)}.`,
    alternates: {
      canonical: `${SITE_URL}/blog/subcategories/${subcategory}`,
    },
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { subcategory } = await params;
  const subcategoryConfig = getContentPages("src/content/taxonomy/categories").find(
    (page) => page.slug === subcategory && Boolean(page.parent),
  );
  if (!subcategoryConfig) notFound();

  const [posts, pageContent] = await Promise.all([
    getAllBlogPosts(),
    getContentPageBySlug("src/content/taxonomy/categories", subcategory),
  ]);
  const filteredPosts = filterPostsBySingleValue(posts, "subcategory", subcategory);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-[var(--color-oxblood)]">Subcategory</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          {pageContent?.title ?? subcategoryConfig.title ?? formatSlugLabel(subcategory)}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ink)]">
          {pageContent?.description ?? subcategoryConfig.description}
        </p>
      </header>

      {pageContent?.contentHtml ? (
        <section
          className="prose-content max-w-none rounded border border-[var(--color-rule)] bg-[var(--color-bone)] p-5"
          dangerouslySetInnerHTML={{ __html: pageContent.contentHtml }}
        />
      ) : null}

      <PostList
        posts={filteredPosts}
        emptyMessage="No posts are currently assigned to this subcategory."
      />
    </div>
  );
}
