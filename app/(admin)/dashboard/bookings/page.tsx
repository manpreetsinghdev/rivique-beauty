"use client";
import { useEffect, useState } from 'react';
import { fetchAdminBookings, updateBookingStatus } from '@/lib/api-client';
import type { Booking } from '@/types/booking';

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => { fetchAdminBookings().then(b => setBookings(b || [])); }, []);

  async function change(id: string, status: string) {
    const updated = await updateBookingStatus(id, status);
    setBookings(cur => cur.map(x => x.id === id ? updated : x));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Bookings</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {bookings.map(b => (
          <div key={b.id} className="card p-4 flex justify-between items-center">
            <div>
              <p className="font-sans">{b.serviceId} — <span className="text-body-sm text-ivory-200/70">{new Date(b.preferredDate).toLocaleString()} at {b.preferredTime}</span></p>
              <p className="text-body-sm">{b.firstName} {b.lastName}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => change(b.id, 'confirmed')}>Confirm</button>
              <button className="btn-ghost" onClick={() => change(b.id, 'cancelled')}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
