import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "luxury" | "glass";
}

export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  const cardClass =
    variant === "glass"
      ? "card-glass"
      : variant === "luxury"
      ? "card-luxury"
      : "card";

  const imageSrc = service.images?.[0] ?? null;

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group block ${cardClass} overflow-hidden`}
    >
      {/* ── Image ── */}
      <div className="aspect-[4/3] w-full overflow-hidden relative bg-gradient-rose">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${service.name} — Rivique Beauty Delhi NCR`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-script text-4xl text-rose-gold-400/40">Rivique</span>
          </div>
        )}

        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 badge-gold capitalize">
          {service.category.replace(/-/g, " ")}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="p-5 sm:p-6 space-y-2 sm:space-y-3">
        <h3 className="font-serif text-display-sm text-ink group-hover:text-rose-gold-500 transition-colors duration-350 leading-snug">
          {service.name}
        </h3>
        <p className="font-sans text-body-sm text-ink-400 leading-relaxed line-clamp-2">
          {service.shortDescription}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-rose-gold-100">
          <span className="font-sans text-body-sm font-semibold text-ink">
            {formatPrice(service.price, service.currency)}
          </span>
          <span className="font-sans text-label text-ink-300">
            {service.duration} min
          </span>
        </div>
      </div>
    </Link>
  );
}
