import { useStore } from "../../context/StoreContext";
import ProductCard from "../shop/ProductCard";

export default function RecentlyViewed({ excludeId }) {
  const { recentlyViewed } = useStore();

  const items = recentlyViewed
    .filter(p => p.id !== excludeId)
    .slice(0, 4);

  if (!items.length) return null;

  return (
    <section aria-label="Recently viewed products" className="mt-20">
      <div className="text-center mb-10">
        <p className="section-label">Your History</p>
        <h2 className="section-title">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
        {items.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}