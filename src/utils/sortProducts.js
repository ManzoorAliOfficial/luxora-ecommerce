export function sortProducts(products, sortType) {
  switch (sortType) {
    case "price-low-high":
      return [...products].sort((a, b) => a.price - b.price);

    case "price-high-low":
      return [...products].sort((a, b) => b.price - a.price);

    case "rating":
      return [...products].sort((a, b) => b.rating - a.rating);

    case "latest":
      return [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    default:
      return products;
  }
}