import { useState }       from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO               from "../components/common/SEO";
import { useAuth }       from "../context/AuthContext";

export default function LoginPage() {
  const { login, loginAsAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email);
    navigate("/account");
  };

  return (
    <>
      <SEO title="Sign In" description="Sign in to your LUXORA account." url="/login" />
      <div className="min-h-screen flex items-center justify-center bg-ivory px-4 py-20">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link to="/" className="font-serif text-2xl tracking-[0.3em] uppercase text-luxury hover:text-gold transition-colors">LUXORA</Link>
            <h1 className="font-serif text-3xl mt-4 mb-1">Welcome Back</h1>
            <p className="text-muted text-sm">Sign in to your account</p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="label">Email Address</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com" required className="input" autoComplete="email" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="label mb-0">Password</label>
                  <button type="button" className="text-xs text-gold hover:underline bg-transparent border-0 cursor-pointer font-sans">Forgot password?</button>
                </div>
                <input id="password" type="password" value={pass} onChange={e => setPass(e.target.value)}
                  placeholder="••••••••" required className="input" autoComplete="current-password" />
              </div>
              <button type="submit" disabled={loading}
                className="btn-gold w-full py-3.5 mt-2">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-5">
              <div className="h-px bg-champagne" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-muted">OR</span>
            </div>

            <button onClick={() => { loginAsAdmin(); navigate("/admin"); }}
              className="btn-outline w-full py-3 text-xs">
              Continue as Admin (Demo)
            </button>

            <p className="text-center text-sm text-muted mt-5">
              Don't have an account?{" "}
              <Link to="/signup" className="text-gold hover:underline">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}