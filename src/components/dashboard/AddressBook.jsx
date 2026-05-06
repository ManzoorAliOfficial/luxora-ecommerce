import { Plus, MapPin, Trash2, Edit } from "lucide-react";
import { useState } from "react";

export default function AddressBook() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      isDefault: true,
    },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Address Book</h2>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-white rounded-xl p-6 border hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />
                <h3 className="font-semibold text-gray-900">{addr.name}</h3>
              </div>
              {addr.isDefault && (
                <span className="px-2 py-1 bg-gold/10 text-gold text-xs font-medium rounded">
                  Default
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-1">{addr.address}</p>
            <p className="text-gray-600">
              {addr.city}, {addr.state} {addr.zip}
            </p>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button className="flex-1 btn-secondary text-red-600 flex items-center justify-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
