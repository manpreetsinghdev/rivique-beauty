"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function DashboardSidebar({ vendorId }: { vendorId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Overview", href: `/dashboard/${vendorId}` },
    { label: "Services", href: `/dashboard/${vendorId}/services` },
    { label: "Availability", href: `/dashboard/${vendorId}/availability` },
    { label: "Bookings", href: `/dashboard/${vendorId}/bookings` },
    { label: "Analytics", href: `/dashboard/${vendorId}/analytics` },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-[#d8a46c] text-white rounded-full shadow-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-24 left-0 z-40
          w-72 h-fit
          bg-white/90 backdrop-blur-md
          border border-[#eadccf]
          rounded-r-3xl
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          p-6
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Vendor Card */}
        <div className="mb-8 pb-6 border-b border-[#eadccf]">
          <h2 className="font-serif text-3xl text-[#d8a46c]">
            Vendor
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your salon
          </p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    active
                      ? "bg-[#d8a46c] text-white shadow-md"
                      : "text-gray-700 hover:bg-[#f7efe7]"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
    </>
  );
}