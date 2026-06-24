export const API_ROUTES = {
  auth: {
    register:       "/auth/register",
    login:          "/auth/login",
    logout:         "/auth/logout",
    refresh:        "/auth/refresh",
    me:             "/auth/me",
  },
  users: {
    base:           "/users",
    byId:           (id: string) => `/users/${id}`,
    updateProfile:  (id: string) => `/users/${id}/profile`,
  },
  services: {
    base:           "/services",
    bySlug:         (slug: string) => `/services/${slug}`,
    featured:       "/services/featured",
  },
  bookings: {
    base:           "/bookings",
    byId:           (id: string) => `/bookings/${id}`,
    cancel:         (id: string) => `/bookings/${id}/cancel`,
    myBookings:     "/bookings/me",
  },
  payments: {
    createIntent:   "/payments/intent",
    webhook:        "/payments/webhook",
  },
} as const;

export const PAGINATION_DEFAULTS = {
  page:     1,
  pageSize: 12,
} as const;
