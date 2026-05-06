import { Package, Heart, ShoppingBag, DollarSign } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    { icon: Package, label: "Total Orders", value: "12", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: Heart, label: "Wishlist Items", value: "8", color: "text-red-600", bg: "bg-red-100" },
    { icon: ShoppingBag, label: "In Cart", value: "3", color: "text-green-600", bg: "bg-green-100" },
    { icon: DollarSign, label: "Total Spent", value: "$1,249", color: "text-gold", bg: "bg-gold/10" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 border hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
