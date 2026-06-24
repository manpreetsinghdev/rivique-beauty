import { z } from "zod";

export const bookingSchema = z.object({
  serviceId:   z.string().uuid("Invalid service"),
  scheduledAt: z.string().min(1, "Please select a date and time"),
  notes:       z.string().max(500).optional(),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
