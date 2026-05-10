import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";

import AdminSidebar from "../components/admin/AdminSidebar";
import StatsCards from "../components/admin/StatsCards";
import SalesChart from "../components/admin/SalesChart";
import ProductTable from "../components/admin/ProductTable";
import OrdersTable from "../components/admin/OrdersTable";
import CustomersTable from "../components/admin/CustomersTable";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSection = (id) => {
    setSection(id);
    setSidebarOpen(false);
  };

  return (
    <>
      <SEO title="Admin Dashboard" url="/admin" />

      <div className="flex h-screen bg-ivory overflow-hidden">

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar — hidden on mobile, slide-in when open ── */}
        <div className={`
          fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300
          lg:static lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <AdminSidebar
            section={section}
            setSection={handleSection}
          />
        </div>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">

          {/* ── Mobile top bar ── */}
          <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-ivory border-b border-champagne lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-champagne transition"
              aria-label="Open menu"
            >
              <span className="text-xl">☰</span>
            </button>
            <h1 className="font-serif text-lg text-luxury">
              {NAV.find((n) => n.id === section)?.label}
            </h1>
          </div>

          {/* ── Page content ── */}
          <div className="p-4 sm:p-6 lg:p-8">

            {section === "overview" && (
              <>
                <h2 className="text-xl font-medium mb-6 hidden lg:block">Dashboard Overview</h2>
                <StatsCards />
                <SalesChart />
                <OrdersTable compact onViewAll={() => setSection("orders")} />
              </>
            )}

            {section === "products" && (
              <ProductTable onAddProduct={() => setShowAdd(true)} />
            )}

            {section === "orders" && <OrdersTable />}

            {section === "customers" && <CustomersTable />}

            {(section === "analytics" || section === "settings") && (
              <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
                <span className="text-5xl">{NAV.find((n) => n.id === section)?.icon}</span>
                <h2 className="font-serif text-3xl">{NAV.find((n) => n.id === section)?.label}</h2>
                <p className="text-muted">This section is ready for development.</p>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-champagne lg:hidden">
        <div className="flex items-center justify-around">
          {NAV.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleSection(item.id)}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 flex-1 transition ${
                section === item.id ? "text-gold" : "text-muted"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <AddProductModal open={showAdd} onClose={() => setShowAdd(false)} />
    </>
  );
}