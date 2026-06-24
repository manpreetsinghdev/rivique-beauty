"use client";
import { useEffect, useState } from "react";
import { fetchAvailability, upsertAvailability } from "@/lib/api-client";

export default function AvailabilityPage({ params }: { params: { vendorId: string } }) {
  const vendorId = params.vendorId;
  const [slots, setSlots] = useState<any[]>([]);

  useEffect(() => { fetchAvailability(vendorId).then(s => setSlots(s || [])); }, [vendorId]);

  async function addSlot() {
    const now = new Date();
    const slot = { start: now.toISOString(), end: new Date(now.getTime() + 60*60*1000).toISOString() };
    const created = await upsertAvailability(vendorId, slot);
    setSlots(cur => [created, ...cur]);
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Availability</h2>
        <button className="btn-luxury" onClick={addSlot}>Add Slot</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {slots.map(s => (
          <div key={s.id} className="card p-4 flex justify-between items-center">
            <div>
              <p className="font-sans text-label">{new Date(s.start).toLocaleString()} — {new Date(s.end).toLocaleString()}</p>
            </div>
            <div>
              <button className="btn-ghost">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
