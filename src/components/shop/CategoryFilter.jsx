import { CATEGORIES } from "../../data/categories";

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="category"
            checked={!selected}
            onChange={() => onChange(null)}
            className="w-4 h-4"
          />
          <span className="text-gray-700">All Products</span>
        </label>
        {CATEGORIES.map((cat) => (
          <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selected === cat.slug}
              onChange={() => onChange(cat.slug)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">{cat.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
