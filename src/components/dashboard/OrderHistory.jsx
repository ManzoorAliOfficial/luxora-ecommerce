const ORDERS = [
  { id: "#12345", date: "May 1, 2026",  status: "Delivered", total: 149, items: 1 },
  { id: "#12344", date: "Apr 28, 2026", status: "Shipped",   total: 129, items: 2 },
  { id: "#12343", date: "Apr 15, 2026", status: "Delivered", total: 89,  items: 1 },
];

const STATUS_STYLE = {
  Delivered: "bg-green-100 text-green-700",
  Shipped:   "bg-blue-100 text-blue-700",
  Pending:   "bg-orange-100 text-orange-700",
};

// showItems=false → used in the overview summary (no Items column)
// showItems=true  → used in the full Orders tab
export default function OrderHistory({ showItems = true }) {
  const headers = showItems
    ? ["Order", "Date", "Items", "Status", "Total", "Action"]
    : ["Order", "Date", "Status", "Total", "Action"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" aria-label="Orders">
        <thead>
          <tr className="border-b border-champagne">
            {headers.map(h => (
              <th key={h} className="text-left pb-3 text-xs tracking-widest uppercase text-muted font-medium pr-4">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ORDERS.map(o => (
            <tr key={o.id} className="border-b border-champagne">
              <td className="py-3.5 pr-4 font-medium">{o.id}</td>
              <td className="py-3.5 pr-4 text-muted">{o.date}</td>
              {showItems && <td className="py-3.5 pr-4">{o.items}</td>}
              <td className="py-3.5 pr-4">
                <span className={`badge ${STATUS_STYLE[o.status] || ""}`}>{o.status}</span>
              </td>
              <td className="py-3.5 pr-4 font-medium">${o.total}</td>
              <td className="py-3.5">
                <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}