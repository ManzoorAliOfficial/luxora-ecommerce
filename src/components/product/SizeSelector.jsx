export default function SizeSelector({ sizes, selected, onChange }) {
  if (!sizes?.length) return null;

  return (
    <div className="mb-5">
      <p className="label">Size</p>
      <div className="flex flex-wrap gap-2 mt-2">
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