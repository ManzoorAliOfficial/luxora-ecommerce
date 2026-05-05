import { useState } from "react";
import SEO          from "../components/common/SEO";
import Breadcrumb   from "../components/common/Breadcrumb";

const FAQS = [
  { q:"How long does delivery take?",       a:"Standard delivery takes 3–5 business days. Express (1–2 days) is available at checkout for an additional fee." },
  { q:"What is your return policy?",        a:"We offer a 30-day return policy on all items. Items must be in original condition with tags attached and original packaging." },
  { q:"Do you offer free shipping?",        a:"Yes! Free standard shipping on all orders over $100. Orders under $100 have a flat $10 shipping fee." },
  { q:"How can I track my order?",          a:"Once your order ships you'll receive a tracking email. You can also view tracking in your account dashboard under My Orders." },
  { q:"Are your products authentic?",       a:"Absolutely. All LUXORA products are 100% authentic, sourced directly from brands or verified suppliers with certificates of authenticity." },
  { q:"Can I change or cancel my order?",   a:"Orders can be modified or cancelled within 2 hours of placement. Contact our support team immediately after placing your order." },
  { q:"Do you ship internationally?",       a:"Yes, we ship to 50+ countries worldwide. International delivery takes 7–14 business days. Customs fees may apply." },
  { q:"How do I apply a coupon code?",      a:"Enter your coupon code in the Cart page before proceeding to checkout. Valid codes include LUXORA20, SAVE10, and NEWUSER." },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  const schema = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type":          "Question",
      "name":           f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <>
      <SEO
        title="FAQ — Frequently Asked Questions"
        description="Find answers to common questions about shipping, returns, payments, and more at LUXORA."
        keywords="LUXORA FAQ, shipping policy, return policy, luxury fashion help"
        url="/faq"
        schema={schema}
      />

      <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <Breadcrumb items={[{ label:"Home", to:"/" }, { label:"FAQ" }]} />
          <p className="section-label">Help Center</p>
          <h1 className="section-title">Frequently Asked Questions</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div itemScope itemType="https://schema.org/FAQPage">
          {FAQS.map((f, i) => (
            <div key={i} className="border-b border-champagne"
                 itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left bg-transparent border-0 cursor-pointer font-sans"
                aria-expanded={open === i}
              >
                <span className={`text-sm font-medium pr-4 ${open === i ? "text-gold" : "text-luxury"}`} itemProp="name">
                  {f.q}
                </span>
                <svg className={`w-5 h-5 shrink-0 text-muted transition-transform ${open === i ? "rotate-180 text-gold" : ""}`}
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {open === i && (
                <div className="pb-5 animate-fade-in"
                     itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-sm text-muted leading-relaxed" itemProp="text">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 text-center card p-8">
          <p className="font-serif text-2xl mb-2">Still have questions?</p>
          <p className="text-muted text-sm mb-5">Our support team is happy to help you.</p>
          <a href="/contact" className="btn-gold">Contact Us</a>
        </div>
      </div>
    </>
  );
}