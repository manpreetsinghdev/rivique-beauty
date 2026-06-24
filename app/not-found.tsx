import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <p className="font-script text-7xl text-rose-gold-400">404</p>
        <h1 className="font-serif text-display-md text-ink">Page not found</h1>
        <p className="font-sans text-body-sm text-ink-400 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Return Home
        </Link>
      </div>
    </div>
  );
}
