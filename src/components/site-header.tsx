"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Menu, X } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {navLinks.map((link) => (
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
            onClick={() => setMobileMenuOpen((o) => !o)}
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
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="border-t border-white/10 bg-[#151326] px-4 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
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
