import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderSuccess({ orderNumber }) {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-600 mb-2">
        Thank you for your order. Your order number is:
      </p>
      
      <p className="text-2xl font-bold text-gold mb-8">
        #{orderNumber || "LX-" + Date.now().toString().slice(-6)}
      </p>

      <p className="text-gray-600 mb-8">
        We've sent a confirmation email with your order details.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
        <Link to="/dashboard/orders" className="btn-secondary">
          View Orders
        </Link>
      </div>
    </div>
  );
}
