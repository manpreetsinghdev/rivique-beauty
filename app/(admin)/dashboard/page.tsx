"use client";

import { useEffect, useState } from "react";
import { Sparkline } from "@/components/ui/Sparkline";
import { fetchAdminOverview } from "@/lib/api-client";
import type { AdminOverview } from "@/types/admin";

export default function AdminOverviewPage() {
  const [data, setData] = useState<AdminOverview | null>(null);

  useEffect(() => {
    fetchAdminOverview().then((d) => setData(d || null));
  }, []);

  return (
    <section className="space-y-8 pt-18">
      <div>
      <h1 className="text-4xl font-bold text-[#3B2F2F] mb-2">
  Admin Dashboard
</h1>

        <p className="text-gray-400 mt-2">
          Manage users, vendors, reviews and bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600">
            Total Users
          </p>

          <p className="text-4xl font-bold text-black mt-3">
            {data?.totalUsers ?? 0}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600">
            Total Vendors
          </p>

          <p className="text-4xl font-bold text-black mt-3">
            {data?.totalVendors ?? 0}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600">
            Pending Bookings
          </p>

          <p className="text-4xl font-bold text-black mt-3">
            {data?.pendingBookings ?? 0}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600">
            Total Bookings
          </p>

          <p className="text-4xl font-bold text-black mt-3">
            {data?.totalBookings ?? 0}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-amber-600 font-semibold mb-4">
          Bookings (Last 12)
        </h3>

        <Sparkline
          data={
            data?.recentBookings
              ? data.recentBookings
                  .slice(0, 12)
                  .map(() => Math.floor(Math.random() * 8))
              : Array.from({ length: 12 }).map(() =>
                  Math.floor(Math.random() * 8)
                )
          }
        />
      </div>
    </section>
  );
}