import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory-200/80" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2 space-y-4">
          <span className="font-script text-3xl text-ivory-200">{SITE.name}</span>
          <p className="font-sans text-body-sm leading-relaxed text-ivory-200/60 max-w-xs">
            {SITE.description}
          </p>
          <p className="font-sans text-label text-ivory-200/40 uppercase tracking-widest">
            Serving Delhi · Gurgaon · Noida · Faridabad · Greater Noida
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <p className="section-label text-champagne-400">Explore</p>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-body-sm text-ivory-200/70 hover:text-ivory-200 transition-colors duration-250"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <p className="section-label text-champagne-400">Contact</p>
          <div className="flex flex-col gap-2 font-sans text-body-sm text-ivory-200/70">
            <a
              href={`tel:${SITE.phone}`}
              className="hover:text-ivory-200 transition-colors duration-250"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-ivory-200 transition-colors duration-250"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-gold-400 transition-colors duration-250"
            >
              WhatsApp Us
            </a>
            <span className="text-ivory-200/40">{SITE.address}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory-200/10 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-label text-ivory-200/40">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-label tracking-widest uppercase text-ivory-200/40 hover:text-champagne-400 transition-colors duration-250"
          >
            Instagram
          </a>
          <Link
            href="/about"
            className="font-sans text-label tracking-widest uppercase text-ivory-200/40 hover:text-ivory-200 transition-colors duration-250"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
