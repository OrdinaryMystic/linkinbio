"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

const blogMenuLinks = [
  { href: "/blog", label: "All Posts" },
  { href: "/blog/categories/astrology", label: "Astrology" },
  { href: "/blog/categories/tarot", label: "Tarot" },
  { href: "/blog/categories/general-spirituality", label: "General Spirituality" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogSubmenuOpen, setBlogSubmenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#151326] to-[#213752] backdrop-blur-sm">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/profile-img.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold tracking-tight text-white">
            Ordinary Mystic
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <div className="group relative">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              Blog
              <ChevronDown className="h-4 w-4" />
            </Link>
            <div className="invisible absolute left-0 top-full z-30 mt-2 w-56 rounded-lg border border-white/10 bg-[#1b1a2f] p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              {blogMenuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/forecasts" className="transition-colors hover:text-white">
            Forecasts
          </Link>
          {navLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/book" className="hidden md:inline-block">
            <Button
              type="button"
              size="sm"
              className="bg-white text-[#151326] hover:bg-slate-100 focus-visible:ring-white focus-visible:ring-offset-[#151326]"
              leftIcon={<CalendarDays className="h-4 w-4" />}
            >
              Book a Reading
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((o) => !o);
              if (mobileMenuOpen) setBlogSubmenuOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-200 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="border-t border-white/10 bg-[#151326] px-4 py-4">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setBlogSubmenuOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                aria-expanded={blogSubmenuOpen}
              >
                Blog
                {blogSubmenuOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  blogSubmenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-0.5 pl-4 py-1">
                  {blogMenuLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setBlogSubmenuOpen(false);
                        }}
                        className="block rounded-lg px-4 py-2.5 text-base font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link
                href="/forecasts"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                Forecasts
              </Link>
            </li>
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            <li className="mt-2 border-t border-white/10 pt-2">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button
                  type="button"
                  size="sm"
                  className="w-full justify-center bg-white text-[#151326] hover:bg-slate-100 focus-visible:ring-white focus-visible:ring-offset-[#151326]"
                  leftIcon={<CalendarDays className="h-4 w-4" />}
                >
                  Book a Reading
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
