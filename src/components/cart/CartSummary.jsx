import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function CartSummary() {
  const { cartTotal } = useStore();
  const shipping = cartTotal > 100 ? 0 : 10;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
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
        <div className="border-t pt-3 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-gold">${total.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/checkout" className="btn-primary w-full">
        Proceed to Checkout
      </Link>

      {cartTotal < 100 && (
        <p className="text-sm text-center mt-4 text-gray-500">
          Add ${(100 - cartTotal).toFixed(2)} more for free shipping
        </p>
      )}
    </div>
  );
}
