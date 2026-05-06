import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Divider from "../common/Divider";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate signup & login
    login({ email: formData.email, name: formData.name });
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        icon={User}
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="John Doe"
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        icon={Mail}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        icon={Lock}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Create a password"
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        icon={Lock}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
      />

      <button type="submit" className="btn-primary w-full">
        Create Account
      </button>

      <Divider text="or" />

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-gold hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
}
