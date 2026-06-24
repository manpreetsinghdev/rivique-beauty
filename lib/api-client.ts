import type { Booking } from "@/types/booking";
import type { User, Review, Vendor, AdminOverview, Analytics } from "@/types/admin";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ── Auth ────────────────────────────────────────────────────────────────────
export function login(email: string, password: string) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  return request("/api/auth/register", { method: "POST", body: JSON.stringify(data) });
}

// ── Admin ───────────────────────────────────────────────────────────────────
export function fetchAdminOverview(): Promise<AdminOverview> {
  return request("/api/admin/overview");
}

export function fetchAdminUsers(): Promise<User[]> {
  return request("/api/admin/users");
}

export function updateUserRole(id: string, role: string): Promise<User> {
  return request(`/api/admin/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

export function fetchAdminVendors(): Promise<Vendor[]> {
  return request("/api/admin/vendors");
}

export function verifyVendor(id: string, verify: boolean): Promise<Vendor> {
  return request(`/api/admin/vendors/${id}/verify`, {
    method: "PATCH",
    body: JSON.stringify({ verify }),
  });
}

export function fetchAdminBookings(): Promise<Booking[]> {
  return request("/api/admin/bookings");
}

export function updateBookingStatus(id: string, status: string): Promise<Booking> {
  return request(`/api/admin/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function fetchAdminReviews(): Promise<Review[]> {
  return request("/api/admin/reviews");
}

export function moderateReview(id: string, action: string): Promise<Review> {
  return request(`/api/admin/reviews/${id}/moderate`, {
    method: "PATCH",
    body: JSON.stringify({ action }),
  });
}

export function fetchAdminAnalytics(): Promise<Analytics> {
  return request("/api/admin/analytics");
}

// ── Vendor ──────────────────────────────────────────────────────────────────
export function fetchVendorBookings(vendorId: string): Promise<Booking[]> {
  return request(`/api/vendor/bookings?vendorId=${vendorId}`);
}

export function fetchVendorServices(vendorId: string): Promise<any[]> {
  return request(`/api/vendor/services?vendorId=${vendorId}`);
}

export function updateService(id: string, data: Record<string, unknown>): Promise<any> {
  return request(`/api/vendor/services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function fetchAvailability(vendorId: string): Promise<any[]> {
  return request(`/api/vendor/availability?vendorId=${vendorId}`);
}

export function upsertAvailability(vendorId: string, slot: Record<string, unknown>): Promise<any> {
  return request(`/api/vendor/availability?vendorId=${vendorId}`, {
    method: "PUT",
    body: JSON.stringify(slot),
  });
}
