import { DollarSign, ShoppingBag, Users, Tag } from 'lucide-react';

const STATS = [
  { label: "Total Sales",  value: "$25,430", change: "+8.2%",  icon: DollarSign },
  { label: "Total Orders", value: "320",     change: "+5.1%",  icon: ShoppingBag },
  { label: "Customers",    value: "1,245",   change: "+12.5%", icon: Users },
  { label: "Products",     value: "84",      change: "+4.7%",  icon: Tag },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {STATS.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="card p-5">
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs tracking-widest uppercase text-muted">{s.label}</p>
              <Icon size={20} className="text-gold" />
            </div>
            <p className="text-2xl font-bold mb-1">{s.value}</p>
            <span className="text-xs text-green-600 font-medium">{s.change} this month</span>
          </div>
        );
      })}
    </div>
  );
}