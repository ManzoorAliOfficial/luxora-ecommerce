import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import Breadcrumb from "../components/common/Breadcrumb";
import Reveal from "../components/common/Reveal";
import { useStore } from "../context/StoreContext";
import {
  COUPON_CODES,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "../data/constants";

// 🔥 Stagger Animation
const container = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, addToast } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discounted = cartTotal * (1 - discount);
  const total = discounted + shipping;

  const applyCoupon = () => {
    const code = coupon.toUpperCase();
    if (COUPON_CODES[code]) {
      setDiscount(COUPON_CODES[code]);
      addToast(`Coupon applied! ${COUPON_CODES[code] * 100}% off`);
    } else addToast("Invalid coupon code", "error");
  };

  // ✅ EMPTY CART
  if (cart.length === 0)
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
            <p className="text-muted">
              Looks like you haven't added anything yet.
            </p>

            <Link to="/shop" className="btn-gold mt-2">
              Continue Shopping
            </Link>
          </div>
        </Reveal>
      </>
    );

  return (
    <>
      <SEO
        title="Cart"
        description="Review your shopping cart and proceed to checkout."
        url="/cart"
      />

      {/* HEADER */}
      <Reveal>
        <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
          <div className="max-w-screen-xl mx-auto">
            <Breadcrumb
              items={[{ label: "Home", to: "/" }, { label: "Cart" }]}
            />
            <h1 className="font-serif text-4xl sm:text-5xl">
              Shopping Cart
            </h1>
          </div>
        </div>
      </Reveal>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CART ITEMS */}
          <motion.div
            className="lg:col-span-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Header Row */}
            <div className="hidden sm:grid grid-cols-4 gap-4 pb-3 border-b border-champagne mb-2 text-xs tracking-widest uppercase text-muted">
              <span className="col-span-2">Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.color}-${item.size}`}
                variants={itemAnim}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center py-5 border-b border-champagne"
              >
                {/* Product */}
                <div className="sm:col-span-2 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-ivory rounded-sm overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-sm mb-1">{item.name}</p>

                    {item.color && (
                      <span
                        className="inline-block w-3.5 h-3.5 rounded-full mr-1"
                        style={{ background: item.color }}
                      />
                    )}

                    {item.size && (
                      <span className="text-xs text-muted">{item.size}</span>
                    )}

                    <p className="text-sm text-muted mt-1">
                      ${item.price}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-muted hover:text-red-500 mt-1 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Qty */}
                <div className="flex justify-start sm:justify-center">
                  <div className="flex items-center border border-champagne">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-2 py-2"
                    >
                      -
                    </button>
                    <span className="px-3">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-2 py-2"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="text-right font-semibold">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </motion.div>
            ))}

            <div className="mt-6">
              <Link to="/shop" className="btn-outline">
                ← Continue Shopping
              </Link>
            </div>
          </motion.div>

          {/* SUMMARY */}
          <Reveal delay={0.2}>
            <div className="space-y-4">

              {/* Coupon */}
              <div className="card p-6">
                <h3 className="mb-4">Coupon Code</h3>

                <div className="flex">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="input"
                  />
                  <button onClick={applyCoupon} className="btn-gold">
                    Apply
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="card p-6">
                <h3 className="mb-4">Order Summary</h3>

                <div className="space-y-2">
                  <p>Subtotal: ${cartTotal.toFixed(2)}</p>
                  <p>Shipping: {shipping === 0 ? "Free" : `$${shipping}`}</p>
                  <p>Total: ${total.toFixed(2)}</p>
                </div>

                <Link to="/checkout" className="btn-gold w-full mt-4 block text-center">
                  Checkout
                </Link>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </>
  );
}