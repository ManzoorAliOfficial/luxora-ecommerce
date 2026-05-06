import { Shield, Truck, RotateCcw, HeadphonesIcon } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
    { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
    { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: HeadphonesIcon, title: "24/7 Support", desc: "Dedicated customer service" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {badges.map((badge, idx) => (
        <div key={idx} className="flex items-center gap-4 p-6 bg-white rounded-xl border hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
            <badge.icon className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{badge.title}</h3>
            <p className="text-sm text-gray-600">{badge.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
