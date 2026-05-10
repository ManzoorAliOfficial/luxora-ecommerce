export default function QuantitySelector({ qty, onChange }) {
  return (
    <div className="mb-6">
      <p className="label">Quantity</p>
      <div className="flex items-center border border-champagne rounded-sm w-fit mt-2">
        <button
          onClick={() => onChange(q => Math.max(1, q - 1))}
          className="px-4 py-3 hover:text-gold transition-colors border-0 bg-transparent cursor-pointer"
          aria-label="Decrease quantity"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <span
          className="px-6 py-3 text-sm font-medium border-x border-champagne min-w-14 text-center"
          aria-live="polite"
        >
          {qty}
        </span>

        <button
          onClick={() => onChange(q => q + 1)}
          className="px-4 py-3 hover:text-gold transition-colors border-0 bg-transparent cursor-pointer"
          aria-label="Increase quantity"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}