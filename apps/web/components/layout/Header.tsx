import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-neutral-900">
          Rivique Beauty
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-600">
          <Link href="/services" className="hover:text-neutral-900">Services</Link>
          <Link href="/search"   className="hover:text-neutral-900">Explore</Link>
          <Link href="/login"    className="rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700">
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
