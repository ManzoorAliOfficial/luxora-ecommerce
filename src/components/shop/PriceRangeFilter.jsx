import { useState } from "react";

export default function PriceRangeFilter({ onChange }) {
  const [range, setRange] = useState([0, 500]);

  const handleChange = (e, index) => {
    const newRange = [...range];
    newRange[index] = parseInt(e.target.value);
    setRange(newRange);
    onChange(newRange);
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="500"
          value={range[1]}
          onChange={(e) => handleChange(e, 1)}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>${range[0]}</span>
          <span>${range[1]}</span>
        </div>
      </div>
    </div>
  );
}
