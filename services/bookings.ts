import type { Booking, BookingFormData } from "@/types/booking";
import type { ApiResponse } from "@/types/api";

export async function submitBooking(
  data: BookingFormData
): Promise<ApiResponse<Booking>> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "Failed to submit booking");
  }

  return res.json();
}
