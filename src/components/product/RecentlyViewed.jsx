import { useState }   from "react";
import { Link }       from "react-router-dom";
import Stars          from "../common/Stars";
import QuickViewModal from "../shop/QuickViewModal";
import { useStore }   from "../../context/StoreContext";

export default function RecentlyViewed() {
  const { recentlyViewed } = useStore();
  const [qv, setQv]        = useState(null);

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 bg-ivory" aria-label="Recently viewed products">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="section-label">Your History</p>
          <h2 className="font-serif text-2xl text-luxury">Recently Viewed</h2>
        </div>

        {/* Product row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentlyViewed.map(p => (
            <div key={p.id} className="group">
              {/* Image */}
              <Link
                to={`/product/${p.id}`}
                className="block relative rounded-sm overflow-hidden bg-white mb-3"
                style={{ aspectRatio: "3/4" }}
                aria-label={`View ${p.name}`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Quick view on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={e => { e.preventDefault(); setQv(p); }}
                    className="w-full text-xs bg-white/90 hover:bg-white text-luxury py-1.5 rounded-sm transition-colors border-0 cursor-pointer font-sans"
                  >
                    Quick View
                  </button>
                </div>
              </Link>

              {/* Info */}
              <p className="text-xs text-muted tracking-widest uppercase mb-0.5">
                {p.category}
              </p>
              <Link
                to={`/product/${p.id}`}
                className="text-xs font-medium text-luxury hover:text-gold transition-colors line-clamp-2 block mb-1"
              >
                {p.name}
              </Link>
              <Stars rating={p.rating} size={10} />
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-semibold">${p.price}</span>
                {p.oldPrice && (
                  <span className="text-xs text-muted line-through">${p.oldPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick view modal */}
      {qv && (
        <QuickViewModal product={qv} onClose={() => setQv(null)} />
      )}
    </section>
  );
}