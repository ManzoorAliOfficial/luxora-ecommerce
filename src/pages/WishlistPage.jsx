import { Link }       from "react-router-dom";
import SEO            from "../components/common/SEO";
import Breadcrumb     from "../components/common/Breadcrumb";
import ProductCard    from "../components/shop/ProductCard";
import { useStore }   from "../context/StoreContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <>
      <SEO
        title="My Wishlist"
        description="View and manage your saved LUXORA products."
        url="/wishlist"
      />

      <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
          <h1 className="section-title">My Wishlist</h1>
          <p className="text-muted text-sm mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-ivory flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2 className="font-serif text-3xl mb-3">Your wishlist is empty</h2>
            <p className="text-muted mb-6 max-w-sm mx-auto text-sm">
              Save your favourite items by clicking the heart icon on any product.
            </p>
            <Link to="/shop" className="btn-gold">Browse Products</Link>
          </div>
        ) : (
          <>
            {/* Move all to cart */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-muted">{wishlist.length} items saved</p>
              <button
                onClick={() => { wishlist.forEach(p => addToCart(p)); }}
                className="btn-outline text-xs py-2.5"
              >
                Add All to Cart
              </button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {wishlist.map(p => (
                <div key={p.id} className="relative">
                  <ProductCard product={p} />
                  {/* Remove from wishlist */}
                  <button
                    onClick={() => toggleWishlist(p)}
                    aria-label={`Remove ${p.name} from wishlist`}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm border-0 cursor-pointer hover:bg-red-50 transition-colors z-10"
                  >
                    <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}