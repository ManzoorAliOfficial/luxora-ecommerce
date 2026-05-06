import { CreditCard, Wallet } from "lucide-react";
import { useState } from "react";

export default function PaymentOptions({ onSubmit }) {
  const [method, setMethod] = useState("card");

  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: CreditCard },
    { id: "paypal", name: "PayPal", icon: Wallet },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(method);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        {paymentMethods.map((pm) => (
          <label
            key={pm.id}
            className={`
              flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${method === pm.id
                ? "border-gold bg-gold/5"
                : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <input
              type="radio"
              name="payment"
              value={pm.id}
              checked={method === pm.id}
              onChange={(e) => setMethod(e.target.value)}
              className="w-5 h-5"
            />
            <pm.icon className="h-6 w-6 text-gray-600" />
            <span className="font-medium text-gray-900">{pm.name}</span>
          </label>
        ))}
      </div>

      {method === "card" && (
        <div className="space-y-4 pt-4">
          <input
            type="text"
            placeholder="Card Number"
            className="input w-full"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="input"
              required
            />
            <input
              type="text"
              placeholder="CVV"
              className="input"
              required
            />
          </div>
        </div>
      )}

      <button type="submit" className="btn-primary w-full">
        Place Order
      </button>
    </form>
  );
}
