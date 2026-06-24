"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/ui/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isAdmin =
      localStorage.getItem("adminLoggedIn") === "true";

    if (!isAdmin) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-ink text-[#3B2F2F]">
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8 bg-[#F8F4EF] min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}