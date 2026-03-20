import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  User,
} from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { SITE_LIVE_MODE, TIKTOK_URL } from "@/lib/config";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const siteName = SITE_NAME;
const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} – Tarot & Astrology Without the Woo`,
    template: `%s | ${siteName}`,
  },
  description:
    "Tarot and astrology sessions for thoughtful skeptics. Calm, grounded readings focused on clarity, not theatrics.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: `${siteName} – Tarot & Astrology Without the Woo`,
    description:
      "Tarot and astrology sessions for thoughtful skeptics. Calm, grounded readings focused on clarity, not theatrics.",
    url: siteUrl,
    siteName,
    type: "website",
    images: [
      {
        url: "/images/featured/horizon.png",
        width: 1200,
        height: 630,
        alt: `${siteName} – Tarot & Astrology Without the Woo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} – Tarot & Astrology Without the Woo`,
    description:
      "Tarot and astrology sessions for thoughtful skeptics. Calm, grounded readings focused on clarity, not theatrics.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} min-h-screen text-slate-900 antialiased`}
        style={{ backgroundColor: "#f5f4f2" }}
        data-site-live={SITE_LIVE_MODE ? "true" : undefined}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 pt-10 pb-16">
            <Container>{children}</Container>
          </main>
          <footer className="border-t border-white/5 bg-[#0d0c14] py-10">
            <Container className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2 font-medium text-white">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <span>Ordinary Mystic Readings: Astrology and Tarot Without the Woo</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm text-slate-300">
                <div className="flex items-center gap-2 font-medium text-white">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>Contact</span>
                </div>
                <a
                  href="mailto:ordinarymysticreadings@gmail.com"
                  className="text-slate-200 underline-offset-4 hover:text-white hover:underline"
                >
                  ordinarymysticreadings@gmail.com
                </a>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href="https://www.youtube.com/@OrdinaryMysticReadings"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="YouTube"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-white/40 hover:text-white"
                  >
                    <Image
                      src="/images/youtube-app-white-icon.png"
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                    <span className="sr-only">YouTube</span>
                  </a>
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    title="TikTok"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-white/40 hover:text-white"
                  >
                    <Image src="/images/tiktok-white-icon.png" alt="" width={20} height={20} className="h-5 w-5" />
                    <span className="sr-only">TikTok</span>
                  </a>
                  <a
                    href="https://cash.app/$ordinarymystic"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Cash App"
                    title="Cash App"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-white/40 hover:text-white"
                  >
                    <Image src="/images/cashapp-white-icon.png" alt="" width={20} height={20} className="h-5 w-5" />
                    <span className="sr-only">Cash App</span>
                  </a>
                  <a
                    href="https://paypal.me/ordinarymystic"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PayPal"
                    title="PayPal"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-white/40 hover:text-white"
                  >
                    <Image src="/images/paypal-white-icon.png" alt="" width={20} height={20} className="h-5 w-5" />
                    <span className="sr-only">PayPal</span>
                  </a>
                </div>
              </div>
            </Container>
          </footer>
        </div>
      </body>
    </html>
  );
}
