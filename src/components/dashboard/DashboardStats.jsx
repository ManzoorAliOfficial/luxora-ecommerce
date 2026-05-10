import { useStore } from "../../context/StoreContext";
import OrderHistory from "./OrderHistory";

const STATS = [
  { label: "Total Orders", value: 12,     icon: "📦" },
  { label: "Addresses",    value: 3,       icon: "📍" },
  { label: "Balance",      value: "$150",  icon: "💳" },
];

export default function DashboardStats() {
  const { wishlist } = useStore();

  const stats = [
    STATS[0],
    { label: "Wishlist", value: wishlist.length, icon: "♥" },
    STATS[1],
    STATS[2],
  ];

  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="card p-5">
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs tracking-widest uppercase text-muted">{s.label}</p>
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className="text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders preview */}
      <div className="card p-6">
        <h3 className="text-xs tracking-widest uppercase font-medium mb-5">Recent Orders</h3>
        <OrderHistory showItems={false} />
      </div>
    </div>
  );
}