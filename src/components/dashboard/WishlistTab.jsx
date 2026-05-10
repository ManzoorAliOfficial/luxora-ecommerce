import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../shop/ProductCard";

export default function WishlistTab() {
  const { wishlist } = useStore();

  return (
    <div>
      <h3 className="text-xs tracking-widest uppercase font-medium mb-5">
        My Wishlist ({wishlist.length})
      </h3>

      {wishlist.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="font-serif text-2xl mb-3">Your wishlist is empty</p>
          <Link to="/shop" className="btn-gold">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5">
          {wishlist.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}