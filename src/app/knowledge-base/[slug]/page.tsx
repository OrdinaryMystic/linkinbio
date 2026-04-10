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
import { CalendarDays, FolderOpen, User } from "lucide-react";
import { Badge } from "@/components/badge";
import { DEFAULT_AUTHOR_SLUG, getAuthorBySlug } from "@/data/authors";
import { formatSlugLabel } from "@/lib/blog-taxonomy-utils";
import { getTaxonomyEntity } from "@/data/taxonomy";
import {
  type BlogPostFrontmatter,
  getAllKnowledgeBase,
  getEntryBySlug,
} from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { withUtmParams } from "@/lib/utils";

type Params = {
  slug: string;
};

/** Static export requires at least one param; remove when there is a published KB article. */
const KB_STATIC_EXPORT_PLACEHOLDER_SLUG = "__kb_static_export_placeholder__";

export async function generateStaticParams() {
  const posts = await getAllKnowledgeBase();
  if (posts.length === 0) {
    return [{ slug: KB_STATIC_EXPORT_PLACEHOLDER_SLUG }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllKnowledgeBase();
  const match = posts.find((post) => post.slug === slug);

  if (!match) {
    return {
      title: "Article not found",
    };
  }

  const fm = match.frontmatter;

  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical: `${SITE_URL}/knowledge-base/${slug}`,
    },
    openGraph: {
      title: fm.title,
      description: fm.description,
      url: `${SITE_URL}/knowledge-base/${slug}`,
      type: "article",
      publishedTime: fm.date,
      authors: [`${SITE_URL}/authors/${fm.author ?? "tyler-martin"}`],
      images: [
        {
          url: fm.image ? `${SITE_URL}${fm.image}` : `${SITE_URL}/images/featured/horizon.png`,
          width: 1200,
          height: 630,
          alt: fm.imageAlt ?? fm.title,
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

export default async function KnowledgeBasePostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const posts = await getAllKnowledgeBase();
  const match = posts.find((post) => post.slug === slug);

  if (!match) {
    notFound();
  }

  const entry = await getEntryBySlug("knowledge-base", slug);
  const fm = entry.frontmatter as BlogPostFrontmatter;
  const ctaEyebrow = fm.ctaEyebrow ?? "Ready for a reading?";
  const ctaTitle = fm.ctaTitle ?? "Want help applying this to your chart?";
  const ctaBody =
    fm.ctaBody ??
    "Get a practical reading in plain English focused on your actual patterns, timing, and next steps.";
  const ctaLabel = fm.ctaLabel ?? "Book a Reading";
  const ctaUrl = withUtmParams(fm.ctaUrl ?? "/book", {
    utm_source: "knowledge-base",
    utm_medium: "cta-card",
  });
  const category = fm.category;
  const author = getAuthorBySlug(fm.author);
  const absolutePostUrl = `${SITE_URL}/knowledge-base/${slug}`;
  const breadcrumbs = [
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: fm.title, href: `/knowledge-base/${slug}` },
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

  const faq = fm.faq;
  const faqJsonLd =
    faq?.length &&
    ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });

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
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <header className="space-y-3">
        <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-muted)]">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="inline-flex items-center gap-2">
              {index > 0 ? <span>/</span> : null}
              {index === breadcrumbs.length - 1 ? (
                <span>{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-[var(--color-ink)] hover:underline">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </header>

      <div className="relative h-60 w-full overflow-hidden rounded bg-[var(--color-bone-raised)] sm:h-80">
        <Image
          src={fm.image ?? "/images/placeholder-blog-1.svg"}
          alt={fm.imageAlt ?? fm.title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-bone)] sm:text-4xl">
            {fm.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-bone)]/90">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {new Date(fm.date).toLocaleDateString()}
            </span>
            {author.slug !== DEFAULT_AUTHOR_SLUG ? (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <Link
                  href={`/authors/${author.slug}`}
                  className="underline-offset-2 hover:text-[var(--color-bone)] hover:underline"
                >
                  {author.name}
                </Link>
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <FolderOpen className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {category ? (
                <Link
                  href={`/blog/categories/${category}`}
                  className="underline-offset-2 hover:text-[var(--color-bone)] hover:underline"
                >
                  {formatSlugLabel(category)}
                </Link>
              ) : (
                "Uncategorized"
              )}
            </span>
          </div>
        </div>
      </div>

      <section
        className="prose-content max-w-none"
        dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
      />

      <PostSidebar methodology={fm.methodology} sources={fm.sources} />

      <div className="overflow-hidden rounded border border-[var(--color-rule)]">
        <aside className="rounded-t border-0 bg-[var(--color-bone-raised)] p-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-oxblood)]">
              {ctaEyebrow}
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)]">
              {ctaTitle}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-ink)]">
              {ctaBody}
            </p>
            <Link href={ctaUrl} className="inline-block pt-1">
              <Button size="sm">{ctaLabel}</Button>
            </Link>
          </div>
        </aside>
        <AuthorBox
          embedded
          author={{
            slug: author.slug,
            name: author.name,
            bio: author.bio,
            image: author.image,
            socials: author.socials,
          }}
        />
      </div>

      <Comments />
      <RelatedPostsCarousel items={relatedPosts} basePath="/knowledge-base" />

      {linkedMetadata.length > 0 ? (
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)]">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
          {linkedMetadata.map((item) => (
            <Link key={item.href} href={item.href}>
              <Badge className="hover:bg-[var(--color-bone-raised)]">{item.label}</Badge>
            </Link>
          ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
