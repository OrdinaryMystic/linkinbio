import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Container } from "@/components/container";
import { ScrollOnHash } from "@/components/scroll-on-hash";
import {
  DIGITAL_TAROT_APP_URL,
  SITE_LIVE_MODE,
  TIKTOK_LIVE_ASTROLOGY_URL,
  TIKTOK_LIVE_TAROT_URL,
  TIKTOK_URL,
} from "@/lib/config";
import { TarotCardsIcon } from "@/components/tarot-cards-icon";
import { getAllBlogPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ordinary Mystic – Tarot & Astrology | Readings, Writing, and Tools",
  description:
    "Readings, writing, and tools for finding meaning in the patterns of ordinary life. Tarot and astrology as structured thinking.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

const sectionPadding = "py-16 sm:py-20";

export default async function Home() {
  const allPosts = await getAllBlogPosts();
  const featuredPost = allPosts.find((p) => p.frontmatter.featured) ?? allPosts[0];
  const recentPosts = allPosts
    .filter((p) => p.slug !== featuredPost?.slug)
    .slice(0, 3);

  return (
    <div className="-mt-10 -mb-16 pb-0">
      <ScrollOnHash hash="#book" />

      {/* HERO */}
      <section
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen flex items-center overflow-hidden ${SITE_LIVE_MODE ? "hero-live-pulse" : ""}`}
        aria-label="Hero"
        style={{ backgroundColor: "#1a1614" }}
      >
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          {SITE_LIVE_MODE ? (
            <Link
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mb-6 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
              style={{
                color: "var(--color-bone)",
                border: "1px solid var(--color-oxblood)",
                backgroundColor: "rgba(122, 46, 42, 0.15)",
              }}
            >
              <span className="h-2.5 w-2.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-oxblood)" }} aria-hidden />
              Live on TikTok
            </Link>
          ) : null}
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[var(--color-bone)]">
            Ordinary Mystic
          </h1>
          <p className="mt-2 font-heading text-lg italic tracking-wide sm:text-xl text-[#9a8d7d]">
            Tarot & Astrology
          </p>
          <p className="mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-[#9a8d7d]">
            Readings, writing, and tools for finding meaning in the patterns of ordinary life.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/blog">
              <Button
                type="button"
                size="lg"
                className="bg-[var(--color-oxblood)] text-[var(--color-bone)] hover:bg-[var(--color-oxblood-hover)]"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Read the Blog
              </Button>
            </Link>
            <Link href="/about">
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-[#9a8d7d] bg-transparent text-[#f5f0e8] hover:bg-white/5"
              >
                About the project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {SITE_LIVE_MODE ? (
        <section
          className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
          style={{ backgroundColor: "var(--color-bone-raised)" }}
        >
          <Container className="px-4 sm:px-6">
            <h2 className="font-heading text-center text-3xl font-bold tracking-tight sm:text-4xl text-[var(--color-ink)]">
              Book a TikTok Live Reading
            </h2>
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="space-y-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
                  >
                    <TarotCardsIcon className="h-5 w-5" />
                  </div>
                  <CardTitle>Live Tarot Reading</CardTitle>
                  <CardDescription>
                    A focused tarot reading live in the TikTok room. One topic or one clear question in 20 minutes, with practical direction.
                  </CardDescription>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    20 minutes · <span className="line-through text-[var(--color-muted)]">$20</span>{" "}
                    <span className="font-bold text-[var(--color-oxblood)]">$1</span> with coupon code{" "}
                    <span className="font-bold text-[var(--color-ink)]">LIVE</span>
                  </p>
                </CardHeader>
                <CardFooter>
                  <Link href={TIKTOK_LIVE_TAROT_URL} target="_blank" rel="noopener noreferrer">
                    <Button type="button" size="sm">
                      Book Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="space-y-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
                  >
                    <TarotCardsIcon className="h-5 w-5" />
                  </div>
                  <CardTitle>Live Astrology Reading</CardTitle>
                  <CardDescription>
                    A live 20-minute astrology reading in front of the room for one topic or question. An accurate birth time is required.
                  </CardDescription>
                  <p className="text-sm font-medium text-[var(--color-ink)]">20 minutes · $20</p>
                </CardHeader>
                <CardFooter>
                  <Link href={TIKTOK_LIVE_ASTROLOGY_URL} target="_blank" rel="noopener noreferrer">
                    <Button type="button" size="sm">
                      Book Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </Container>
        </section>
      ) : null}

      {/* SECTION: Featured Writing */}
      <section
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
        style={{ backgroundColor: "var(--color-bone)" }}
      >
        <Container className="px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
                From the blog
              </p>
              <h2 className="font-heading mt-1 text-3xl font-bold tracking-tight sm:text-4xl text-[var(--color-ink)]">
                Recent Writings
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
            >
              All posts
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Featured post */}
          {featuredPost ? (
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="space-y-3">
                  {featuredPost.frontmatter.category ? (
                    <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-oxblood)]">
                      {featuredPost.frontmatter.category
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </p>
                  ) : null}
                  <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl text-[var(--color-ink)] group-hover:underline underline-offset-4">
                    {featuredPost.frontmatter.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--color-muted)] line-clamp-3">
                    {featuredPost.frontmatter.description}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {new Date(featuredPost.frontmatter.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
              </div>
            </Link>
          ) : null}

          {/* More posts */}
          {recentPosts.length > 0 ? (
            <div
              className="mt-12 pt-10 grid gap-8 md:grid-cols-3"
              style={{ borderTop: "1px solid var(--color-rule)" }}
            >
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="space-y-3">
                    {post.frontmatter.category ? (
                      <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-oxblood)]">
                        {post.frontmatter.category
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </p>
                    ) : null}
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-[var(--color-ink)] group-hover:underline underline-offset-4">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--color-muted)] line-clamp-2">
                      {post.frontmatter.description}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          ) : null}

          <p className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
            >
              Read all posts
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </Container>
      </section>

      {/* SECTION: Philosophy strip */}
      <section
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
        style={{
          backgroundColor: "var(--color-bone-raised)",
          borderTop: "1px solid var(--color-rule)",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <Container className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl space-y-3">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                Tyler Martin
              </h2>
              <p className="text-base leading-relaxed text-[var(--color-ink)]">
                I use tarot and astrology as pattern-recognition tools — structured
                ways to map timing, friction, and possibility. No scripts about fate.
                No vague predictions. Just clear thinking applied to symbolic systems
                that have been around longer than most of us give them credit for.
              </p>
              <p className="text-base leading-relaxed text-[var(--color-ink)]">
                I write about how these systems actually work when you strip the
                theatrics away, and I build tools for practitioners who want to track
                and deepen their practice over time.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
              >
                More about the project
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
          </div>
        </Container>
      </section>

      {/* SECTION: Querent */}
      <section
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
        style={{ backgroundColor: "#1a1614" }}
      >
        <Container className="px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-[#9a8d7d]">
              In development
            </p>
            <h2 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-[var(--color-bone)]">
              Querent
            </h2>
            <p className="mt-2 font-heading text-base italic text-[#9a8d7d]">
              A reading companion that learns you.
            </p>
            <p className="mt-6 text-base leading-relaxed max-w-lg mx-auto text-[#9a8d7d]">
              Querent is software for tarot and astrology practitioners who want
              better tools for logging readings, tracking patterns, and building a
              personal reference system that grows with their practice.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/blog">
                <Button
                  type="button"
                  size="md"
                  variant="outline"
                  className="border-[#9a8d7d] bg-transparent text-[#f5f0e8] hover:bg-white/5"
                  rightIcon={<PenLine className="h-4 w-4" />}
                >
                  Follow the build log
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs max-w-sm mx-auto text-[#9a8d7d]">
              Still early. The ideas get tested in real readings and written about on
              the blog before they become features.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION: Tools for Practitioners */}
      <section
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
        style={{ backgroundColor: "var(--color-bone)" }}
      >
        <Container className="px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-[var(--color-ink)]">
              Tools for Practitioners
            </h2>
            <p className="mt-3 text-base max-w-xl mx-auto text-[var(--color-muted)]">
              Systems and software for people who want to track their practice, not just do it.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader className="space-y-2">
                <CardTitle>Simple Tarot Journal</CardTitle>
                <CardDescription>
                  A searchable Notion template to log readings and card pulls, build a living card library, and surface past insights when you need them.
                </CardDescription>
                <p className="text-xs text-[var(--color-muted)]">Notion template</p>
                <p className="text-sm font-medium text-[var(--color-ink)]">$12</p>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Link href="https://ordinarymystic.gumroad.com/l/tarotjournal" target="_blank" rel="noopener noreferrer">
                  <Button type="button" size="sm">
                    Buy now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader className="space-y-2">
                <CardTitle>Complete Tarot Dashboard</CardTitle>
                <CardDescription>
                  Advanced Notion system to track readings in full detail — upright and reversed cards, contextual meanings, and statistics that deepen over time.
                </CardDescription>
                <p className="text-xs text-[var(--color-muted)]">Notion template</p>
                <p className="text-sm font-medium text-[var(--color-ink)]">$32</p>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Link href="https://ordinarymystic.gumroad.com/l/tarotdashboard" target="_blank" rel="noopener noreferrer">
                  <Button type="button" size="sm">
                    Buy now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader className="space-y-2">
                <CardTitle>Digital Tarot</CardTitle>
                <CardDescription>
                  A free desktop web app to shuffle, pull, and rearrange tarot cards. Currently in beta.
                </CardDescription>
                <p className="text-xs text-[var(--color-muted)]">Free web app</p>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Link href={DIGITAL_TAROT_APP_URL} target="_blank" rel="noopener noreferrer">
                  <Button type="button" size="sm" variant="outline" rightIcon={<ExternalLink className="h-4 w-4" />}>
                    Try now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
            >
              Browse all resources
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </Container>
      </section>

      {/* SECTION: Work with me */}
      <section
        id="book"
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
        style={{ backgroundColor: "var(--color-bone-raised)" }}
      >
        <Container className="px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-[var(--color-ink)]">
              Work With Me
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              One-on-one readings for people who want a structured conversation, not a
              performance. Tarot, astrology, or both — via Zoom or in person in Tulsa.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
            <div
              className="p-6 space-y-3"
              style={{
                backgroundColor: "var(--color-bone)",
                border: "1px solid var(--color-rule)",
              }}
            >
              <h3 className="font-heading text-lg font-bold tracking-tight text-[var(--color-ink)]">
                Tarot
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                Structured readings around a specific question or theme. Written, recorded, or live.
              </p>
              <p className="text-sm font-medium text-[var(--color-ink)]">From $40</p>
            </div>
            <div
              className="p-6 space-y-3"
              style={{
                backgroundColor: "var(--color-bone)",
                border: "1px solid var(--color-rule)",
              }}
            >
              <h3 className="font-heading text-lg font-bold tracking-tight text-[var(--color-ink)]">
                Astrology
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                Natal chart interpretation and transit forecasting. Requires accurate birth time.
              </p>
              <p className="text-sm font-medium text-[var(--color-ink)]">From $55</p>
            </div>
            <div
              className="p-6 space-y-3"
              style={{
                backgroundColor: "var(--color-bone)",
                border: "1px solid var(--color-rule)",
              }}
            >
              <h3 className="font-heading text-lg font-bold tracking-tight text-[var(--color-ink)]">
                Combined
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                Both systems in a single extended session. Chart for timing; cards for nuance.
              </p>
              <p className="text-sm font-medium text-[var(--color-ink)]">From $130</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/book">
              <Button
                type="button"
                size="md"
                variant="outline"
                className="mt-2"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                See all reading options
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
