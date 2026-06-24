"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { API_ROUTES } from "@rivique/shared";
import type { PaginatedDto, ServiceQueryDto } from "@rivique/shared";
import type { IService } from "@rivique/shared";

export function useSearch(filters: ServiceQueryDto = {}) {
  const router      = useRouter();
  const searchParams = useSearchParams();

  const query = useQuery({
    queryKey: ["services", "search", filters],
    queryFn:  () =>
      apiClient
        .get<PaginatedDto<IService>>(API_ROUTES.services.base, { params: filters })
        .then((r) => r.data),
  });

  function updateFilter(key: keyof ServiceQueryDto, value: string | number | boolean) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(String(key), String(value));
    router.push(`/search?${params.toString()}`);
  }

  return { ...query, updateFilter };
}
