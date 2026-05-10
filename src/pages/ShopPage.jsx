import { useState, useEffect, useMemo } from "react";
import { useSearchParams }              from "react-router-dom";
import SEO            from "../components/common/SEO";
import ProductCard    from "../components/shop/ProductCard";
import QuickViewModal from "../components/shop/QuickViewModal";
import Sidebar        from "../components/shop/Sidebar";
import SortBar        from "../components/shop/SortBar";
import Pagination     from "../components/common/Pagination";
import Breadcrumb     from "../components/common/Breadcrumb";
import { SkeletonCard } from "../components/common/Skeleton";
import Spinner          from "../components/common/Spinner";
import { PRODUCTS }   from "../data/products";
import { filterProducts } from "../utils/filterProducts";
import { sortProducts }   from "../utils/sortProducts";
import { usePagination }  from "../hooks/usePagination";
import { useDebounce }    from "../hooks/useDebounce";
import { useStore }       from "../context/StoreContext";

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const { addToCart }  = useStore();

  const [category,    setCategory]    = useState(searchParams.get("category") || "All");
  const [maxPrice,    setMaxPrice]    = useState(500);
  const [minRating,   setMinRating]   = useState(0);
  const [sortBy,      setSortBy]      = useState(searchParams.get("sort") || "featured");
  const [query,       setQuery]       = useState(searchParams.get("q") || "");
  const [viewMode,    setViewMode]    = useState("grid");
  const [loading,     setLoading]     = useState(true);
  const [qv,          setQv]          = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [category, maxPrice, minRating, sortBy, debouncedQuery]);

  const filtered = useMemo(() =>
    filterProducts(PRODUCTS, { category, maxPrice, minRating, query: debouncedQuery }),
    [category, maxPrice, minRating, debouncedQuery]
  );
  const sorted = useMemo(() => sortProducts(filtered, sortBy), [filtered, sortBy]);
  const { page, setPage, totalPages, paged, reset, total } = usePagination(sorted, 8);

  useEffect(() => { reset(); }, [category, maxPrice, minRating, sortBy, debouncedQuery]);

  const clearFilters = () => {
    setCategory("All"); setMaxPrice(500);
    setMinRating(0);    setSortBy("featured");
    setQuery("");
  };

  const filterProps = { category, setCategory, maxPrice, setMaxPrice, minRating, setMinRating, onClear: clearFilters };

  return (
    <>
      <SEO
        title="Shop — Luxury Fashion & Accessories"
        description="Browse LUXORA's full collection of luxury fashion, handbags, watches, shoes and accessories."
        keywords="luxury shop, buy luxury fashion, premium accessories"
        url="/shop"
      />

      {/* Header */}
      <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
          <h1 className="font-serif text-4xl sm:text-5xl">Shop</h1>
          <p className="text-muted text-sm mt-2">{total} products found</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-8">

          {/* Sidebar (desktop + mobile drawer) */}
          <Sidebar {...filterProps} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Products column */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <SortBar
              query={query}       setQuery={setQuery}
              sortBy={sortBy}     setSortBy={setSortBy}
              viewMode={viewMode} setViewMode={setViewMode}
              onOpenFilters={() => setSidebarOpen(true)}
            />

            {/* Grid / List / Skeleton / Empty */}
            {loading ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paged.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-3xl mb-3">No products found</p>
                <p className="text-muted mb-6">Try adjusting your filters.</p>
                <button className="btn-gold" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {paged.map(p => <ProductCard key={p.id} product={p} onQuickView={setQv} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {paged.map(p => (
                  <div key={p.id} className="card flex flex-col sm:flex-row overflow-hidden hover:shadow-hover transition-shadow">
                    <div className="sm:w-40 shrink-0 bg-ivory" style={{ aspectRatio: "1" }}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-5 flex flex-col justify-center flex-1">
                      <p className="text-xs tracking-widest uppercase text-muted mb-1">{p.category}</p>
                      <p className="text-base font-medium mb-2">{p.name}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold">${p.price}</span>
                        {p.oldPrice && <span className="text-xs text-muted line-through">${p.oldPrice}</span>}
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-gold py-2" onClick={() => addToCart(p)}>Add to Cart</button>
                        <button className="btn-outline py-2" onClick={() => setQv(p)}>Quick View</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>

      {qv && <QuickViewModal product={qv} onClose={() => setQv(null)} />}
    </>
  );
}