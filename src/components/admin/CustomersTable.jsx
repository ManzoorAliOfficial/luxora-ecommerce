const CUSTOMERS = [
  { name: "John Doe",    email: "john@example.com",  orders: 12, spent: 1430, status: "VIP"    },
  { name: "Sarah Smith", email: "sarah@email.com",   orders: 8,  spent: 890,  status: "Active" },
  { name: "Mike Brown",  email: "mike@mail.com",     orders: 3,  spent: 340,  status: "Active" },
  { name: "Emily Green", email: "emily@example.com", orders: 15, spent: 2100, status: "VIP"    },
];

export default function CustomersTable() {
  return (
    <>
      <h2 className="text-xl font-medium mb-6">Customers</h2>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Customers">
            <thead className="bg-ivory">
              <tr className="border-b border-champagne">
                {["Name", "Email", "Orders", "Spent", "Status"].map((h) => (
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
              {CUSTOMERS.map((c) => (
                <tr key={c.email} className="border-b border-champagne hover:bg-ivory/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-xs font-semibold shrink-0">
                        {c.name[0]}
                      </div>
                      <span className="font-medium text-sm">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted text-xs">{c.email}</td>
                  <td className="py-3 px-4">{c.orders}</td>
                  <td className="py-3 px-4 font-medium">${c.spent}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge ${
                        c.status === "VIP"
                          ? "bg-gold/20 text-gold"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}