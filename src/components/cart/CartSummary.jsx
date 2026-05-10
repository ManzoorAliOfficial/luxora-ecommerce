import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "../../data/constants";
import Reveal from "../common/Reveal";
import CouponInput from "./CouponInput";
import { useState } from "react";

export default function CartSummary() {
  const { cartTotal } = useStore();
  const [discount, setDiscount] = useState(0);

  const shipping   = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discounted = cartTotal * (1 - discount);
  const total      = discounted + shipping;

  return (
    <Reveal delay={0.2}>
      <div className="space-y-4">
        <CouponInput onApply={setDiscount} />

        <div className="card p-6">
          <h3 className="mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm text-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-luxury font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-gold">
                <span>Discount ({discount * 100}%)</span>
                <span>-${(cartTotal * discount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-luxury font-medium">
                {shipping === 0 ? "Free" : `$${shipping}`}
              </span>
            </div>
            <div className="h-px bg-champagne my-2" />
            <div className="flex justify-between text-base font-semibold text-luxury">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="btn-gold w-full mt-6 block text-center"
          >
            Checkout
          </Link>
        </div>
      </div>
    </Reveal>
  );
}