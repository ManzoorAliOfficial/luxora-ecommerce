import { createContext, useContext, useState, useCallback } from "react";

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [cart,           setCart]           = useState([]);
  const [wishlist,       setWishlist]       = useState([]);
  const [toasts,         setToasts]         = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback((product, qty = 1, color = null, size = null) => {
    setCart(c => {
      const match = x => x.id === product.id && x.color === color && x.size === size;
      const existing = c.find(match);
      if (existing) return c.map(x => match(x) ? { ...x, qty: x.qty + qty } : x);
      return [...c, { ...product, qty, color, size }];
    });
    addToast(`${product.name} added to cart`);
  }, [addToast]);

  const removeFromCart = useCallback((id) => setCart(c => c.filter(x => x.id !== id)), []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCart(c => c.map(x => x.id === id ? { ...x, qty } : x));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(w => {
      if (w.find(x => x.id === product.id)) {
        addToast("Removed from wishlist");
        return w.filter(x => x.id !== product.id);
      }
      addToast("Added to wishlist ♥");
      return [...w, product];
    });
  }, [addToast]);

  const addRecentlyViewed = useCallback((product) => {
    setRecentlyViewed(r => [product, ...r.filter(x => x.id !== product.id)].slice(0, 6));
  }, []);

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const cartTotal = cart.reduce((s, x) => s + x.price * x.qty, 0);

  return (
    <StoreContext.Provider value={{
      cart, cartCount, cartTotal,
      wishlist, toasts, recentlyViewed,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, addToast, addRecentlyViewed,
    }}>
      {children}
    </StoreContext.Provider>
  );
}