"use client";

import { useSearch } from "../hooks/useSearch";
import { ServiceCategory } from "@rivique/shared";
import type { ServiceQueryDto } from "@rivique/shared";

const CATEGORIES = Object.values(ServiceCategory);

interface SearchFiltersProps {
  filters:   ServiceQueryDto;
}

export function SearchFilters({ filters }: SearchFiltersProps) {
  const { updateFilter } = useSearch(filters);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Category</label>
        <select
          defaultValue={filters.category ?? ""}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none"
        >
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c.replace(/-/g, " ")}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Max Price</label>
        <input
          type="number"
          defaultValue={filters.maxPrice}
          onBlur={(e) => updateFilter("maxPrice", Number(e.target.value))}
          placeholder="e.g. 500"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none"
        />
      </div>
    </div>
  );
}
