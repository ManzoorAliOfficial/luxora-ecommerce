export default function Badge({ children, variant = "gold", className = "" }) {
  const v = {
    gold:  "bg-gold text-white",
    sale:  "bg-red-500 text-white",
    new:   "bg-luxury text-white",
    green: "bg-green-100 text-green-700",
    blue:  "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`badge ${v[variant] || v.gold} ${className}`}>
      {children}
    </span>
  );
}