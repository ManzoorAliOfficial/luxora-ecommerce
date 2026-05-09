const SALES_DATA = [
  { month: "Jan", sales: 8200  }, { month: "Feb", sales: 11500 },
  { month: "Mar", sales: 9800  }, { month: "Apr", sales: 14200 },
  { month: "May", sales: 12100 }, { month: "Jun", sales: 16800 },
  { month: "Jul", sales: 15200 }, { month: "Aug", sales: 18500 },
  { month: "Sep", sales: 17100 }, { month: "Oct", sales: 21200 },
  { month: "Nov", sales: 23100 }, { month: "Dec", sales: 25430 },
];

export default function SalesChart() {
  const maxSales = Math.max(...SALES_DATA.map((d) => d.sales));

  return (
    <div className="card p-6 mb-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-sm tracking-widest uppercase font-medium">Sales Overview</h3>
        <select className="input w-auto text-xs">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="flex items-end gap-2 h-44">
        {SALES_DATA.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-gold/20 rounded-t-sm relative"
              style={{ height: `${(d.sales / maxSales) * 160}px` }}
            >
              <div className="absolute inset-0 bg-gold rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs text-muted hidden sm:block">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}