import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const METHODS = [
  { id: "cod",    label: "Cash on Delivery",     desc: "Pay when you receive your order" },
  { id: "card",   label: "Credit / Debit Card",  desc: "Visa, Mastercard, Amex" },
  { id: "stripe", label: "Stripe",               desc: "Pay securely via Stripe" },
];

export default function PaymentOptions({ onBack, onPlace }) {
  const [payment, setPayment] = useState("cod");

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-sm tracking-widest uppercase font-medium mb-6">
        Payment Method
      </h2>

      {/* Method list */}
      <div className="space-y-3 mb-6">
        {METHODS.map(m => (
          <label
            key={m.id}
            className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-all ${
              payment === m.id
                ? "border-gold bg-gold/5"
                : "border-champagne hover:border-gold/50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={m.id}
              checked={payment === m.id}
              onChange={() => setPayment(m.id)}
              className="accent-gold w-4 h-4 shrink-0"
            />
            <div>
              <p className="text-sm font-medium">{m.label}</p>
              <p className="text-xs text-muted">{m.desc}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Card fields */}
      {payment === "card" && (
        <div className="p-4 bg-ivory rounded-sm space-y-3 mb-6">
          <div>
            <label className="label">Card Number</label>
            <input placeholder="1234 5678 9012 3456" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Expiry</label>
              <input placeholder="MM/YY" className="input" />
            </div>
            <div>
              <label className="label">CVV</label>
              <input placeholder="123" className="input" />
            </div>
          </div>
        </div>
      )}

      {/* Trust line */}
      <div className="flex items-center gap-2 mb-5 text-xs text-muted">
        <svg className="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        SSL Encrypted · Secure Checkout · 100% Money Back Guarantee
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="btn-outline flex capitalize items-center gap-1 text-base group"
        >
          <ArrowLeft className="w-[1.3em] h-[1.3em] transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
        <button
          onClick={onPlace}
          className="btn-gold flex items-center capitalize gap-1 text-base group"
        >
          <span>Place Order</span>
          <ArrowRight className="w-[1.3em] h-[1.3em] transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}