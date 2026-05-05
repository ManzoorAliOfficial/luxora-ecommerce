import { useLocation }    from "react-router-dom";
import Navbar             from "./Navbar";
import Footer             from "./Footer";
import ToastContainer     from "../common/ToastContainer";

export default function PageWrapper({ children }) {
  const { pathname } = useLocation();
  const hideLayout   = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {!hideLayout && <Navbar />}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      {!hideLayout && <Footer />}
      <ToastContainer />
    </div>
  );
}