import Link from "next/link";
import type { IService } from "@rivique/shared";

interface ServiceCardProps {
  service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-md"
    >
      {service.images[0] && (
        <div className="aspect-[4/3] overflow-hidden">
          <img src={service.images[0]} alt={service.name} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-col gap-1 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
          {service.category.replace(/-/g, " ")}
        </p>
        <h3 className="font-semibold text-neutral-900">{service.name}</h3>
        <p className="text-sm text-neutral-500 line-clamp-2">{service.shortDescription}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-800">
            {service.currency} {service.price.toFixed(2)}
          </span>
          <span className="text-xs text-neutral-400">{service.duration} min</span>
        </div>
      </div>
    </Link>
  );
}
