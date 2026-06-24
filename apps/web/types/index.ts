export type { IUser, IService, IBooking, IPayment } from "@rivique/shared";
export type { BookingStatus, PaymentStatus, ServiceCategory, UserRole } from "@rivique/shared";

export interface NavItem {
  label: string;
  href:  string;
}

export interface PageProps<P = Record<string, string>> {
  params:      P;
  searchParams: Record<string, string | string[] | undefined>;
}
