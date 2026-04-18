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
          <span className="font-heading text-base font-semibold tracking-wide text-[#f5f0e8]">
            Ordinary Mystic
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="text-[#f5f0e8] opacity-70 transition-opacity hover:opacity-100">
            Home
          </Link>
          <div className="group relative">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-[#f5f0e8] opacity-70 transition-opacity hover:opacity-100"
            >
              Blog
              <ChevronDown className="h-4 w-4" />
            </Link>
            <div
              className="invisible absolute left-0 top-full z-30 mt-2 w-56 p-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100"
              style={{
                backgroundColor: "#1a1614",
                border: "1px solid #2d2620",
              }}
            >
              {blogMenuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm text-[#f5f0e8] opacity-70 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#f5f0e8] opacity-70 transition-opacity hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-[#9a8d7d] transition-colors hover:text-[#f5f0e8]"
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
          className="flex h-10 w-10 items-center justify-center text-[#f5f0e8] opacity-70 transition-opacity hover:opacity-100 md:hidden"
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
          mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
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
                className="block px-4 py-3 text-base font-semibold text-[#f5f0e8] opacity-80 transition-opacity hover:opacity-100"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setBlogSubmenuOpen((o) => !o)}
                className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-[#f5f0e8] opacity-80 transition-opacity hover:opacity-100"
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
                  blogSubmenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
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
                        className="block px-4 py-2.5 text-base font-medium text-[#9a8d7d] transition-colors hover:text-[#f5f0e8]"
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
                  className="block px-4 py-3 text-base font-semibold text-[#f5f0e8] opacity-80 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 pt-2" style={{ borderTop: "1px solid #2d2620" }}>
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-[#9a8d7d] transition-colors hover:text-[#f5f0e8]"
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
