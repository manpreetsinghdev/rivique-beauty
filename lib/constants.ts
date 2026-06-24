export const SITE = {
  name: "Rivique Beauty",
  tagline: "Delhi NCR's Premier Bridal Beauty Studio",
  description:
    "Luxury bridal makeup, hair styling, and skincare crafted for Delhi NCR brides. Serving Delhi, Gurgaon, Noida, Faridabad & Greater Noida.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://riviquebeauty.com",
  email: "hello@riviquebeauty.com",
  phone: "+91 98100 00000",
  whatsapp: "https://wa.me/919810000000",
  instagram: "https://instagram.com/riviquebeauty",
  address: "South Delhi, New Delhi — 110049",
  city: "New Delhi",
  region: "Delhi NCR",
  country: "IN",
  geo: { lat: "28.6139", lng: "77.2090" },
} as const;

export const NAV_LINKS = [
  { label: "Services",     href: "/services" },
  { label: "Gallery",      href: "/gallery" },
  { label: "About",        href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
] as const;

export const BOOKING_LEAD_DAYS = 14;
