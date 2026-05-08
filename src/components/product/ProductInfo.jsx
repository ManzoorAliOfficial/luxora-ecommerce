import Stars from "../common/Stars";
import Badge from "../common/Badge";

export default function ProductInfo({ product }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="flex flex-col">
      {/* Category */}
      <p className="text-xs tracking-widest uppercase text-muted mb-2">
        {product.category}
      </p>

      {/* Name */}
      <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-luxury mb-3">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-5">
        <Stars rating={product.rating} showCount count={product.reviews} />
        <span className="text-xs text-muted">· {product.stock} in stock</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-semibold text-luxury">
          ${product.price}
        </span>
        {product.oldPrice && (
          <span className="text-lg text-muted line-through">
            ${product.oldPrice}
          </span>
        )}
        {discount && (
          <Badge variant="sale">-{discount}%</Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed mb-6">
        {product.description}
      </p>

      {/* Divider */}
      <div className="h-px bg-champagne mb-6" />
    </div>
  );
}