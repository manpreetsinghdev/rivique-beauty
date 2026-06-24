import React from "react";
import { DashboardSidebar } from "@/components/ui/DashboardSidebar";

export const metadata = { title: "Vendor Dashboard" };

export default function VendorLayout({ children, params }: { children: React.ReactNode; params: { vendorId: string } }) {
  const { vendorId } = params;
  return (
    <div className="min-h-screen bg-ink text-ivory-200">
      <div className="flex">
        <DashboardSidebar vendorId={vendorId} />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-12 bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
