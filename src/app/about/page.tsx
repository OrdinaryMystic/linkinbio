import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Ordinary Mystic exists, how readings work, and answers to common questions.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const faqs = [
  {
    question: "What is your reading philosophy?",
    answer:
      "Readings are collaborative, grounded conversations. Tarot and astrology are used as structured tools for reflection—not as scripts about fate. The focus is on naming patterns, exploring perspective, and identifying experiments you can try next.",
  },
  {
    question: "What can I expect in a session?",
    answer:
      "We start by clarifying your questions and context. From there, we look at cards or your chart together, translating symbolism into clear language and practical takeaways. You can ask follow-up questions at any point; this is a dialogue, not a monologue.",
  },
  {
    question: "Who is this work for?",
    answer:
      "Ordinary Mystic is designed for thoughtful skeptics—people who are curious, analytical, or simply exhausted by extremes. If you want something more structured than venting but more human than a spreadsheet, you are in the right place.",
  },
  {
    question: "Do you predict the future?",
    answer:
      "No. We talk about timing, tendencies, and patterns, but you always keep agency. Instead of \"this will happen,\" we focus on \"here is what might be useful to pay attention to right now.\"",
  },
  {
    question: "How should I prepare?",
    answer:
      "Bring one to three questions or themes you care about, plus any relevant context. It also helps to show up with a notebook or note-taking app if you like to capture insights in the moment.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          About Ordinary Mystic
        </h1>
        <p className="text-sm leading-relaxed text-slate-700">
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

      <section className="space-y-3">
        <h2 className="font-heading text-2xl font-black tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <p className="text-sm leading-relaxed text-slate-700">
          A quick overview of how readings work, what to expect, and whether
          Ordinary Mystic is a good fit for you.
        </p>
      </section>

      <section className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/70">
        {faqs.map((item) => (
          <div key={item.question} className="px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

