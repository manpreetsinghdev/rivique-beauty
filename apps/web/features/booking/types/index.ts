import type { IBooking } from "@rivique/shared";

export interface BookingStep {
  id:    "service" | "datetime" | "review" | "payment";
  label: string;
}

export interface BookingConfirmationData {
  booking: IBooking;
  message: string;
}
