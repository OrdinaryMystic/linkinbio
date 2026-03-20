import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const pageTitle = "Tulsa astrology readings – timing, patterns, and context";
const pageDescription =
  "Astrology consultations from Tulsa focused on timing, patterns, and practical choices—serving Downtown, Midtown, Brookside, Cherry Street, Jenks, Bixby, and Broken Arrow.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/tulsa-astrology-reading`,
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ordinary Mystic",
  url: `${SITE_URL}/tulsa-astrology-reading`,
  areaServed: [
    "Tulsa",
    "Downtown Tulsa",
    "Midtown Tulsa",
    "Brookside",
    "Cherry Street",
    "Jenks",
    "Bixby",
    "Broken Arrow",
  ],
  serviceType: "Astrology reading",
};

export default function TulsaAstrologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <div className="space-y-6">
        <header className="space-y-3">
          <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Tulsa astrology readings
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
            Grounded astrology consultations from Tulsa that focus on timing,
            patterns, and context—not generic horoscopes.
          </p>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            Ordinary Mystic works with clients across Tulsa—Downtown, Midtown,
            Brookside, Cherry Street, Jenks, Bixby, and Broken Arrow—to use
            astrology as a reflective map. Instead of fixed identity labels, we
            look at how timing and emphasis show up in real life.
          </p>
          <p>
            You might book an astrology reading when you&apos;re navigating a
            job transition, reevaluating relationships, or sensing that a new
            chapter is opening but can&apos;t quite name what&apos;s shifting.
            Together we&apos;ll look at your chart for patterns around energy,
            responsibility, growth, and release.
          </p>
          <p>
            Clients from neighborhoods like Brookside and Cherry Street often
            pair astrology with creative or entrepreneurial questions, while
            clients in Jenks, Bixby, and Broken Arrow frequently arrive with
            questions about long-term stability and direction. Wherever you
            live in the Tulsa area, the goal is the same: clearer language for
            what you&apos;re feeling and more confident choices about what
            comes next.
          </p>
        </section>
      </div>
    </>
  );
}

