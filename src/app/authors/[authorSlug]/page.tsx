import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorBox } from "@/components/blog/author-box";
import { PostList } from "@/components/blog/post-list";
import { AUTHORS } from "@/data/authors";
import { getAllBlogPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

type Params = { authorSlug: string };

export async function generateStaticParams() {
  return Object.keys(AUTHORS).map((authorSlug) => ({ authorSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { authorSlug } = await params;
  const author = AUTHORS[authorSlug];

  return {
    title: author?.name ?? "Author",
    description: author?.description ?? "Author archive",
    alternates: {
      canonical: `${SITE_URL}/authors/${authorSlug}`,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { authorSlug } = await params;
  const author = AUTHORS[authorSlug];
  if (!author) notFound();

  const posts = await getAllBlogPosts();
  const authoredPosts = posts.filter((post) => post.frontmatter.author === authorSlug);

  return (
    <div className="space-y-6">
      <AuthorBox
        author={{
          slug: author.slug,
          name: author.name,
          description: author.description,
          image: author.image,
          socials: author.socials,
        }}
      />

      <PostList
        posts={authoredPosts}
        emptyMessage="No posts are currently attributed to this author."
        showAuthorMeta={false}
      />
    </div>
  );
}
