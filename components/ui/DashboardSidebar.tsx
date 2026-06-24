"use client";

import Link from "next/link";
import { useState } from "react";

export function DashboardSidebar({ vendorId }: { vendorId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-3 bg-rose-gold-400 text-ink rounded-full shadow-lg"
        aria-label="Toggle menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-20 left-0 h-screen md:h-auto z-30
        w-72 md:w-72
        bg-ivory-200/40 md:bg-ivory-200/40 card-glass-dark p-6
        transform transition-transform duration-300 md:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-script text-2xl text-rose-gold-400">Vendor</h3>
            <p className="text-body-sm text-ivory-200/80 mt-1">Manage your salon</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 text-ivory-200/60 hover:text-ivory-200"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="3" x2="17" y2="17" />
              <line x1="3" y1="17" x2="17" y2="3" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <Link href={`/dashboard/${vendorId}`} className="py-2 px-3 rounded-lg hover:bg-ivory-200/10" onClick={() => setIsOpen(false)}>
            Overview
          </Link>
          <Link href={`/dashboard/${vendorId}/services`} className="py-2 px-3 rounded-lg hover:bg-ivory-200/10" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link href={`/dashboard/${vendorId}/availability`} className="py-2 px-3 rounded-lg hover:bg-ivory-200/10" onClick={() => setIsOpen(false)}>
            Availability
          </Link>
          <Link href={`/dashboard/${vendorId}/bookings`} className="py-2 px-3 rounded-lg hover:bg-ivory-200/10" onClick={() => setIsOpen(false)}>
            Bookings
          </Link>
          <Link href={`/dashboard/${vendorId}/analytics`} className="py-2 px-3 rounded-lg hover:bg-ivory-200/10" onClick={() => setIsOpen(false)}>
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
