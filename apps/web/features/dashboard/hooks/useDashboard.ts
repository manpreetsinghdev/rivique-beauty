"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { DashboardData } from "../types";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn:  () => apiClient.get<DashboardData>("/dashboard/me").then((r) => r.data),
  });
}
