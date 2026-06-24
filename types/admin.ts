export type UserRole = "USER" | "VENDOR" | "ADMIN";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  bookingId: string;
  rating: number; // 1-5
  comment: string;
  status: "pending" | "approved" | "rejected";
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  yearsExperience: number;
  verified: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOverview {
  totalUsers: number;
  totalVendors: number;
  totalBookings: number;
  pendingBookings: number;
  totalReviews: number;
  averageRating: number;
  recentBookings: any[];
}

export interface Analytics {
  period: string;
  bookingsCount: number;
  revenue: number;
  avgBookingValue: number;
  vendorMetrics: {
    topVendors: Array<{
      id: string;
      name: string;
      bookingCount: number;
      revenue: number;
    }>;
  };
  serviceMetrics: {
    topServices: Array<{
      id: string;
      name: string;
      bookingCount: number;
    }>;
  };
}
