import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { ReaderMilestone } from "@/components/analytics/reader-milestone";
import { AuthorBox } from "@/components/blog/author-box";
import { Comments } from "@/components/blog/comments";
import { PostSidebar } from "@/components/blog/post-sidebar";
import { RelatedPostsCarousel } from "@/components/blog/related-posts-carousel";
import { Badge } from "@/components/badge";
import { getAuthorBySlug } from "@/data/authors";
import { getTaxonomyEntity } from "@/data/taxonomy";
import { type BlogPostFrontmatter, getAllBlogPosts, getEntryBySlug } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { withUtmParams } from "@/lib/utils";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const match = posts.find((post) => post.slug === slug);

  if (!match) {
    return {
      title: "Post not found",
    };
  }

  const fm = match.frontmatter;

  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: fm.title,
      description: fm.description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: fm.date,
      authors: [`${SITE_URL}/authors/${fm.author ?? "tyler-martin"}`],
      images: [
        {
          url: fm.image ? `${SITE_URL}${fm.image}` : `${SITE_URL}/images/featured/horizon.png`,
          width: 1200,
          height: 630,
          alt: fm.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: [fm.image ? `${SITE_URL}${fm.image}` : `${SITE_URL}/images/featured/horizon.png`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const match = posts.find((post) => post.slug === slug);

  if (!match) {
    notFound();
  }

  const entry = await getEntryBySlug("blog", slug);
  const fm = entry.frontmatter as BlogPostFrontmatter;
  const ctaEyebrow = fm.ctaEyebrow ?? "Ready for a reading?";
  const ctaTitle = fm.ctaTitle ?? "Want help applying this to your chart?";
  const ctaBody =
    fm.ctaBody ??
    "Get a practical reading in plain English focused on your actual patterns, timing, and next steps.";
  const ctaLabel = fm.ctaLabel ?? "Book a Reading";
  const ctaUrl = withUtmParams(fm.ctaUrl ?? "/book", {
    utm_source: "blog",
    utm_medium: "cta-card",
  });
  const category = fm.category;
  const subcategory = fm.subcategory;
  const author = getAuthorBySlug(fm.author);
  const absolutePostUrl = `${SITE_URL}/blog/${slug}`;
  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    ...(category
      ? [{ label: category.replaceAll("-", " "), href: `/blog/categories/${category}` }]
      : []),
    ...(subcategory
      ? [{ label: subcategory.replaceAll("-", " "), href: `/blog/subcategories/${subcategory}` }]
      : []),
    { label: fm.title, href: `/blog/${slug}` },
  ];

  const currentTags = new Set(fm.tags ?? []);
  const relatedPosts = posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sameCategory =
        Boolean(fm.category) &&
        Boolean(post.frontmatter.category) &&
        fm.category === post.frontmatter.category;
      const sharedTagCount = (post.frontmatter.tags ?? []).filter((tag) =>
        currentTags.has(tag),
      ).length;
      const hasSharedTags = sharedTagCount > 0;

      let priority = 0;
      if (sameCategory && hasSharedTags) priority = 1;
      else if (sameCategory) priority = 2;
      else if (hasSharedTags) priority = 3;

      return { post, priority, sharedTagCount };
    })
    .filter((item) => item.priority > 0)
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      if (a.sharedTagCount !== b.sharedTagCount) return b.sharedTagCount - a.sharedTagCount;
      return (
        new Date(b.post.frontmatter.date).getTime() -
        new Date(a.post.frontmatter.date).getTime()
      );
    })
    .slice(0, 3)
    .map((item) => item.post);

  const linkedMetadata = [
    ...(fm.planets ?? []).map((value) => ({
      label: getTaxonomyEntity("planets", value)?.title ?? value.replaceAll("-", " "),
      href: `/blog/planets/${value}`,
    })),
    ...(fm.signs ?? []).map((value) => ({
      label: getTaxonomyEntity("signs", value)?.title ?? value.replaceAll("-", " "),
      href: `/blog/signs/${value}`,
    })),
    ...(fm.houses ?? []).map((value) => ({
      label: getTaxonomyEntity("houses", value)?.title ?? value.replaceAll("-", " "),
      href: `/blog/houses/${value}`,
    })),
    ...(fm.cards ?? []).map((value) => ({
      label: getTaxonomyEntity("cards", value)?.title ?? value.replaceAll("-", " "),
      href: `/blog/cards/${value}`,
    })),
    ...(fm.tags ?? []).map((value) => ({
      label: value.replaceAll("-", " "),
      href: `/blog/tags/${value}`,
    })),
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.date,
    mainEntityOfPage: absolutePostUrl,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${SITE_URL}/authors/${author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: fm.image ? `${SITE_URL}${fm.image}` : undefined,
    articleSection: [fm.category, fm.subcategory].filter(Boolean),
    keywords: fm.tags,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <article className="space-y-6">
      <ReaderMilestone slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="space-y-3">
        <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="inline-flex items-center gap-2">
              {index > 0 ? <span>/</span> : null}
              {index === breadcrumbs.length - 1 ? (
                <span>{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-slate-700 hover:underline">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </header>

      <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-slate-100 shadow-lg sm:h-80">
        <Image
          src={fm.image ?? "/images/placeholder-blog-1.svg"}
          alt={fm.title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-0 shadow-inner" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <h1 className="font-heading text-2xl font-black tracking-tight text-white sm:text-4xl">
            {fm.title}
          </h1>
          <p className="mt-2 text-xs text-white/90">
            {new Date(fm.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {linkedMetadata.length > 0 ? (
        <section className="flex flex-wrap gap-2">
          {linkedMetadata.map((item) => (
            <Link key={item.href} href={item.href}>
              <Badge className="hover:bg-slate-100">{item.label}</Badge>
            </Link>
          ))}
        </section>
      ) : null}

      <section
        className="prose-content max-w-none"
        dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
      />

      <PostSidebar methodology={fm.methodology} sources={fm.sources} />

      <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {ctaEyebrow}
          </p>
          <h2 className="font-heading text-2xl font-black tracking-tight text-slate-900">
            {ctaTitle}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
            {ctaBody}
          </p>
          <Link href={ctaUrl} className="inline-block pt-1">
            <Button size="sm">{ctaLabel}</Button>
          </Link>
        </div>
      </aside>

      <Comments />
      <AuthorBox
        author={{
          slug: author.slug,
          name: author.name,
          bio: author.bio,
          image: author.image,
          socials: author.socials,
        }}
      />
      <RelatedPostsCarousel items={relatedPosts} />
    </article>
  );
}

