import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bride Testimonials — Rivique Beauty Delhi NCR",
  description:
    "Read real reviews from brides who chose Rivique Beauty for their wedding day makeup and hair styling in Delhi, Gurgaon, Noida and Faridabad.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Bride Reviews | Rivique Beauty Delhi NCR",
    description:
      "500+ happy brides across Delhi NCR. Read their stories and book your consultation.",
    url: "/testimonials",
  },
};

const REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Gurgaon",
    weddingDate: "February 2024",
    service: "Bridal Glam + Hair",
    quote:
      "Rivique Beauty made my wedding day absolutely magical. The makeup lasted the entire 12-hour event and the airbrush finish was flawless in every photo. Riya understood my vision perfectly from the very first consultation.",
    rating: 5,
  },
  {
    name: "Ananya Kapoor",
    location: "South Delhi",
    weddingDate: "December 2023",
    service: "The Rivique Package",
    quote:
      "Booked the full package for myself and three bridesmaids. The team was professional, punctual and the results were stunning. Everyone kept asking who did our makeup. Highly recommend to all Delhi NCR brides!",
    rating: 5,
  },
  {
    name: "Riya Mehta",
    location: "Noida",
    weddingDate: "November 2023",
    service: "Radiance Prep Facial + Bridal Glam",
    quote:
      "The pre-bridal facial literally transformed my skin. On my wedding day I felt more confident than ever. The team travelled to our venue in Noida without any hassle. Rivique is worth every rupee.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    location: "Faridabad",
    weddingDate: "March 2024",
    service: "Bridal Hair Design",
    quote:
      "Kavya created the most beautiful juda I have ever seen. It held perfectly through 8 hours of celebrations and the design matched my lehenga to perfection.",
    rating: 5,
  },
  {
    name: "Aditi Verma",
    location: "Greater Noida",
    weddingDate: "January 2024",
    service: "Bridal Glam",
    quote:
      "I was nervous about heavy bridal makeup but Riya created a look that felt like me — just elevated. Natural, glowing, and photo-perfect. I cried happy tears when I saw myself.",
    rating: 5,
  },
  {
    name: "Pooja Bhatia",
    location: "Dwarka, Delhi",
    weddingDate: "October 2023",
    service: "The Rivique Package",
    quote:
      "From the trial to the wedding day, every interaction with the Rivique team was five-star. They are punctual, calm under pressure and incredibly talented. Cannot recommend enough.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <div className="pt-18 min-h-screen bg-ivory-200">
      {/* Page header */}
      <div className="bg-gradient-hero py-20 text-center space-y-4">
        <p className="section-label">Real Brides, Real Results</p>
        <h1 className="font-serif text-display-xl text-ink">
          Bride Testimonials
        </h1>
        <p className="font-sans text-body-sm text-ink-400 max-w-md mx-auto leading-relaxed">
          500+ brides trusted Rivique Beauty across Delhi NCR. Here are their stories.
        </p>
      </div>

      {/* Reviews grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map(({ name, location, weddingDate, service, quote, rating }) => (
            <figure key={name} className="card-luxury p-7 space-y-4 flex flex-col">
              {/* Stars */}
              <div
                className="flex gap-0.5"
                aria-label={`${rating} out of 5 stars`}
              >
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-rose-gold-400 text-sm" aria-hidden>★</span>
                ))}
              </div>

              <blockquote className="flex-1">
                <p className="font-sans text-body-sm text-ink-500 leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="border-t border-rose-gold-100 pt-4 space-y-0.5">
                <p className="font-serif text-body-md font-medium text-ink">{name}</p>
                <p className="section-label">{service}</p>
                <p className="font-sans text-label text-ink-300">
                  {location} &mdash; {weddingDate}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/book" className="btn-luxury">
            Book Your Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
