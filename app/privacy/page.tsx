import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Dserve AI",
  description: "Read the Dserve AI Privacy Policy to understand how we protect your data and comply with global standards like GDPR and HIPAA.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "140px", paddingBottom: "80px", minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "white", marginBottom: "24px", lineHeight: 1.2 }}>
            Privacy Policy
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "48px" }}>Last Updated: June 2026</p>

          <article style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.8 }}>
            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>1. Introduction</h2>
            <p style={{ marginBottom: "24px" }}>
              At Dserve AI, we prioritize the confidentiality and security of the data we handle. This Privacy Policy outlines how we collect, use, and protect your information when you use our services or interact with our website.
            </p>

            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>2. Data Collection and Usage</h2>
            <p style={{ marginBottom: "24px" }}>
              When providing our custom data pipelines and consulting services, we may collect business contact information and project requirements. We only collect the information necessary to deliver our services effectively. We do not sell your personal data to third parties.
            </p>

            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>3. Data Security and Compliance</h2>
            <p style={{ marginBottom: "24px" }}>
              We employ enterprise-grade security measures to protect the data we handle. Our operations are fully compliant with global standards, including GDPR, CCPA, and HIPAA. Data processed for AI training is strictly governed by the specific agreements established with our enterprise clients.
            </p>

            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>4. Your Rights</h2>
            <p style={{ marginBottom: "24px" }}>
              Depending on your location, you may have the right to access, rectify, or erase your personal data. To exercise these rights, please contact our privacy team.
            </p>

            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>5. Contact Us</h2>
            <p style={{ marginBottom: "24px" }}>
              If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:connect@dserveai.com" style={{ color: "#0ea5e9" }}>connect@dserveai.com</a>.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
