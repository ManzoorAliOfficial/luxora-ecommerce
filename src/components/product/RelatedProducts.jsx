import { useState }   from "react";
import ProductCard    from "../shop/ProductCard";
import QuickViewModal from "../shop/QuickViewModal";

export default function RelatedProducts({ products = [] }) {
  const [qv, setQv] = useState(null);

  if (products.length === 0) return null;

  return (
    <section aria-label="Related products">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="section-label">You May Also Like</p>
        <h2 className="section-title">Related Products</h2>
      </div>

      {/* Grid — matches exactly the 4-col layout from ProductPage */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={setQv}
          />
        ))}
      </div>

      {/* Quick view modal */}
      {qv && (
        <QuickViewModal product={qv} onClose={() => setQv(null)} />
      )}
    </section>
  );
}