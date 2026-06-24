// ── Auth ────────────────────────────────────────────────────────────────────
export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

// ── Bookings ─────────────────────────────────────────────────────────────────
export interface CreateBookingDto {
  serviceId: string;
  scheduledAt: string; // ISO datetime
  notes?: string;
}

export interface UpdateBookingDto {
  scheduledAt?: string;
  notes?: string;
}

export interface CancelBookingDto {
  reason?: string;
}

// ── Services ─────────────────────────────────────────────────────────────────
export interface ServiceQueryDto {
  category?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
  search?: string;
}

// ── Payments ─────────────────────────────────────────────────────────────────
export interface CreatePaymentIntentDto {
  bookingId: string;
  currency?: string;
}

// ── Common ───────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedDto<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
