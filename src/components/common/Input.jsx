import { forwardRef } from "react";

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon, 
  className = "", 
  ...props 
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border
            ${Icon ? "pl-10" : ""}
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gold"}
            focus:ring-2 focus:border-transparent
            transition-all duration-200
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
