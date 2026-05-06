import { useStore } from "../context/StoreContext";

export default function useWishlist() {
  const { wishlist, toggleWishlist } = useStore();

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
  };
}
