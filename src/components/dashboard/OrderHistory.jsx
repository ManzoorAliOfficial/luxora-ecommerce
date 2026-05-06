import { Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const orders = [
    {
      id: "LX-001234",
      date: "2024-05-01",
      status: "Delivered",
      total: 299.99,
      items: 3,
    },
    {
      id: "LX-001235",
      date: "2024-05-03",
      status: "Processing",
      total: 149.50,
      items: 2,
    },
  ];

  const statusColors = {
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl p-6 border hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-semibold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  {order.items} items • Total: <span className="font-semibold text-gold">${order.total}</span>
                </p>
              </div>
              <Link
                to={`/dashboard/orders/${order.id}`}
                className="flex items-center gap-1 text-gold hover:underline"
              >
                View Details
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
