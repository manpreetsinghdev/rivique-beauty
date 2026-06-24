"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { API_ROUTES } from "@rivique/shared";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/feedback/EmptyState";
import type { IBooking, PaginatedDto } from "@rivique/shared";
import { BookingStatus } from "@rivique/shared";

const STATUS_VARIANT: Record<BookingStatus, "success" | "warning" | "error" | "default" | "info"> = {
  [BookingStatus.CONFIRMED]: "success",
  [BookingStatus.PENDING]:   "warning",
  [BookingStatus.CANCELLED]: "error",
  [BookingStatus.COMPLETED]: "info",
  [BookingStatus.NO_SHOW]:   "default",
};

export function AppointmentList() {
  const { data, isLoading } = useQuery({
    queryKey: ["bookings", "me"],
    queryFn:  () =>
      apiClient.get<PaginatedDto<IBooking>>(API_ROUTES.bookings.myBookings).then((r) => r.data),
  });

  if (isLoading) return <div className="flex justify-center py-12"><Spinner /></div>;
  if (!data?.data.length) return (
    <EmptyState
      title="No appointments yet"
      description="Browse services and book your first session."
      action={<Link href="/search" className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white">Explore Services</Link>}
    />
  );

  return (
    <ul className="flex flex-col gap-3">
      {data.data.map((booking) => (
        <li key={booking.id} className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-5">
          <div>
            <p className="font-medium text-neutral-900">{booking.service?.name ?? "Service"}</p>
            <p className="mt-0.5 text-sm text-neutral-500">
              {new Date(booking.scheduledAt).toLocaleString()}
            </p>
          </div>
          <Badge label={booking.status} variant={STATUS_VARIANT[booking.status]} />
        </li>
      ))}
    </ul>
  );
}
