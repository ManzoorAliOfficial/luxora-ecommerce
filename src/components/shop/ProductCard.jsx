import { Link }      from "react-router-dom";
import Stars          from "../common/Stars";
import Badge          from "../common/Badge";
import { useStore }   from "../../context/StoreContext";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWished  = wishlist.some(x => x.id === product.id);
  const discount  = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <article className="product-card group"
             itemScope itemType="https://schema.org/Product">
      <meta itemProp="name"        content={product.name} />
      <meta itemProp="description" content={product.description} />

      {/* Image */}
      <div className="relative overflow-hidden bg-ivory" style={{ aspectRatio: "3/4" }}>
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name}
               className="product-img w-full h-full object-cover"
               loading="lazy" width="400" height="533" itemProp="image" />
        </Link>

        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={product.badge === "Sale" || product.badge === "-20%" ? "sale" : "new"}>
              {product.badge}
            </Badge>
          </div>
        )}

        <button onClick={() => toggleWishlist(product)}
          aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWished}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 border-0 cursor-pointer">
          <svg className={`w-4 h-4 transition-colors ${isWished ? "text-gold" : "text-muted"}`}
               viewBox="0 0 24 24" fill={isWished ? "#C9A84C" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Hover overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <button onClick={() => addToCart(product)}
              className="btn-gold flex-1 py-2.5 text-xs"
              aria-label={`Add ${product.name} to cart`}>
              Add to Cart
            </button>
            {onQuickView && (
              <button onClick={() => onQuickView(product)}
                className="w-10 h-9 bg-white border-0 rounded-sm flex items-center justify-center cursor-pointer hover:bg-ivory transition-colors"
                aria-label={`Quick view ${product.name}`}>
                <svg className="w-4 h-4 text-luxury" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="availability"   content="https://schema.org/InStock" />
        <meta itemProp="priceCurrency"  content="USD" />
        <meta itemProp="price"          content={product.price} />
        <p className="text-xs tracking-widest uppercase text-muted mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}
              className="text-sm font-medium text-luxury hover:text-gold transition-colors line-clamp-2 block mb-2"
              itemProp="name">
          {product.name}
        </Link>
        <Stars rating={product.rating} showCount count={product.reviews} />
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-luxury text-base">${product.price}</span>
          {product.oldPrice && <span className="text-xs text-muted line-through">${product.oldPrice}</span>}
          {discount && <span className="text-xs text-red-500 font-medium">-{discount}%</span>}
        </div>
      </div>
    </article>
  );
}