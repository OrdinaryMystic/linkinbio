import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who is Ordinary Mystic, why it exists, and how Tyler Martin approaches tarot, astrology, and building tools for serious practitioners.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const faqs = [
  {
    question: "What do you mean by 'structured thinking'?",
    answer:
      "Tarot and astrology give you a vocabulary for things that are hard to articulate — timing, tension, patterns that keep repeating. I treat them as frameworks for organizing what you already sense but haven't named yet. That's structured thinking: taking the vague and making it legible.",
  },
  {
    question: "Do you predict the future?",
    answer:
      "No. I talk about timing, tendencies, and patterns, but you always keep agency. Instead of \"this will happen,\" we focus on \"here is what might be useful to pay attention to right now.\"",
  },
  {
    question: "What happens in a reading?",
    answer:
      "We start by clarifying your questions and context. From there, we look at cards or your chart together, translating symbolism into clear language and practical takeaways. You can ask follow-up questions at any point — it's a dialogue, not a monologue.",
  },
  {
    question: "Who is this for?",
    answer:
      "People who are curious about tarot and astrology but put off by the theatrics. Skeptics who are open to useful frameworks. Practitioners who want better tools and clearer thinking. If you want signal over noise, you're in the right place.",
  },
  {
    question: "What's Querent?",
    answer:
      "Querent is software I'm building for tarot and astrology practitioners — a reading companion that helps you log, review, and deepen your practice over time. It's still early. The ideas get tested in real readings first, then written about, then built.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <header>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          About Ordinary Mystic
        </h1>
      </header>

      {/* Philosophy */}
      <section className="space-y-5 text-base leading-relaxed text-[var(--color-ink)]">
        <div className="md:flex md:items-start md:gap-8">
          <div className="shrink-0 mb-6 md:mb-0">
            <Image
              src="/images/profile-img.png"
              alt="Tyler Martin"
              width={120}
              height={120}
              className="h-28 w-28 rounded-full object-cover"
              style={{ border: "2px solid var(--color-rule)" }}
            />
          </div>
          <div className="space-y-4">
            <p>
              I&apos;m Tyler. I use tarot and astrology as pattern-recognition
              tools — structured ways to map timing, friction, and possibility
              in ordinary life. I write about how these systems actually work when
              you strip the theatrics away, and I build tools for practitioners
              who want to track and deepen their practice over time.
            </p>
            <p>
              Ordinary Mystic started with a question:{" "}
              <span className="font-medium">
                what if readings were treated like structured conversations instead
                of performances?
              </span>{" "}
              That question shaped everything — how sessions are framed, how I
              write, and what I&apos;m building next.
            </p>
          </div>
        </div>

        <p>
          In practice, that means using tarot and astrology as languages for
          pattern and timing, not as scripts for fate. Readings are
          collaborative: you bring your context and questions; the cards and
          charts bring structure; together we look for perspectives and
          possibilities that feel grounded in your actual life.
        </p>

        <p>
          You&apos;ll never hear that something is &ldquo;meant to be&rdquo; or
          that you&apos;re locked into a particular path. Instead, we talk about
          options, trade-offs, and experiments you can try in the real world.
        </p>
      </section>

      {/* What I'm working on */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)]">
          What I&apos;m working on
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div
            className="p-5 space-y-2"
            style={{
              backgroundColor: "var(--color-bone-raised)",
              border: "1px solid var(--color-rule)",
            }}
          >
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Writing</h3>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Essays on how tarot and astrology work as thinking tools —
              grounded, practical, and without the mystical theater.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] underline-offset-4 hover:underline"
            >
              Read the blog <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
          <div
            className="p-5 space-y-2"
            style={{
              backgroundColor: "var(--color-bone-raised)",
              border: "1px solid var(--color-rule)",
            }}
          >
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Tools</h3>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Notion templates, a digital tarot app, and Querent — software
              for logging and deepening your practice.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] underline-offset-4 hover:underline"
            >
              Browse tools <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
          <div
            className="p-5 space-y-2"
            style={{
              backgroundColor: "var(--color-bone-raised)",
              border: "1px solid var(--color-rule)",
            }}
          >
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Readings</h3>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              One-on-one sessions where we work through your questions together.
              Collaborative, grounded, practical.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] underline-offset-4 hover:underline"
            >
              See options <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-ink)]">
          Common questions
        </h2>
        <div
          style={{ border: "1px solid var(--color-rule)" }}
        >
          {faqs.map((item, i) => (
            <div
              key={item.question}
              className="px-5 py-4"
              style={i < faqs.length - 1 ? { borderBottom: "1px solid var(--color-rule)" } : undefined}
            >
              <h3 className="text-sm font-semibold text-[var(--color-ink)]">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
