import { useState, useMemo } from "react";
export function usePagination(items, perPage = 8) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / perPage);
  const paged = useMemo(
    () => items.slice((page - 1) * perPage, page * perPage),
    [items, page, perPage]
  );
  const reset = () => setPage(1);
  return { page, setPage, totalPages, paged, reset, total: items.length };
}