import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";

export default function Sidebar({ filters, onChange }) {
  return (
    <div className="space-y-8">
      <CategoryFilter
        selected={filters.category}
        onChange={(cat) => onChange({ ...filters, category: cat })}
      />
      <div className="border-t pt-6">
        <PriceRangeFilter
          onChange={(range) => onChange({ ...filters, priceRange: range })}
        />
      </div>
      <div className="border-t pt-6">
        <RatingFilter
          selected={filters.rating}
          onChange={(rating) => onChange({ ...filters, rating })}
        />
      </div>
    </div>
  );
}
