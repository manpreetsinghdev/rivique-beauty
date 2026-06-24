import { getFeaturedServices } from "@/services/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import Link from "next/link";

export async function FeaturedServicesSection() {
  const services = await getFeaturedServices();

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-ivory-200" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-16">

        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-xl mx-auto">
          <p className="section-label">Our Offerings</p>
          <h2 id="services-heading" className="section-heading">
            Services crafted for{" "}
            <em className="not-italic text-rose-gold-400">your</em> day
          </h2>
          <p className="font-sans text-body-sm text-ink-400 leading-relaxed">
            Every service is a bespoke experience — meticulously tailored for
            Delhi NCR brides.
          </p>
        </div>

        {/* Grid — 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} variant="luxury" />
          ))}
        </div>

        <div className="text-center">
          <Link href="/services" className="btn-ghost">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
