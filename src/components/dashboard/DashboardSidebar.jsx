import { useAuth } from "../../context/AuthContext";
import { Home, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';

const TABS = [
  { id: "overview",  icon: Home,     label: "Dashboard"        },
  { id: "orders",    icon: Package,  label: "My Orders"        },
  { id: "wishlist",  icon: Heart,    label: "Wishlist"         },
  { id: "addresses", icon: MapPin,   label: "Addresses"        },
  { id: "settings",  icon: Settings, label: "Account Settings" },
];

export default function DashboardSidebar({ activeTab, onTabChange }) {
  const { user, logout } = useAuth();

  const name   = user?.name   || "John Doe";
  const email  = user?.email  || "john@example.com";
  const avatar = user?.avatar || "JD";

  return (
    <aside className="lg:w-60 shrink-0">
      <div className="card overflow-hidden">
        {/* Avatar */}
        <div className="p-6 bg-ivory text-center">
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-white text-xl font-semibold mx-auto mb-3">
            {avatar}
          </div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted">{email}</p>
        </div>

        {/* Nav tabs */}
        {TABS.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`flex items-center gap-3 px-5 py-3.5 w-full text-left text-sm border-t border-champagne transition-colors cursor-pointer font-sans bg-transparent border-l-0 border-r-0 border-b-0 ${
                activeTab === t.id ? "text-gold bg-gold/5" : "text-luxury hover:text-gold"
              }`}
              style={{ borderLeft: activeTab === t.id ? "3px solid #C9A84C" : "3px solid transparent" }}
            >
              <Icon size={18} />
              {t.label}
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-5 py-3.5 w-full text-left text-sm border-t border-champagne text-muted hover:text-red-500 transition-colors cursor-pointer font-sans bg-transparent border-l-0 border-r-0 border-b-0"
          style={{ borderLeft: "3px solid transparent" }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}