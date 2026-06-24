import { create } from "zustand";
import type { IService } from "@rivique/shared";

interface BookingState {
  selectedService: IService | null;
  scheduledAt:     string | null;
  notes:           string;
  setService:      (service: IService) => void;
  setSchedule:     (scheduledAt: string) => void;
  setNotes:        (notes: string) => void;
  reset:           () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedService: null,
  scheduledAt:     null,
  notes:           "",
  setService:  (selectedService) => set({ selectedService }),
  setSchedule: (scheduledAt)     => set({ scheduledAt }),
  setNotes:    (notes)           => set({ notes }),
  reset:       ()                => set({ selectedService: null, scheduledAt: null, notes: "" }),
}));
