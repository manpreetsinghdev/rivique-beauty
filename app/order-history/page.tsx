import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Order History — Rivique Beauty",
  description: "View your booking history and past consultations with Rivique Beauty.",
  alternates: { canonical: "/order-history" },
  openGraph: {
    title: "Order History | Rivique Beauty",
    description: "View your booking history with Rivique Beauty.",
    url: "/order-history",
  },
};

export default function OrderHistoryPage() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="section-label">Your Bookings</p>
          <h1 className="font-serif text-display-lg text-ink">Order History</h1>
          <p className="font-sans text-body-sm text-ink-400 leading-relaxed">
            View all your past and upcoming bookings with Rivique Beauty.
          </p>
        </div>

        {/* Content */}
        <div className="card-glass p-6 md:p-8">
          <p className="text-center text-ink-400 font-medium">
            Sign in to view your order history
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href="/login"
              className="btn-primary text-xs py-3 px-6 text-center"
            >
              Login
            </a>
            <a
              href="/register"
              className="btn-secondary text-xs py-3 px-6 text-center"
            >
              Create Account
            </a>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-glass p-6 text-center">
            <div className="text-3xl text-rose-gold-400 mb-2">📅</div>
            <h3 className="font-serif text-lg text-ink mb-2">Track Bookings</h3>
            <p className="text-sm text-ink-400">View all your consultation appointments in one place.</p>
          </div>
          <div className="card-glass p-6 text-center">
            <div className="text-3xl text-rose-gold-400 mb-2">✓</div>
            <h3 className="font-serif text-lg text-ink mb-2">Instant Confirmation</h3>
            <p className="text-sm text-ink-400">Receive email updates when your booking is confirmed.</p>
          </div>
          <div className="card-glass p-6 text-center">
            <div className="text-3xl text-rose-gold-400 mb-2">⭐</div>
            <h3 className="font-serif text-lg text-ink mb-2">Leave Reviews</h3>
            <p className="text-sm text-ink-400">Share your experience after your consultation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
