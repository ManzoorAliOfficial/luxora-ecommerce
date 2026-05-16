import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Home, Package, ShoppingCart, Users, BarChart3, Settings, LogOut } from 'lucide-react';

const NAV = [
  { id: "overview",  label: "Dashboard", icon: Home },
  { id: "products",  label: "Products",  icon: Package },
  { id: "orders",    label: "Orders",    icon: ShoppingCart },
  { id: "customers", label: "Customers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings",  label: "Settings",  icon: Settings },
];

export default function AdminSidebar({ section, setSection }) {
  const { logout } = useAuth();

  return (
    <aside className="w-62 h-screen bg-luxury text-white flex flex-col shrink-0">
      <div className="p-5 border-b border-white/10">
        <Link to="/" className="font-serif text-xl tracking-[0.25em] uppercase text-white">
          LUXORA
        </Link>
        <p className="text-xs text-white/40 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 py-2">
        {NAV.map((n) => {
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              onClick={() => setSection(n.id)}
              className={`flex items-center gap-3 w-full px-5 py-3 text-sm text-left cursor-pointer font-sans border-0 transition-all ${
                section === n.id
                  ? "bg-gold text-white"
                  : "bg-transparent text-white/65 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} />
              {n.label}
            </button>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-5 py-4 text-sm text-white/40 hover:text-white border-t border-white/10 cursor-pointer font-sans bg-transparent border-l-0 border-r-0 border-b-0 w-full text-left transition-colors"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}