import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Video, Monitor, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  TAROT_WRITTEN_URL,
  TAROT_RECORDED_URL,
  TAROT_LIVE_ZOOM_URL,
  TAROT_LIVE_IN_PERSON_URL,
  ASTRO_WRITTEN_NATAL_URL,
  ASTRO_WRITTEN_TRANSIT_URL,
  ASTRO_LIVE_ZOOM_URL,
  ASTRO_LIVE_IN_PERSON_URL,
  COMBINED_LIVE_ZOOM_URL,
  COMBINED_LIVE_IN_PERSON_URL,
} from "@/lib/config";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Reading",
  description:
    "One-on-one tarot and astrology readings — written, recorded, or live. Hellenistic astrology and tarot as structured thinking, not performance.",
  alternates: {
    canonical: `${SITE_URL}/book`,
  },
};

export default function BookingPage() {
  return (
    <div className="space-y-2">

      {/* Intro */}
      <section
        className="space-y-5 pb-12"
        style={{ borderBottom: "1px solid var(--color-rule)" }}
      >
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Book a Reading
        </h1>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink)] max-w-2xl">
          <p>
            Readings are collaborative conversations, not performances. You bring your question
            and context; the cards and charts bring structure. You leave with something concrete.
          </p>
          <p>
            Tarot, astrology, and combined sessions are each offered as distinct services. Choose
            based on what fits your question — or book a combined session if you want both
            systems in one conversation.
          </p>
          <p>
            For astrology readings, an accurate birth time is required. If you don&apos;t have
            yours or it&apos;s only approximate, we&apos;ll work with tarot instead.
          </p>
        </div>
        <Link
          href="/faq"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
        >
          Have questions? Visit the FAQ
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      {/* Tarot Readings */}
      <section className="pt-12 pb-6 space-y-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
            Service
          </p>
          <h2 className="font-heading mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-[var(--color-ink)]">
            Tarot Readings
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
            Structured, interpretive readings focused on a specific question or theme.
            No birth data required.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle>Written Reading</CardTitle>
              <CardDescription>
                Your reading delivered as a written report, emailed to you. No call, no
                scheduling. Ideal if you prefer to read and revisit at your own pace.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">$40</p>
            </CardHeader>
            <CardFooter>
              <Link href={TAROT_WRITTEN_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <Video className="h-5 w-5" />
              </div>
              <CardTitle>Recorded Reading</CardTitle>
              <CardDescription>
                A recorded video reading you can watch on your own time. Send your question
                and context; receive a private video and notes within 48 hours.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">$60</p>
            </CardHeader>
            <CardFooter>
              <Link href={TAROT_RECORDED_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <Monitor className="h-5 w-5" />
              </div>
              <CardTitle>Live Reading — Zoom</CardTitle>
              <CardDescription>
                One-on-one tarot reading via Zoom. Real-time conversation, one hour, focused
                on a question or theme of your choosing.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">1 hour · $85</p>
            </CardHeader>
            <CardFooter>
              <Link href={TAROT_LIVE_ZOOM_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <CardTitle>Live Reading — In Person</CardTitle>
              <CardDescription>
                In-person tarot reading in Tulsa, Oklahoma. One hour, one-on-one. Location
                and logistics confirmed at booking.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">1 hour · $95</p>
            </CardHeader>
            <CardFooter>
              <Link href={TAROT_LIVE_IN_PERSON_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Astrology Readings */}
      <section
        className="pt-12 pb-6 space-y-8"
        style={{ borderTop: "1px solid var(--color-rule)" }}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
            Service
          </p>
          <h2 className="font-heading mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-[var(--color-ink)]">
            Astrology Readings
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
            Hellenistic astrology — the original Greco-Roman tradition, working with whole sign
            houses, sect, and the seven classical planets. Natal chart interpretation and transit
            forecasting. An accurate birth time is required for all astrology sessions.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle>Written Natal Chart Reading</CardTitle>
              <CardDescription>
                A full written interpretation of your natal chart, delivered by email. Covers
                major themes, planet placements, and what the nativity says about your patterns.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">$75</p>
            </CardHeader>
            <CardFooter>
              <Link href={ASTRO_WRITTEN_NATAL_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle>Written Transit / Forecast Reading</CardTitle>
              <CardDescription>
                A written reading focused on current transits and what&apos;s active in your
                chart right now. Practical, time-specific, grounded in what the sky is
                actually doing.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">$55</p>
            </CardHeader>
            <CardFooter>
              <Link href={ASTRO_WRITTEN_TRANSIT_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <Monitor className="h-5 w-5" />
              </div>
              <CardTitle>Live Reading — Zoom</CardTitle>
              <CardDescription>
                One-on-one astrology reading via Zoom. Full natal chart walkthrough or focused
                transit session — your call. One hour.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">1 hour · $110</p>
            </CardHeader>
            <CardFooter>
              <Link href={ASTRO_LIVE_ZOOM_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <CardTitle>Live Reading — In Person</CardTitle>
              <CardDescription>
                In-person astrology reading in Tulsa, Oklahoma. One hour, one-on-one.
                Location confirmed at booking.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">1 hour · $120</p>
            </CardHeader>
            <CardFooter>
              <Link href={ASTRO_LIVE_IN_PERSON_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Combined Readings */}
      <section
        className="pt-12 pb-6 space-y-8"
        style={{ borderTop: "1px solid var(--color-rule)" }}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
            Service
          </p>
          <h2 className="font-heading mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-[var(--color-ink)]">
            Combined Readings
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] max-w-xl">
            Tarot and astrology together in a single extended session. The chart provides
            timing and structural context; the cards handle nuance and specific questions.
            Requires accurate birth data.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <Monitor className="h-5 w-5" />
              </div>
              <CardTitle>Live Combined — Zoom</CardTitle>
              <CardDescription>
                An extended session combining natal chart or transit work with a tarot reading.
                Via Zoom, 90 minutes.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">90 minutes · $130</p>
            </CardHeader>
            <CardFooter>
              <Link href={COMBINED_LIVE_ZOOM_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-rule)", color: "var(--color-ink)" }}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <CardTitle>Live Combined — In Person</CardTitle>
              <CardDescription>
                Combined tarot and astrology in person in Tulsa, Oklahoma. 90 minutes,
                one-on-one. Location confirmed at booking.
              </CardDescription>
              <p className="text-sm font-medium text-[var(--color-ink)]">90 minutes · $145</p>
            </CardHeader>
            <CardFooter>
              <Link href={COMBINED_LIVE_IN_PERSON_URL} target="_blank">
                <Button type="button" size="sm">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Footer nav */}
      <div
        className="pt-10"
        style={{ borderTop: "1px solid var(--color-rule)" }}
      >
        <Link
          href="/faq"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
        >
          Have questions? Visit the FAQ
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

    </div>
  );
}
