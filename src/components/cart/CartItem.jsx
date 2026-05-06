import { Trash2, Plus, Minus } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateQty } = useStore();

  return (
    <div className="flex gap-4 py-6 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {item.color && <span>Color: {item.color} </span>}
          {item.size && <span>• Size: {item.size}</span>}
        </p>
        
        <div className="flex items-center gap-4 mt-3">
          {/* Quantity Selector */}
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="p-2 hover:bg-gray-100 transition"
              disabled={item.qty <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 font-medium">{item.qty}</span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              className="p-2 hover:bg-gray-100 transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Price */}
          <p className="text-lg font-semibold text-gold">
            ${item.price * item.qty}
          </p>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
