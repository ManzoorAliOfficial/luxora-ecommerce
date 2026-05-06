import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const HomePage      = lazy(() => import("./pages/HomePage"));
const ShopPage      = lazy(() => import("./pages/ShopPage"));
const ProductPage   = lazy(() => import("./pages/ProductPage"));
const CartPage      = lazy(() => import("./pages/CartPage"));
const CheckoutPage  = lazy(() => import("./pages/CheckoutPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AdminPage     = lazy(() => import("./pages/AdminPage"));
const LoginPage     = lazy(() => import("./pages/LoginPage"));
const SignupPage     = lazy(() => import("./pages/SignupPage"));
const AboutPage     = lazy(() => import("./pages/AboutPage"));
const ContactPage   = lazy(() => import("./pages/ContactPage"));
const FAQPage       = lazy(() => import("./pages/FAQPage"));
const PrivacyPage   = lazy(() => import("./pages/PrivacyPage"));
const WishlistPage  = lazy(() => import("./pages/WishlistPage"));
const NotFoundPage  = lazy(() => import("./pages/NotFoundPage"));

// ─── Page transition variants ─────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

// ─── Suspense fallback — lightweight shimmer bars ─────────────────────────────
function PageLoader() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      padding: "4rem 2rem",
    }}>
      {[260, 180, 220].map((w, i) => (
        <div key={i} className="skeleton" style={{ width: w, height: 12, borderRadius: 6 }} />
      ))}
    </div>
  );
}

// ─── AppRoutes ────────────────────────────────────────────────────────────────
export default function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/"            element={<HomePage />} />
            <Route path="/shop"        element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart"        element={<CartPage />} />
            <Route path="/checkout"    element={<CheckoutPage />} />
            <Route path="/account"     element={<DashboardPage />} />
            <Route path="/admin"       element={<AdminPage />} />
            <Route path="/login"       element={<LoginPage />} />
            <Route path="/signup"      element={<SignupPage />} />
            <Route path="/about"       element={<AboutPage />} />
            <Route path="/contact"     element={<ContactPage />} />
            <Route path="/faq"         element={<FAQPage />} />
            <Route path="/privacy"     element={<PrivacyPage />} />
            <Route path="/wishlist"    element={<WishlistPage />} />
            <Route path="*"            element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}