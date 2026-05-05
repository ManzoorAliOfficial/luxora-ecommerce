import { useState }     from "react";
import { Link }         from "react-router-dom";
import { PRODUCTS }     from "../../data/products";
import ProductCard      from "../shop/ProductCard";
import QuickViewModal   from "../shop/QuickViewModal";
import { SkeletonCard } from "../common/Skeleton";

export default function BestSellers() {
  const [qv,      setQv]      = useState(null);
  const [loading] = useState(false);
  const products  = PRODUCTS.slice(0, 4);

  return (
    <section className="py-16 px-4 sm:px-6 bg-ivory" aria-label="Best selling products">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label">Top Picks</p>
            <h2 className="section-title">Best Selling Products</h2>
          </div>
          <Link to="/shop" className="btn-outline self-start sm:self-auto">View All</Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : products.map(p => <ProductCard key={p.id} product={p} onQuickView={setQv} />)}
        </div>
      </div>
      {qv && <QuickViewModal product={qv} onClose={() => setQv(null)} />}
    </section>
  );
}