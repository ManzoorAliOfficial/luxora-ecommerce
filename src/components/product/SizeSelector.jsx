export default function SizeSelector({ sizes, selected, onChange }) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size, idx) => (
          <button
            key={idx}
            onClick={() => onChange(size)}
            className={`
              px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200
              ${selected === size
                ? "border-gold bg-gold text-white"
                : "border-gray-300 hover:border-gray-400"
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
