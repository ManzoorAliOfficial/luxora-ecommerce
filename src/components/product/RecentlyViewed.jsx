import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

const KEY = "luxora_recently_viewed";
const MAX = 6;

export function useRecentlyViewed() {
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  });

  const trackView = useCallback((product) => {
    setRecent(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recent, trackView };
}

export function RecentlyViewed({ recent, onQuickView }) {
  const scrollRef = useRef(null);
  if (!recent || recent.length === 0) return null;

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });

  return (
    <section style={{ padding: "48px 0 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Eye size={16} style={{ color: "#D4AF64" }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.08em", color: "rgba(245,240,232,0.9)", margin: 0 }}>
            Recently Viewed
          </h3>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {[ChevronLeft, ChevronRight].map((Icon, i) => (
            <button key={i} onClick={() => scroll(i === 0 ? -1 : 1)} style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(200,190,175,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
        {recent.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            style={{ flexShrink: 0, width: "200px", position: "relative" }}
          >
            <div style={{ width: "200px", height: "240px", borderRadius: "10px", overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", position: "relative" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="group-hover-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s ease" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0)"}
              >
                <button onClick={() => onQuickView?.(product)} style={{
                  padding: "8px 16px", borderRadius: "6px",
                  background: "rgba(212,175,100,0.9)", border: "none",
                  color: "#0A0800", fontFamily: "'Jost', sans-serif",
                  fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em",
                  textTransform: "uppercase", cursor: "pointer", opacity: 0, transition: "opacity 0.25s ease",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0"}
                >
                  Quick View
                </button>
              </div>
            </div>
            <div style={{ padding: "10px 2px 0" }}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9rem", fontWeight: 500, color: "rgba(245,240,232,0.8)", margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {product.name}
                </p>
              </Link>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "#D4AF64", margin: 0 }}>
                ${product.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}