import { useStore } from "../../context/StoreContext";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "../../data/constants";

export default function OrderSummary() {
  const { cart, cartTotal } = useStore();

  const shipping = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total    = cartTotal + shipping;

  return (
    <div className="card p-6 h-fit lg:sticky lg:top-28">
      <h3 className="text-xs tracking-widest uppercase font-medium mb-5">
        Your Order
      </h3>

      {/* Items */}
      <div className="space-y-3 mb-5">
        {cart.map(item => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="w-12 h-12 bg-ivory rounded-sm overflow-hidden shrink-0">
              <img src={item.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted">×{item.qty}</p>
            </div>
            <span className="text-xs font-medium shrink-0">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-champagne mb-4" />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className={shipping === 0 ? "text-green-600" : ""}>
            {shipping === 0 ? "Free" : `$${shipping}`}
          </span>
        </div>
        <div className="h-px bg-champagne" />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}