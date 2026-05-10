import { Link } from "react-router-dom";
import SEO from "../common/SEO";

export default function OrderSuccess() {
  return (
    <>
      <SEO title="Order Confirmed" url="/checkout" />
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="font-serif text-4xl">Order Placed!</h1>
        <p className="text-muted max-w-sm">
          Thank you for your purchase. Your order has been confirmed and will be
          delivered soon.
        </p>
        <div className="flex gap-3 mt-2">
          <Link to="/account" className="btn-gold">Track Order</Link>
          <Link to="/shop"    className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </>
  );
}