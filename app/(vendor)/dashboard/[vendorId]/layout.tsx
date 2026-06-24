import React from "react";
import { DashboardSidebar } from "@/components/ui/DashboardSidebar";

export const metadata = {
  title: "Vendor Dashboard",
};

export default function VendorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { vendorId: string };
}) {
  const { vendorId } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ef] via-[#fdfaf7] to-[#f3ece4] text-ink">
      <div className="flex mt-20">
        <DashboardSidebar vendorId={vendorId} />

        <main className="flex-1 px-12 pt-10 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}