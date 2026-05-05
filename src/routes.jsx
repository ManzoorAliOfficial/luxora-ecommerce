import { Routes, Route } from "react-router-dom";
import HomePage      from "./pages/HomePage";
import ShopPage      from "./pages/ShopPage";
import ProductPage   from "./pages/ProductPage";
import CartPage      from "./pages/CartPage";
import CheckoutPage  from "./pages/CheckoutPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage     from "./pages/AdminPage";
import LoginPage     from "./pages/LoginPage";
import SignupPage    from "./pages/SignupPage";
import AboutPage     from "./pages/AboutPage";
import ContactPage   from "./pages/ContactPage";
import FAQPage       from "./pages/FAQPage";
// import PrivacyPage   from "./pages/PrivacyPage";
// import WishlistPage  from "./pages/WishlistPage";
// import NotFoundPage  from "./pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
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
      {/* <Route path="/privacy"     element={<PrivacyPage />} /> */}
      {/* <Route path="/wishlist"    element={<WishlistPage />} /> */}
      {/* <Route path="*"            element={<NotFoundPage />} /> */}
    </Routes>
  );
}