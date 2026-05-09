import { motion } from "framer-motion";
import { useEffect } from "react";

const injectStyles = () => {
  if (typeof document === "undefined") return;

  if (!document.getElementById("lux-shimmer")) {
    const style = document.createElement("style");

    style.id = "lux-shimmer";
    style.textContent = `
      @keyframes luxora-shimmer {
        0% {
          background-position: -600px 0;
        }
        100% {
          background-position: 600px 0;
        }
      }

      .lux-bone {
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0.04) 0px,
          rgba(255,255,255,0.09) 200px,
          rgba(255,255,255,0.04) 400px
        );
        background-size: 600px 100%;
        animation: luxora-shimmer 1.6s infinite linear;
      }
    `;

    document.head.appendChild(style);
  }
};

function Bone({
  width = "100%",
  height = "16px",
  borderRadius = "6px",
  style = {},
}) {
  useEffect(() => {
    injectStyles();
  }, []);

  return (
    <div
      className="lux-bone"
      style={{
        width,
        height,
        borderRadius,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

// MAIN EXPORT
export function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <Bone height="280px" borderRadius="0" />

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Bone width="40%" height="10px" />
        <Bone width="75%" height="16px" />
        <Bone width="55%" height="14px" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          <Bone width="30%" height="18px" />
          <Bone width="80px" height="34px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
}

// OPTIONAL EXPORTS
export function ProductCardSkeleton() {
  return <SkeletonCard />;
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "24px",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.04 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Bone height="500px" borderRadius="14px" />

        <div style={{ display: "flex", gap: "10px" }}>
          {[1, 2, 3, 4].map((i) => (
            <Bone
              key={i}
              width="80px"
              height="80px"
              borderRadius="8px"
            />
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingTop: "8px",
        }}
      >
        <Bone width="35%" height="10px" />
        <Bone width="80%" height="32px" />
        <Bone width="60%" height="22px" />

        <div style={{ display: "flex", gap: "6px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Bone
              key={i}
              width="18px"
              height="18px"
              borderRadius="50%"
            />
          ))}

          <Bone
            width="80px"
            height="14px"
            style={{ marginLeft: "8px" }}
          />
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {[100, 90, 75, 60].map((w, i) => (
          <Bone key={i} width={`${w}%`} height="12px" />
        ))}

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        <Bone width="20%" height="10px" />

        <div style={{ display: "flex", gap: "8px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Bone
              key={i}
              width="48px"
              height="44px"
              borderRadius="8px"
            />
          ))}
        </div>

        <Bone
          height="52px"
          borderRadius="10px"
          style={{ marginTop: "8px" }}
        />
      </div>
    </div>
  );
}