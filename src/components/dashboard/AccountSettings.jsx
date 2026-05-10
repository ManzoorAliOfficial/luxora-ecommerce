const PROFILE_FIELDS = [
  ["First Name", "John"],
  ["Last Name",  "Doe"],
  ["Email",      "john@example.com"],
  ["Phone",      "+1 234 567 8900"],
];

export default function AccountSettings() {
  return (
    <div className="card p-6 sm:p-8">
      <h3 className="text-xs tracking-widest uppercase font-medium mb-6">
        Account Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Profile fields */}
        {PROFILE_FIELDS.map(([label, value]) => (
          <div key={label}>
            <label className="label">{label}</label>
            <input defaultValue={value} className="input" />
          </div>
        ))}

        <div className="sm:col-span-2 h-px bg-champagne" />

        {/* Password fields */}
        <div className="sm:col-span-2">
          <label className="label">Current Password</label>
          <input type="password" placeholder="Leave blank to keep current" className="input" />
        </div>
        <div>
          <label className="label">New Password</label>
          <input type="password" placeholder="New password" className="input" />
        </div>
        <div>
          <label className="label">Confirm Password</label>
          <input type="password" placeholder="Confirm password" className="input" />
        </div>
      </div>

      <button className="btn-gold">Save Changes</button>
    </div>
  );
}