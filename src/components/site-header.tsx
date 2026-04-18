"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Container } from "@/components/container";

const navLinks = [
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

const blogMenuLinks = [
  { href: "/blog", label: "All Posts" },
  { href: "/blog/categories/astrology", label: "Astrology" },
  { href: "/blog/categories/tarot", label: "Tarot" },
  { href: "/blog/categories/general-spirituality", label: "General Spirituality" },
  { href: "/knowledge-base", label: "Knowledge Base" },
];

const navLinkClass =
  "inline-flex h-5 items-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9bba8] transition-colors hover:text-[var(--color-bone)]";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogSubmenuOpen, setBlogSubmenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#1a1614",
        borderBottom: "1px solid #2d2620",
      }}
    >
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <span className="font-heading text-base font-semibold tracking-tight text-[var(--color-bone)]">
            Ordinary Mystic
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <div className="group relative inline-flex h-5 items-center">
            <Link
              href="/blog"
              className={`${navLinkClass} gap-1.5`}
            >
              Blog
              <ChevronDown className="h-3 w-3" aria-hidden />
            </Link>
            <div
              className="invisible absolute left-0 top-full z-30 mt-2 w-60 py-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100"
              style={{
                backgroundColor: "#1a1614",
                border: "1px solid #2d2620",
              }}
            >
              {blogMenuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9bba8] transition-colors hover:text-[var(--color-bone)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="inline-flex items-center border border-[var(--color-oxblood)] bg-[var(--color-oxblood)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-bone)] transition-colors hover:border-[var(--color-oxblood-hover)] hover:bg-[var(--color-oxblood-hover)]"
          >
            Book a Reading
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen((o) => !o);
            if (mobileMenuOpen) setBlogSubmenuOpen(false);
          }}
          className="flex h-10 w-10 items-center justify-center text-[var(--color-bone)] opacity-80 transition-opacity hover:opacity-100 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
        style={{ borderTop: mobileMenuOpen ? "1px solid #2d2620" : "none" }}
      >
        <nav className="px-4 py-4" style={{ backgroundColor: "#1a1614" }}>
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9bba8] transition-colors hover:text-[var(--color-bone)]"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setBlogSubmenuOpen((o) => !o)}
                className="flex w-full items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9bba8] transition-colors hover:text-[var(--color-bone)]"
                aria-expanded={blogSubmenuOpen}
              >
                Blog
                {blogSubmenuOpen ? (
                  <ChevronDown className="h-3 w-3 shrink-0" aria-hidden />
                ) : (
                  <ChevronRight className="h-3 w-3 shrink-0" aria-hidden />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  blogSubmenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-0.5 py-1 pl-4">
                  {blogMenuLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setBlogSubmenuOpen(false);
                        }}
                        className="block px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9a8d7d] transition-colors hover:text-[var(--color-bone)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9bba8] transition-colors hover:text-[var(--color-bone)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 pt-3" style={{ borderTop: "1px solid #2d2620" }}>
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 flex items-center justify-center border border-[var(--color-oxblood)] bg-[var(--color-oxblood)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-bone)] transition-colors hover:border-[var(--color-oxblood-hover)] hover:bg-[var(--color-oxblood-hover)]"
              >
                Book a Reading
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
