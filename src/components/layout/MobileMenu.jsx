import { X, Home, ShoppingBag, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({ isOpen, onClose }) {
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ShoppingBag, label: "Shop", path: "/shop" },
    { icon: User, label: "Account", path: "/dashboard" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[81] lg:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-display font-bold text-luxury">
                Luxora
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-6 space-y-2">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <item.icon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Categories */}
            <div className="px-6 py-4 border-t">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Categories
              </h3>
              <div className="space-y-2">
                {["Bags", "Shoes", "Accessories", "Clothing"].map((cat, idx) => (
                  <Link
                    key={idx}
                    to={`/shop?category=${cat}`}
                    onClick={onClose}
                    className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition text-gray-700"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
