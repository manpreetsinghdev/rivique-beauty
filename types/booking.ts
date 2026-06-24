export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface BookingSlot {
  date: string; // ISO date string
  time: string; // HH:mm
  available: boolean;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  weddingDate: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface Booking extends BookingFormData {
  id: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  currency: string;
}
