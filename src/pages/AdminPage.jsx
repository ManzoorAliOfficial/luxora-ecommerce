import { useState }  from "react";
import { Link }      from "react-router-dom";
import SEO           from "../components/common/SEO";
import Stars         from "../components/common/Stars";
import { PRODUCTS }  from "../data/products";
import { useStore }  from "../context/StoreContext";
import { useAuth }   from "../context/AuthContext";

import AdminSidebar    from "../components/admin/AdminSidebar";
import StatsCards      from "../components/admin/StatsCards";
import SalesChart      from "../components/admin/SalesChart";
import ProductTable    from "../components/admin/ProductTable";
import OrdersTable     from "../components/admin/OrdersTable";
import CustomersTable  from "../components/admin/CustomersTable";
import AddProductModal from "../components/admin/AddProductModal";

const NAV = [
  { id: "overview",  label: "Dashboard", icon: "🏠" },
  { id: "products",  label: "Products",  icon: "📦" },
  { id: "orders",    label: "Orders",    icon: "🛒" },
  { id: "customers", label: "Customers", icon: "👥" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "settings",  label: "Settings",  icon: "⚙️" },
];

export default function AdminPage() {
  const { addToast }          = useStore();
  const { logout }            = useAuth();
  const [section, setSection] = useState("overview");
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <SEO title="Admin Dashboard" url="/admin" />

      <div className="flex h-screen bg-ivory overflow-hidden">
        <AdminSidebar section={section} setSection={setSection} />

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">

          {/* ── Overview ── */}
          {section === "overview" && (
            <>
              <h2 className="text-xl font-medium mb-6">Dashboard Overview</h2>
              <StatsCards />
              <SalesChart />
              <OrdersTable compact onViewAll={() => setSection("orders")} />
            </>
          )}

          {/* ── Products ── */}
          {section === "products" && (
            <ProductTable onAddProduct={() => setShowAdd(true)} />
          )}

          {/* ── Orders ── */}
          {section === "orders" && <OrdersTable />}

          {/* ── Customers ── */}
          {section === "customers" && <CustomersTable />}

          {/* ── Placeholder sections ── */}
          {(section === "analytics" || section === "settings") && (
            <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
              <span className="text-5xl">{NAV.find((n) => n.id === section)?.icon}</span>
              <h2 className="font-serif text-3xl">{NAV.find((n) => n.id === section)?.label}</h2>
              <p className="text-muted">This section is ready for development.</p>
            </div>
          )}

        </main>
      </div>

      <AddProductModal open={showAdd} onClose={() => setShowAdd(false)} />
    </>
  );
}