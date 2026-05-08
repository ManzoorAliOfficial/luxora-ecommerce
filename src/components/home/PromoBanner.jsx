import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <section className="px-4 sm:px-6 py-16 max-w-screen-xl mx-auto" aria-label="Promotional banners">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative rounded-sm overflow-hidden min-h-64">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
               alt="Summer sale up to 50% off" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-luxury/55" />
          <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-64">
            <p className="text-gold text-xs tracking-widest uppercase mb-2">Limited Time</p>
            <h3 className="font-serif text-3xl text-white mb-2">Summer Sale</h3>
            <p className="text-white/80 text-sm mb-5">Up To 50% Off Selected Items</p>
            <Link to="/shop" className="btn-gold self-start">Shop Now</Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="relative rounded-sm overflow-hidden flex-1 min-h-32">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80"
                 alt="New arrivals" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-luxury/45" />
            <div className="relative z-10 p-6 flex flex-col justify-end h-full min-h-32">
              <h3 className="font-serif text-2xl text-white mb-3">New Arrivals</h3>
              <Link 
  to="/shop?sort=newest" 
  className="text-white/90 text-xl tracking-widest  hover:text-gold transition-colors flex items-center gap-1"
>
  Explore Now 
  <ArrowRight className="w-[1em] h-[1em]" />
</Link>
            </div>
          </div>
          <div className="bg-luxury rounded-sm p-6 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">Exclusive</p>
              <h3 className="font-serif text-xl text-white">100% Original Products</h3>
            </div>
            <Link to="/shop" className="btn-gold shrink-0">Shop Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}