import { forwardRef } from "react";

const Select = forwardRef(({ label, error, options, className = "", ...props }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-lg border
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gold"}
          focus:ring-2 focus:border-transparent
          transition-all duration-200
          bg-white cursor-pointer
          ${className}
        `}
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
