import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Your cart is empty
      </h2>
      
      <p className="text-gray-500 mb-8">
        Add some products to get started!
      </p>
      
      <Link
        to="/shop"
        className="btn-primary"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
