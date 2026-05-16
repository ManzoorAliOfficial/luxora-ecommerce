const ORDERS = [
  { id: "#12345", customer: "John Doe",    product: "Luxury Handbag",     status: "Delivered", amount: 149 },
  { id: "#12344", customer: "Sarah Smith", product: "Minimal Watch",      status: "Shipped",   amount: 129 },
  { id: "#12343", customer: "Mike Brown",  product: "White Sneakers",     status: "Pending",   amount: 89  },
  { id: "#12342", customer: "Emily Green", product: "Aviator Sunglasses", status: "Delivered", amount: 99  },
];

const STATUS_STYLE = {
  Delivered: "bg-green-100 text-green-700",
  Shipped:   "bg-blue-100 text-blue-700",
  Pending:   "bg-orange-100 text-orange-700",
};


export default function OrdersTable({ compact = false, onViewAll }) {
  return (
    <>
      {!compact && <h2 className="text-xl font-medium mb-6">Orders</h2>}

      <div className="card overflow-hidden">
        {compact && (
          <div className="flex justify-between items-center p-6 pb-0 mb-5">
            <h3 className="text-sm tracking-widest uppercase font-medium">Recent Orders</h3>
            <button
              onClick={onViewAll}
              className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans"
            >
              View All
            </button>
          </div>
        )}

        <div className="overflow-x-auto p-0">
          <table className="w-full text-sm" aria-label="Orders">
            <thead className={compact ? "" : "bg-ivory"}>
              <tr className="border-b border-champagne">
                {["Order", "Customer", "Product", "Status", "Amount", ...(compact ? [] : ["Action"])].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-xs tracking-widest uppercase text-muted font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id} className="border-b border-champagne hover:bg-ivory/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{o.id}</td>
                  <td className="py-3 px-4">{o.customer}</td>
                  <td className="py-3 px-4 text-muted text-xs">{o.product}</td>
                  <td className="py-3 px-4">
                    <span className={`badge ${STATUS_STYLE[o.status] || ""}`}>{o.status}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold">${o.amount}</td>
                  {!compact && (
                    <td className="py-3 px-4">
                      <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}