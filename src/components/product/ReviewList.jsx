import Stars from "../common/Stars";

const MOCK_REVIEWS = [
  { name: "Sarah J.",   rating: 5, text: "Absolutely love it! Quality exceeded my expectations.", date: "May 1, 2026"  },
  { name: "Michael B.", rating: 4, text: "Great quality, fast delivery. Very happy!",              date: "Apr 28, 2026" },
  { name: "Emma W.",    rating: 5, text: "Stunning piece — exactly as described. Will order again!", date: "Apr 20, 2026" },
];

export default function ReviewList({ product }) {
  const { rating, reviews } = product;

  return (
    <div className="max-w-2xl">

      {/* ── Rating summary ── */}
      <div className="flex items-center gap-6 mb-8 p-5 bg-ivory rounded-sm">
        <div className="text-center shrink-0">
          <p className="font-serif text-5xl font-light text-luxury">{rating}</p>
          <Stars rating={rating} />
          <p className="text-xs text-muted mt-1">{reviews} reviews</p>
        </div>

        {/* Rating bars */}
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map(r => (
            <div key={r} className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted w-4">{r}★</span>
              <div className="flex-1 h-1.5 bg-champagne rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all"
                  style={{
                    width:
                      r === 5 ? "70%"
                      : r === 4 ? "20%"
                      : r === 3 ? "7%"
                      : "3%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Individual reviews ── */}
      {MOCK_REVIEWS.map((r, i) => (
        <article
          key={i}
          className="border-b border-champagne py-5"
          itemScope
          itemType="https://schema.org/Review"
        >
          <div className="flex items-start gap-3 mb-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center text-sm font-medium shrink-0">
              {r.name[0]}
            </div>
            <div>
              <p className="text-sm font-medium" itemProp="author">{r.name}</p>
              <div className="flex items-center gap-2">
                <Stars rating={r.rating} size={12} />
                <time className="text-xs text-muted" dateTime={r.date}>{r.date}</time>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted pl-12" itemProp="reviewBody">
            {r.text}
          </p>
        </article>
      ))}
    </div>
  );
}