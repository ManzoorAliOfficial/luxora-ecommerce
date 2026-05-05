export default function Button({
  children,
  variant  = "gold",
  size     = "md",
  onClick,
  disabled,
  type     = "button",
  className = "",
  as: Tag  = "button",
  ...rest
}) {
  const base     = "inline-flex items-center justify-center gap-2 transition-all duration-300 rounded-sm font-sans cursor-pointer tracking-widest uppercase font-medium border-0 whitespace-nowrap";
  const variants = {
    gold:    "bg-gold hover:bg-gold-dark text-white hover:-translate-y-px hover:shadow-gold active:translate-y-0",
    outline: "bg-transparent text-luxury border border-luxury hover:bg-luxury hover:text-white",
    ghost:   "bg-transparent text-luxury hover:text-gold p-2",
    white:   "bg-white text-luxury hover:bg-ivory border border-champagne",
    dark:    "bg-luxury text-white hover:bg-opacity-80",
  };
  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-xs px-7 py-3",
    lg: "text-sm px-9 py-4",
  };

  return (
    <Tag
      type={Tag === "button" ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[variant === "ghost" ? "md" : size]} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}