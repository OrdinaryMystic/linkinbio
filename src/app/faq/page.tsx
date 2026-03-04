import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about readings, what to expect, and who Ordinary Mystic is for.",
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
      "No. We talk about timing, tendencies, and patterns, but you always keep agency. Instead of &ldquo;this will happen,&rdquo; we focus on &ldquo;here is what might be useful to pay attention to right now.&rdquo;",
  },
  {
    question: "How should I prepare?",
    answer:
      "Bring one to three questions or themes you care about, plus any relevant context. It also helps to show up with a notebook or note-taking app if you like to capture insights in the moment.",
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Frequently asked questions
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
          A quick overview of how readings work, what to expect, and whether
          Ordinary Mystic is a good fit for you.
        </p>
      </header>

      <section className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/70">
        {faqs.map((item) => (
          <div key={item.question} className="px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {item.question}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {item.answer}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

