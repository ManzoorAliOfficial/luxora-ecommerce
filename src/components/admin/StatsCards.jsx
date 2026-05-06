import { TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react";

export default function StatsCards() {
  const stats = [
    { icon: DollarSign, label: "Total Revenue", value: "$45,231", change: "+12.5%", trend: "up" },
    { icon: ShoppingBag, label: "Total Orders", value: "1,234", change: "+8.2%", trend: "up" },
    { icon: Users, label: "Total Customers", value: "892", change: "+5.7%", trend: "up" },
    { icon: TrendingUp, label: "Conversion Rate", value: "3.24%", change: "+0.4%", trend: "up" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-gold" />
            </div>
            <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
