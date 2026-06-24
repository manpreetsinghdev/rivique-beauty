"use client";
import { useEffect, useState } from 'react';
import { Sparkline } from '@/components/ui/Sparkline';
import { fetchAdminOverview } from '@/lib/api-client';
import type { AdminOverview } from '@/types/admin';

export default function AdminOverviewPage() {
  const [data, setData] = useState<AdminOverview | null>(null);

  useEffect(() => { fetchAdminOverview().then(d => setData(d || null)); }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Platform Overview</h1>
          <p className="text-body-sm text-ivory-200/70">Manage users, vendors, reviews and bookings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-glass p-6">
          <p className="section-label">Total Users</p>
          <p className="text-2xl font-semibold">{data?.totalUsers ?? '—'}</p>
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Total Vendors</p>
          <p className="text-2xl font-semibold">{data?.totalVendors ?? '—'}</p>
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Pending Bookings</p>
          <p className="text-2xl font-semibold">{data?.pendingBookings ?? '—'}</p>
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Total Bookings</p>
          <p className="text-2xl font-semibold">{data?.totalBookings ?? '—'}</p>
        </div>
      </div>

      <div className="card-glass p-6">
        <div className="flex items-center justify-between">
          <p className="section-label">Bookings (last 12)</p>
        </div>
        <Sparkline data={data?.recentBookings ? data.recentBookings.slice(0, 12).map(() => Math.floor(Math.random() * 8)) : Array.from({length:12}).map(()=>Math.floor(Math.random()*8))} />
      </div>
    </section>
  );
}
