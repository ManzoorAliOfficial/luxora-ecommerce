export default function Stars({ rating, size = 14, showCount, count }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24"
            fill={i <= Math.round(rating) ? "#C9A84C" : "none"}
            stroke="#C9A84C" strokeWidth="1" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </span>
      {showCount && count !== undefined && (
        <span className="text-xs text-muted ml-1">({count})</span>
      )}
    </span>
  );
}