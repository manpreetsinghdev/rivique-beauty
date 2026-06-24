"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GALLERY_ITEMS = [
  { src: "/gallery1.jpeg",  alt: "Bridal makeup look 1",  category: "Bridal Makeup", width: 800, height: 1067 },
  { src: "/gallery2.jpg",   alt: "Bridal hair styling",    category: "Hair Styling",  width: 800, height: 1067 },
  { src: "/gallery3.jpg",   alt: "Bridal makeup look 3",  category: "Bridal Makeup", width: 800, height: 1067 },
  { src: "/gallery4.jpg",   alt: "Pre-bridal facial glow", category: "Pre-Bridal",   width: 800, height: 1067 },
  { src: "/gallery5.jpg",   alt: "Bridesmaid glam",        category: "Packages",     width: 800, height: 1067 },
  { src: "/gallery6.jpg",   alt: "Bridal hair updo",       category: "Hair Styling",  width: 800, height: 1067 },
  { src: "/gallery7.jpeg",  alt: "Engagement makeup",      category: "Bridal Makeup", width: 800, height: 1067 },
  { src: "/gallery8.jpeg",  alt: "Bridal glow prep",       category: "Pre-Bridal",   width: 800, height: 1067 },
  { src: "/gallery9.jpeg",  alt: "Full bridal package",    category: "Packages",     width: 800, height: 1067 },
] as const;

const CATEGORIES = ["All", "Bridal Makeup", "Hair Styling", "Pre-Bridal", "Packages"] as const;
type Category = typeof CATEGORIES[number];

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active);

  return (
    <div className="pt-18 min-h-screen bg-ivory-200">

      {/* ── Header ── */}
      <div className="bg-gradient-hero py-16 sm:py-24 text-center space-y-4 px-4">
        <p className="section-label">Our Portfolio</p>
        <h1 className="font-serif text-display-lg sm:text-display-xl text-ink">
          Bridal Gallery
        </h1>
        <p className="font-sans text-body-sm text-ink-400 max-w-md mx-auto leading-relaxed">
          Real work from real weddings across Delhi NCR — each look crafted exclusively
          for the bride.
        </p>
      </div>

      {/* ── Filter ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-2 flex flex-wrap gap-2 sm:gap-3 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`badge cursor-pointer transition-all duration-250 ${
              active === cat
                ? "badge-dark"
                : "badge-gold hover:bg-champagne-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {filtered.map(({ src, alt, category }) => (
            <div
              key={src}
              onClick={() => setLightbox(src)}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-luxury transition-shadow duration-400"
            >
              <Image
                src={src}
                alt={`${alt} — Rivique Beauty Delhi NCR`}
                width={800}
                height={1067}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4 sm:p-5">
                <p className="font-script text-2xl sm:text-3xl text-white">Rivique Beauty</p>
                <p className="font-sans text-label text-white/80 uppercase tracking-widest mt-1">
                  {category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-sans text-body-md text-ink-300">No images in this category yet.</p>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <div className="text-center pb-16 px-4">
        <p className="font-sans text-body-sm text-ink-400 mb-4">
          Love what you see? Book your consultation today.
        </p>
        <Link href="/book" className="btn-luxury">
          Book a Consultation
        </Link>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-ink/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-ivory-200 hover:text-rose-gold-400 transition-colors text-3xl font-light leading-none"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <div
            className="relative max-w-3xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-luxury-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt="Gallery preview — Rivique Beauty"
              width={1200}
              height={1600}
              sizes="(max-width: 768px) 100vw, 800px"
              className="w-full h-auto object-contain max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
