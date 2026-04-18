import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/post-list";
import { PageHeader } from "@/components/page-header";
import { RelatedEntities } from "@/components/blog/related-entities";
import { getTaxonomyEntities, getTaxonomyEntity } from "@/data/taxonomy";
import { getAllBlogPosts } from "@/lib/content";
import { getContentPageBySlug } from "@/lib/content-pages";
import { filterPostsByListValue } from "@/lib/blog-taxonomy-utils";
import { SITE_URL } from "@/lib/site";

type Params = { house: string };

export async function generateStaticParams() {
  return getTaxonomyEntities("houses").map((entity) => ({ house: entity.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { house } = await params;
  const entity = getTaxonomyEntity("houses", house);

  return {
    title: entity?.title ?? house,
    description: entity?.description ?? `Posts related to ${house}.`,
    alternates: {
      canonical: `${SITE_URL}/blog/houses/${house}`,
    },
  };
}

export default async function HousePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { house } = await params;
  const entity = getTaxonomyEntity("houses", house);
  if (!entity) notFound();

  const [posts, pageContent] = await Promise.all([
    getAllBlogPosts(),
    getContentPageBySlug("src/content/taxonomy/houses", house),
  ]);
  const filteredPosts = filterPostsByListValue(posts, "houses", house);

  return (
    <div>
      <PageHeader
        eyebrow="House"
        title={pageContent?.title ?? entity.title}
        description={pageContent?.description ?? entity.description}
      />

      {pageContent?.contentHtml ? (
        <section
          className="prose-content mb-10 max-w-none border-y border-[var(--color-rule)] bg-[var(--color-bone-raised)] p-6"
          dangerouslySetInnerHTML={{ __html: pageContent.contentHtml }}
        />
      ) : null}

      <div className="mb-10">
        <RelatedEntities entity={entity} />
      </div>

      <PostList
        posts={filteredPosts}
        emptyMessage="No posts are currently associated with this house."
      />
    </div>
  );
}
