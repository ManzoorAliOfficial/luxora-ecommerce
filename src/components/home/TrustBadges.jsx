import { Shield, Truck, RotateCcw, HeadphonesIcon } from "lucide-react";

const badges = [
  { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
  { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Dedicated customer service" },
];

const repeated = [...badges, ...badges, ...badges, ...badges];

export default function TrustBadges() {
  return (
    <>
      <style>{`
        @keyframes trust-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .trust-track {
          animation: trust-scroll 20s linear infinite;
        }
        .trust-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden w-full py-4">
        <div className="trust-track flex gap-4 w-max">
          {repeated.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-5 bg-white rounded-xl border border-champagne hover:border-gold transition min-w-[240px] flex-shrink-0"
            >
              <div className="w-11 h-11 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                <badge.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-luxury text-sm">{badge.title}</h3>
                <p className="text-xs text-muted">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}