import { Link } from "react-router-dom";
import {
  CreditCard,
  Wallet,
  BadgeDollarSign,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import PaymentMethods from "./PaymentMethods";

const LINKS = {
  "Quick Links": [
    { l: "Home", to: "/" },
    { l: "Shop", to: "/shop" },
    { l: "About", to: "/about" },
    { l: "Blog", to: "/blog" },
  ],

  "Customer Service": [
    { l: "Shipping Policy", to: "/shipping" },
    { l: "Returns & Exchanges", to: "/returns" },
    { l: "FAQ", to: "/faq" },
    { l: "Track Order", to: "/track" },
  ],

  "My Account": [
    { l: "My Orders", to: "/account/orders" },
    { l: "Wishlist", to: "/wishlist" },
    { l: "Account Details", to: "/account/profile" },
    { l: "Addresses", to: "/account/addresses" },
  ],
};

const SOCIAL_LINKS = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/luxora" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/luxora" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/luxora" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/luxora" },
];

const PAYMENT_METHODS = [
  { name: "VISA", icon: CreditCard },
  { name: "Mastercard", icon: Wallet },
  { name: "PayPal", icon: BadgeDollarSign },
  { name: "Apple Pay", icon: Smartphone },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);



  return (
    <footer className="bg-luxury text-white/70" role="contentinfo">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        
        
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Brand & Contact */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="font-serif text-3xl tracking-[0.3em] uppercase text-white block mb-4"
              >
                LUXORA
              </Link>

              <p className="text-sm leading-relaxed mb-6 max-w-sm">
                Premium luxury fashion for the discerning individual. 
                Experience unparalleled quality, comfort, and elegance 
                in every piece.
              </p>

              {/* Contact Information */}
              <div className="space-y-3 mb-6 text-sm">
                <a 
                  href="tel:+1-800-LUXORA" 
                  className="flex items-center gap-3 hover:text-gold transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                    <Phone size={14} className="group-hover:text-gold transition-colors" />
                  </div>
                  <span>+1 (800) LUXORA</span>
                </a>

                <a 
                  href="mailto:support@luxora.com" 
                  className="flex items-center gap-3 hover:text-gold transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                    <Mail size={14} className="group-hover:text-gold transition-colors" />
                  </div>
                  <span>support@luxora.com</span>
                </a>

                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin size={14} />
                  </div>
                  <span>New York, NY 10001</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-white text-xs font-medium tracking-widest uppercase mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-2">
                  {SOCIAL_LINKS.map(({ name, icon: Icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${name}`}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Navigation Links */}
            {Object.entries(LINKS).map(([title, items]) => (
              <nav key={title} aria-label={title}>
                <h3 className="text-white text-xs font-medium tracking-widest uppercase mb-5">
                  {title}
                </h3>

                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.l}>
                      <Link
                        to={item.to}
                        className="text-sm hover:text-gold transition-colors inline-block"
                      >
                        {item.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            
            {/* Copyright */}
            <p className="text-xs order-2 lg:order-1">
              © {new Date().getFullYear()} LUXORA. All Rights Reserved.
            </p>
                <PaymentMethods/>
    
            {/* Legal Links */}
            <div className="order-3 flex gap-6 text-xs">
              <Link
                to="/privacy"
                className="hover:text-gold transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="hover:text-gold transition-colors"
              >
                Terms of Service
              </Link>

              <Link
                to="/accessibility"
                className="hover:text-gold transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}