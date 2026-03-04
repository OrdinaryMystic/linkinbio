import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Ordinary Mystic exists and what you can expect from a grounded approach to tarot and astrology.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          About Ordinary Mystic
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
          Ordinary Mystic is for people who are curious about tarot and astrology
          but allergic to vague predictions and over-the-top mysticism.
        </p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-slate-700">
        <p>
          The project started with a simple question:{" "}
          <span className="font-medium">
            what if readings were treated like structured conversations instead of
            performances?
          </span>{" "}
          That question shaped everything—from how sessions are framed to how
          tools and resources are built.
        </p>
        <p>
          In practice, that means using tarot and astrology as languages for
          pattern and timing, not as scripts for fate. Readings are collaborative:
          you bring your context and questions; the cards and charts bring
          structure; together we look for perspectives and possibilities that
          feel grounded in your actual life.
        </p>
        <p>
          You&apos;ll never be told that something is &ldquo;meant to be&rdquo; or
          that you&apos;re locked into a particular path. Instead, we&apos;ll talk
          about options, trade-offs, and experiments you can try in the real
          world.
        </p>
      </section>
    </div>
  );
}

