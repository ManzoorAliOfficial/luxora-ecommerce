export default function Icon({ name, className = "", size = 20, ...props }) {
  // This is a placeholder for a dynamic icon component
  // In production, you would use lucide-react icons directly
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
