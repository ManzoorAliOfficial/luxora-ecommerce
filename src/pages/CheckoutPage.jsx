import { useState }  from "react";
import { Link }      from "react-router-dom";
import SEO           from "../components/common/SEO";
import { useStore }  from "../context/StoreContext";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "../data/constants";

const STEPS = ["Billing", "Payment", "Confirm"];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, addToast } = useStore();
  const [step,    setStep]    = useState(1);
  const [payment, setPayment] = useState("cod");
  const [form,    setForm]    = useState({ firstName:"", lastName:"", email:"", phone:"", address:"", city:"", country:"United States", zip:"" });

  const shipping = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total    = cartTotal + shipping;

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const placeOrder = () => {
    addToast("Order placed successfully! 🎉");
    clearCart();
    setStep(4);
  };

  if (cart.length === 0 && step !== 4) return (
    <>
      <SEO title="Checkout" url="/checkout" />
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <Link to="/shop" className="btn-gold">Shop Now</Link>
      </div>
    </>
  );

  if (step === 4) return (
    <>
      <SEO title="Order Confirmed" url="/checkout" />
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1 className="font-serif text-4xl">Order Placed!</h1>
        <p className="text-muted max-w-sm">Thank you for your purchase. Your order has been confirmed and will be delivered soon.</p>
        <div className="flex gap-3 mt-2">
          <Link to="/account" className="btn-gold">Track Order</Link>
          <Link to="/shop" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <SEO title="Checkout" description="Complete your purchase securely." url="/checkout" />

      <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl mb-6">Checkout</h1>
          {/* Step indicator */}
          <div className="flex items-center gap-0 max-w-xs">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "mr-0" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${step > i + 1 ? "bg-gold text-white" : step === i + 1 ? "bg-gold text-white" : "bg-champagne text-muted"}`}>
                    {step > i + 1
                      ? <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      : i + 1
                    }
                  </div>
                  <span className={`text-xs ${step === i + 1 ? "text-luxury font-medium" : "text-muted"}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`w-8 h-px mx-2 ${step > i + 1 ? "bg-gold" : "bg-champagne"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="card p-6 sm:p-8">
                <h2 className="text-sm tracking-widest uppercase font-medium mb-6">Billing Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[["firstName","First Name","John"],["lastName","Last Name","Doe"],["email","Email Address","john@example.com"],["phone","Phone Number","+1 234 567 8900"],["city","City","New York"],["zip","ZIP Code","10001"]].map(([key, label, ph]) => (
                    <div key={key}>
                      <label className="label">{label}</label>
                      <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        placeholder={ph} className="input" />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="label">Street Address</label>
                    <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      placeholder="123 Main Street, Apt 4B" className="input" />
                  </div>
                  <div>
                    <label className="label">Country</label>
                    <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} className="input">
                      {["United States","United Kingdom","Canada","Australia","Pakistan","India"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={nextStep} className="btn-gold mt-6">Continue to Payment →</button>
              </div>
            )}

            {step === 2 && (
              <div className="card p-6 sm:p-8">
                <h2 className="text-sm tracking-widest uppercase font-medium mb-6">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {[{ id:"cod", label:"Cash on Delivery", desc:"Pay when you receive your order" },{ id:"card", label:"Credit / Debit Card", desc:"Visa, Mastercard, Amex" },{ id:"stripe", label:"Stripe", desc:"Pay securely via Stripe" }].map(m => (
                    <label key={m.id}
                      className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-all ${payment === m.id ? "border-gold bg-gold/5" : "border-champagne hover:border-gold/50"}`}>
                      <input type="radio" name="payment" value={m.id} checked={payment === m.id}
                        onChange={() => setPayment(m.id)}
                        className="accent-gold w-4 h-4 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{m.label}</p>
                        <p className="text-xs text-muted">{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {payment === "card" && (
                  <div className="p-4 bg-ivory rounded-sm space-y-3 mb-6">
                    <div>
                      <label className="label">Card Number</label>
                      <input placeholder="1234 5678 9012 3456" className="input" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="label">Expiry</label><input placeholder="MM/YY" className="input" /></div>
                      <div><label className="label">CVV</label><input placeholder="123" className="input" /></div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-5 text-xs text-muted">
                  <svg className="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  SSL Encrypted · Secure Checkout · 100% Money Back Guarantee
                </div>
                <div className="flex gap-3">
                  <button onClick={prevStep} className="btn-outline">← Back</button>
                  <button onClick={placeOrder} className="btn-gold">Place Order →</button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="card p-6 h-fit lg:sticky lg:top-28">
            <h3 className="text-xs tracking-widest uppercase font-medium mb-5">Your Order</h3>
            <div className="space-y-3 mb-5">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-ivory rounded-sm overflow-hidden shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted">×{item.qty}</p>
                  </div>
                  <span className="text-xs font-medium shrink-0">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-champagne mb-4" />
            <div className="space-y-2 text-sm mb-5">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Shipping</span><span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
              <div className="h-px bg-champagne" />
              <div className="flex justify-between font-semibold text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}