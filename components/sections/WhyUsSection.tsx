const PILLARS = [
  {
    icon: "✦",
    title: "Delhi NCR's Most Trusted",
    body: "Over 500 brides served across Delhi, Gurgaon, Noida and Faridabad since 2016.",
  },
  {
    icon: "◈",
    title: "On-Location Service",
    body: "We travel to your home, banquet hall or hotel anywhere in NCR — no extra hassle.",
  },
  {
    icon: "◇",
    title: "Luxury Products Only",
    body: "MAC, Charlotte Tilbury, NARS and airbrush technology for flawless, photo-ready results.",
  },
  {
    icon: "◉",
    title: "Trial Included",
    body: "Every bridal package includes a full trial run so your wedding-day look is perfected in advance.",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 bg-ink" aria-labelledby="why-us-heading">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="section-label text-rose-gold-400">Why Rivique Beauty</p>
          <h2
            id="why-us-heading"
            className="font-serif text-display-md text-ivory-200 leading-tight"
          >
            The choice of{" "}
            <em className="not-italic text-rose-gold-400">discerning</em> Delhi brides
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(({ icon, title, body }) => (
            <div
              key={title}
              className="card-glass-dark p-7 space-y-4 rounded-2xl"
            >
              <span className="text-rose-gold-400 text-2xl" aria-hidden>
                {icon}
              </span>
              <h3 className="font-serif text-display-sm text-ivory-200">{title}</h3>
              <p className="font-sans text-body-sm text-ivory-200/60 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
