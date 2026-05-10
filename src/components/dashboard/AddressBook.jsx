const ADDRESSES = [
  { title: "Home",   addr: "123 Main St, New York, NY 10001, USA"  },
  { title: "Office", addr: "456 Park Ave, New York, NY 10022, USA" },
];

export default function AddressBook() {
  return (
    <div>
      <h3 className="text-xs tracking-widest uppercase font-medium mb-5">
        Saved Addresses
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ADDRESSES.map(a => (
          <div key={a.title} className="card p-5">
            <div className="flex justify-between mb-2">
              <span className="text-xs tracking-widest uppercase font-semibold">{a.title}</span>
              <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">
                Edit
              </button>
            </div>
            <p className="text-sm text-muted">{a.addr}</p>
          </div>
        ))}

        <button className="card p-5 flex items-center justify-center gap-2 text-sm text-muted hover:text-gold hover:border-gold transition-colors border border-dashed border-champagne bg-transparent cursor-pointer font-sans">
          + Add New Address
        </button>
      </div>
    </div>
  );
}