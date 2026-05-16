import { useState } from "react";
import { Link }      from "react-router-dom";
import { Lock, Truck, RotateCcw } from 'lucide-react';

const LINKS = {
  Shop: [
    { label: "New Arrivals",  to: "/shop?sort=newest"          },
    { label: "Best Sellers",  to: "/shop?sort=popularity"      },
    { label: "Sale",          to: "/shop?category=Sale"        },
    { label: "Handbags",      to: "/shop?category=Handbags"    },
    { label: "Watches",       to: "/shop?category=Watches"     },
    { label: "Accessories",   to: "/shop?category=Accessories" },
  ],
  Help: [
    { label: "FAQs",              to: "/faqs"           },
    { label: "Shipping & Returns",to: "/shipping"       },
    { label: "Track Your Order",  to: "/account"        },
    { label: "Size Guide",        to: "/size-guide"     },
    { label: "Contact Us",        to: "/contact"        },
  ],
  Company: [
    { label: "About LUXORA", to: "/about"   },
    { label: "Careers",      to: "/careers" },
    { label: "Press",        to: "/press"   },
    { label: "Sustainability",to: "/sustainability" },
    { label: "Privacy Policy",to: "/privacy" },
    { label: "Terms of Use", to: "/terms"   },
  ],
};

const SOCIALS = [
  {
    label: "Instagram",
    href:  "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href:  "https://pinterest.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.498 1.806 1.476 1.806 1.772 0 3.135-1.867 3.135-4.56 0-2.385-1.714-4.052-4.163-4.052-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.314-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href:  "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href:  "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    ),
  },
];

const TRUST_BADGES = [
  { icon: Lock,      text: "Secure Checkout"      },
  { icon: Truck,     text: "Free Shipping $100+"  },
  { icon: RotateCcw, text: "30-Day Returns"       },
];

const PAYMENT_ICONS = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

export default function Footer() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-luxury text-white/80">
      {/* Main footer grid */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-serif text-2xl tracking-[0.3em] text-white uppercase">
              LUXORA
            </Link>