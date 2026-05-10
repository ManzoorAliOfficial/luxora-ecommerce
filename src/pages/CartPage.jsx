import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO        from "../components/common/SEO";
import Breadcrumb  from "../components/common/Breadcrumb";
import Reveal      from "../components/common/Reveal";
import CartItem    from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart   from "../components/cart/EmptyCart";
import { useStore } from "../context/StoreContext";

const container = {
  show: { transition: { staggerChildren: 0.15 } },
};

export default function CartPage() {
  const { cart } = useStore();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <>
      <SEO
        title="Cart"
        description="Review your shopping cart and proceed to checkout."
        url="/cart"
      />

      {/* Header */}
      <Reveal>
        <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
          <div className="max-w-screen-xl mx-auto">
            <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
            <h1 className="font-serif text-4xl sm:text-5xl">Shopping Cart</h1>
          </div>
        </div>
      </Reveal>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart items */}
          <motion.div
            className="lg:col-span-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-4 gap-4 pb-3 border-b border-champagne mb-2 text-xs tracking-widest uppercase text-muted">
              <span className="col-span-2">Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            {cart.map(item => (
              <CartItem key={`${item.id}-${item.color}-${item.size}`} item={item} />
            ))}

            <div className="mt-6">
              <Link to="/shop" className="btn-outline">← Continue Shopping</Link>
            </div>
          </motion.div>

          {/* Summary */}
          <CartSummary />

        </div>
      </div>
    </>
  );
}