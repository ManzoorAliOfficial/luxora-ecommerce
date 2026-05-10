import { motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";

const itemAnim = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0  },
};

export default function CartItem({ item }) {
  const { removeFromCart, updateQty } = useStore();

  return (
    <motion.div
      key={`${item.id}-${item.color}-${item.size}`}
      variants={itemAnim}
      className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center py-5 border-b border-champagne"
    >
      {/* Product */}
      <div className="sm:col-span-2 flex gap-4 items-center">
        <div className="w-20 h-20 bg-ivory rounded-sm overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-sm mb-1">{item.name}</p>
          {item.color && (
            <span
              className="inline-block w-3.5 h-3.5 rounded-full mr-1"
              style={{ background: item.color }}
            />
          )}
          {item.size && (
            <span className="text-xs text-muted">{item.size}</span>
          )}
          <p className="text-sm text-muted mt-1">${item.price}</p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-xs text-muted hover:text-red-500 mt-1 underline"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Qty */}
      <div className="flex justify-start sm:justify-center">
        <div className="flex items-center border border-champagne">
          <button
            onClick={() => updateQty(item.id, item.qty - 1)}
            className="px-2 py-2"
          >
            -
          </button>
          <span className="px-3">{item.qty}</span>
          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            className="px-2 py-2"
          >
            +
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right font-semibold">
        ${(item.price * item.qty).toFixed(2)}
      </div>
    </motion.div>
  );
}