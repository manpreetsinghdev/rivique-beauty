export type ServiceCategory =
  | "bridal-makeup"
  | "hair-styling"
  | "skincare"
  | "pre-wedding"
  | "packages";

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  duration: number; // minutes
  price: number;
  currency: string;
  images: string[];
  featured: boolean;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  yearsExperience: number;
  socialLinks: Partial<Record<"instagram" | "facebook" | "pinterest", string>>;
}

export interface Testimonial {
  id: string;
  clientName: string;
  weddingDate: string;
  rating: number;
  review: string;
  serviceUsed: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: ServiceCategory;
  width: number;
  height: number;
}
