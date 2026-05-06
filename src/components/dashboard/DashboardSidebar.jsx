import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function DashboardSidebar() {
  const location = useLocation();

  const links = [
    { icon: User, label: "Profile", path: "/dashboard" },
    { icon: Package, label: "Orders", path: "/dashboard/orders" },
    { icon: Heart, label: "Wishlist", path: "/dashboard/wishlist" },
    { icon: MapPin, label: "Addresses", path: "/dashboard/addresses" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h2 className="text-xl font-bold mb-6">My Account</h2>
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${isActive
                  ? "bg-gold text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <link.icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition w-full">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );
}
