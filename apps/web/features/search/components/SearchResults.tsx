"use client";

import { useSearch } from "../hooks/useSearch";
import { ServiceCard } from "./ServiceCard";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/feedback/EmptyState";
import type { ServiceQueryDto } from "@rivique/shared";

interface SearchResultsProps {
  filters: ServiceQueryDto;
}

export function SearchResults({ filters }: SearchResultsProps) {
  const { data, isLoading, isError } = useSearch(filters);

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (isError)   return <EmptyState title="Failed to load services" description="Please try again." />;
  if (!data?.data.length) return <EmptyState title="No services found" description="Try adjusting your filters." />;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
