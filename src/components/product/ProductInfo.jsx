import { Star, Heart, Share2 } from "lucide-react";
import Badge from "../common/Badge";
import { useStore } from "../../context/StoreContext";

export default function ProductInfo({ product }) {
  const { toggleWishlist, wishlist } = useStore();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <div className="space-y-4">
      {product.badge && (
        <Badge variant="gold">{product.badge}</Badge>
      )}

      <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating)
                  ? "fill-gold text-gold"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-gold">
          ${product.price}
        </span>
        {product.oldPrice && (
          <span className="text-2xl text-gray-400 line-through">
            ${product.oldPrice}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {product.description}
      </p>

      {/* Features */}
      {product.features && (
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-600">
                <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={() => toggleWishlist(product)}
          className={`
            p-3 rounded-lg border-2 transition-all
            ${isInWishlist
              ? "border-red-500 text-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
            }
          `}
        >
          <Heart className={`h-6 w-6 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
        <button className="p-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition">
          <Share2 className="h-6 w-6" />
        </button>
      </div>

      {/* Stock */}
      {product.stock && (
        <p className="text-sm text-gray-600">
          {product.stock > 10 ? (
            <span className="text-green-600">✓ In Stock</span>
          ) : (
            <span className="text-orange-600">Only {product.stock} left!</span>
          )}
        </p>
      )}
    </div>
  );
}
