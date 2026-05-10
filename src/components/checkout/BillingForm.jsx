const FIELDS = [
  ["firstName", "First Name",     "John"],
  ["lastName",  "Last Name",      "Doe"],
  ["email",     "Email Address",  "john@example.com"],
  ["phone",     "Phone Number",   "+1 234 567 8900"],
  ["city",      "City",           "New York"],
  ["zip",       "ZIP Code",       "10001"],
];

const COUNTRIES = [
  "United States", "United Kingdom", "Canada",
  "Australia", "Pakistan", "India",
];

export default function BillingForm({ form, onChange, onNext }) {
  const set = (key, value) => onChange({ ...form, [key]: value });

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-sm tracking-widest uppercase font-medium mb-6">
        Billing Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(([key, label, ph]) => (
          <div key={key}>
            <label className="label">{label}</label>
            <input
              value={form[key]}
              onChange={e => set(key, e.target.value)}
              placeholder={ph}
              className="input"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="label">Street Address</label>
          <input
            value={form.address}
            onChange={e => set("address", e.target.value)}
            placeholder="123 Main Street, Apt 4B"
            className="input"
          />
        </div>

        <div>
          <label className="label">Country</label>
          <select
            value={form.country}
            onChange={e => set("country", e.target.value)}
            className="input"
          >
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <button onClick={onNext} className="btn-gold mt-6">
        Continue to Payment →
      </button>
    </div>
  );
}