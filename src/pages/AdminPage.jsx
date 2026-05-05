import { useState }  from "react";
import { Link }      from "react-router-dom";
import SEO           from "../components/common/SEO";
import Stars         from "../components/common/Stars";
import { PRODUCTS }  from "../data/products";
import { useStore }  from "../context/StoreContext";
import { useAuth }   from "../context/AuthContext";

const SALES_DATA = [
  { month:"Jan", sales:8200 },{ month:"Feb", sales:11500 },{ month:"Mar", sales:9800 },
  { month:"Apr", sales:14200 },{ month:"May", sales:12100 },{ month:"Jun", sales:16800 },
  { month:"Jul", sales:15200 },{ month:"Aug", sales:18500 },{ month:"Sep", sales:17100 },
  { month:"Oct", sales:21200 },{ month:"Nov", sales:23100 },{ month:"Dec", sales:25430 },
];

const ORDERS = [
  { id:"#12345", customer:"John Doe",    product:"Luxury Handbag",    status:"Delivered", amount:149 },
  { id:"#12344", customer:"Sarah Smith", product:"Minimal Watch",     status:"Shipped",   amount:129 },
  { id:"#12343", customer:"Mike Brown",  product:"White Sneakers",    status:"Pending",   amount:89  },
  { id:"#12342", customer:"Emily Green", product:"Aviator Sunglasses",status:"Delivered", amount:99  },
];

const STATUS_STYLE = {
  Delivered: "bg-green-100 text-green-700",
  Shipped:   "bg-blue-100 text-blue-700",
  Pending:   "bg-orange-100 text-orange-700",
};

const NAV = [
  { id:"overview",   label:"Dashboard",  icon:"🏠" },
  { id:"products",   label:"Products",   icon:"📦" },
  { id:"orders",     label:"Orders",     icon:"🛒" },
  { id:"customers",  label:"Customers",  icon:"👥" },
  { id:"analytics",  label:"Analytics",  icon:"📊" },
  { id:"settings",   label:"Settings",   icon:"⚙️" },
];

const CUSTOMERS = [
  { name:"John Doe",    email:"john@example.com",  orders:12, spent:1430, status:"VIP"    },
  { name:"Sarah Smith", email:"sarah@email.com",   orders:8,  spent:890,  status:"Active" },
  { name:"Mike Brown",  email:"mike@mail.com",     orders:3,  spent:340,  status:"Active" },
  { name:"Emily Green", email:"emily@example.com", orders:15, spent:2100, status:"VIP"    },
];

