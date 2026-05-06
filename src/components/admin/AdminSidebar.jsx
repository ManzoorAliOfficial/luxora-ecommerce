import { LayoutDashboard, Package, Users, ShoppingCart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const links = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="bg-white h-full border-r">
      <div className="p-6">
        <h2 className="text-2xl font-display font-bold text-luxury">
          Admin Panel
        </h2>
      </div>
      <nav className="px-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${isActive ? "bg-luxury text-white" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <link.icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
