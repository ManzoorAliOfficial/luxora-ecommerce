import { useState }          from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO                   from "../components/common/SEO";
import { useAuth }           from "../context/AuthContext";

export default function SignupPage() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", confirm:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { alert("Passwords don't match"); return; }
    await login(form.email);
    navigate("/account");
  };

  return (
    <>
      <SEO title="Create Account" description="Join LUXORA for exclusive offers and a premium shopping experience." url="/signup" />
      <div className="min-h-screen flex items-center justify-center bg-ivory px-4 py-20">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link to="/" className="font-serif text-2xl tracking-[0.3em] uppercase text-luxury hover:text-gold transition-colors">LUXORA</Link>
            <h1 className="font-serif text-3xl mt-4 mb-1">Create Account</h1>
            <p className="text-muted text-sm">Join our luxury community</p>
          </div>
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="label">First Name</label>
                  <input id="firstName" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder="John" required className="input" />
                </div>
                <div>
                  <label htmlFor="lastName" className="label">Last Name</label>
                  <input id="lastName" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    placeholder="Doe" required className="input" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="label">Email Address</label>
                <input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="john@example.com" required className="input" />
              </div>
              <div>
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Create a strong password" required className="input" />
              </div>
              <div>
                <label htmlFor="confirm" className="label">Confirm Password</label>
                <input id="confirm" type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  placeholder="Confirm your password" required className="input" />
              </div>
              <p className="text-xs text-muted">By creating an account you agree to our <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.</p>
              <button type="submit" className="btn-gold w-full py-3.5">Create Account</button>
            </form>
            <p className="text-center text-sm text-muted mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-gold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}