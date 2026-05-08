import React from "react";
import { motion } from "framer-motion";

const AnnouncementBar = () => {
  return (
    <div className="bg-black text-white overflow-hidden py-2 relative">
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1200], // smooth pixel movement
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear", // important for smoothness
          },
        }}
        style={{
          willChange: "transform",
        }}
      >
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="flex items-center mx-8 text-[11px] tracking-[2px] uppercase flex-shrink-0"
          >
            <span>Free Shipping on orders over $100</span>

            <span className="mx-4 text-yellow-400">•</span>

            <span>
              Use code{" "}
              <strong className="text-yellow-400 font-semibold">
                LUXORA20
              </strong>{" "}
              for 20% off
            </span>
          </div>
        ))}
      </motion.div>
      
    </div>
  );
};

export default AnnouncementBar;