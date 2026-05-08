import { useState, useEffect }          from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion }                        from "framer-motion";
import { Menu, X, Heart, ShoppingBag, User } from "lucide-react";

import { useStore }      from "../../context/StoreContext";
import { useAuth }       from "../../context/AuthContext";
import AnnouncementBar   from "./AnnouncementBar";
import SearchModal       from "./SearchModal";
import MobileMenu        from "./MobileMenu";  

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

  /* Scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close everything on route change */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Skip to content (accessibility) ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
          bg-gold text-white px-4 py-2 z-50 rounded-sm text-sm"
      >
        Skip to main content
      </a>

      {/* ── Search modal ── */}
      <SearchModal
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        navigate={navigate}
      />

      {/* ── Header ── */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-soft"
            : "bg-white/95 backdrop-blur-md"
        }`}
        role="banner"
      >
        {/* Announcement bar */}
        <AnnouncementBar />

        {/* Main nav row */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl tracking-[0.3em] uppercase text-luxury hover:text-gold transition-colors shrink-0"
            aria-label="LUXORA — Home"
          >
            LUXORA
          </Link>

          {/* Desktop nav links */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm uppercase tracking-widest transition-colors hover:text-gold ${
                  pathname === l.to ? "text-gold" : "text-luxury"
                }`}
              >
                {l.label}
                {/* Animated underline on active link */}
                {pathname === l.to && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 -bottom-1 w-full h-[1px] bg-gold"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right-side icon row */}
          <div className="flex items-center gap-1 relative">

            {/* Search */}
            <button
              className="btn-ghost"
              onClick={() => setSearchOpen(v => !v)}
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-controls="search-modal"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Account — hidden on mobile */}
            <Link
              to={user ? "/account" : "/login"}
              className="btn-ghost hidden sm:flex"
              aria-label="My account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist — hidden on mobile */}
            <Link
              to="/wishlist"
              className="btn-ghost hidden sm:flex relative"
              aria-label={`Wishlist (${wishlist.length} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white
                    text-xs rounded-full flex items-center justify-center font-medium"
                  aria-hidden="true"
                >
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn-ghost relative"
              aria-label={`Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white
                    text-xs rounded-full flex items-center justify-center font-medium"
                  aria-hidden="true"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="btn-ghost lg:hidden ml-1"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen
                ? <X    className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile menu (extracted component) ── */}
        <MobileMenu isOpen={menuOpen} />
      </motion.header>
    </>
  );
}