import { Plus, Minus } from "lucide-react";

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  const decrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const increment = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
      <div className="inline-flex items-center border-2 border-gray-300 rounded-lg">
        <button
          onClick={decrement}
          className="p-3 hover:bg-gray-100 transition disabled:opacity-50"
          disabled={quantity <= min}
        >
          <Minus className="h-5 w-5" />
        </button>
        <span className="px-6 font-semibold text-lg">{quantity}</span>
        <button
          onClick={increment}
          className="p-3 hover:bg-gray-100 transition disabled:opacity-50"
          disabled={quantity >= max}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
