import { useState }   from "react";
import { Link }       from "react-router-dom";
import SEO            from "../components/common/SEO";
import Stars          from "../components/common/Stars";
import ProductCard    from "../components/shop/ProductCard";
import { useStore }   from "../context/StoreContext";
import { useAuth }    from "../context/AuthContext";

const ORDERS = [
  { id:"#12345", date:"May 1, 2026",  status:"Delivered", total:149, items:1 },
  { id:"#12344", date:"Apr 28, 2026", status:"Shipped",   total:129, items:2 },
  { id:"#12343", date:"Apr 15, 2026", status:"Delivered", total:89,  items:1 },
];

const STATUS_STYLE = {
  Delivered: "bg-green-100 text-green-700",
  Shipped:   "bg-blue-100 text-blue-700",
  Pending:   "bg-orange-100 text-orange-700",
};

const TABS = [
  { id:"overview",   icon:"🏠", label:"Dashboard"       },
  { id:"orders",     icon:"📦", label:"My Orders"        },
  { id:"wishlist",   icon:"♥",  label:"Wishlist"         },
  { id:"addresses",  icon:"📍", label:"Addresses"        },
  { id:"settings",   icon:"⚙️", label:"Account Settings" },
];

export default function DashboardPage() {
  const { wishlist }          = useStore();
  const { user, logout }      = useAuth();
  const [activeTab, setTab]   = useState("overview");

  const name   = user?.name   || "John Doe";
  const email  = user?.email  || "john@example.com";
  const avatar = user?.avatar || "JD";

  return (
    <>
      <SEO title="My Account" description="Manage your orders, wishlist and account settings." url="/account" />

      <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl">My Account</h1>
          <p className="text-muted text-sm mt-1">Hello, {name} 👋</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-60 shrink-0">
            <div className="card overflow-hidden">
              <div className="p-6 bg-ivory text-center">
                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-white text-xl font-semibold mx-auto mb-3">{avatar}</div>
                <p className="font-medium text-sm">{name}</p>
                <p className="text-xs text-muted">{email}</p>
              </div>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 w-full text-left text-sm border-t border-champagne transition-colors cursor-pointer font-sans bg-transparent border-l-0 border-r-0 border-b-0 ${activeTab === t.id ? "text-gold border-l-2 border-l-gold pl-4 bg-gold/5" : "text-luxury hover:text-gold"}`}
                  style={{ borderLeft: activeTab === t.id ? "3px solid #C9A84C" : "3px solid transparent" }}>
                  <span>{t.icon}</span>{t.label}
                </button>
              ))}
              <button onClick={logout}
                className="flex items-center gap-3 px-5 py-3.5 w-full text-left text-sm border-t border-champagne text-muted hover:text-red-500 transition-colors cursor-pointer font-sans bg-transparent border-l-0 border-r-0 border-b-0"
                style={{ borderLeft: "3px solid transparent" }}>
                🚪 Logout
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[{ label:"Total Orders", value:12, icon:"📦" },{ label:"Wishlist", value:wishlist.length, icon:"♥" },{ label:"Addresses", value:3, icon:"📍" },{ label:"Balance", value:"$150", icon:"💳" }].map(s => (
                    <div key={s.label} className="card p-5">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-xs tracking-widest uppercase text-muted">{s.label}</p>
                        <span className="text-xl">{s.icon}</span>
                      </div>
                      <p className="text-2xl font-semibold">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="card p-6">
                  <h3 className="text-xs tracking-widest uppercase font-medium mb-5">Recent Orders</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" aria-label="Recent orders">
                      <thead>
                        <tr className="border-b border-champagne">
                          {["Order","Date","Status","Total","Action"].map(h => (
                            <th key={h} className="text-left pb-3 text-xs tracking-widest uppercase text-muted font-medium pr-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ORDERS.map(o => (
                          <tr key={o.id} className="border-b border-champagne">
                            <td className="py-3.5 pr-4 font-medium">{o.id}</td>
                            <td className="py-3.5 pr-4 text-muted">{o.date}</td>
                            <td className="py-3.5 pr-4">
                              <span className={`badge ${STATUS_STYLE[o.status] || ""}`}>{o.status}</span>
                            </td>
                            <td className="py-3.5 pr-4">${o.total}</td>
                            <td className="py-3.5">
                              <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="card p-6">
                <h3 className="text-xs tracking-widest uppercase font-medium mb-5">All Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" aria-label="All orders">
                    <thead>
                      <tr className="border-b border-champagne">
                        {["Order","Date","Items","Status","Total","Action"].map(h => (
                          <th key={h} className="text-left pb-3 text-xs tracking-widest uppercase text-muted font-medium pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ORDERS.map(o => (
                        <tr key={o.id} className="border-b border-champagne">
                          <td className="py-3.5 pr-4 font-medium">{o.id}</td>
                          <td className="py-3.5 pr-4 text-muted">{o.date}</td>
                          <td className="py-3.5 pr-4">{o.items}</td>
                          <td className="py-3.5 pr-4"><span className={`badge ${STATUS_STYLE[o.status] || ""}`}>{o.status}</span></td>
                          <td className="py-3.5 pr-4 font-medium">${o.total}</td>
                          <td className="py-3.5"><button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h3 className="text-xs tracking-widest uppercase font-medium mb-5">My Wishlist ({wishlist.length})</h3>
                {wishlist.length === 0 ? (
                  <div className="card p-10 text-center">
                    <p className="font-serif text-2xl mb-3">Your wishlist is empty</p>
                    <Link to="/shop" className="btn-gold">Browse Products</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5">
                    {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h3 className="text-xs tracking-widest uppercase font-medium mb-5">Saved Addresses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[{ title:"Home", addr:"123 Main St, New York, NY 10001, USA" },{ title:"Office", addr:"456 Park Ave, New York, NY 10022, USA" }].map(a => (
                    <div key={a.title} className="card p-5">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs tracking-widest uppercase font-semibold">{a.title}</span>
                        <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">Edit</button>
                      </div>
                      <p className="text-sm text-muted">{a.addr}</p>
                    </div>
                  ))}
                  <button className="card p-5 flex items-center justify-center gap-2 text-sm text-muted hover:text-gold hover:border-gold transition-colors border border-dashed border-champagne bg-transparent cursor-pointer font-sans">
                    + Add New Address
                  </button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="card p-6 sm:p-8">
                <h3 className="text-xs tracking-widest uppercase font-medium mb-6">Account Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[["First Name","John"],["Last Name","Doe"],["Email","john@example.com"],["Phone","+1 234 567 8900"]].map(([l, v]) => (
                    <div key={l}>
                      <label className="label">{l}</label>
                      <input defaultValue={v} className="input" />
                    </div>
                  ))}
                  <div className="sm:col-span-2 h-px bg-champagne" />
                  <div className="sm:col-span-2">
                    <label className="label">Current Password</label>
                    <input type="password" placeholder="Leave blank to keep current" className="input" />
                  </div>
                  <div>
                    <label className="label">New Password</label>
                    <input type="password" placeholder="New password" className="input" />
                  </div>
                  <div>
                    <label className="label">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" className="input" />
                  </div>
                </div>
                <button className="btn-gold">Save Changes</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}