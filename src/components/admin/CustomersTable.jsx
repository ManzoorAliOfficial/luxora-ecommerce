export default function CustomersTable() {
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 5, spent: "$1,249" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 3, spent: "$849" },
  ];

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gold">{customer.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
