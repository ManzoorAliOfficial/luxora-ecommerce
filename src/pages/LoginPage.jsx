// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, loginAsAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email);
    navigate("/account");
  };

  return (
    <>
      <SEO title="Sign In" description="Sign in to your LUXORA account." url="/login" />
      <div className="min-h-screen flex items-center justify-center bg-ivory px-4 py-20">
        <div className="w-full max-w-3xl flex shadow-sm border border-champagne/60">

          {/* Left panel — brand visual */}
          <div className="hidden md:flex flex-col items-center justify-center flex-1 bg-[#f9f6f0] border-r border-champagne/40 px-10 py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(196,160,100,0.06)_0%,transparent_65%)] pointer-events-none" />
            <div className="w-16 h-16 border border-[#c4a064]/30 rotate-45 flex items-center justify-center mb-8 relative">
              <div className="absolute inset-[6px] border border-[#c4a064]/12" />
              <span className="text-[#c4a064] text-xl -rotate-45">◆</span>
            </div>
            <p className="font-serif text-[13px] tracking-[0.5em] text-[#c4a064] uppercase mb-4">Luxora</p>
            <div className="w-10 h-px bg-[#c4a064]/25 mb-5" />
            <p className="text-[11px] tracking-[0.12em] text-stone-400 uppercase text-center leading-loose">
              Curated luxury<br />for the discerning few
            </p>
          </div>

          {/* Right panel — form */}
          <div className="flex-1 md:w-80 md:flex-none bg-white px-9 py-12 flex flex-col justify-center">
            <h1 className="font-serif text-[26px] text-luxury font-light mb-1 tracking-wide">Welcome back</h1>
            <p className="text-[11px] tracking-[0.1em] text-[#c4a064]/60 uppercase mb-8">Sign in to continue</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#c4a064]/70 mb-1.5 font-medium">
                  Email address
                </label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com" required autoComplete="email"
                  className="w-full bg-transparent border-0 border-b border-stone-200 pb-2 pt-1 text-[13px] text-luxury font-light placeholder:text-stone-300 focus:outline-none focus:border-[#c4a064] transition-colors"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[9px] tracking-[0.2em] uppercase text-[#c4a064]/70 font-medium">Password</label>
                  <button type="button" className="text-[10px] tracking-[0.1em] text-[#c4a064]/50 uppercase bg-transparent border-0 cursor-pointer hover:text-[#c4a064] transition-colors">
                    Forgot?
                  </button>
                </div>
                <input
                  type="password" value={pass} onChange={e => setPass(e.target.value)}
                  placeholder="••••••••" required autoComplete="current-password"
                  className="w-full bg-transparent border-0 border-b border-stone-200 pb-2 pt-1 text-[13px] text-luxury font-light placeholder:text-stone-300 focus:outline-none focus:border-[#c4a064] transition-colors"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-[#c4a064] hover:bg-[#b8954f] text-white text-[10px] tracking-[0.25em] uppercase font-medium py-3.5 mt-2 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                {loading && <Spinner size="sm" className="border-white" />}
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-stone-100" />
              <span className="text-[9px] tracking-[0.15em] text-stone-300 uppercase">or</span>
              <div className="flex-1 h-px bg-stone-100" />
            </div>

            <button
              onClick={() => { loginAsAdmin(); navigate("/admin"); }}
              className="w-full border border-stone-200 hover:border-[#c4a064]/40 text-stone-400 hover:text-[#c4a064] text-[10px] tracking-[0.2em] uppercase py-3 bg-transparent transition-colors"
            >
              Continue as Admin (Demo)
            </button>

            <p className="text-center text-[11px] text-stone-400 mt-6">
              No account?{" "}
              <Link to="/signup" className="text-[#c4a064]/80 hover:text-[#c4a064] transition-colors">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}