"use client";
import { useEffect, useState } from 'react';
import { Sparkline } from '@/components/ui/Sparkline';
import { fetchAdminAnalytics } from '@/lib/api-client';
import type { Analytics } from '@/types/admin';

export default function AdminAnalytics() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => { fetchAdminAnalytics().then(d => setData(d || null)); }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-glass p-6">
          <p className="section-label">Revenue</p>
          <p className="text-2xl font-semibold">₹{(data?.revenue||0).toLocaleString()}</p>
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Avg Booking Value</p>
          <p className="text-2xl font-semibold">₹{(data?.avgBookingValue||0).toLocaleString()}</p>
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Total Bookings</p>
          <p className="text-2xl font-semibold">{data?.bookingsCount||'—'}</p>
        </div>
      </div>

      <div className="card-glass p-6">
        <Sparkline data={[2,4,3,5,6,4,6,8,7,5,6,9]} />
      </div>
    </section>
  );
}
