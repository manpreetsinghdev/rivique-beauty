import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedServicesSection } from "@/components/sections/FeaturedServicesSection";
import { BookingCtaSection } from "@/components/sections/BookingCtaSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export const metadata: Metadata = {
  title: "Rivique Beauty — Luxury Bridal Makeup & Hair Studio in Delhi NCR",
  description:
    "Rivique Beauty is Delhi NCR's premier luxury bridal makeup and hair styling studio. Serving brides in Delhi, Gurgaon, Noida, Faridabad & Greater Noida. Book your bridal consultation today.",
  keywords: [
    "bridal makeup Delhi",
    "bridal hair styling Gurgaon",
    "luxury bridal studio Delhi NCR",
    "wedding makeup artist Noida",
    "bridal beauty Faridabad",
    "pre-bridal facial Delhi",
    "bridal package Delhi NCR",
    "Rivique Beauty",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rivique Beauty — Luxury Bridal Studio, Delhi NCR",
    description:
      "Premier bridal makeup, hair styling & skincare for Delhi, Gurgaon, Noida & Greater Noida brides.",
    url: "/",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Rivique Beauty — Delhi NCR Bridal Studio" }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <FeaturedServicesSection />
      <TestimonialsSection />
      <BookingCtaSection />
    </>
  );
}
