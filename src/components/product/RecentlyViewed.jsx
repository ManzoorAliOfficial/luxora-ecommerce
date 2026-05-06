import { useStore } from "../../context/StoreContext";
import ProductCard from "../home/ProductCard";

export default function RecentlyViewed() {
  const { recentlyViewed } = useStore();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentlyViewed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
