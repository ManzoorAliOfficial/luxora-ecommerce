export default function QuantitySelector({ qty, onChange, min = 1, max = 99 }) {
  return (
    <div className="mb-6">
      <p className="label">Quantity</p>
      <div className="flex items-center border border-champagne rounded-sm w-fit mt-2">

        {/* Decrease */}
        <button
          onClick={() => onChange(Math.max(min, qty - 1))}
          disabled={qty <= min}
          aria-label="Decrease quantity"
          className="px-4 py-3 hover:text-gold transition-colors border-0 bg-transparent cursor-pointer disabled:opacity-40"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {/* Count */}
        <span
          className="px-6 py-3 text-sm font-medium border-x border-champagne min-w-14 text-center"
          aria-live="polite"
          aria-label={`Quantity: ${qty}`}
        >
          {qty}
        </span>

        {/* Increase */}
        <button
          onClick={() => onChange(Math.min(max, qty + 1))}
          disabled={qty >= max}
          aria-label="Increase quantity"
          className="px-4 py-3 hover:text-gold transition-colors border-0 bg-transparent cursor-pointer disabled:opacity-40"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5"  y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}