export default function AdminPage() {
  const { addToast }         = useStore();
  const { logout }           = useAuth();
  const [section, setSection] = useState("overview");
  const [showAdd, setShowAdd] = useState(false);
  const maxSales = Math.max(...SALES_DATA.map(d => d.sales));

  return (
    <>
      <SEO title="Admin Dashboard" url="/admin" />

      <div className="flex h-screen bg-ivory overflow-hidden">

        {/* Sidebar */}
        <aside className="w-52 bg-luxury text-white flex flex-col shrink-0">
          <div className="p-5 border-b border-white/10">
            <Link to="/" className="font-serif text-xl tracking-[0.25em] uppercase text-white">LUXORA</Link>
            <p className="text-xs text-white/40 mt-1">Admin Panel</p>
          </div>
          <nav className="flex-1 py-2">
            {NAV.map(n => (
              <button key={n.id} onClick={() => setSection(n.id)}
                className={`flex items-center gap-3 w-full px-5 py-3 text-sm text-left cursor-pointer font-sans border-0 transition-all ${section === n.id ? "bg-gold text-white" : "bg-transparent text-white/65 hover:text-white hover:bg-white/5"}`}>
                <span>{n.icon}</span>{n.label}
              </button>
            ))}
          </nav>
          <button onClick={() => { logout(); }}
            className="flex items-center gap-3 px-5 py-4 text-sm text-white/40 hover:text-white border-t border-white/10 cursor-pointer font-sans bg-transparent border-l-0 border-r-0 border-b-0 w-full text-left transition-colors">
            🚪 Logout
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">

          {section === "overview" && (
            <>
              <h2 className="text-xl font-medium mb-6">Dashboard Overview</h2>

              {/* Stats */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {[{ label:"Total Sales", value:"$25,430", change:"+8.2%", icon:"💰" },{ label:"Total Orders", value:"320", change:"+5.1%", icon:"📦" },{ label:"Customers", value:"1,245", change:"+12.5%", icon:"👥" },{ label:"Products", value:"84", change:"+4.7%", icon:"🏷️" }].map(s => (
                  <div key={s.label} className="card p-5">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-xs tracking-widest uppercase text-muted">{s.label}</p>
                      <span className="text-xl">{s.icon}</span>
                    </div>
                    <p className="text-2xl font-bold mb-1">{s.value}</p>
                    <span className="text-xs text-green-600 font-medium">{s.change} this month</span>
                  </div>
                ))}
              </div>

              {/* Sales chart */}
              <div className="card p-6 mb-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm tracking-widest uppercase font-medium">Sales Overview</h3>
                  <select className="input w-auto text-xs"><option>This Year</option><option>Last Year</option></select>
                </div>
                <div className="flex items-end gap-2 h-44">
                  {SALES_DATA.map(d => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-gold/20 rounded-t-sm relative" style={{ height: `${(d.sales / maxSales) * 160}px` }}>
                        <div className="absolute inset-0 bg-gold rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-xs text-muted hidden sm:block">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent orders */}
              <div className="card p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm tracking-widest uppercase font-medium">Recent Orders</h3>
                  <button onClick={() => setSection("orders")} className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" aria-label="Recent orders">
                    <thead>
                      <tr className="border-b border-champagne">
                        {["ID","Customer","Product","Status","Amount"].map(h => (
                          <th key={h} className="text-left pb-3 text-xs tracking-widest uppercase text-muted font-medium pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ORDERS.map(o => (
                        <tr key={o.id} className="border-b border-champagne">
                          <td className="py-3 pr-4 font-medium">{o.id}</td>
                          <td className="py-3 pr-4">{o.customer}</td>
                          <td className="py-3 pr-4 text-muted">{o.product}</td>
                          <td className="py-3 pr-4"><span className={`badge ${STATUS_STYLE[o.status] || ""}`}>{o.status}</span></td>
                          <td className="py-3 font-semibold">${o.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {section === "products" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Products</h2>
                <button onClick={() => setShowAdd(true)} className="btn-gold py-2.5 px-5">+ Add Product</button>
              </div>
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" aria-label="Products">
                    <thead className="bg-ivory">
                      <tr className="border-b border-champagne">
                        {["Product","Category","Price","Stock","Rating","Actions"].map(h => (
                          <th key={h} className="text-left py-3 px-4 text-xs tracking-widest uppercase text-muted font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCTS.map(p => (
                        <tr key={p.id} className="border-b border-champagne hover:bg-ivory/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-sm overflow-hidden bg-ivory shrink-0">
                                <img src={p.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className="font-medium text-xs">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted text-xs">{p.category}</td>
                          <td className="py-3 px-4 font-medium">${p.price}</td>
                          <td className="py-3 px-4"><span className="badge bg-green-100 text-green-700">In Stock</span></td>
                          <td className="py-3 px-4"><Stars rating={p.rating} size={11} /></td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">Edit</button>
                              <button onClick={() => addToast("Product deleted")} className="text-xs text-red-500 hover:underline bg-transparent border-0 cursor-pointer font-sans">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {section === "orders" && (
            <>
              <h2 className="text-xl font-medium mb-6">Orders</h2>
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-ivory">
                      <tr className="border-b border-champagne">
                        {["Order","Customer","Product","Status","Amount","Action"].map(h => (
                          <th key={h} className="text-left py-3 px-4 text-xs tracking-widest uppercase text-muted font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ORDERS.map(o => (
                        <tr key={o.id} className="border-b border-champagne hover:bg-ivory/50">
                          <td className="py-3 px-4 font-medium">{o.id}</td>
                          <td className="py-3 px-4">{o.customer}</td>
                          <td className="py-3 px-4 text-muted text-xs">{o.product}</td>
                          <td className="py-3 px-4"><span className={`badge ${STATUS_STYLE[o.status] || ""}`}>{o.status}</span></td>
                          <td className="py-3 px-4 font-semibold">${o.amount}</td>
                          <td className="py-3 px-4"><button className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {section === "customers" && (
            <>
              <h2 className="text-xl font-medium mb-6">Customers</h2>
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-ivory">
                      <tr className="border-b border-champagne">
                        {["Name","Email","Orders","Spent","Status"].map(h => (
                          <th key={h} className="text-left py-3 px-4 text-xs tracking-widest uppercase text-muted font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CUSTOMERS.map(c => (
                        <tr key={c.email} className="border-b border-champagne hover:bg-ivory/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center text-xs font-semibold shrink-0">{c.name[0]}</div>
                              <span className="font-medium text-sm">{c.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted text-xs">{c.email}</td>
                          <td className="py-3 px-4">{c.orders}</td>
                          <td className="py-3 px-4 font-medium">${c.spent}</td>
                          <td className="py-3 px-4">
                            <span className={`badge ${c.status === "VIP" ? "bg-gold/20 text-gold" : "bg-green-100 text-green-700"}`}>{c.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {(section === "analytics" || section === "settings") && (
            <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
              <span className="text-5xl">{NAV.find(n => n.id === section)?.icon}</span>
              <h2 className="font-serif text-3xl">{NAV.find(n => n.id === section)?.label}</h2>
              <p className="text-muted">This section is ready for development.</p>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
             onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-sm shadow-card max-w-md w-full p-6 animate-fade-in"
               onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm tracking-widest uppercase font-medium">Add New Product</h3>
              <button onClick={() => setShowAdd(false)} className="btn-ghost">✕</button>
            </div>
            <div className="space-y-3">
              <div><label className="label">Product Name</label><input placeholder="e.g. Luxury Handbag" className="input" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Price ($)</label><input type="number" placeholder="149" className="input" /></div>
                <div><label className="label">Old Price ($)</label><input type="number" placeholder="189" className="input" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Category</label>
                  <select className="input">
                    {["Women","Men","Shoes","Bags","Accessories"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Badge</label>
                  <select className="input"><option>None</option><option>New</option><option>Sale</option><option>-20%</option></select>
                </div>
              </div>
              <div><label className="label">Image URL</label><input placeholder="https://..." className="input" /></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-gold" onClick={() => { addToast("Product added!"); setShowAdd(false); }}>Add Product</button>
              <button className="btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}