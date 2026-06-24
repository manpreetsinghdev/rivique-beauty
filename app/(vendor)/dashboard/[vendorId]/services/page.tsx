"use client";
import { useEffect, useState } from "react";
import { fetchVendorServices, updateService } from "@/lib/api-client";

export default function ServicesPage({ params }: { params: { vendorId: string } }) {
  const vendorId = params.vendorId;
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => { fetchVendorServices(vendorId).then(s => setServices(s || [])); }, [vendorId]);

  async function save(serviceId: string, patch: any) {
    const updated = await updateService(serviceId, patch);
    setServices((cur) => cur.map(s => s.id === serviceId ? updated : s));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Services</h2>
        <button className="btn-luxury">Add Service</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(s => (
          <div className="card p-4" key={s.id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-lg">{s.title || s.name}</h3>
                <p className="text-body-sm text-ivory-200/70">₹{(s.pricePaise||s.price||0)/100}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost" onClick={() => save(s.id, { active: !s.active })}>{s.active ? 'Disable' : 'Enable'}</button>
                <button className="btn-secondary">Edit</button>
              </div>
            </div>
            <p className="mt-2 text-body-sm text-ivory-200/60">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
