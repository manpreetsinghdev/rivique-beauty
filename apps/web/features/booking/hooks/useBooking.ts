"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { API_ROUTES } from "@rivique/shared";
import { useBookingStore } from "@/stores/booking.store";
import type { BookingSchema } from "../schemas";
import type { IBooking } from "@rivique/shared";

export function useBooking() {
  const router = useRouter();
  const reset  = useBookingStore((s) => s.reset);

  const { mutate: createBooking, isPending: isLoading } = useMutation({
    mutationFn: (data: BookingSchema) =>
      apiClient.post<IBooking>(API_ROUTES.bookings.base, data).then((r) => r.data),
    onSuccess: (booking) => {
      reset();
      router.push(`/booking/confirmation?id=${booking.id}`);
    },
  });

  return { createBooking, isLoading };
}
