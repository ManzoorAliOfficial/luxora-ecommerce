import { useState, useEffect }        from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import SEO               from "../components/common/SEO";
import Breadcrumb        from "../components/common/Breadcrumb";
import ProductGallery    from "../components/product/ProductGallery";
import ProductInfo       from "../components/product/ProductInfo";
import ColorSelector     from "../components/product/ColorSelector";
import SizeSelector      from "../components/product/SizeSelector";
import QuantitySelector  from "../components/product/QuantitySelector";
import ProductTabs       from "../components/product/ProductTabs";
import RelatedProducts   from "../components/product/RelatedProducts";
import RecentlyViewed    from "../components/product/RecentlyViewed";

import { PRODUCTS } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function ProductPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, addRecentlyViewed } = useStore();

  const product = PRODUCTS.find(p => p.id === Number(id));

  const [qty,   setQty]   = useState(1);
  const [color, setColor] = useState(null);
  const [size,  setSize]  = useState(null);

  useEffect(() => {
    if (!product) return;
    setQty(1);
    setColor(product.colors?.[0] || null);
    setSize(product.sizes?.[0]   || null);
    addRecentlyViewed(product);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4">
      <p className="font-serif text-3xl">Product not found</p>
      <Link to="/shop" className="btn-gold">Back to Shop</Link>
    </div>
  );

  const isWished = wishlist.some(x => x.id === product.id);
  const related  = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@type":    "Product",
    "name":        product.name,
    "image":       product.images,
    "description": product.description,
    "sku":         `LX-${String(product.id).padStart(4,"0")}`,
    "brand":       { "@type": "Brand", "name": "LUXORA" },
    "offers": {
      "@type": "Offer",
      "url":           `https://luxora.com/product/${product.id}`,
      "priceCurrency": "USD",
      "price":          product.price,
      "availability":  "https://schema.org/InStock",
      "seller":        { "@type": "Organization", "name": "LUXORA" },
    },
    "aggregateRating": {
      "@type":       "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews,
    },
  };

  return (
    <>
      <SEO
        title={product.seoTitle || product.name}
        description={product.seoDesc || product.description}
        keywords={`${product.name}, ${product.category}, luxury, LUXORA`}
        image={product.images[0]}
        url={`/product/${product.id}`}
        type="product"
        schema={schema}
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <Breadcrumb items={[
          { label: "Home", to: "/"     },
          { label: "Shop", to: "/shop" },
          { label: product.name },
        ]} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-20">

          {/* Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
            badge={product.badge}
          />

          {/* Info + actions */}
          <div className="flex flex-col">
            <ProductInfo product={product} />

            <ColorSelector
              colors={product.colors}
              selected={color}
              onChange={setColor}
            />

            <SizeSelector
              sizes={product.sizes}
              selected={size}
              onChange={setSize}
            />

            <QuantitySelector
              qty={qty}
              onChange={setQty}
              max={product.stock}
            />

            {/* CTA row */}
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
                aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={isWished}
                className={`w-14 h-14 border rounded-sm flex items-center justify-center transition-all cursor-pointer bg-transparent ${isWished ? "border-gold" : "border-champagne hover:border-gold"}`}
              >
                <svg
                  className={`w-5 h-5 ${isWished ? "text-gold" : "text-muted"}`}
                  viewBox="0 0 24 24"
                  fill={isWished ? "#C9A84C" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="bg-ivory rounded-sm p-5 mb-5">
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <svg className="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 text-xs text-muted">
              {[["🚚","Free shipping over $100"],["🔄","Free 30-day returns"],["🔒","Secure checkout"]].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-1.5">
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ProductTabs product={product} />

        {/* Related */}
        <RelatedProducts products={related} />
      </div>

      {/* Recently Viewed */}
      <RecentlyViewed />
    </>
  );
}