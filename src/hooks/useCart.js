import { useStore } from "../context/StoreContext";

export default function useCart() {
  const { cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal } = useStore();

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    cartTotal,
  };
}
