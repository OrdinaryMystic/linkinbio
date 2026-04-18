import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { PageHeader } from "@/components/page-header";
import { getAllBlogPosts } from "@/lib/content";
import { filterPostsByListValue, formatSlugLabel } from "@/lib/blog-taxonomy-utils";
import { SITE_URL } from "@/lib/site";

type Params = { tag: string };

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      tags.add(tag);
    }
  }
  return [...tags].map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  const label = formatSlugLabel(tag);

  return {
    title: `${label} tag`,
    description: `Posts tagged with ${label}.`,
    alternates: {
      canonical: `${SITE_URL}/blog/tags/${tag}`,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const posts = await getAllBlogPosts();
  const filteredPosts = filterPostsByListValue(posts, "tags", tag);

  return (
    <div>
      <PageHeader
        eyebrow="Tag"
        title={formatSlugLabel(tag)}
        description={`Posts tagged with ${formatSlugLabel(tag)}.`}
      />

      <PostList posts={filteredPosts} emptyMessage="No posts are currently tagged this way." />
    </div>
  );
}
