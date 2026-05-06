import { Star } from "lucide-react";

export default function RatingFilter({ selected, onChange }) {
  const ratings = [4, 3, 2, 1];

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
      <div className="space-y-2">
        {ratings.map((rating) => (
          <label key={rating} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={selected === rating}
              onChange={() => onChange(rating)}
              className="w-4 h-4"
            />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? "fill-gold text-gold" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">& Up</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
