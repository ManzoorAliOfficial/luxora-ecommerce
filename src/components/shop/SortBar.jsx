import { SORT_OPTIONS } from "../../data/constants";

export default function SortBar({ query, setQuery, sortBy, setSortBy, viewMode, setViewMode, onOpenFilters }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">

      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products..."
          className="input pl-9"
          aria-label="Search products"
        />
      </div>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="input w-auto text-sm"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Mobile filter toggle */}
      <button
        className="btn-outline lg:hidden py-2.5 px-4 text-xs"
        onClick={onOpenFilters}
        aria-label="Open filters"
      >
        Filters
      </button>

      {/* Grid / List toggle */}
      <div className="flex border border-champagne rounded-sm">
        {["grid", "list"].map(m => (
          <button
            key={m}
            onClick={() => setViewMode(m)}
            aria-pressed={viewMode === m}
            className={`p-2 border-0 cursor-pointer transition-colors ${
              viewMode === m ? "bg-gold text-white" : "bg-white text-luxury hover:text-gold"
            }`}
          >
            {m === "grid" ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3"  y="3"  width="7" height="7" />
                <rect x="14" y="3"  width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3"  y="14" width="7" height="7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="8"    y1="6"  x2="21"   y2="6"  />
                <line x1="8"    y1="12" x2="21"   y2="12" />
                <line x1="8"    y1="18" x2="21"   y2="18" />
                <line x1="3"    y1="6"  x2="3.01" y2="6"  />
                <line x1="3"    y1="12" x2="3.01" y2="12" />
                <line x1="3"    y1="18" x2="3.01" y2="18" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}