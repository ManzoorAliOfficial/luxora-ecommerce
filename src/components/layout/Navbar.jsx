import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { useAuth }  from "../../context/AuthContext";
import { PRODUCTS } from "../../data/products";

const NAV_LINKS = [
  { label: "Home",    to: "/"        },
  { label: "Shop",    to: "/shop"    },
  { label: "About",   to: "/about"   },
  { label: "Contact", to: "/contact" },
  { label: "FAQ",     to: "/faq"     },
];

export default function Navbar() {
  const { cartCount, wishlist } = useStore();
  const { user }                = useAuth();
  const { pathname }            = useLocation();
  const navigate                = useNavigate();

  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  useEffect(() => {
    if (searchQuery.length < 2) { setSuggestions([]); return; }
    setSuggestions(PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5));
  }, [searchQuery]);

  useEffect(() => {
    const fn = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <a href="#main-content"
         className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-gold text-white px-4 py-2 z-50 rounded-sm text-sm">
        Skip to main content
      </a>
      

      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white shadow-soft" : "bg-white/95 backdrop-blur-sm"}`}
              role="banner">
<div className={`navbar ${scrolled ? "scrolled" : ""}`}>
  {/* Announcement bar */}
  <div className="bg-black text-white text-center backdrop-blur-sm py-2 px-5 text-[11px] tracking-[2px] uppercase">
    Free Shipping on orders over $100 <span className="mx-2">·</span> Use code{" "}
    <strong className="text-yellow-400 font-medium">LUXORA20</strong> for 20% off
  </div>
</div>

        {/* Main nav */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/"
            className="font-serif text-2xl tracking-[0.3em] uppercase text-luxury hover:text-gold transition-colors shrink-0"
            aria-label="LUXORA — Home">
            LUXORA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to}
                className={`nav-link ${pathname === l.to ? "active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">

            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button className="btn-ghost" onClick={() => setSearchOpen(v => !v)}
                      aria-label="Search" aria-expanded={searchOpen}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-sm shadow-card border border-champagne z-50 animate-fade-in">
                  <form onSubmit={handleSearch} className="flex items-center gap-2 p-3 border-b border-champagne">
                    <svg className="w-4 h-4 text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="flex-1 text-sm outline-none bg-transparent text-luxury placeholder:text-muted"
                      aria-label="Search products" />
                  </form>
                  {suggestions.length > 0 && (
                    <ul role="listbox" aria-label="Search suggestions">
                      {suggestions.map(p => (
                        <li key={p.id}>
                          <Link to={`/product/${p.id}`}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-ivory transition-colors"
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                            <img src={p.image} alt="" className="w-9 h-9 object-cover rounded-sm bg-ivory" />
                            <div>
                              <p className="text-sm font-medium text-luxury">{p.name}</p>
                              <p className="text-xs text-muted">${p.price}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Account */}
            <Link to={user ? "/account" : "/login"} className="btn-ghost hidden sm:flex" aria-label="My account">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="btn-ghost hidden sm:flex relative"
                  aria-label={`Wishlist (${wishlist.length} items)`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-xs rounded-full flex items-center justify-center font-medium" aria-hidden="true">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="btn-ghost relative" aria-label={`Cart (${cartCount} items)`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-xs rounded-full flex items-center justify-center font-medium" aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button className="btn-ghost lg:hidden ml-1"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen} aria-controls="mobile-menu">
              {menuOpen
                ? <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav id="mobile-menu"
               className="lg:hidden bg-white border-t border-champagne px-4 pb-4 animate-slide-up"
               aria-label="Mobile navigation">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to}
                className={`block py-3 border-b border-champagne text-sm uppercase tracking-widest font-medium ${pathname === l.to ? "text-gold" : "text-luxury"}`}>
                {l.label}
              </Link>
            ))}
            <div className="flex gap-6 mt-4">
              <Link to={user ? "/account" : "/login"} className="flex items-center gap-2 text-sm text-luxury hover:text-gold">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Account
              </Link>
              <Link to="/wishlist" className="flex items-center gap-2 text-sm text-luxury hover:text-gold">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Wishlist ({wishlist.length})
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}