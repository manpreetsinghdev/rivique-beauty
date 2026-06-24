import type { BookingStatus, PaymentStatus, ServiceCategory, UserRole } from "../enums";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface IService {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  duration: number;
  price: number;
  currency: string;
  images: string[];
  featured: boolean;
  isActive: boolean;
  tags: string[];
}

export interface IBooking {
  id: string;
  userId: string;
  serviceId: string;
  service?: IService;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  scheduledAt: string;
  notes?: string;
  totalPrice: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: string;
  providerPaymentId?: string;
  createdAt: string;
}
