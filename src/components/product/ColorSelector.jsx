import { Check } from "lucide-react";

export default function ColorSelector({ colors, selected, onChange }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
      <div className="flex gap-2">
        {colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => onChange(color)}
            className={`
              w-10 h-10 rounded-full border-2 flex items-center justify-center
              transition-all duration-200
              ${selected === color ? "border-gray-900 scale-110" : "border-gray-300"}
            `}
            style={{ backgroundColor: color }}
          >
            {selected === color && (
              <Check className="h-5 w-5 text-white drop-shadow-md" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
