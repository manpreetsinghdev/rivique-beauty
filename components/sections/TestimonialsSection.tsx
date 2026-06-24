const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Gurgaon",
    service: "Bridal Glam + Hair",
    quote:
      "Rivique Beauty made my wedding day absolutely magical. The makeup lasted the entire 12-hour event and the airbrush finish was flawless in every photo.",
    rating: 5,
  },
  {
    name: "Ananya Kapoor",
    location: "South Delhi",
    service: "The Rivique Package",
    quote:
      "Booked the full package for myself and three bridesmaids. The team was professional, punctual and the results were stunning. Highly recommend to all Delhi NCR brides!",
    rating: 5,
  },
  {
    name: "Riya Mehta",
    location: "Noida",
    service: "Radiance Prep Facial + Bridal Glam",
    quote:
      "The pre-bridal facial literally transformed my skin. On my wedding day I felt more confident than ever. Rivique is worth every rupee.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-20 md:py-28 bg-ivory-200"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="section-label">Real Brides, Real Results</p>
          <h2
            id="testimonials-heading"
            className="section-heading"
          >
            Loved by brides across{" "}
            <em className="not-italic text-rose-gold-400">Delhi NCR</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, location, service, quote, rating }) => (
            <figure
              key={name}
              className="card-luxury p-7 space-y-4"
            >
              <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-rose-gold-400 text-sm" aria-hidden>★</span>
                ))}
              </div>
              <blockquote>
                <p className="font-sans text-body-sm text-ink-500 leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="border-t border-rose-gold-100 pt-4">
                <p className="font-serif text-body-md font-medium text-ink">{name}</p>
                <p className="font-sans text-label text-rose-gold-400 mt-0.5">
                  {service} &mdash; {location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
