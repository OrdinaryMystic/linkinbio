import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { DIGITAL_TAROT_APP_URL, SITE_LIVE_MODE, TIKTOK_URL } from "@/lib/config";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const siteName = SITE_NAME;
const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} – Tarot & Astrology`,
    template: `%s | ${siteName}`,
  },
  description:
    "Readings, writing, and tools for finding meaning in the patterns of ordinary life. Tarot and astrology as structured thinking.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: `${siteName} – Tarot & Astrology`,
    description:
      "Readings, writing, and tools for finding meaning in the patterns of ordinary life. Tarot and astrology as structured thinking.",
    url: siteUrl,
    siteName,
    type: "website",
    images: [
      {
        url: "/images/featured/horizon.png",
        width: 1200,
        height: 630,
        alt: `${siteName} – Tarot & Astrology`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} – Tarot & Astrology`,
    description:
      "Readings, writing, and tools for finding meaning in the patterns of ordinary life. Tarot and astrology as structured thinking.",
    images: ["/images/featured/horizon.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PersonJsonLd />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XF047BLMG9"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XF047BLMG9');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} min-h-screen antialiased`}
        data-site-live={SITE_LIVE_MODE ? "true" : undefined}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 pt-10 pb-16">
            <Container>{children}</Container>
          </main>
          <footer
            className="py-12"
            style={{ backgroundColor: "#1a1614" }}
          >
            <Container>
              <div className="grid gap-10 md:grid-cols-4">
                {/* Brand column */}
                <div className="md:col-span-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/favicon.png"
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 shrink-0"
                    />
                    <span className="font-heading text-sm font-semibold text-[#f5f0e8]">
                      Ordinary Mystic
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#9a8d7d]">
                    Finding meaning in the patterns of ordinary life.
                  </p>
                </div>

                {/* Writing column */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#9a8d7d]">
                    Writing
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/blog" className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/categories/astrology" className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors">
                        Astrology
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/categories/tarot" className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors">
                        Tarot
                      </Link>
                    </li>
                    <li>
                      <Link href="/knowledge-base" className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors">
                        Knowledge Base
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Tools & Work column */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#9a8d7d]">
                    Tools & Work
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/resources" className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors">
                        Resources
                      </Link>
                    </li>
                    <li>
                      <Link href="/book" className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors">
                        Book a Reading
                      </Link>
                    </li>
                    <li>
                      <a href={DIGITAL_TAROT_APP_URL} target="_blank" rel="noopener noreferrer" className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors">
                        Digital Tarot
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Connect column */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#9a8d7d]">
                    Connect
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="mailto:ordinarymysticreadings@gmail.com"
                        className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors"
                      >
                        Email
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/@OrdinaryMysticReadings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors"
                      >
                        YouTube
                      </a>
                    </li>
                    <li>
                      <a
                        href={TIKTOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors"
                      >
                        TikTok
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                style={{ borderTop: "1px solid #2d2620" }}
              >
                <p className="text-xs text-[#9a8d7d]">
                  Tulsa, OK
                </p>
                <Link href="/about" className="text-xs text-[#9a8d7d] hover:text-[#f5f0e8] transition-colors">
                  About this project
                </Link>
              </div>
            </Container>
          </footer>
        </div>
      </body>
    </html>
  );
}
