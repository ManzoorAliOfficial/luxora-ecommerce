export default function SizeSelector({ sizes = [], selected, onChange }) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <p className="label mb-0">Size</p>
        <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map(s => (
          <button
            key={s}
            onClick={() => onChange(s)}
            aria-pressed={selected === s}
            className={`px-4 py-2 text-xs border rounded-sm transition-all cursor-pointer font-sans ${
              selected === s
                ? "bg-gold text-white border-gold"
                : "bg-white text-luxury border-champagne hover:border-gold"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}