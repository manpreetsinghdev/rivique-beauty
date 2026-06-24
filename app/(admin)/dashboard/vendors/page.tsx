"use client";
import { useEffect, useState } from 'react';
import { fetchAdminVendors, verifyVendor } from '@/lib/api-client';
import type { Vendor } from '@/types/admin';

export default function AdminVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => { fetchAdminVendors().then(v => setVendors(v || [])); }, []);

  async function toggleVerify(id: string, verify: boolean) {
    const updated = await verifyVendor(id, verify);
    setVendors(cur => cur.map(x => x.id === id ? updated : x));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Vendors</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {vendors.map(v => (
          <div key={v.id} className="card p-4 flex justify-between items-center">
            <div>
              <p className="font-sans">{v.name} — <span className="text-body-sm text-ivory-200/70">{v.specialization}</span></p>
              <p className="text-body-sm text-ivory-200/60">{v.verified ? 'Verified' : 'Pending verification'}</p>
            </div>
            <div className="flex gap-2">
              {!v.verified && <button className="btn-secondary" onClick={() => toggleVerify(v.id, true)}>Verify</button>}
              {v.verified && <button className="btn-ghost" onClick={() => toggleVerify(v.id, false)}>Unverify</button>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
