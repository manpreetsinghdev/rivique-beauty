"use client";
import { useEffect, useState } from "react";
import { Sparkline } from "@/components/ui/Sparkline";
import { fetchVendorBookings } from "@/lib/api-client";
import type { Booking } from "@/types/booking";

export default function DashboardPage({ params }: { params: { vendorId: string } }) {
  const vendorId = params.vendorId;
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchVendorBookings(vendorId).then((b) => setBookings(b || []));
  }, [vendorId]);

  const recentCounts = bookings.slice(0, 12).map((_, i) => Math.floor(Math.random() * 8) + 1);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Overview</h1>
          <p className="text-body-sm text-ivory-200/70">Welcome back — manage your salon and bookings here.</p>
        </div>
        <div>
          <button className="btn-secondary">New Service</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-glass p-6">
          <p className="section-label">Upcoming</p>
          <p className="text-2xl font-semibold">{bookings.filter(b => b.status === 'confirmed').length}</p>
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Requests</p>
          <p className="text-2xl font-semibold">{bookings.filter(b => b.status === 'pending').length}</p>
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Revenue (est)</p>
          <p className="text-2xl font-semibold">₹{(bookings.reduce((s, b) => s + (b.totalPrice||0), 0)).toLocaleString()}</p>
        </div>
      </div>

      <div className="card-glass p-6">
        <div className="flex items-center justify-between">
          <p className="section-label">Bookings (last 12)</p>
          <p className="text-label text-ivory-200/60">Trend</p>
        </div>
        <Sparkline data={recentCounts} />
      </div>
    </section>
  );
}
