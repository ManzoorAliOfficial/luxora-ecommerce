import { useStore } from "../context/StoreContext";

export default function useRecentlyViewed() {
  const { recentlyViewed, addRecentlyViewed } = useStore();

  return {
    recentlyViewed,
    addRecentlyViewed,
  };
}
