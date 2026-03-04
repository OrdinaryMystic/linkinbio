import type { Metadata } from "next";
import Link from "next/link";
import { Video, Headphones, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  LIVE_READINGS_URL,
  RECORDED_READING_URL,
  WRITTEN_REPORT_URL,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Book a reading",
  description:
    "Choose a live reading (Zoom or in-person in Tulsa), a recorded reading, or a written PDF report. Book directly or learn more about each option.",
};

export default function BookingPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Book a reading
        </h1>

        <div className="space-y-5 text-sm leading-relaxed text-slate-700">
          <p>
            I offer three main ways to work together:{" "}
            <strong className="text-slate-900">live readings</strong> (via Zoom
            or in person in Tulsa, OK),{" "}
            <strong className="text-slate-900">recorded readings</strong> you can
            watch on your own time, and{" "}
            <strong className="text-slate-900">written reports</strong>—your
            reading delivered as a PDF. Click below to book now or to learn more
            about each option.
          </p>

          <p>
            When you book, you&apos;ll need to have a question or a topic in
            mind. Love, career, money, and purpose are all very common themes. We
            can also look at your year ahead, talk about a business idea, discuss
            compatibility with a partner, or anything else that&apos;s important
            to you.
          </p>

          <h2 className="font-heading text-lg font-bold tracking-tight text-slate-900">
            Tarot, astrology, or both?
          </h2>
          <p>
            If you have a preference, you can include it when you book. For an
            astrology reading, you do need a solid birth time—if you don&apos;t
            know it or it&apos;s only a rough estimate, we&apos;ll stick with
            tarot. The best readings often blend both, and if you don&apos;t have
            a preference, that&apos;s usually my default. The nature of your
            question will help me choose how to approach it.
          </p>

          <p>
            Want to learn more?{" "}
            <Link
              href="/faq"
              className="font-medium text-slate-900 underline-offset-4 hover:underline"
            >
              Visit my FAQ page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2a4a] text-white">
              <Video className="h-5 w-5" />
            </div>
            <CardTitle>Live Reading</CardTitle>
            <CardDescription>
              One-on-one tarot or astrology in real time—via Zoom or in person
              in Tulsa, OK. Bring your questions and we&apos;ll work through them
              together.
            </CardDescription>
            <p className="text-sm font-medium text-slate-700">1 hour · $60</p>
          </CardHeader>
          <CardFooter className="flex flex-wrap items-center gap-4">
            <Link href={LIVE_READINGS_URL} target="_blank">
              <Button type="button" size="sm">
                Book Now
              </Button>
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              learn more
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2a4a] text-white">
              <Headphones className="h-5 w-5" />
            </div>
            <CardTitle>Recorded Reading</CardTitle>
            <CardDescription>
              A recorded reading you can watch on your own time. Send your
              question and context; receive a private video and notes.
            </CardDescription>
            <p className="text-sm font-medium text-slate-700">30 minutes · $30</p>
          </CardHeader>
          <CardFooter className="flex flex-wrap items-center gap-4">
            <Link href={RECORDED_READING_URL} target="_blank">
              <Button type="button" size="sm">
                Book Now
              </Button>
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              learn more
              <ChevronRight className="h-4 w-4" aria-hidden />
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
              Your reading delivered as a PDF report. No video, no call. Ideal if
              you prefer to read and revisit at your own pace.
            </CardDescription>
            <p className="text-sm font-medium text-slate-700">$15</p>
          </CardHeader>
          <CardFooter className="flex flex-wrap items-center gap-4">
            <Link href={WRITTEN_REPORT_URL} target="_blank">
              <Button type="button" size="sm">
                Book Now
              </Button>
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              learn more
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
