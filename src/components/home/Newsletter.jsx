import { useState } from "react";
import { useStore } from "../../context/StoreContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { addToast } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Better email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      addToast("Please enter a valid email", "error");
      return;
    }

    addToast("Thanks for subscribing! 🎉", "success");
    setEmail("");
  };

  return (
    <section
      className="bg-luxury py-20 px-4 sm:px-6"
      aria-label="Newsletter signup"
    >
      <div className="max-w-xl mx-auto text-center">
        <p className="text-gold text-xs tracking-widest uppercase mb-3">
          Stay in the Loop
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          Get the latest news on new arrivals and exclusive offers delivered to
          your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-4 py-3 text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-gold transition-colors rounded-sm sm:rounded-r-none"
          />

          <button
            type="submit"
            className="btn-gold rounded-sm sm:rounded-l-none whitespace-nowrap mt-2 sm:mt-0"
          >
            Subscribe
          </button>
        </form>

        <p className="text-white/30 text-xs mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}