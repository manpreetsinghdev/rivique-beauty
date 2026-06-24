import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Luxury Bridal Studio in Delhi NCR",
  description:
    "Learn about Rivique Beauty — Delhi NCR's premier luxury bridal makeup and hair styling studio, founded in 2016. Serving Delhi, Gurgaon, Noida, Faridabad and Greater Noida.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Rivique Beauty | Delhi NCR Bridal Studio",
    description:
      "Founded in 2016, Rivique Beauty has served 500+ brides across Delhi, Gurgaon and Noida.",
    url: "/about",
  },
};

const TEAM = [
  {
    name: "Riya Sehgal",
    role: "Lead Bridal Artist & Founder",
    image: "/founder1.jpeg",
    bio: "With 8 years of luxury bridal experience and training from VLCC and MAC Pro, Riya has transformed over 500 brides across Delhi NCR.",
    specialties: ["Airbrush", "South Asian Bridal", "Editorial"],
  },
  {
    name: "Kavya Malhotra",
    role: "Senior Hair Stylist",
    image: "/founder2.jpeg",
    bio: "Specialising in intricate bridal updos, Kavya brings precision and artistry to every hairstyle, from traditional to contemporary.",
    specialties: ["Bridal Updo", "Extensions", "Mehendi Look"],
  },
  {
    name: "Simran Arora",
    role: "Skincare & Pre-Bridal Specialist",
    image: "/founder3.jpeg",
    bio: "A certified aesthetician focused on pre-bridal skin preparation, Simran ensures every bride glows from the inside out.",
    specialties: ["Facials", "Dermaplaning", "Skin Prep"],
  },
];

export default function AboutPage() {
  return (
    <div className="pt-18 min-h-screen bg-ivory-200">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-20 text-center space-y-4">
        <p className="section-label">Our Story</p>
        <h1 className="font-serif text-display-xl text-ink">
          About Rivique Beauty
        </h1>
        <p className="font-sans text-body-sm text-ink-400 max-w-lg mx-auto leading-relaxed">
          Delhi NCR&apos;s most trusted luxury bridal studio — crafting timeless
          beauty since 2016.
        </p>
      </div>

      {/* Story Section */}
      <section
        className="max-w-3xl mx-auto px-6 py-20 space-y-6"
        aria-labelledby="story-heading"
      >
        <h2
          id="story-heading"
          className="font-serif text-display-md text-ink"
        >
          Born in Delhi, built for brides
        </h2>

        <p className="font-sans text-body-md text-ink-400 leading-relaxed">
          Rivique Beauty was founded in 2016 in South Delhi with a single
          mission: to bring internationally trained, luxury-grade bridal
          artistry to brides across the NCR region. What began as a boutique
          studio quickly grew into Delhi NCR&apos;s most sought-after on-location
          bridal service — trusted by families in Delhi, Gurgaon, Noida,
          Faridabad and Greater Noida.
        </p>

        <p className="font-sans text-body-md text-ink-400 leading-relaxed">
          Every bride deserves to feel like the most beautiful version of
          herself on her most important day. We combine world-class products,
          precision technique and a deeply personal approach to make that happen
          — every single time.
        </p>

        <Link href="/book" className="btn-luxury inline-flex mt-4">
          Book a Consultation
        </Link>
      </section>

      {/* Team Section */}
      <section
        className="max-w-7xl mx-auto px-6 py-16 space-y-12"
        aria-labelledby="team-heading"
      >
        <div className="text-center space-y-3">
          <p className="section-label">The Artists</p>
          <h2 id="team-heading" className="section-heading">
            Meet Our Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map(({ name, role, image, bio, specialties }) => (
            <div
              key={name}
              className="card-luxury p-7 space-y-4 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Team Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={name}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="font-serif text-display-sm text-ink">
                  {name}
                </h3>
                <p className="section-label mt-1">{role}</p>
              </div>

              {/* Bio */}
              <p className="font-sans text-body-sm text-ink-400 leading-relaxed">
                {bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {specialties.map((specialty) => (
                  <span key={specialty} className="badge-gold">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}