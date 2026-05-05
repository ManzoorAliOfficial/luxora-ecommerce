import { useState }   from "react";
import { Link }       from "react-router-dom";
import { PRODUCTS }   from "../../data/products";
import ProductCard    from "../shop/ProductCard";
import QuickViewModal from "../shop/QuickViewModal";

export default function NewArrivals() {
  const [qv, setQv] = useState(null);
  const products    = PRODUCTS.slice(4, 8);

  return (
    <section className="py-16 px-4 sm:px-6" aria-label="New arrivals">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label">Fresh In</p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <Link to="/shop?sort=newest" className="btn-outline self-start sm:self-auto">View All</Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
          {products.map(p => <ProductCard key={p.id} product={p} onQuickView={setQv} />)}
        </div>
      </div>
      {qv && <QuickViewModal product={qv} onClose={() => setQv(null)} />}
    </section>
  );
}