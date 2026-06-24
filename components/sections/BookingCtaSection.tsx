import Link from "next/link";

export function BookingCtaSection() {
  return (
    <section className="py-24 bg-ink relative overflow-hidden">
      {/* Decorative */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-rose-gold-400/15 pointer-events-none"
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center space-y-8">
        <p className="section-label text-rose-gold-400">Begin Your Journey</p>
        <h2 className="font-serif text-display-lg md:text-display-xl text-ivory-200 leading-tight">
          Ready to feel like the most beautiful version of yourself?
        </h2>
        <p className="font-sans text-body-sm text-ivory-200/60 leading-relaxed max-w-lg mx-auto">
          Book a complimentary consultation with our lead artist. We&apos;ll discuss your
          vision, timeline, and craft a beauty experience exclusively for you.
        </p>
        <Link href="/book" className="btn-luxury">
          Schedule My Consultation
        </Link>
      </div>
    </section>
  );
}
