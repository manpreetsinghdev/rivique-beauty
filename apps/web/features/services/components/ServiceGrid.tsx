import { ServiceCard } from "@/features/search/components/ServiceCard";
import type { IService } from "@rivique/shared";

interface ServiceGridProps {
  services: IService[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
