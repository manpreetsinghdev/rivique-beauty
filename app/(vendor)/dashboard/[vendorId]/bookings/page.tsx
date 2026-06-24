"use client";
import { useEffect, useState } from "react";
import { fetchVendorBookings, updateBookingStatus } from "@/lib/api-client";
import type { Booking } from "@/types/booking";

export default function BookingsPage({ params }: { params: { vendorId: string } }) {
  const vendorId = params.vendorId;
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => { fetchVendorBookings(vendorId).then(b => setBookings(b || [])); }, [vendorId]);

  async function changeStatus(id: string, status: string) {
    const updated = await updateBookingStatus(id, status);
    setBookings(cur => cur.map(b => b.id === id ? updated : b));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Bookings</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {bookings.map(b => (
          <div key={b.id} className="card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-sans text-label">{new Date(b.preferredDate).toLocaleDateString()} at {b.preferredTime}</p>
                <p className="text-body-sm text-ivory-200/70">{b.firstName} {b.lastName}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-label capitalize">{b.status}</p>
                <div className="flex gap-2">
                  {b.status === 'pending' && <button className="btn-secondary" onClick={() => changeStatus(b.id, 'confirmed')}>Accept</button>}
                  {b.status !== 'cancelled' && <button className="btn-ghost" onClick={() => changeStatus(b.id, 'cancelled')}>Reject</button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
