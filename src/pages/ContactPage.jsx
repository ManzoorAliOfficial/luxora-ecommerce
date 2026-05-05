import { useState } from "react";
import { motion } from "framer-motion";

import SEO from "../components/common/SEO";
import Breadcrumb from "../components/common/Breadcrumb";
import Reveal from "../components/common/Reveal";
import { useStore } from "../context/StoreContext";

// 🔥 Stagger animation (for info items)
const container = {
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const { addToast } = useStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast("Message sent! We'll reply within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact LUXORA",
    url: "https://luxora.com/contact",
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the LUXORA team. We're here to help 24/7."
        keywords="contact LUXORA, luxury fashion support, customer service"
        url="/contact"
        schema={schema}
      />

      {/* 🔥 HEADER */}
      <Reveal>
        <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
          <div className="max-w-screen-xl mx-auto">
            <Breadcrumb
              items={[{ label: "Home", to: "/" }, { label: "Contact" }]}
            />
            <p className="section-label">Reach Us</p>
            <h1 className="section-title">Get In Touch</h1>
          </div>
        </div>
      </Reveal>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* 🔥 FORM */}
          <Reveal>
            <div>
              <h2 className="font-serif text-2xl mb-6">
                Send Us a Message
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Full Name"
                    required
                    className="input"
                  />

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="Email"
                    required
                    className="input"
                  />
                </div>

                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  placeholder="Subject"
                  required
                  className="input"
                />

                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  rows={5}
                  placeholder="Message"
                  required
                  className="input"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gold"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </Reveal>

          {/* 🔥 INFO */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl mb-6">
              Contact Information
            </h2>

            <div className="space-y-6 mb-10">
              {[
                {
                  icon: "📍",
                  label: "Address",
                  value:
                    "123 Luxury Ave, Suite 100\nNew York, NY 10001, USA",
                },
                { icon: "📞", label: "Phone", value: "+1 (555) 123-4567" },
                { icon: "✉️", label: "Email", value: "hello@luxora.com" },
                {
                  icon: "🕐",
                  label: "Support Hours",
                  value:
                    "Mon–Fri: 9AM–6PM EST\nSat: 10AM–4PM EST",
                },
              ].map((c) => (
                <motion.div
                  key={c.label}
                  variants={itemAnim}
                  className="flex gap-4"
                >
                  <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center text-xl">
                    {c.icon}
                  </div>

                  <div>
                    <p className="text-xs uppercase text-muted">
                      {c.label}
                    </p>
                    <p className="text-sm whitespace-pre-line">
                      {c.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <Reveal delay={0.2}>
              <div className="w-full h-48 bg-ivory rounded-sm flex items-center justify-center text-muted text-sm border border-champagne">
                📍 Map Embed Here
              </div>
            </Reveal>
          </motion.div>

        </div>
      </div>
    </>
  );
}