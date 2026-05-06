import SEO       from "../components/common/SEO";
import Breadcrumb from "../components/common/Breadcrumb";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly to us, including your name, email address, billing information, shipping address, and any other information you choose to provide when making a purchase or creating an account with LUXORA.",
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to process transactions, send order confirmations and updates, provide customer support, send promotional communications (with your consent), improve our services, and comply with legal obligations. We never sell your personal data to third parties.",
  },
  {
    title: "Information Sharing",
    content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.",
  },
  {
    title: "Data Security",
    content: "We implement industry-standard security measures to protect your personal information. All transactions are encrypted using SSL/TLS technology. We regularly review and update our security practices to ensure your data remains safe.",
  },
  {
    title: "Cookies & Tracking",
    content: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences. Disabling cookies may affect some features of our website.",
  },
  {
    title: "Your Rights",
    content: "You have the right to access, update, or delete your personal information at any time. You may also opt out of marketing communications by clicking the unsubscribe link in any email or by contacting us directly. To exercise these rights, please contact us at privacy@luxora.com.",
  },
  {
    title: "Data Retention",
    content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Account data is retained for the lifetime of your account plus 3 years after deletion.",
  },
  {
    title: "Children's Privacy",
    content: "Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.",
  },
  {
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the effective date. We encourage you to review this policy periodically.",
  },
  {
    title: "Contact Us",
    content: "If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@luxora.com or write to us at: LUXORA, 123 Luxury Ave, Suite 100, New York, NY 10001, USA.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read LUXORA's Privacy Policy to understand how we collect, use, and protect your personal information."
        keywords="LUXORA privacy policy, data protection, personal information"
        url="/privacy"
      />

      <div className="bg-ivory pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]} />
          <h1 className="section-title">Privacy Policy</h1>
          <p className="text-muted text-sm mt-2">Last updated: May 1, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-muted leading-relaxed mb-10 text-sm">
          At LUXORA, we are committed to protecting your privacy and ensuring the security of your personal information.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
          website or make a purchase. Please read this policy carefully before using our services.
        </p>

        <div className="space-y-10">
          {SECTIONS.map((s, i) => (
            <section key={i} aria-labelledby={`section-${i}`}>
              <h2 id={`section-${i}`} className="font-serif text-xl text-luxury mb-3">
                {i + 1}. {s.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{s.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 bg-ivory rounded-sm border border-champagne">
          <p className="text-xs tracking-widest uppercase text-muted mb-2">Questions?</p>
          <p className="text-sm text-muted">
            If you have any questions about our Privacy Policy, please{" "}
            <a href="/contact" className="text-gold hover:underline">contact us</a>{" "}
            and we'll be happy to help.
          </p>
        </div>
      </div>
    </>
  );
}