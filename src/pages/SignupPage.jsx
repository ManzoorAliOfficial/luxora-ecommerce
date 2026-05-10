// src/pages/SignupPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { alert("Passwords don't match"); return; }
    await login(form.email);
    navigate("/account");
  };

  const field = (key) => ({
    value: form[key],
    onChange: e => setForm(f => ({ ...f, [key]: e.target.value })),
  });

  const inputClass = "w-full bg-transparent border-0 border-b border-stone-200 pb-2 pt-1 text-[13px] text-luxury font-light placeholder:text-stone-300 focus:outline-none focus:border-[#c4a064] transition-colors";
  const labelClass = "block text-[9px] tracking-[0.2em] uppercase text-[#c4a064]/70 mb-1.5 font-medium";

  return (
    <>
      <SEO title="Create Account" description="Join LUXORA for exclusive offers and a premium shopping experience." url="/signup" />
      <div className="min-h-screen flex items-center justify-center bg-ivory px-4 py-12">
        <div className="w-full max-w-3xl flex shadow-sm border border-champagne/60">

          {/* Left panel */}
          <div className="hidden md:flex flex-col items-center justify-center flex-1 bg-[#f9f6f0] border-r border-champagne/40 px-10 py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(196,160,100,0.06)_0%,transparent_65%)] pointer-events-none" />
            <div className="w-16 h-16 border border-[#c4a064]/30 rotate-45 flex items-center justify-center mb-8 relative">
              <div className="absolute inset-[6px] border border-[#c4a064]/12" />
              <span className="text-[#c4a064] text-xl -rotate-45">◆</span>
            </div>
            <p className="font-serif text-[13px] tracking-[0.5em] text-[#c4a064] uppercase mb-4">Luxora</p>
            <div className="w-10 h-px bg-[#c4a064]/25 mb-5" />
            <p className="text-[11px] tracking-[0.12em] text-stone-400 uppercase text-center leading-loose">
              Join a world of<br />refined elegance
            </p>
          </div>

          {/* Right panel — form */}
          <div className="flex-1 md:w-80 md:flex-none bg-white px-9 py-10 flex flex-col justify-center">
            <h1 className="font-serif text-[26px] text-luxury font-light mb-1 tracking-wide">Create account</h1>
            <p className="text-[11px] tracking-[0.1em] text-[#c4a064]/60 uppercase mb-7">Join our community</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First name</label>
                  <input type="text" placeholder="John" required className={inputClass} {...field("firstName")} />
                </div>
                <div>
                  <label className={labelClass}>Last name</label>
                  <input type="text" placeholder="Doe" required className={inputClass} {...field("lastName")} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email address</label>
                <input type="email" placeholder="john@example.com" required className={inputClass} {...field("email")} />
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <input type="password" placeholder="Create a strong password" required className={inputClass} {...field("password")} />
              </div>
              <div>
                <label className={labelClass}>Confirm password</label>
                <input type="password" placeholder="Confirm your password" required className={inputClass} {...field("confirm")} />
              </div>

              <p className="text-[9.5px] text-stone-300 tracking-wide leading-relaxed">
                By creating an account you agree to our{" "}
                <Link to="/privacy" className="text-[#c4a064]/60 hover:text-[#c4a064] transition-colors">Privacy Policy</Link>.
              </p>

              <button
                type="submit"
                className="w-full bg-[#c4a064] hover:bg-[#b8954f] text-white text-[10px] tracking-[0.25em] uppercase font-medium py-3.5 transition-colors"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-[11px] text-stone-400 mt-5">
              Already a member?{" "}
              <Link to="/login" className="text-[#c4a064]/80 hover:text-[#c4a064] transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}