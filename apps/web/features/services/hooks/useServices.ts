"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { API_ROUTES } from "@rivique/shared";
import type { IService } from "@rivique/shared";

export function useServices(slug?: string) {
  return useQuery({
    queryKey: ["services", slug],
    queryFn:  () => slug
      ? apiClient.get<IService>(API_ROUTES.services.bySlug(slug)).then((r) => r.data)
      : apiClient.get<IService[]>(API_ROUTES.services.base).then((r) => r.data),
    enabled: slug !== undefined ? !!slug : true,
  });
}
