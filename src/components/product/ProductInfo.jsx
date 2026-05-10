import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stars          from "../common/Stars";
import Badge          from "../common/Badge";
import ColorSelector  from "./ColorSelector";
import SizeSelector   from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import { useStore }   from "../../context/StoreContext";

const TRUST_BADGES = [
  ["🚚", "Free shipping over $100"],
  ["🔄", "Free 30-day returns"],
  ["🔒", "Secure checkout"],
];

export default function ProductInfo({ product }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const [qty,   setQty]   = useState(1);
  const [color, setColor] = useState(product.colors?.[0] || null);
  const [size,  setSize]  = useState(product.sizes?.[0]  || null);

  const isWished = wishlist.some(x => x.id === product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="flex flex-col">
      {/* Category + name */}
      <p className="text-xs tracking-widest uppercase text-muted mb-2">{product.category}</p>
      <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-luxury mb-3">{product.name}</h1>

      {/* Rating + stock */}
      <div className="flex items-center gap-3 mb-5">
        <Stars rating={product.rating} showCount count={product.reviews} />
        <span className="text-xs text-muted">· {product.stock} in stock</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-semibold text-luxury">${product.price}</span>
        {product.oldPrice && (
          <span className="text-lg text-muted line-through">${product.oldPrice}</span>
        )}
        {discount && <Badge variant="sale">-{discount}%</Badge>}
      </div>

      <p className="text-sm text-muted leading-relaxed mb-6">{product.description}</p>
      <div className="h-px bg-champagne mb-6" />

      {/* Selectors */}
      <ColorSelector    colors={product.colors} selected={color} onChange={setColor} />
      <SizeSelector     sizes={product.sizes}   selected={size}  onChange={setSize}  />
      <QuantitySelector qty={qty} onChange={setQty} />

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <button
          className="btn-gold flex-1 py-4"
          onClick={() => addToCart(product, qty, color, size)}
        >
          Add to Cart
        </button>
        <button
          className="btn-outline flex-1 py-4"
          onClick={() => { addToCart(product, qty, color, size); navigate("/checkout"); }}
        >
          Buy Now
        </button>
        <button
          onClick={() => toggleWishlist(product)}
          aria-pressed={isWished}
          className={`w-14 h-14 border rounded-sm flex items-center justify-center transition-all cursor-pointer bg-transparent ${
            isWished ? "border-gold" : "border-champagne hover:border-gold"
          }`}
        >
          <svg
            className={`w-5 h-5 ${isWished ? "text-gold" : "text-muted"}`}
            viewBox="0 0 24 24"
            fill={isWished ? "#C9A84C" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Features */}
      <div className="bg-ivory rounded-sm p-5 mb-5">
        <ul className="space-y-2">
          {product.features.map(f => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <svg
                className="w-4 h-4 text-gold shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-5 text-xs text-muted">
        {TRUST_BADGES.map(([icon, text]) => (
          <div key={text} className="flex items-center gap-1.5">
            <span>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}