import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getServices } from "@/services/services";
import { formatPrice } from "@/lib/utils";
import { SITE } from "@/lib/constants";

interface Props { params: { slug: string } }

const IMAGE_MAP: Record<string, string> = {
  "Bridal Glam": "/service-1.jpeg",
  "Bridal Hair Design": "/service-2.jpeg",
  "Radiance Prep Facial": "/service-3.jpeg",
  "Engagement Makeup": "/gallery3.jpg",
  "The Rivique Package": "/service-4.jpg",
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};

  const name = service.title;
  const shortDescription = service.description ?? "";
  const image = IMAGE_MAP[service.title] ?? "/service-1.jpeg";

  return {
    title: `${name} - Bridal Beauty Service in Delhi NCR`,
    description: `${service.description ?? ""} Book ${name} with Rivique Beauty - serving Delhi, Gurgaon, Noida, Faridabad & Greater Noida.`,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      title: `${name} | Rivique Beauty Delhi NCR`,
      description: shortDescription,
      url: `/services/${service.id}`,
      images: [{ url: image }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const name = service.title;
  const shortDescription = service.description ?? "";
  const description = service.description ?? "";
  const category = "Bridal Beauty";
  const tags: string[] = [];
  const price = service.pricePaise / 100;
  const duration = service.durationMin;
  const imageSrc = IMAGE_MAP[service.title] ?? "/service-1.jpeg";
  const images = [imageSrc];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "BeautySalon",
      name: SITE.name,
      address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
    },
    areaServed: ["Delhi", "Gurgaon", "Noida", "Faridabad", "Greater Noida"],
    offers: { "@type": "Offer", price: price.toString(), priceCurrency: service.currency },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="pt-18 min-h-screen bg-ivory-200">

        {/* Hero */}
        <div className="relative bg-gradient-hero overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <Link
                href="/services"
                className="font-sans text-label text-rose-gold-400 uppercase tracking-widest hover:text-rose-gold-500 transition-colors inline-flex items-center gap-2"
              >
                &larr; All Services
              </Link>
              <p className="section-label">{category.replace(/-/g, " ")}</p>
              <h1 className="font-serif text-display-md sm:text-display-xl text-ink leading-tight">
                {name}
              </h1>
              <p className="font-sans text-body-md text-ink-400 leading-relaxed max-w-xl">
                {shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <span key={tag} className="badge-gold capitalize">{tag}</span>
                ))}
              </div>
            </div>

            {imageSrc && (
              <div className="relative aspect-[4/3] sm:aspect-[3/2] rounded-3xl overflow-hidden shadow-luxury-lg order-1 md:order-2">
                <Image
                  src={imageSrc}
                  alt={`${name} - Rivique Beauty Delhi NCR`}
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

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid md:grid-cols-3 gap-8 sm:gap-12">

          <div className="md:col-span-2 space-y-6">
            <h2 className="font-serif text-display-sm text-ink">About this service</h2>
            <p className="font-sans text-body-md text-ink-400 leading-relaxed">
              {description}
            </p>

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

            {images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0 w-28 sm:w-36 aspect-[3/4] rounded-xl overflow-hidden shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`${name} detail ${i + 1}`}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside>
            <div className="card-luxury p-5 sm:p-6 space-y-5 md:sticky md:top-24">
              <div>
                <p className="section-label">Starting from</p>
                <p className="font-serif text-display-md text-rose-gold-400 mt-1">
                  {formatPrice(price, service.currency)}
                </p>
              </div>
              <div className="divider-ornament" />
              <div className="space-y-3 font-sans text-body-sm text-ink-400">
                {[
                  ["Duration", `${duration} min`],
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