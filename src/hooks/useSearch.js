import { useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

export default function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);

    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );

    setTimeout(() => {
      setResults(filtered);
      setLoading(false);
    }, 200);
  }, [query]);

  return { results, loading };
}
