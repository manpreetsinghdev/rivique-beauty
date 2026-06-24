"use client";

import { useEffect, useState } from "react";
import { Sparkline } from "@/components/ui/Sparkline";
import { fetchVendorAnalytics } from "@/lib/api-client";

export default function AnalyticsPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const vendorId = params.vendorId;

  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchVendorAnalytics(vendorId)
      .then((data) => {
        setAnalytics(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [vendorId]);

  const sample = [
    analytics.totalBookings,
    analytics.confirmedBookings,
    analytics.cancelledBookings,
    analytics.totalBookings,
    analytics.confirmedBookings,
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">
          Analytics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div
          className="
          bg-white
          rounded-[32px]
          border
          border-[#efe3d8]
          p-8
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        "
        >
          <p className="section-label">
            Total Bookings
          </p>

          <p className="text-3xl font-semibold">
            {analytics.totalBookings}
          </p>

          <Sparkline data={sample} />
        </div>

        <div
          className="
          bg-white
          rounded-[32px]
          border
          border-[#efe3d8]
          p-8
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        "
        >
          <p className="section-label">
            Confirmed
          </p>

          <p className="text-3xl font-semibold text-green-600">
            {analytics.confirmedBookings}
          </p>
        </div>

        <div
          className="
          bg-white
          rounded-[32px]
          border
          border-[#efe3d8]
          p-8
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        "
        >
          <p className="section-label">
            Cancelled
          </p>

          <p className="text-3xl font-semibold text-red-600">
            {analytics.cancelledBookings}
          </p>
        </div>

        <div
          className="
          bg-white
          rounded-[32px]
          border
          border-[#efe3d8]
          p-8
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        "
        >
          <p className="section-label">
            Revenue
          </p>

          <p className="text-3xl font-semibold">
            ₹{analytics.revenue.toLocaleString()}
          </p>
        </div>

      </div>
    </section>
  );
}