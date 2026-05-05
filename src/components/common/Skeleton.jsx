export default function Skeleton({ className = "", style = {} }) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden="true" />;
}

export function SkeletonCard() {
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <Skeleton className="w-full" style={{ aspectRatio: "3/4" }} />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-2.5 w-2/5 rounded" />
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3 w-3/5 rounded" />
        <Skeleton className="h-3 w-1/3 rounded mt-1" />
      </div>
    </div>
  );
}