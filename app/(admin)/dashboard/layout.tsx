import React from 'react';
import { AdminSidebar } from '@/components/ui/AdminSidebar';

export const metadata = { title: 'Rivique Admin' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-ivory-200">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
