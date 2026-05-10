import { useState }        from "react";
import { useAuth }         from "../context/AuthContext";
import SEO                 from "../components/common/SEO";
import DashboardSidebar    from "../components/dashboard/DashboardSidebar";
import DashboardStats      from "../components/dashboard/DashboardStats";
import OrderHistory        from "../components/dashboard/OrderHistory";
import WishlistTab         from "../components/dashboard/WishlistTab";
import AddressBook         from "../components/dashboard/AddressBook";
import AccountSettings     from "../components/dashboard/AccountSettings";

export default function DashboardPage() {
  const { user }              = useAuth();
  const [activeTab, setTab]   = useState("overview");

  const name = user?.name || "John Doe";

  return (
    <>
      <SEO
        title="My Account"
        description="Manage your orders, wishlist and account settings."
        url="/account"
      />

      {/* Header */}
      <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl">My Account</h1>
          <p className="text-muted text-sm mt-1">Hello, {name} 👋</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          <DashboardSidebar activeTab={activeTab} onTabChange={setTab} />

          {/* Tab panels */}
          <div className="flex-1 min-w-0">
            {activeTab === "overview"  && <DashboardStats />}
            {activeTab === "orders"    && (
              <div className="card p-6">
                <h3 className="text-xs tracking-widest uppercase font-medium mb-5">All Orders</h3>
                <OrderHistory showItems={true} />
              </div>
            )}
            {activeTab === "wishlist"  && <WishlistTab />}
            {activeTab === "addresses" && <AddressBook />}
            {activeTab === "settings"  && <AccountSettings />}
          </div>

        </div>
      </div>
    </>
  );
}