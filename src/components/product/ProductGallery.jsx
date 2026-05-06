import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images, name }) {
  const [currentImage, setCurrentImage] = useState(0);
  const imgs = images || [];

  const next = () => setCurrentImage((currentImage + 1) % imgs.length);
  const prev = () => setCurrentImage((currentImage - 1 + imgs.length) % imgs.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
        {imgs.length > 0 ? (
          <>
            <img
              src={imgs[currentImage]}
              alt={`${name} - ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
            
            {imgs.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {imgs.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`
                aspect-square rounded-lg overflow-hidden border-2 transition
                ${currentImage === idx ? "border-gold" : "border-gray-200 hover:border-gray-300"}
              `}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
