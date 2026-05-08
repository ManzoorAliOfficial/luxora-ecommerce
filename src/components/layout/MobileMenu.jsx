import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Heart, ChevronRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [
  { label: "Home",    to: "/"        },
  { label: "Shop",    to: "/shop"    },
  { label: "About",   to: "/about"   },
  { label: "Contact", to: "/contact" },
  { label: "FAQ",     to: "/faq"     },
];

const menuVariants = {
  closed: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  open:   { opacity: 1, clipPath: "inset(0 0 0% 0)"   },
};

const itemVariants = {
  closed: { opacity: 0, x: -18 },
  open:   (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.07 + i * 0.055, duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  }),
};

const footerVariants = {
  closed: { opacity: 0, y: 12 },
  open:   { opacity: 1, y: 0, transition: { delay: 0.42, duration: 0.4, ease: "easeOut" } },
};

export default function MobileMenu({ isOpen }) {
  const { wishlist } = useStore();
  const { user }     = useAuth();
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden"
          aria-label="Mobile navigation"
          id="mobile-menu"
          style={{
            background: "linear-gradient(160deg, rgba(15,12,10,0.97) 0%, rgba(26,20,14,0.98) 100%)",
            borderTop: "1px solid rgba(212,175,100,0.2)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(212,175,100,0.12)",
          }}
        >
          {/* Decorative top accent line */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(212,175,100,0.6) 40%, rgba(212,175,100,0.6) 60%, transparent)",
            marginBottom: "0",
          }} />

          {/* Nav links */}
          <div className="px-6 pt-2 pb-2">
            {NAV_LINKS.map((l, i) => {
              const isActive = pathname === l.to;
              return (
                <motion.div
                  key={l.to}
                  custom={i}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    to={l.to}
                    className="group flex items-center justify-between py-4"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
                        fontSize: "1.125rem",
                        letterSpacing: "0.18em",
                        fontWeight: isActive ? 600 : 400,
                        textTransform: "uppercase",
                        color: isActive
                          ? "#D4AF64"
                          : "rgba(245,240,232,0.82)",
                        transition: "color 0.25s ease, letter-spacing 0.25s ease",
                      }}
                      className="group-hover:!text-amber-300"
                    >
                      {l.label}
                    </span>

                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}>
                      {isActive && (
                        <span style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#D4AF64",
                          display: "inline-block",
                          boxShadow: "0 0 8px rgba(212,175,100,0.7)",
                        }} />
                      )}
                      <ChevronRight
                        size={14}
                        style={{
                          color: isActive ? "#D4AF64" : "rgba(255,255,255,0.2)",
                          transition: "transform 0.25s ease, color 0.25s ease",
                        }}
                        className="group-hover:!text-amber-300 group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative divider */}
          <div className="mx-6" style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(212,175,100,0.25), transparent)",
            margin: "0 24px",
          }} />

          {/* Footer row — Account + Wishlist */}
          <motion.div
            variants={footerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex items-center gap-1 px-6 py-5"
          >
            <Link
              to={user ? "/account" : "/login"}
              className="group flex items-center gap-2.5 flex-1 py-2 px-3 rounded"
              style={{
                textDecoration: "none",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,100,0.12)",
                transition: "background 0.2s ease, border-color 0.2s ease",
              }}
            >
              <span style={{
                width: "30px", height: "30px",
                borderRadius: "50%",
                background: "rgba(212,175,100,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(212,175,100,0.25)",
                flexShrink: 0,
              }}>
                <User size={13} style={{ color: "#D4AF64" }} />
              </span>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.78rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.7)",
              }}>
                {user ? "Account" : "Sign In"}
              </span>
            </Link>

            <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.07)", margin: "0 4px" }} />

            <Link
              to="/wishlist"
              className="group flex items-center gap-2.5 flex-1 py-2 px-3 rounded"
              style={{
                textDecoration: "none",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,100,0.12)",
                transition: "background 0.2s ease, border-color 0.2s ease",
              }}
            >
              <span style={{
                width: "30px", height: "30px",
                borderRadius: "50%",
                background: "rgba(212,175,100,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(212,175,100,0.25)",
                flexShrink: 0,
                position: "relative",
              }}>
                <Heart size={13} style={{ color: "#D4AF64" }} />
                {wishlist.length > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-4px", right: "-4px",
                    width: "16px", height: "16px",
                    borderRadius: "50%",
                    background: "#D4AF64",
                    color: "#0F0C0A",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "sans-serif",
                    letterSpacing: 0,
                  }}>
                    {wishlist.length}
                  </span>
                )}
              </span>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.78rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.7)",
              }}>
                Wishlist
              </span>
            </Link>
          </motion.div>

          {/* Bottom marquee-style tagline */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "10px 24px",
            display: "flex",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(212,175,100,0.35)",
              fontStyle: "italic",
            }}>
              Crafted with Intention
            </span>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}