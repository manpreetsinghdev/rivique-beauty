"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export function AdminSidebar({ adminId }: { adminId?: string }) {
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
        fixed md:sticky top-20 left-0 h-screen md:h-auto z-30
        w-64 md:w-auto md:top-20
        bg-gradient-to-b from-rose-900/40 to-ink/20 backdrop-blur-md
        border-r md:border-r md:border-r-0 border-rose-900/10
        transform transition-transform duration-300 md:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 md:rounded-lg rounded-none h-full md:h-auto">
          <div className="flex items-center justify-between mb-4 md:mb-4">
            <h3 className="font-serif text-lg">Admin</h3>
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
            <Link className="nav-link" href={`/admin/dashboard`} onClick={() => setIsOpen(false)}>
              Overview
            </Link>
            <Link className="nav-link" href={`/admin/dashboard/users`} onClick={() => setIsOpen(false)}>
              Users
            </Link>
            <Link className="nav-link" href={`/admin/dashboard/vendors`} onClick={() => setIsOpen(false)}>
              Vendors
            </Link>
            <Link className="nav-link" href={`/admin/dashboard/reviews`} onClick={() => setIsOpen(false)}>
              Reviews
            </Link>
            <Link className="nav-link" href={`/admin/dashboard/bookings`} onClick={() => setIsOpen(false)}>
              Bookings
            </Link>
            <Link className="nav-link" href={`/admin/dashboard/analytics`} onClick={() => setIsOpen(false)}>
              Analytics
            </Link>
          </nav>
        </div>
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
