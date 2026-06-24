import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/services/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bridal Beauty Services — Delhi NCR",
  description: `Explore ${SITE.name}'s luxury bridal makeup, hair styling, pre-bridal facials and packages in Delhi, Gurgaon, Noida & Faridabad. Book your consultation today.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Bridal Services | Rivique Beauty Delhi NCR",
    description: "Luxury bridal makeup, hair & skincare packages across Delhi NCR.",
    url: "/services",
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pt-18 min-h-screen bg-ivory-200">

      {/* ── Page Header ── */}
      <div className="relative bg-gradient-hero py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="section-label">What We Offer</p>
          <h1 className="font-serif text-display-lg sm:text-display-xl text-ink">
            Our Services
          </h1>
          <p className="font-sans text-body-sm text-ink-400 max-w-md mx-auto leading-relaxed">
            From bridal glam to bespoke packages — every service is designed with
            intention for Delhi NCR brides.
          </p>
          <Link href="/book" className="btn-luxury inline-flex mt-4">
            Book a Consultation
          </Link>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20"
        aria-label="Services listing"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} variant="luxury" />
          ))}
        </div>
      </section>

      {/* ── Service Area Banner ── */}
      <section className="bg-ink py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <p className="section-label text-rose-gold-400">We Come To You</p>
          <h2 className="font-serif text-display-md text-ivory-200 leading-tight">
            On-location service across the{" "}
            <em className="not-italic text-rose-gold-400">entire NCR</em>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-4">
            {["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Greater Noida"].map(
              (city) => (
                <div
                  key={city}
                  className="bg-ivory-200/10 border border-ivory-200/10 rounded-xl py-3 px-2 text-center"
                >
                  <p className="font-sans text-label text-ivory-200 tracking-widest uppercase">
                    {city}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
