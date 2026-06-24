"use client";
import { Sparkline } from "@/components/ui/Sparkline";

export default function AnalyticsPage({ params }: { params: { vendorId: string } }) {
  const sample = [3,5,2,6,8,5,7,9,6,4,5,8];
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-glass p-6">
          <p className="section-label">Bookings</p>
          <p className="text-2xl font-semibold">{sample.reduce((a,b)=>a+b,0)}</p>
          <Sparkline data={sample} />
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Revenue (est)</p>
          <p className="text-2xl font-semibold">₹1,24,800</p>
        </div>
        <div className="card-glass p-6">
          <p className="section-label">Conversion</p>
          <p className="text-2xl font-semibold">4.8%</p>
        </div>
      </div>
    </section>
  );
}
