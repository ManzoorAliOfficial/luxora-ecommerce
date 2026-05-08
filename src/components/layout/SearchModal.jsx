import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

const SearchModal = ({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  navigate,
}) => {
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);

      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-2xl"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">

              {/* Search Form */}
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3"
              >

                {/* Previous Search Icon */}
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-5 h-5 text-gray-500" />
                </div>

                {/* Input */}
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search for products..."
                  className="flex-1 bg-transparent outline-none border-none text-sm sm:text-base text-luxury placeholder:text-gray-400"
                />

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-luxury" />
                </button>
              </form>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;