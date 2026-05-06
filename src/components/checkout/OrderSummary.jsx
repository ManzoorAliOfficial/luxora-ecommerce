import { useStore } from "../../context/StoreContext";

export default function OrderSummary() {
  const { cart, cartTotal } = useStore();
  const shipping = cartTotal > 100 ? 0 : 10;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
            </div>
            <p className="font-semibold text-gold">${item.price * item.qty}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-6 border-t">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-gold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
