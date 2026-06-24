import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getServices } from "@/services/services";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/constants";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: `${service.name} — Bridal Beauty Service in Delhi NCR`,
    description: `${service.description} Book ${service.name} with Rivique Beauty — serving Delhi, Gurgaon, Noida, Faridabad & Greater Noida.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | Rivique Beauty Delhi NCR`,
      description: service.shortDescription,
      url: `/services/${service.slug}`,
      images: service.images[0] ? [{ url: service.images[0] }] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const imageSrc = service.images?.[0] ?? null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "BeautySalon",
      name: SITE.name,
      address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
    },
    areaServed: ["Delhi", "Gurgaon", "Noida", "Faridabad", "Greater Noida"],
    offers: { "@type": "Offer", price: service.price.toString(), priceCurrency: service.currency },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="pt-18 min-h-screen bg-ivory-200">

        {/* ── Hero ── */}
        <div className="relative bg-gradient-hero overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Text */}
            <div className="space-y-4 order-2 md:order-1">
              <Link
                href="/services"
                className="font-sans text-label text-rose-gold-400 uppercase tracking-widest hover:text-rose-gold-500 transition-colors inline-flex items-center gap-2"
              >
                ← All Services
              </Link>
              <p className="section-label">{service.category.replace(/-/g, " ")}</p>
              <h1 className="font-serif text-display-md sm:text-display-xl text-ink leading-tight">
                {service.name}
              </h1>
              <p className="font-sans text-body-md text-ink-400 leading-relaxed max-w-xl">
                {service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {service.tags.map((tag) => (
                  <span key={tag} className="badge-gold capitalize">{tag}</span>
                ))}
              </div>
            </div>

            {/* Image */}
            {imageSrc && (
              <div className="relative aspect-[4/3] sm:aspect-[3/2] rounded-3xl overflow-hidden shadow-luxury-lg order-1 md:order-2">
                <Image
                  src={imageSrc}
                  alt={`${service.name} — Rivique Beauty Delhi NCR`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
              </div>
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid md:grid-cols-3 gap-8 sm:gap-12">

          {/* Description */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-serif text-display-sm text-ink">About this service</h2>
            <p className="font-sans text-body-md text-ink-400 leading-relaxed">
              {service.description}
            </p>

            {/* Service area card */}
            <div className="card p-5 space-y-2 border border-rose-gold-100">
              <p className="font-sans text-label text-rose-gold-400 uppercase tracking-widest">
                Service Area
              </p>
              <p className="font-sans text-body-sm text-ink-400">
                We travel to your home, banquet hall or hotel across{" "}
                <strong className="text-ink font-medium">
                  Delhi, Gurgaon, Noida, Faridabad &amp; Greater Noida
                </strong>
                .
              </p>
            </div>

            {/* Related images strip */}
            {service.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0 w-28 sm:w-36 aspect-[3/4] rounded-xl overflow-hidden shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`${service.name} detail ${i + 1}`}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Booking Sidebar ── */}
          <aside>
            <div className="card-luxury p-5 sm:p-6 space-y-5 md:sticky md:top-24">
              <div>
                <p className="section-label">Starting from</p>
                <p className="font-serif text-display-md text-rose-gold-400 mt-1">
                  {formatPrice(service.price, service.currency)}
                </p>
              </div>
              <div className="divider-ornament" />
              <div className="space-y-3 font-sans text-body-sm text-ink-400">
                {[
                  ["Duration", `${service.duration} min`],
                  ["Trial included", "Yes"],
                  ["On-location", "Delhi NCR"],
                  ["Products", "MAC, Airbrush"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span>{k}</span>
                    <span className="text-ink font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/book"
                className="btn-luxury w-full justify-center block text-center"
              >
                Book This Service
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full justify-center text-center block"
              >
                WhatsApp Us
              </a>
            </div>
          </aside>
        </div>

      </div>
    </>
  );
}
