import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SEO         from "../components/common/SEO";
import Stars       from "../components/common/Stars";
import Badge       from "../components/common/Badge";
import Breadcrumb  from "../components/common/Breadcrumb";
import ProductCard from "../components/shop/ProductCard";
import { PRODUCTS } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function ProductPage() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { addToCart, toggleWishlist, wishlist, addRecentlyViewed } = useStore();

  const product = PRODUCTS.find(p => p.id === Number(id));

  const [imgIdx, setImgIdx] = useState(0);
  const [qty,    setQty]    = useState(1);
  const [color,  setColor]  = useState(null);
  const [size,   setSize]   = useState(null);
  const [tab,    setTab]    = useState("description");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!product) return;
    setImgIdx(0); setQty(1);
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
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  const schema = {
    "@context":    "https://schema.org",
    "@type":       "Product",
    "name":        product.name,
    "image":       product.images,
    "description": product.description,
    "sku":         `LX-${String(product.id).padStart(4,"0")}`,
    "brand":       { "@type": "Brand", "name": "LUXORA" },
    "offers": {
      "@type": "Offer",
      "url":             `https://luxora.com/product/${product.id}`,
      "priceCurrency":   "USD",
      "price":           product.price,
      "availability":    "https://schema.org/InStock",
      "seller":          { "@type": "Organization", "name": "LUXORA" },
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
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: product.name },
        ]} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-20">

          {/* Gallery */}
          <div>
            <div
              className={`relative bg-ivory rounded-sm overflow-hidden mb-3 ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              style={{ aspectRatio: "1" }}
              onClick={() => setZoomed(v => !v)}
              role="img"
              aria-label={`${product.name} — image ${imgIdx + 1}`}
            >
              <img
                src={product.images[imgIdx]}
                alt={`${product.name} view ${imgIdx + 1}`}
                className={`w-full h-full object-cover transition-transform duration-500 ${zoomed ? "scale-150" : "scale-100"}`}
                width="600" height="600"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badge === "Sale" || product.badge === "-20%" ? "sale" : "new"}>
                    {product.badge}
                  </Badge>
                </div>
              )}
              <p className="absolute bottom-3 right-3 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-sm">
                {zoomed ? "Click to zoom out" : "Click to zoom"}
              </p>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => { setImgIdx(i); setZoomed(false); }}
                  aria-label={`View image ${i + 1}`}
                  className={`flex-1 rounded-sm overflow-hidden border-2 transition-all cursor-pointer bg-transparent p-0 ${imgIdx === i ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"}`}
                  style={{ aspectRatio: "1" }}>
                  <img src={img} alt="" className="w-full h-full object-cover bg-ivory" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-xs tracking-widest uppercase text-muted mb-2">{product.category}</p>
            <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-luxury mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-5">
              <Stars rating={product.rating} showCount count={product.reviews} />
              <span className="text-xs text-muted">· {product.stock} in stock</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-semibold text-luxury">${product.price}</span>
              {product.oldPrice && <span className="text-lg text-muted line-through">${product.oldPrice}</span>}
              {discount && <Badge variant="sale">-{discount}%</Badge>}
            </div>

            <p className="text-sm text-muted leading-relaxed mb-6">{product.description}</p>
            <div className="h-px bg-champagne mb-6" />

            {/* Colors */}
            {product.colors && (
              <div className="mb-5">
                <p className="label">Color</p>
                <div className="flex gap-2 mt-2">
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setColor(c)} aria-label={`Color ${c}`} aria-pressed={color === c}
                      className="w-8 h-8 rounded-full transition-all cursor-pointer border-0"
                      style={{ background: c, outline: `2px solid ${color === c ? "#C9A84C" : "#EDE8E0"}`, outlineOffset: "2px" }} />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-5">
                <p className="label">Size</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)} aria-pressed={size === s}
                      className={`px-4 py-2 text-xs border rounded-sm transition-all cursor-pointer font-sans ${size === s ? "bg-gold text-white border-gold" : "bg-white text-luxury border-champagne hover:border-gold"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="mb-6">
              <p className="label">Quantity</p>
              <div className="flex items-center border border-champagne rounded-sm w-fit mt-2">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:text-gold transition-colors border-0 bg-transparent cursor-pointer" aria-label="Decrease">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <span className="px-6 py-3 text-sm font-medium border-x border-champagne min-w-14 text-center" aria-live="polite">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="px-4 py-3 hover:text-gold transition-colors border-0 bg-transparent cursor-pointer" aria-label="Increase">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button className="btn-gold flex-1 py-4"
                onClick={() => addToCart(product, qty, color, size)}>Add to Cart</button>
              <button className="btn-outline flex-1 py-4"
                onClick={() => { addToCart(product, qty, color, size); navigate("/checkout"); }}>Buy Now</button>
              <button onClick={() => toggleWishlist(product)} aria-pressed={isWished}
                className={`w-14 h-14 border rounded-sm flex items-center justify-center transition-all cursor-pointer bg-transparent ${isWished ? "border-gold" : "border-champagne hover:border-gold"}`}>
                <svg className={`w-5 h-5 ${isWished ? "text-gold" : "text-muted"}`}
                     viewBox="0 0 24 24" fill={isWished ? "#C9A84C" : "none"} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="bg-ivory rounded-sm p-5 mb-5">
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <svg className="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-5 text-xs text-muted">
              {[["🚚","Free shipping over $100"],["🔄","Free 30-day returns"],["🔒","Secure checkout"]].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-1.5"><span>{icon}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex border-b border-champagne mb-8 overflow-x-auto">
            {[{ id:"description", label:"Description" },{ id:"additional", label:"Additional Info" },{ id:"reviews", label:`Reviews (${product.reviews})` }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} role="tab" aria-selected={tab === t.id}
                className={`tab whitespace-nowrap ${tab === t.id ? "active" : ""}`}>{t.label}</button>
            ))}
          </div>
          <div role="tabpanel">
            {tab === "description" && (
              <div className="max-w-2xl">
                <p className="text-sm text-muted leading-relaxed mb-4">{product.description}</p>
                <p className="text-sm text-muted leading-relaxed">Every piece in our collection is thoughtfully designed using only the finest materials sourced from trusted suppliers around the world.</p>
              </div>
            )}
            {tab === "additional" && (
              <div className="max-w-md">
                <table className="w-full text-sm" aria-label="Product specifications">
                  <tbody>
                    {[["SKU", `LX-${String(product.id).padStart(4,"0")}`],["Category", product.category],["Stock", `${product.stock} available`],["Weight","0.5 kg"],["Shipping","Free over $100"],["Returns","30 days"]].map(([k, v]) => (
                      <tr key={k} className="border-b border-champagne">
                        <td className="py-3 pr-6 font-medium text-luxury w-36">{k}</td>
                        <td className="py-3 text-muted">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tab === "reviews" && (
              <div className="max-w-2xl">
                <div className="flex items-center gap-6 mb-8 p-5 bg-ivory rounded-sm">
                  <div className="text-center">
                    <p className="font-serif text-5xl font-light text-luxury">{product.rating}</p>
                    <Stars rating={product.rating} />
                    <p className="text-xs text-muted mt-1">{product.reviews} reviews</p>
                  </div>
                  <div className="flex-1">
                    {[5,4,3,2,1].map(r => (
                      <div key={r} className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted w-4">{r}★</span>
                        <div className="flex-1 h-1.5 bg-champagne rounded-full overflow-hidden">
                          <div className="h-full bg-gold rounded-full"
                            style={{ width: r===5?"70%":r===4?"20%":r===3?"7%":"3%" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {[{ name:"Sarah J.", rating:5, text:"Absolutely love it! Quality exceeded my expectations.", date:"May 1, 2026" },{ name:"Michael B.", rating:4, text:"Great quality, fast delivery. Very happy!", date:"Apr 28, 2026" },{ name:"Emma W.", rating:5, text:"Stunning piece — exactly as described. Will order again!", date:"Apr 20, 2026" }].map((r, i) => (
                  <article key={i} className="border-b border-champagne py-5" itemScope itemType="https://schema.org/Review">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center text-sm font-medium shrink-0">{r.name[0]}</div>
                      <div>
                        <p className="text-sm font-medium" itemProp="author">{r.name}</p>
                        <div className="flex items-center gap-2">
                          <Stars rating={r.rating} size={12} />
                          <time className="text-xs text-muted">{r.date}</time>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted pl-12" itemProp="reviewBody">{r.text}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section aria-label="Related products">
            <div className="text-center mb-10">
              <p className="section-label">You May Also Like</p>
              <h2 className="section-title">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}