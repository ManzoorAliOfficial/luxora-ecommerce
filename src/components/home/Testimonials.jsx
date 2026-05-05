import Stars            from "../common/Stars";
import { TESTIMONIALS } from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-ivory" aria-label="Customer testimonials">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">Clients Love Us</p>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <article key={t.id} className="card p-8" itemScope itemType="https://schema.org/Review">
              <div className="text-gold text-5xl font-serif leading-none mb-4" aria-hidden="true">"</div>
              <blockquote>
                <p className="text-muted text-sm leading-relaxed mb-6" itemProp="reviewBody">{t.text}</p>
              </blockquote>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-medium text-sm text-luxury" itemProp="author">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
                <div className="ml-auto">
                  <Stars rating={t.rating} size={12} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}