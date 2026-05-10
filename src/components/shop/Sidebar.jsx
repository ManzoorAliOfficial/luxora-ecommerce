import { CATEGORIES, } from "../../data/constants";
import { PRODUCTS }    from "../../data/products";

function FilterPanel({ category, setCategory, maxPrice, setMaxPrice, minRating, setMinRating, onClear }) {
  return (
    <div>
      <div className="filter-section">
        <p className="filter-title">Categories</p>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`block w-full text-left py-2 text-sm border-b border-champagne last:border-0 transition-colors cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0 font-sans ${
              category === c ? "text-gold font-medium" : "text-luxury hover:text-gold"
            }`}
          >
            {c}{" "}
            <span className="text-muted text-xs">
              ({c === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === c).length})
            </span>
          </button>
        ))}
      </div>

      <div className="filter-section">
        <p className="filter-title">Price Range</p>
        <input
          type="range"
          min={20}
          max={500}
          value={maxPrice}
          onChange={e => setMaxPrice(+e.target.value)}
          className="w-full accent-gold mb-2"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-xs text-muted">
          <span>$20</span>
          <span className="font-medium text-luxury">${maxPrice}</span>
        </div>
      </div>

      <div className="filter-section">
        <p className="filter-title">Min. Rating</p>
        {[4, 3, 2, 1].map(r => (
          <button
            key={r}
            onClick={() => setMinRating(minRating === r ? 0 : r)}
            className={`flex items-center gap-2 py-2 w-full border-b border-champagne last:border-0 text-sm cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0 font-sans transition-colors ${
              minRating === r ? "text-gold" : "text-luxury hover:text-gold"
            }`}
          >
            {"★".repeat(r)}{"☆".repeat(5 - r)}
            <span className="text-xs text-muted">& up</span>
            {minRating === r && <span className="ml-auto text-gold">✓</span>}
          </button>
        ))}
      </div>

      <button onClick={onClear} className="btn-outline w-full text-xs py-2.5">
        Clear All Filters
      </button>
    </div>
  );
}

// Desktop sidebar + mobile drawer combined
export default function Sidebar({
  category, setCategory,
  maxPrice, setMaxPrice,
  minRating, setMinRating,
  onClear,
  isOpen, onClose,
}) {
  const panelProps = { category, setCategory, maxPrice, setMaxPrice, minRating, setMinRating, onClear };

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block w-64 shrink-0" aria-label="Product filters">
        <FilterPanel {...panelProps} />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative bg-white w-72 max-w-full h-full overflow-y-auto p-5 animate-slide-up">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-medium tracking-widest uppercase text-sm">Filters</h2>
              <button className="btn-ghost" onClick={onClose}>✕</button>
            </div>
            <FilterPanel {...panelProps} />
          </div>
        </div>
      )}
    </>
  );
}