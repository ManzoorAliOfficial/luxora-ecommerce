import { useState, useEffect, useMemo } from "react";
import { useSearchParams }              from "react-router-dom";
import SEO              from "../components/common/SEO";
import ProductCard      from "../components/shop/ProductCard";
import QuickViewModal   from "../components/shop/QuickViewModal";
import Pagination       from "../components/common/Pagination";
import Breadcrumb       from "../components/common/Breadcrumb";
import { SkeletonCard } from "../components/common/Skeleton";
import { PRODUCTS }     from "../data/products";
import { CATEGORIES, SORT_OPTIONS } from "../data/constants";
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

  const clearFilters = () => { setCategory("All"); setMaxPrice(500); setMinRating(0); setSortBy("featured"); setQuery(""); };

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

          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-64 shrink-0" aria-label="Product filters">
            <FilterPanel category={category} setCategory={setCategory}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              minRating={minRating} setMinRating={setMinRating}
              onClear={clearFilters} />
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative flex-1 min-w-48">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search products..." className="input pl-9" aria-label="Search products" />
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="input w-auto text-sm" aria-label="Sort products">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <button className="btn-outline lg:hidden py-2.5 px-4 text-xs"
                onClick={() => setSidebarOpen(true)} aria-label="Open filters">
                Filters
              </button>
              <div className="flex border border-champagne rounded-sm">
                {["grid","list"].map(m => (
                  <button key={m} onClick={() => setViewMode(m)} aria-pressed={viewMode === m}
                    className={`p-2 border-0 cursor-pointer transition-colors ${viewMode === m ? "bg-gold text-white" : "bg-white text-luxury hover:text-gold"}`}>
                    {m === "grid"
                      ? <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                      : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    }
                  </button>
                ))}
              </div>
            </div>

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

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white w-72 max-w-full h-full overflow-y-auto p-5 animate-slide-up">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-medium tracking-widest uppercase text-sm">Filters</h2>
              <button className="btn-ghost" onClick={() => setSidebarOpen(false)}>✕</button>
            </div>
            <FilterPanel category={category} setCategory={setCategory}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              minRating={minRating} setMinRating={setMinRating}
              onClear={clearFilters} />
          </div>
        </div>
      )}

      {qv && <QuickViewModal product={qv} onClose={() => setQv(null)} />}
    </>
  );
}

function FilterPanel({ category, setCategory, maxPrice, setMaxPrice, minRating, setMinRating, onClear }) {
  return (
    <div>
      <div className="filter-section">
        <p className="filter-title">Categories</p>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`block w-full text-left py-2 text-sm border-b border-champagne last:border-0 transition-colors cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0 font-sans ${category === c ? "text-gold font-medium" : "text-luxury hover:text-gold"}`}>
            {c} <span className="text-muted text-xs">({c === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === c).length})</span>
          </button>
        ))}
      </div>
      <div className="filter-section">
        <p className="filter-title">Price Range</p>
        <input type="range" min={20} max={500} value={maxPrice}
          onChange={e => setMaxPrice(+e.target.value)}
          className="w-full accent-gold mb-2" aria-label="Maximum price" />
        <div className="flex justify-between text-xs text-muted">
          <span>$20</span><span className="font-medium text-luxury">${maxPrice}</span>
        </div>
      </div>
      <div className="filter-section">
        <p className="filter-title">Min. Rating</p>
        {[4,3,2,1].map(r => (
          <button key={r} onClick={() => setMinRating(minRating === r ? 0 : r)}
            className={`flex items-center gap-2 py-2 w-full border-b border-champagne last:border-0 text-sm cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0 font-sans transition-colors ${minRating === r ? "text-gold" : "text-luxury hover:text-gold"}`}>
            {"★".repeat(r)}{"☆".repeat(5 - r)}
            <span className="text-xs text-muted">& up</span>
            {minRating === r && <span className="ml-auto text-gold">✓</span>}
          </button>
        ))}
      </div>
      <button onClick={onClear} className="btn-outline w-full text-xs py-2.5">Clear All Filters</button>
    </div>
  );
}