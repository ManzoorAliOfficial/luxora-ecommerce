import { Link } from "react-router-dom";
import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";

export default function HeroBanner() {
  return (
    <section
      className="relative h-78 flex items-center overflow-hidden"
      aria-label="Hero banner"
    >
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
        alt=""
        role="presentation"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,.92) 50%, rgba(255,255,255,.2))",
        }}
      />
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 w-full py-24 pt-36">
        <div className="max-w-xl">
          <p className="section-label animate-fade-in">New Collection 2026</p>
          <h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-luxury leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Luxury Style
            <br />
            For Modern
            <br />
            Living
          </h1>
          <p
            className="text-base sm:text-lg text-muted mb-10 max-w-md leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Discover high-quality products crafted for beauty, comfort &
            elegance. Elevate every moment.
          </p>
          <div
            className="flex flex-wrap gap-3 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/shop" className="btn-gold">
              Shop Now
            </Link>
            <Link to="/about" className="btn-outline">
              Our Story
            </Link>
          </div>
          {/* Trust badges */}
          <div className="flex gap-8 mt-12 flex-wrap bg-gradient-to-r from-white/90 via-white/70 to-white/20 p-2 rounded-lg">
            {[
              { icon: Truck, text: "Free Shipping" },
              { icon: RefreshCw, text: "Easy Returns" },
              { icon: Shield, text: "Secure Payment" },
              { icon: Headphones, text: "24/7 Support" },
            ].map((b) => {
              const Icon = b.icon;

              return (
                <div key={b.text} className="flex items-center gap-2">
                  <Icon size={16} className="text-yellow-500" />
                  <span className="text-xs tracking-wide">{b.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
