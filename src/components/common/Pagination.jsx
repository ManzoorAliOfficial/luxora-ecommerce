export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="flex justify-center items-center gap-2 mt-10" aria-label="Pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}
        className="w-9 h-9 flex items-center justify-center border border-champagne bg-white rounded-sm text-luxury disabled:opacity-40 hover:border-gold hover:text-gold transition-colors"
        aria-label="Previous page">‹</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
        <button key={n} onClick={() => onPageChange(n)} aria-current={page === n ? "page" : undefined}
          className={`w-9 h-9 flex items-center justify-center rounded-sm text-sm font-medium transition-all ${
            page === n ? "bg-gold text-white border border-gold" : "bg-white text-luxury border border-champagne hover:border-gold hover:text-gold"
          }`}>{n}</button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
        className="w-9 h-9 flex items-center justify-center border border-champagne bg-white rounded-sm text-luxury disabled:opacity-40 hover:border-gold hover:text-gold transition-colors"
        aria-label="Next page">›</button>
    </nav>
  );
}