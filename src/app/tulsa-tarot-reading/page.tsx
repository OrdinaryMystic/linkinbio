import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const pageTitle = "Tulsa tarot readings – grounded, practical insight";
const pageDescription =
  "Book a calm, grounded tarot reading from Tulsa—serving Downtown, Midtown, Brookside, Cherry Street, Jenks, Bixby, and Broken Arrow.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/tulsa-tarot-reading`,
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ordinary Mystic",
  url: `${SITE_URL}/tulsa-tarot-reading`,
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
  serviceType: "Tarot reading",
};

export default function TulsaTarotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <div className="space-y-6">
        <header className="space-y-3">
          <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Tulsa tarot readings
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
            Ordinary Mystic offers grounded tarot readings from Tulsa for
            thoughtful clients across Downtown, Midtown, Brookside, Cherry
            Street, Jenks, Bixby, and Broken Arrow.
          </p>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            Whether you&apos;re in a small apartment near Downtown Tulsa, a
            quiet house in Midtown, or a busy home in Jenks or Bixby, you can
            access the same calm, reflective tarot sessions. Readings are
            delivered online, so it&apos;s easy to fit a session between work,
            family, and everything else you manage.
          </p>
          <p>
            Instead of dramatic predictions, we focus on clear questions and
            real-world decisions. If you&apos;re weighing a job move, sorting
            through relationship dynamics, or simply feeling stuck, tarot
            becomes a structured way to map what&apos;s going on and what you
            might try next.
          </p>
          <p>
            Clients from Brookside and Cherry Street often book sessions to get
            perspective on work-life balance and creative projects. Folks in
            Broken Arrow and Bixby frequently bring questions about long-term
            direction, family dynamics, and how to navigate big life
            transitions without losing themselves.
          </p>
        </section>
      </div>
    </>
  );
}

