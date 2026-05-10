import { Link } from "react-router-dom";
import SEO from "../common/SEO";
import Reveal from "../common/Reveal";

export default function EmptyCart() {
  return (
    <>
      <SEO title="Cart" description="Your shopping cart" url="/cart" />
      <Reveal>
        <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center gap-4">
          <svg
            className="w-16 h-16 text-champagne"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h1 className="font-serif text-3xl">Your cart is empty</h1>
          <p className="text-muted">Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn-gold mt-2">
            Continue Shopping
          </Link>
        </div>
      </Reveal>
    </>
  );
}