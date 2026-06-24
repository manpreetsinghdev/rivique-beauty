import type { Metadata } from "next";
import { getServices } from "@/services/services";
import { SITE } from "@/lib/constants";
import { BookingForm } from "@/components/forms/BookingForm";

export const metadata: Metadata = {
  title: "Book a Bridal Consultation — Delhi NCR",
  description: `Book your luxury bridal makeup and hair consultation with ${SITE.name}. Serving Delhi, Gurgaon, Noida, Faridabad & Greater Noida. Response within 24 hours.`,
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Consultation | Rivique Beauty Delhi NCR",
    description: "Schedule your bridal beauty consultation with Delhi NCR's top bridal studio.",
    url: "/book",
  },
};

export default async function BookPage() {
  const services = await getServices();

  return (
    <div className="pt-24 min-h-screen bg-gradient-hero">
      <div className="max-w-2xl mx-auto px-6 py-20 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="section-label">Let&apos;s Connect</p>
          <h1 className="font-serif text-display-lg text-ink">Book a Consultation</h1>
          <p className="font-sans text-body-sm text-ink-400 leading-relaxed">
            Fill out the form below and we&apos;ll be in touch within 24 hours to confirm your appointment.
            We serve brides across <strong className="text-ink font-medium">Delhi, Gurgaon, Noida, Faridabad &amp; Greater Noida</strong>.
          </p>
        </div>

        {/* Form */}
        <BookingForm services={services} />
      </div>
    </div>
  );
}
