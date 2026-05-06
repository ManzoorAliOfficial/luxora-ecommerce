import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        url="/404"
      />

      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-cream pt-20">
        {/* Big 404 */}
        <p
          className="font-serif font-light text-champagne select-none leading-none mb-4"
          style={{ fontSize: "clamp(100px, 20vw, 180px)" }}
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl text-luxury mb-3">Page Not Found</h1>
        <p className="text-muted text-sm max-w-sm mb-8 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link to="/" className="btn-gold">Go to Homepage</Link>
          <button onClick={() => navigate(-1)} className="btn-outline">Go Back</button>
        </div>

        {/* Quick links */}
        <div className="card p-6 max-w-sm w-full">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">Quick Links</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Shop",    to: "/shop"    },
              { label: "About",   to: "/about"   },
              { label: "Contact", to: "/contact" },
              { label: "FAQ",     to: "/faq"     },
            ].map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-luxury hover:text-gold transition-colors py-2 px-3 bg-ivory rounded-sm text-center hover:bg-champagne"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}