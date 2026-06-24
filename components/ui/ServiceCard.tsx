import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface ServiceCardProps {
  service: any;
  variant?: "default" | "luxury" | "glass";
}

export function ServiceCard({
  service,
  variant = "default",
}: ServiceCardProps) {
  const cardClass =
    variant === "glass"
      ? "card-glass"
      : variant === "luxury"
      ? "card-luxury"
      : "card";

  const imageMap: Record<string, string> = {
    "Bridal Glam": "/service-1.jpeg",
    "Bridal Hair Design": "/service-2.jpeg",
    "Radiance Prep Facial": "/service-3.jpeg",
    "Engagement Makeup": "/gallery3.jpg",
    "The Rivique Package": "/service-4.jpg",
  };

  const imageSrc =
    imageMap[service.title] ||
    service.images?.[0] ||
    "/service-1.jpeg";

  return (
    <Link
      href={`/services/${service.slug || service.id}`}
      className={`group block ${cardClass} overflow-hidden`}
    >
      <div className="aspect-[4/3] w-full overflow-hidden relative bg-gradient-rose">
        <Image
          src={imageSrc}
          alt={`${service.title || service.name} — Rivique Beauty`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <span className="absolute top-3 left-3 badge-gold capitalize">
          Bridal Service
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-2 sm:space-y-3">
        <h3 className="font-serif text-display-sm text-ink group-hover:text-rose-gold-500 transition-colors duration-350 leading-snug">
          {service.title || service.name}
        </h3>

        <p className="font-sans text-body-sm text-ink-400 leading-relaxed line-clamp-2">
          {service.description || "Luxury bridal beauty service."}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-rose-gold-100">
          <span className="font-sans text-body-sm font-semibold text-ink">
            {formatPrice(
              (service.pricePaise || 0) / 100,
              service.currency || "INR"
            )}
          </span>

          <span className="font-sans text-label text-ink-300">
            {service.durationMin || service.duration || 0} min
          </span>
        </div>
      </div>
    </Link>
  );
}