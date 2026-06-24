import Link from "next/link";
import type { IService } from "@rivique/shared";

interface ServiceDetailProps {
  service: IService;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {service.images[0] && (
        <div className="mb-8 aspect-video overflow-hidden rounded-2xl">
          <img src={service.images[0]} alt={service.name} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">
            {service.category.replace(/-/g, " ")}
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-neutral-900">{service.name}</h1>
        </div>
        <p className="text-2xl font-semibold text-neutral-900">
          {service.currency} {service.price.toFixed(2)}
        </p>
      </div>
      <p className="mt-4 text-neutral-600 leading-relaxed">{service.description}</p>
      <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
        <span>{service.duration} min</span>
      </div>
      <Link
        href={`/booking/${service.id}`}
        className="mt-8 inline-block rounded-md bg-neutral-900 px-8 py-3 text-sm font-medium text-white hover:bg-neutral-700"
      >
        Book This Service
      </Link>
    </div>
  );
}
