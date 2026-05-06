import { X } from "lucide-react";
import { useState } from "react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-luxury text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex-1 text-center">
          <span className="font-medium">Free Shipping on Orders Over $100</span>
          <span className="mx-2">•</span>
          <span>Sale: Up to 30% Off</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:opacity-70 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
