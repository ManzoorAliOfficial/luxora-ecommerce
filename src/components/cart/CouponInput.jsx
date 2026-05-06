import { useState } from "react";
import { Tag } from "lucide-react";

export default function CouponInput() {
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (coupon.trim()) {
      setApplied(true);
      // In real app, validate coupon code
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-gold" />
        <h3 className="font-semibold text-gray-900">Have a coupon?</h3>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          disabled={applied}
        />
        <button
          onClick={handleApply}
          disabled={!coupon.trim() || applied}
          className="px-6 py-2 bg-luxury text-white rounded-lg hover:bg-luxury/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>

      {applied && (
        <p className="mt-3 text-sm text-green-600 font-medium">
          ✓ Coupon applied successfully!
        </p>
      )}
    </div>
  );
}
