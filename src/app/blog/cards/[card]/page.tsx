import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/post-list";
import { RelatedEntities } from "@/components/blog/related-entities";
import { getTaxonomyEntities, getTaxonomyEntity } from "@/data/taxonomy";
import { getAllBlogPosts } from "@/lib/content";
import { getContentPageBySlug } from "@/lib/content-pages";
import { filterPostsByListValue } from "@/lib/blog-taxonomy-utils";
import { SITE_URL } from "@/lib/site";

type Params = { card: string };

export async function generateStaticParams() {
  return getTaxonomyEntities("cards").map((entity) => ({ card: entity.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { card } = await params;
  const entity = getTaxonomyEntity("cards", card);

  return {
    title: entity?.title ?? card,
    description: entity?.description ?? `Posts related to ${card}.`,
    alternates: {
      canonical: `${SITE_URL}/blog/cards/${card}`,
    },
  };
}

export default async function CardPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { card } = await params;
  const entity = getTaxonomyEntity("cards", card);
  if (!entity) notFound();

  const [posts, pageContent] = await Promise.all([
    getAllBlogPosts(),
    getContentPageBySlug("src/content/taxonomy/cards", card),
  ]);
  const filteredPosts = filterPostsByListValue(posts, "cards", card);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-[var(--color-oxblood)]">Card</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          {pageContent?.title ?? entity.title}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-ink)]">
          {pageContent?.description ?? entity.description}
        </p>
      </header>

      {pageContent?.contentHtml ? (
        <section
          className="prose-content max-w-none rounded border border-[var(--color-rule)] bg-[var(--color-bone)] p-5"
          dangerouslySetInnerHTML={{ __html: pageContent.contentHtml }}
        />
      ) : null}

      <RelatedEntities entity={entity} />

      <PostList
        posts={filteredPosts}
        emptyMessage="No posts are currently associated with this card."
      />
    </div>
  );
}
