"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingSchema } from "../schemas";
import { useBooking } from "../hooks/useBooking";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";

interface BookingFormProps {
  serviceId: string;
}

export function BookingForm({ serviceId }: BookingFormProps) {
  const { createBooking, isLoading } = useBooking();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { serviceId },
  });

  return (
    <form onSubmit={handleSubmit(createBooking)} className="flex flex-col gap-5">
      <input type="hidden" {...register("serviceId")} />

      <Input
        label="Date & Time"
        type="datetime-local"
        error={errors.scheduledAt?.message}
        {...register("scheduledAt")}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">Notes (optional)</label>
        <textarea
          {...register("notes")}
          rows={3}
          placeholder="Any special requests…"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
        {errors.notes && <p className="text-xs text-red-500">{errors.notes.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-md bg-neutral-900 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {isLoading && <Spinner size="sm" />}
        {isLoading ? "Booking…" : "Confirm Booking"}
      </button>
    </form>
  );
}
