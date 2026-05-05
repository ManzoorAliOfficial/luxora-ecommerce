import { Link } from "react-router-dom";
import SEO      from "../components/common/SEO";

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type":    "AboutPage",
    "name":     "About LUXORA",
    "url":      "https://luxora.com/about",
    "description": "Learn about LUXORA's story, values and commitment to premium luxury fashion.",
  };

  return (
    <>
      <SEO
        title="About Us — Our Story & Values"
        description="Learn about LUXORA — founded in 2020 to bring premium luxury fashion to those who truly appreciate quality and craftsmanship."
        keywords="about LUXORA, luxury fashion brand story, premium quality fashion"
        url="/about"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative min-h-80 flex items-end overflow-hidden pt-24">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80"
             alt="LUXORA store" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-luxury/60" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pb-16 w-full">
          <p className="section-label text-gold">Our Story</p>
          <h1 className="font-serif text-5xl sm:text-6xl text-white font-light">About LUXORA</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="section-label">Who We Are</p>
            <h2 className="section-title mb-6">Crafted for Those Who Appreciate Excellence</h2>
            <p className="text-muted leading-relaxed mb-4">
              Founded in 2020, LUXORA was born from a simple belief: exceptional quality should be accessible to those who truly appreciate it.
              We curate the finest products from around the world, each piece selected for its craftsmanship, beauty, and lasting value.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Our team of experts travels globally to discover hidden gems and established luxury brands,
              bringing them together in one carefully curated destination.
            </p>
            <Link to="/shop" className="btn-gold">Shop the Collection</Link>
          </div>
          <div className="rounded-sm overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80"
                 alt="LUXORA fashion" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-20 text-center">
          {[{ n:"10K+", l:"Products" },{ n:"15K+", l:"Happy Customers" },{ n:"99%", l:"Satisfaction Rate" }].map(s => (
            <div key={s.l} className="card p-8">
              <p className="font-serif text-4xl text-gold mb-2">{s.n}</p>
              <p className="text-xs tracking-widest uppercase text-muted">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <p className="section-label">What We Stand For</p>
          <h2 className="section-title">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon:"🏆", title:"Premium Quality",   desc:"Every product is handpicked and quality-tested to meet our exacting standards." },
            { icon:"🚚", title:"Fast Delivery",      desc:"We ensure prompt delivery with real-time tracking for complete peace of mind." },
            { icon:"🔒", title:"Secure Shopping",    desc:"Shop with confidence. Your data and payments are always fully protected." },
            { icon:"🎧", title:"Expert Support",     desc:"Our dedicated team is available 24/7 to assist you with any questions." },
          ].map(v => (
            <div key={v.title} className="card p-7 text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 text-2xl">{v.icon}</div>
              <h3 className="font-medium text-sm mb-2">{v.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-luxury py-16 px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">Ready to Experience Luxury?</h2>
          <p className="text-white/60 text-sm mb-8">Browse our curated collection and find your perfect piece.</p>
          <Link to="/shop" className="btn-gold">Shop Now</Link>
        </div>
      </section>
    </>
  );
}