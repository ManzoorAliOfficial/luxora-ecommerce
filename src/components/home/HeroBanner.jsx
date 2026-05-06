import { Link }                         from "react-router-dom";
import { motion }                        from "framer-motion";
import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";

// ─── Animation variants ───────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const trustBadgeVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
};

const badgeItem = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Trust badge data ─────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: Truck,       text: "Free Shipping"   },
  { icon: RefreshCw,   text: "Easy Returns"    },
  { icon: Shield,      text: "Secure Payment"  },
  { icon: Headphones,  text: "24/7 Support"    },
];

// ─── HeroBanner ───────────────────────────────────────────────────────────────
export default function HeroBanner() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      // h-78 (312px) → min-h-[85vh] — pura screen fill hoga, premium ecommerce jaise
      aria-label="Hero banner"
    >
      {/*
        Hero image:
        - loading="eager"       — above-the-fold image ko defer mat karo
        - fetchpriority="high"  — browser ko batao yeh LCP image hai, pehle load karo
        - decoding="async"      — main thread block nahi hogi
      */}
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
        alt=""
        role="presentation"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,.95) 45%, rgba(255,255,255,.1))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 w-full py-24 pt-36">
        <div className="max-w-xl">

          {/*
            motion.div container — staggerChildren se har child ek ke baad ek animate hoga:
            label → h1 lines → paragraph → buttons → trust badges
          */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Section label */}
            <motion.p className="section-label" variants={fadeUp}>
              New Collection 2026
            </motion.p>

            {/* Headline — teen alag lines, teen alag beats pe aayen */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-luxury leading-tight mb-6">
              <motion.span className="block" variants={fadeUp}>
                Luxury Style
              </motion.span>
              <motion.span className="block" variants={fadeUp}>
                For Modern
              </motion.span>
              <motion.span className="block" variants={fadeUp}>
                Living
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg text-muted mb-10 max-w-md leading-relaxed"
              variants={fadeUp}
            >
              Discover high-quality products crafted for beauty, comfort &amp;
              elegance. Elevate every moment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
              <Link to="/shop" className="btn-gold">
                Shop Now
              </Link>
              <Link to="/about" className="btn-outline">
                Our Story
              </Link>
            </motion.div>

            {/* Trust badges — stagger apne andar */}
            <motion.div
              className="flex gap-8 mt-12 flex-wrap p-2"
              variants={trustBadgeVariants}
            >
              {TRUST_BADGES.map((b) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.text}
                    className="flex items-center gap-2"
                    variants={badgeItem}
                  >
                    <Icon size={16} className="text-gold" />
                    <span className="text-xs tracking-wide text-luxury">{b.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — subtle bounce at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gold opacity-60"
        />
      </motion.div>
    </section>
  );
}