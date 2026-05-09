const STATS = [
  { label: "Total Sales",  value: "$25,430", change: "+8.2%",  icon: "💰" },
  { label: "Total Orders", value: "320",     change: "+5.1%",  icon: "📦" },
  { label: "Customers",    value: "1,245",   change: "+12.5%", icon: "👥" },
  { label: "Products",     value: "84",      change: "+4.7%",  icon: "🏷️" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {STATS.map((s) => (
        <div key={s.label} className="card p-5">
          <div className="flex justify-between items-start mb-3">
            <p className="text-xs tracking-widest uppercase text-muted">{s.label}</p>
            <span className="text-xl">{s.icon}</span>
          </div>
          <p className="text-2xl font-bold mb-1">{s.value}</p>
          <span className="text-xs text-green-600 font-medium">{s.change} this month</span>
        </div>
      ))}
    </div>
  );
}