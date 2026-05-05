export function filterProducts(products, { category, maxPrice, minRating, query }) {
  return products.filter(p =>
    (!category  || category === "All" || p.category === category) &&
    (!maxPrice  || p.price <= maxPrice) &&
    (!minRating || p.rating >= minRating) &&
    (!query     || p.name.toLowerCase().includes(query.toLowerCase()))
  );
}