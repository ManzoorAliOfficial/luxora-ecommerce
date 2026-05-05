import { Link } from "react-router-dom";

const LINKS = {
  "Quick Links":      [{ l:"Home", to:"/" },{ l:"Shop", to:"/shop" },{ l:"About", to:"/about" },{ l:"Blog", to:"/" }],
  "Customer Service": [{ l:"Shipping Policy", to:"/faq" },{ l:"Returns", to:"/faq" },{ l:"FAQ", to:"/faq" },{ l:"Track Order", to:"/account" }],
  "My Account":       [{ l:"My Orders", to:"/account" },{ l:"Wishlist", to:"/wishlist" },{ l:"Account Details", to:"/account" },{ l:"Addresses", to:"/account" }],
};

export default function Footer() {
  return (
    <footer className="bg-luxury text-white/70" role="contentinfo">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="font-serif text-2xl tracking-[0.3em] uppercase text-white block mb-4">LUXORA</Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">Premium luxury fashion for everyone. Quality, comfort & elegance every time.</p>
            <div className="flex gap-3">
              {["Instagram","Facebook","Twitter"].map(s => (
                <a key={s} href="#" aria-label={s}
                   className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all text-xs">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(LINKS).map(([title, items]) => (
            <nav key={title} aria-label={title}>
              <h3 className="text-white text-xs font-medium tracking-widest uppercase mb-5">{title}</h3>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.l}>
                    <Link to={item.to} className="text-sm hover:text-gold transition-colors">{item.l}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 LUXORA. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/faq"     className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2">
            {["VISA","MC","PayPal","Apple Pay"].map(p => (
              <span key={p} className="text-xs px-2 py-1 border border-white/20 rounded-sm text-white/50">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}