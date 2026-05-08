import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES_DATA } from "../../data/categories";

export default function CategoryGrid() {
  const [isPaused, setIsPaused] = useState(false);

  // duplicate for seamless loop
  const duplicated = [...CATEGORIES_DATA, ...CATEGORIES_DATA];

  return (
    <section
      className="py-20 px-4 sm:px-6 max-w-screen-xl mx-auto overflow-hidden"
      aria-label="Shop by category"
    >
      <div className="text-center mb-12">
        <p className="section-label">Browse By</p>
        <h2 className="section-title">Shop By Category</h2>
      </div>

      {/* Slider */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6"
          animate={{
            x: isPaused ? undefined : ["0%", "-50%"],
          }}
          transition={{
            duration: 20, // adjust speed
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicated.map((cat, i) => (
            <Link
              key={i}
              to={`/shop?category=${cat.name}`}
              className="group text-center flex-shrink-0 w-[160px]"
              aria-label={`Shop ${cat.name}`}
            >
              {/* Image */}
              <div className="relative rounded-sm overflow-hidden mb-3 bg-ivory aspect-square">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width="200"
                  height="200"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Text */}
              <p className="text-sm font-medium tracking-wide text-luxury group-hover:text-gold transition-colors">
                {cat.name}
              </p>
              <p className="text-xs text-muted">{cat.count} items</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}