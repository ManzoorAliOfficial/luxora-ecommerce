import { useState } from "react";
import Badge from "../common/Badge";

export default function ProductGallery({ images = [], productName, badge }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div>
      {/* ── Main image ── */}
      <div
        className={`relative bg-ivory rounded-sm overflow-hidden mb-3 ${
          zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        style={{ aspectRatio: "1" }}
        onClick={() => setZoomed(v => !v)}
        role="img"
        aria-label={`${productName} — image ${imgIdx + 1} of ${images.length}`}
      >
        <img
          src={images[imgIdx]}
          alt={`${productName} view ${imgIdx + 1}`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            zoomed ? "scale-150" : "scale-100"
          }`}
          width="600"
          height="600"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <Badge variant={badge === "Sale" || badge === "-20%" ? "sale" : "new"}>
              {badge}
            </Badge>
          </div>
        )}

        {/* Zoom hint */}
        <p className="absolute bottom-3 right-3 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-sm select-none">
          {zoomed ? "Click to zoom out" : "Click to zoom"}
        </p>
      </div>

      {/* ── Thumbnails ── */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setImgIdx(i); setZoomed(false); }}
              aria-label={`View image ${i + 1}`}
              aria-current={imgIdx === i}
              className={`flex-1 rounded-sm overflow-hidden border-2 transition-all cursor-pointer bg-transparent p-0 ${
                imgIdx === i
                  ? "border-gold"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              style={{ aspectRatio: "1" }}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover bg-ivory"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}