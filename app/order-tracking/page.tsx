import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { OrderTrackingForm } from "@/components/forms/OrderTrackingForm";

export const metadata: Metadata = {
  title: "Track Your Order — Rivique Beauty",
  description: "Track your bridal beauty booking status with Rivique Beauty. Enter your order ID or email to get updates.",
  alternates: { canonical: "/order-tracking" },
  openGraph: {
    title: "Track Your Order | Rivique Beauty",
    description: "Track your bridal beauty consultation booking status.",
    url: "/order-tracking",
  },
};

export default function OrderTrackingPage() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-hero">
      <div className="max-w-2xl mx-auto px-6 py-20 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="section-label">Track Your Booking</p>
          <h1 className="font-serif text-display-lg text-ink">Order Tracking</h1>
          <p className="font-sans text-body-sm text-ink-400 leading-relaxed">
            Enter your booking details below to track the status of your consultation appointment.
          </p>
        </div>

        {/* Form */}
        <OrderTrackingForm />
      </div>
    </div>
  );
}
