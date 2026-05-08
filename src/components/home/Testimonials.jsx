import { motion } from "framer-motion";
import { useState } from "react";
import Stars from "../common/Stars";
import { TESTIMONIALS } from "../../data/testimonials";

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  // duplicate testimonials for seamless infinite scroll
  const duplicated = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      className="py-16 px-4 sm:px-6 bg-ivory overflow-hidden"
      aria-label="Customer testimonials"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">Clients Love Us</p>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>

        {/* Slider Container */}
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
              duration: 25, // adjust speed here
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicated.map((t, i) => (
              <motion.article
                key={i}
                className="w-[320px] h-[260px] card p-6 flex flex-col justify-between flex-shrink-0 hover:shadow-xl transition duration-300"
                whileHover={{ y: -5 }}
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Top Content */}
                <div>
                  <div
                    className="text-gold text-4xl mb-3"
                    aria-hidden="true"
                  >
                    "
                  </div>

                  <p
                    className="text-muted text-sm leading-relaxed line-clamp-4"
                    itemProp="reviewBody"
                  >
                    {t.text}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white text-sm font-semibold">
                    {t.avatar}
                  </div>

                  <div>
                    <p
                      className="text-sm font-medium text-luxury"
                      itemProp="author"
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>

                  <div className="ml-auto">
                    <Stars rating={t.rating} size={12} />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}