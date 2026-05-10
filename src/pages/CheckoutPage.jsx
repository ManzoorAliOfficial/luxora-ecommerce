import { useState }       from "react";
import { Link }           from "react-router-dom";
import SEO                from "../components/common/SEO";
import StepIndicator      from "../components/checkout/StepIndicator";
import BillingForm        from "../components/checkout/BillingForm";
import PaymentOptions     from "../components/checkout/PaymentOptions";
import OrderSummary       from "../components/checkout/OrderSummary";
import OrderSuccess       from "../components/checkout/OrderSuccess";
import { useStore }       from "../context/StoreContext";

const INITIAL_FORM = {
  firstName: "", lastName: "",  email:   "",
  phone:     "", address:  "",  city:    "",
  country:   "United States",   zip:     "",
};

export default function CheckoutPage() {
  const { cart, clearCart, addToast } = useStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const placeOrder = () => {
    addToast("Order placed successfully! 🎉");
    clearCart();
    setStep(4);
  };

  // Empty cart guard
  if (cart.length === 0 && step !== 4) return (
    <>
      <SEO title="Checkout" url="/checkout" />
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <Link to="/shop" className="btn-gold">Shop Now</Link>
      </div>
    </>
  );

  // Success screen
  if (step === 4) return <OrderSuccess />;

  return (
    <>
      <SEO
        title="Checkout"
        description="Complete your purchase securely."
        url="/checkout"
      />

      {/* Header + step indicator */}
      <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl mb-6">Checkout</h1>
          <StepIndicator step={step} />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Step panels */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <BillingForm form={form} onChange={setForm} onNext={nextStep} />
            )}
            {step === 2 && (
              <PaymentOptions onBack={prevStep} onPlace={placeOrder} />
            )}
          </div>

          {/* Sticky order summary */}
          <OrderSummary />

        </div>
      </div>
    </>
  );
}