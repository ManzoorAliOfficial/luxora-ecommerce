import { Star } from "lucide-react";

export default function ReviewList() {
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely love this product! Quality is amazing and shipping was fast.",
    },
    {
      id: 2,
      author: "John D.",
      rating: 4,
      date: "1 month ago",
      comment: "Great purchase. Would definitely recommend to others.",
    },
  ];

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6 last:border-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{review.author}</h4>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>

          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? "fill-gold text-gold" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
