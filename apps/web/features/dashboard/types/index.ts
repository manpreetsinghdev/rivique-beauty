import type { IBooking, IPayment } from "@rivique/shared";

export interface DashboardStats {
  totalBookings:    number;
  upcomingCount:    number;
  totalSpend:       number;
  currency:         string;
}

export interface DashboardData {
  stats:    DashboardStats;
  upcoming: IBooking[];
  recent:   IPayment[];
}
