"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ivory-200/90 backdrop-blur-md border-b border-rose-gold-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-script text-3xl text-ink tracking-wide"
          onClick={() => setMobileMenuOpen(false)}
        >
          {SITE.name}
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-label font-medium tracking-widest uppercase text-ink-400 hover:text-rose-gold-400 transition-colors duration-250"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Desktop */}
        <Link
          href="/book"
          className="hidden md:inline-flex btn-primary text-xs py-3 px-6"
        >
          Book a Consultation
        </Link>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink"
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="0" y1="1" x2="22" y2="1" />
            <line x1="4" y1="8" x2="22" y2="8" />
            <line x1="8" y1="15" x2="22" y2="15" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-rose-gold-200 bg-ivory-200/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-sans text-label font-medium tracking-widest uppercase text-ink-400 hover:text-rose-gold-400 transition-colors duration-250 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="block btn-primary text-xs py-3 px-6 text-center mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
