export default function SortBar({ sortBy, onSortChange, total }) {
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-gray-600">
        Showing <span className="font-semibold">{total}</span> products
      </p>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
