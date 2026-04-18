import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/post-list";
import { PageHeader } from "@/components/page-header";
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
    <div>
      <PageHeader
        eyebrow="Subcategory"
        title={pageContent?.title ?? subcategoryConfig.title ?? formatSlugLabel(subcategory)}
        description={pageContent?.description ?? subcategoryConfig.description}
      />

      {pageContent?.contentHtml ? (
        <section
          className="prose-content mb-10 max-w-none border-y border-[var(--color-rule)] bg-[var(--color-bone-raised)] p-6"
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
