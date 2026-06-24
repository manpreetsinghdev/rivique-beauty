import type { Service } from "@/types";

const SERVICES: Service[] = [
  {
    id: "1",
    slug: "radiance-prep",
    name: "Radiance Prep Facial",
    category: "skincare",
    description:
         "Pre-wedding glow facial targeting luminosity and hydration. Using clinical-grade products and techniques, this facial is recommended 2–4 weeks before the wedding for best results.",
    shortDescription: "Full bridal makeup with airbrush & lashes.",
    duration: 120,
    price: 25000,
    currency: "INR",
    images: ["/service-1.jpeg", "/gallery1.jpeg", "/gallery7.jpeg"],
    featured: true,
    tags: ["glow", "hydration", "pre-wedding"],
  },
  {
    id: "2",
    slug: "bridal-hair",
    name: "Bridal Hair Design",
    category: "hair-styling",
    description:
      "Custom updo or half-up style designed in consultation with the bride. Includes a complimentary trial session so your wedding-day style is perfected in advance.",
    shortDescription: "Custom bridal updo with trial session.",
    duration: 90,
    price: 15000,
    currency: "INR",
    images: ["/service-2.jpeg", "/gallery2.jpg", "/gallery6.jpg"],
    featured: true,
    tags: ["updo", "trial", "custom"],
  },
  {
    id: "3",
    slug: "bridal-glam",
    name: "Bridal Glam",
    category: "bridal-makeup",
    description:
            "Full-day bridal makeup application with airbrush foundation, lash application, and touch-up kit included. Crafted for brides across Delhi NCR who want a flawless, photo-ready finish that lasts all day.",
    shortDescription: "Pre-wedding glow & hydration facial.",
    duration: 75,
    price: 8000,
    currency: "INR",
    images: ["/service-3.jpeg", "/gallery4.jpg", "/gallery8.jpeg"],
    featured: false,
    tags: ["airbrush", "lashes", "touch-up kit"],
  },
  
  {
    id: "4",
    slug: "the-rivique-package",
    name: "The Rivique Package",
    category: "packages",
    description:
      "Our signature all-inclusive package: bridal makeup, hair styling, radiance facial, and bridesmaid glam for up to 4. Everything you need for your perfect day, beautifully coordinated.",
    shortDescription: "All-inclusive bridal & bridesmaid package.",
    duration: 420,
    price: 65000,
    currency: "INR",
    images: ["/service-4.jpg", "/gallery5.jpg", "/gallery9.jpeg"],
    featured: true,
    tags: ["package", "bridesmaid", "all-inclusive"],
  },
  {
    id: "5",
    slug: "engagement-makeup",
    name: "Engagement Makeup",
    category: "bridal-makeup",
    description:
      "Elegant engagement makeup with premium products, HD finish, and long-lasting wear. Perfect for ring ceremonies, roka, and pre-wedding shoots across Delhi NCR.",
    shortDescription: "Luxury HD makeup for your engagement day.",
    duration: 90,
    price: 12000,
    currency: "INR",
    images: ["/gallery3.jpg", "/service-1.jpeg"],
    featured: true,
    tags: ["engagement", "hd", "glam"],
  },
];

export async function getServices(): Promise<Service[]> {
  return SERVICES;
}

export async function getFeaturedServices(): Promise<Service[]> {
  return SERVICES.filter((s) => s.featured);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}
