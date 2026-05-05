import { useState, useEffect } from "react";
import { Link }      from "react-router-dom";
import Stars         from "../common/Stars";
import Badge         from "../common/Badge";
import { useStore }  from "../../context/StoreContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty,   setQty]   = useState(1);
  const [color, setColor] = useState(product?.colors?.[0] || null);
  const [size,  setSize]  = useState(product?.sizes?.[0]  || null);
  const isWished = wishlist.some(x => x.id === product?.id);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
         onClick={onClose} role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}>
      <div className="bg-white rounded-sm shadow-card max-w-2xl w-full max-h-[90vh] overflow-auto animate-fade-in"
           onClick={e => e.stopPropagation()}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="bg-ivory relative" style={{ aspectRatio: "1" }}>
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <div className="absolute top-3 left-3">
                <Badge variant={product.badge === "Sale" || product.badge === "-20%" ? "sale" : "new"}>{product.badge}</Badge>
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-1">{product.category}</p>
                <h2 className="font-serif text-2xl text-luxury">{product.name}</h2>
              </div>
              <button onClick={onClose} className="btn-ghost" aria-label="Close">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <Stars rating={product.rating} showCount count={product.reviews} />
            <div className="flex items-center gap-3 my-4">
              <span className="text-2xl font-semibold">${product.price}</span>
              {product.oldPrice && <span className="text-muted line-through">${product.oldPrice}</span>}
            </div>
            {product.colors && (
              <div className="mb-4">
                <p className="label">Color</p>
                <div className="flex gap-2 mt-1">
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setColor(c)} aria-label={`Color ${c}`} aria-pressed={color === c}
                      className="w-7 h-7 rounded-full transition-all cursor-pointer border-2"
                      style={{ background: c, borderColor: color === c ? "#C9A84C" : "transparent", outline: "1px solid #EDE8E0" }} />
                  ))}
                </div>
              </div>
            )}
            {product.sizes && (
              <div className="mb-4">
                <p className="label">Size</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)} aria-pressed={size === s}
                      className={`px-3 py-1.5 text-xs border rounded-sm transition-all cursor-pointer font-sans ${size === s ? "bg-gold text-white border-gold" : "bg-white text-luxury border-champagne hover:border-gold"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center border border-champagne rounded-sm w-fit mb-4">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:text-gold transition-colors border-0 bg-transparent cursor-pointer" aria-label="Decrease">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span className="px-4 text-sm font-medium border-x border-champagne py-2">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="px-3 py-2 hover:text-gold transition-colors border-0 bg-transparent cursor-pointer" aria-label="Increase">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <div className="flex gap-2 mt-auto">
              <button className="btn-gold flex-1" onClick={() => { addToCart(product, qty, color, size); onClose(); }}>
                Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)} aria-pressed={isWished}
                className={`w-11 h-11 border rounded-sm flex items-center justify-center transition-colors cursor-pointer bg-transparent ${isWished ? "border-gold" : "border-champagne hover:border-gold"}`}>
                <svg className={`w-5 h-5 ${isWished ? "text-gold" : "text-muted"}`} viewBox="0 0 24 24"
                     fill={isWished ? "#C9A84C" : "none"} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
            <Link to={`/product/${product.id}`} className="btn-outline w-full mt-2 text-center" onClick={onClose}>
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}