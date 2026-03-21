import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  FolderOpen,
  User,
  Video,
  FileText,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { TarotCardsIcon } from "@/components/tarot-cards-icon";
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
import { DEFAULT_AUTHOR_SLUG, getAuthorBySlug } from "@/data/authors";
import {
  CONTACT_EMAIL,
  DIGITAL_TAROT_APP_URL,
  LIVE_READINGS_URL,
  RECORDED_READING_URL,
  SITE_LIVE_MODE,
  TIKTOK_LIVE_ASTROLOGY_URL,
  TIKTOK_LIVE_TAROT_URL,
  TIKTOK_URL,
  WRITTEN_REPORT_URL,
} from "@/lib/config";
import { CurrentForecastBanner } from "@/components/blog/current-forecast-banner";
import { getAllBlogPosts, getAllForecasts } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ordinary Mystic Readings – Practical Tarot and Astrology Without the Woo",
  description:
    "Practical tarot and astrology without the woo. Book a live reading (Zoom or Tulsa), a recorded reading, or a written PDF report.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

const sectionPadding = "py-16 sm:py-20";

export default async function Home() {
  const [recentPosts, forecasts] = await Promise.all([
    getAllBlogPosts().then((posts) => posts.slice(0, 3)),
    getAllForecasts(),
  ]);
  const latestForecast = forecasts[0];

  return (
    <div className="-mt-10 -mb-16 pb-0">
      <ScrollOnHash hash="#book" />

      {/* HERO — full-width gradient #151326 → #213752 */}
      <section
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-[32rem] flex items-center overflow-hidden bg-gradient-to-br from-[#151326] via-[#1a2742] to-[#213752] ${SITE_LIVE_MODE ? "hero-live-pulse" : ""}`}
        aria-label="Hero"
      >
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "var(--hero-bg-image, none)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#151326]/90 via-[#1a2742]/90 to-[#213752]/90" aria-hidden />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          {SITE_LIVE_MODE ? (
            <Link
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-400/10 px-3 py-1.5 text-sm font-medium text-rose-100 hover:bg-rose-400/20"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" aria-hidden />
              Live on TikTok
            </Link>
          ) : null}
          <h1 className="font-heading text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ordinary Mystic Readings
          </h1>
          <p className="mt-5 text-lg text-slate-200 sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Practical tarot and astrology without the woo. Affordable readings and resources for bringing the mystical into your ordinary life.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#book">
              <Button
                type="button"
                size="lg"
                className="bg-white text-[#151326] hover:bg-slate-100 focus-visible:ring-white focus-visible:ring-offset-[#151326]"
                leftIcon={<CalendarDays className="h-4 w-4" />}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Book a reading
              </Button>
            </a>
            <Link href="/blog">
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white focus-visible:ring-white focus-visible:ring-offset-[#151326]"
                leftIcon={<BookOpen className="h-4 w-4" />}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Read blog
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://www.youtube.com/@OrdinaryMysticReadings"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity"
              aria-label="YouTube"
            >
              <Image
                src="/images/youtube-app-white-icon.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity"
              aria-label="TikTok"
            >
              <Image
                src="/images/tiktok-white-icon.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </a>
            <a
              href="https://cash.app/$ordinarymystic"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity"
              aria-label="Cash App"
            >
              <Image
                src="/images/cashapp-white-icon.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </a>
            <a
              href="https://paypal.me/ordinarymystic"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity"
              aria-label="PayPal"
            >
              <Image
                src="/images/paypal-white-icon.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="opacity-90 hover:opacity-100 transition-opacity"
              aria-label="Email"
            >
              <Image
                src="/images/email-white-icon.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </a>
          </div>
        </div>
      </section>

      {SITE_LIVE_MODE ? (
        <section
          className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
          style={{ backgroundColor: "#faf8f6" }}
        >
          <Container className="px-4 sm:px-6">
            <h2 className="font-heading text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Book a TikTok Live Reading
            </h2>
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2a4a] text-white">
                    <TarotCardsIcon className="h-5 w-5" />
                  </div>
                  <CardTitle>Live Tarot Reading</CardTitle>
                  <CardDescription>
                    A focused tarot reading live in the TikTok room. We&apos;ll keep it to one topic or one clear question in 20 minutes, with practical direction and no deep-dive detours.
                  </CardDescription>
                  <p className="text-sm font-medium text-slate-700">
                    20 minutes · <span className="line-through text-slate-500">$20</span>{" "}
                    <span className="font-bold text-rose-700">$1</span> with coupon code{" "}
                    <span className="font-bold text-slate-900">LIVE</span>
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2a4a] text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <CardTitle>Live Astrology Reading</CardTitle>
                  <CardDescription>
                    A live 20-minute astrology reading in front of the room for one topic or one question. It&apos;s meant to be clear and concise, and an accurate birth time is required.
                  </CardDescription>
                  <p className="text-sm font-medium text-slate-700">20 minutes · $20</p>
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

      {/* SECTION: Book a Reading — warm off-white */}
      <section
        id="book"
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
        style={{ backgroundColor: "#eef1f5" }}
      >
        <Container className="px-4 sm:px-6">
          <h2 className="font-heading text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {SITE_LIVE_MODE ? "Book a Private Reading" : "Book a Reading"}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2a4a] text-white">
                  <TarotCardsIcon className="h-5 w-5" />
                </div>
                <CardTitle>Live Reading</CardTitle>
                <CardDescription>
                  One-on-one tarot or astrology in real time—via Zoom or in person in Tulsa, OK. Bring your questions and we&apos;ll work through them together.
                </CardDescription>
                <p className="text-sm font-medium text-slate-700">1 hour · $60</p>
              </CardHeader>
              <CardFooter>
                <Link href={LIVE_READINGS_URL} target="_blank">
                  <Button type="button" size="sm">
                    Book Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2a4a] text-white">
                  <Video className="h-5 w-5" />
                </div>
                <CardTitle>Recorded Reading</CardTitle>
                <CardDescription>
                  A recorded reading you can watch on your own time. Send your question and context; receive a private video and notes.
                </CardDescription>
                <p className="text-sm font-medium text-slate-700">30 minutes · $30</p>
              </CardHeader>
              <CardFooter>
                <Link href={RECORDED_READING_URL} target="_blank">
                  <Button type="button" size="sm">
                    Book Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2a4a] text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <CardTitle>Written Report</CardTitle>
                <CardDescription>
                  Your reading delivered as a PDF report. No video, no call. Ideal if you prefer to read and revisit at your own pace.
                </CardDescription>
                <p className="text-sm font-medium text-slate-700">$15</p>
              </CardHeader>
              <CardFooter>
                <Link href={WRITTEN_REPORT_URL} target="_blank">
                  <Button type="button" size="sm">
                    Book Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              Learn More
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </Container>
      </section>

      {/* SECTION: Recent Posts — clean white */}
      <section
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
        style={{ backgroundColor: "#ffffff" }}
      >
        <Container className="px-4 sm:px-6">
          {latestForecast ? (
            <div className="mb-10">
              <CurrentForecastBanner post={latestForecast} basePath="/forecasts" />
            </div>
          ) : null}
          <h2 className="font-heading text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Recent Posts
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {recentPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col p-4">
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={post.frontmatter.image ?? "/images/placeholder-blog-1.svg"}
                    alt={post.frontmatter.title}
                    fill
                    priority={post.slug === recentPosts[0]?.slug}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader className="mb-2 mt-3">
                  <CardTitle>
                    <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">
                      {post.frontmatter.title}
                    </Link>
                  </CardTitle>
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 md:justify-start">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      {new Date(post.frontmatter.date).toLocaleDateString()}
                    </span>
                    {getAuthorBySlug(post.frontmatter.author).slug !==
                    DEFAULT_AUTHOR_SLUG ? (
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 shrink-0" />
                        {getAuthorBySlug(post.frontmatter.author).name}
                      </span>
                    ) : null}
                    <span className="flex items-center gap-1.5">
                      <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                      {post.frontmatter.category
                        ? post.frontmatter.category
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        : "Uncategorized"}
                    </span>
                  </div>
                </CardHeader>
                <CardFooter className="mt-auto w-full">
                  <Link href={`/blog/${post.slug}`} className="block w-full">
                    <Button type="button" size="sm" className="w-full justify-center">
                      Read Post
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              Read all posts
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </Container>
      </section>

      {/* SECTION: Tools to Support Your Readings — soft blue-gray */}
      <section
        className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${sectionPadding}`}
        style={{ backgroundColor: "#eef1f5" }}
      >
        <Container className="px-4 sm:px-6">
          <h2 className="font-heading text-center text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Tools to Support Your Readings
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader className="space-y-2">
                <CardTitle>Simple Tarot Journal</CardTitle>
                <CardDescription>
                  A simple, searchable Notion template to log readings and card pulls, build a living card library, and surface past insights when you need them.
                </CardDescription>
                <p className="text-xs text-slate-500">Simple & searchable</p>
                <p className="text-sm font-medium text-slate-700">$12</p>
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
                  Advanced Notion system to track readings in full detail—upright and reversed cards, contextual meanings, and statistics so your practice deepens over time.
                </CardDescription>
                <p className="text-xs text-slate-500">Advanced & flexible</p>
                <p className="text-sm font-medium text-slate-700">$32</p>
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
                  A free online desktop simulator app to shuffle, pull, and rearrange Tarot cards. This website is in beta, and mobile view is not currently supported.
                </CardDescription>
                <p className="text-xs text-slate-500">Free web app</p>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Link href={DIGITAL_TAROT_APP_URL} target="_blank" rel="noopener noreferrer">
                  <Button type="button" size="sm" rightIcon={<ExternalLink className="h-4 w-4" />}>
                    Try now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              Browse All Resources
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </Container>
      </section>
    </div>
  );
}
