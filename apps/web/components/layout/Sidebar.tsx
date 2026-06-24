"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { label: "Overview",     href: "/dashboard" },
  { label: "Appointments", href: "/dashboard/appointments" },
  { label: "Payments",     href: "/dashboard/payments" },
  { label: "Profile",      href: "/dashboard/profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex w-60 flex-col justify-between border-r border-neutral-200 bg-white px-4 py-8">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === href
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      <button
        onClick={logout}
        className="rounded-md px-3 py-2 text-left text-sm font-medium text-neutral-500 hover:bg-neutral-100"
      >
        Sign out
      </button>
    </aside>
  );
}
