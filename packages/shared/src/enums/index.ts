export enum BookingStatus {
  PENDING   = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  NO_SHOW   = "no_show",
}

export enum PaymentStatus {
  UNPAID     = "unpaid",
  PAID       = "paid",
  REFUNDED   = "refunded",
  FAILED     = "failed",
}

export enum UserRole {
  CLIENT    = "client",
  ARTIST    = "artist",
  ADMIN     = "admin",
}

export enum ServiceCategory {
  BRIDAL_MAKEUP = "bridal-makeup",
  HAIR_STYLING  = "hair-styling",
  SKINCARE      = "skincare",
  PRE_WEDDING   = "pre-wedding",
  PACKAGES      = "packages",
}
