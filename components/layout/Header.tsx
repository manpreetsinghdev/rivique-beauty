"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("vendorLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vendorLoggedIn");
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ivory-200/90 backdrop-blur-md border-b border-rose-gold-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">

        <Link
          href="/"
          className="font-script text-3xl text-ink tracking-wide"
          onClick={() => setMobileMenuOpen(false)}
        >
          {SITE.name}
        </Link>

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

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/book"
            className="btn-primary text-xs py-3 px-6"
          >
            Book a Consultation
          </Link>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="btn-secondary text-xs py-3 px-6"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="btn-secondary text-xs py-3 px-6"
            >
              Login
            </Link>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink"
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-rose-gold-200 bg-ivory-200">
          <div className="px-6 py-4 space-y-4">

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/book"
              className="block btn-primary text-center py-3"
            >
              Book a Consultation
            </Link>

            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full btn-secondary py-3"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block btn-secondary text-center py-3"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}