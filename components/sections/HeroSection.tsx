import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden pt-18"
      aria-label="Hero"
    >
      {/* Decorative rings */}
      <div
        aria-hidden
        className="absolute right-[-8%] top-1/3 w-[520px] h-[520px] rounded-full border border-rose-gold-200/30 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute right-[-4%] top-1/3 w-[340px] h-[340px] rounded-full border border-rose-gold-200/50 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 grid md:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

        {/* ── Text ── */}
        <div className="space-y-6 md:space-y-8 animate-fade-up order-2 md:order-1">
          <p className="section-label">Delhi NCR&apos;s Luxury Bridal Studio</p>

          <h1 className="font-serif text-display-lg sm:text-display-xl md:text-display-2xl text-ink leading-[1.05]">
            Your most{" "}
            <em className="not-italic text-rose-gold-400">radiant</em> day,
            <br />
            perfectly crafted.
          </h1>

          <p className="font-sans text-body-md text-ink-400 leading-relaxed max-w-md">
            {SITE.description} Serving brides across{" "}
            <strong className="font-medium text-ink">
              Delhi, Gurgaon, Noida, Faridabad
            </strong>{" "}
            and Greater Noida.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
            <Link href="/book" className="btn-luxury">
              Book a Consultation
            </Link>
            <Link href="/services" className="btn-ghost">
              Our Services
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-rose-gold-100">
            {[
              { value: "500+", label: "Brides Served" },
              { value: "8 yrs", label: "In Industry" },
              { value: "5.0 ★", label: "Rating" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-display-sm text-rose-gold-400">{value}</p>
                <p className="font-sans text-label text-ink-400 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div className="relative order-1 md:order-2 mx-auto w-full max-w-[360px] md:max-w-none">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-luxury-lg">
            <Image
              src="/rivique-hero.jpeg"
              alt="Luxury Bridal Makeup by Rivique Beauty Delhi NCR"
              fill
              priority
              sizes="(max-width: 768px) 360px, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif text-2xl sm:text-3xl text-white leading-tight">
                
              </p>
              <p className="font-sans text-body-sm text-white/80 mt-1">
                
              </p>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 card-glass px-4 py-3 sm:px-6 sm:py-4">
            <p className="font-script text-xl sm:text-2xl text-rose-gold-400">Est. 2016</p>
            <p className="font-sans text-label text-ink-400 tracking-widest uppercase mt-1">
              South Delhi, India
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
