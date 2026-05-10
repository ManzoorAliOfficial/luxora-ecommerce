import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { COUPON_CODES } from "../../data/constants";

export default function CouponInput({ onApply }) {
  const { addToast } = useStore();
  const [coupon, setCoupon] = useState("");

  const handleApply = () => {
    const code = coupon.toUpperCase();
    if (COUPON_CODES[code]) {
      onApply(COUPON_CODES[code]);
      addToast(`Coupon applied! ${COUPON_CODES[code] * 100}% off`);
    } else {
      addToast("Invalid coupon code", "error");
    }
  };

  return (
    <div className="card p-6">
      <h3 className="mb-4">Coupon Code</h3>
      <div className="flex">
        <input
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          className="input"
          placeholder="Enter code"
        />
        <button onClick={handleApply} className="btn-gold">
          Apply
        </button>
      </div>
    </div>
  );
}