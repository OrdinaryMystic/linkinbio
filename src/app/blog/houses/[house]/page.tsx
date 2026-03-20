import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/post-list";
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
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">House</p>
        <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {pageContent?.title ?? entity.title}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
          {pageContent?.description ?? entity.description}
        </p>
      </header>

      {pageContent?.contentHtml ? (
        <section
          className="prose-content max-w-none rounded-xl border border-slate-200 bg-white p-5"
          dangerouslySetInnerHTML={{ __html: pageContent.contentHtml }}
        />
      ) : null}

      <RelatedEntities entity={entity} />

      <PostList
        posts={filteredPosts}
        emptyMessage="No posts are currently associated with this house."
      />
    </div>
  );
}
