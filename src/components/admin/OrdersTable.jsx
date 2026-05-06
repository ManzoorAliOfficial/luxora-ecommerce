const ORDERS = [
  { id: "#12345", customer: "John Doe", product: "Luxury Handbag", status: "Delivered", amount: 149 },
  { id: "#12344", customer: "Sarah Smith", product: "Minimal Watch", status: "Shipped", amount: 129 },
  { id: "#12343", customer: "Mike Brown", product: "White Sneakers", status: "Pending", amount: 89 },
  { id: "#12342", customer: "Emily Green", product: "Aviator Sunglasses", status: "Delivered", amount: 99 },
];

const STATUS_STYLE = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Pending: "bg-orange-100 text-orange-700",
};

export default function OrdersTable({ title, showHeader = true, showViewAll, onViewAll }) {
  return (
    <div className="card overflow-hidden">
      {showHeader && (
        <div className="flex justify-between items-center mb-5 p-6 pb-0">
          <h3 className="text-sm tracking-widest uppercase font-medium">{title}</h3>
          {showViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans"
            >
              View All
            </button>
          )}
        </div>
      )}
      <div className={showHeader ? "overflow-x-auto px-6 pb-6" : "overflow-x-auto"}>
        <table className="w-full text-sm" aria-label="Orders">
          <thead className={showHeader ? "" : "bg-ivory"}>
            <tr className="border-b border-champagne">
              {["Order", "Customer", "Product", "Status", "Amount", "Action"].map((h) => (
                <th
                  key={h}
                  className={`text-left py-3 text-xs tracking-widest uppercase text-muted font-medium ${
                    showHeader ? "pr-4" : "px-4"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} className="border-b border-champagne hover:bg-ivory/50">
                <td className={`py-3 font-medium ${showHeader ? "pr-4" : "px-4"}`}>{o.id}</td>
                <td className={`py-3 ${showHeader ? "pr-4" : "px-4"}`}>{o.customer}</td>
                <td className={`py-3 text-muted text-xs ${showHeader ? "pr-4" : "px-4"}`}>
                  {o.product}
                </td>
                <td className={`py-3 ${showHeader ? "pr-4" : "px-4"}`}>
                  <span className={`badge ${STATUS_STYLE[o.status] || ""}`}>{o.status}</span>
                </td>
                <td className={`py-3 font-semibold ${showHeader ? "pr-4" : "px-4"}`}>
                  ${o.amount}
                </td>
                <td className={`py-3 ${showHeader ? "" : "px-4"}`}>
                  <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}