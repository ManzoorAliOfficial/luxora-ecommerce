import ProductCard from "../shop/ProductCard";
import { PRODUCTS } from "../../data/products";

export default function RelatedProducts({ product }) {
  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section aria-label="Related products">
      <div className="text-center mb-10">
        <p className="section-label">You May Also Like</p>
        <h2 className="section-title">Related Products</h2>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
        {related.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}