import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Dserve AI",
  description: "Read the Dserve AI Terms of Service governing the use of our website and enterprise AI data services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "140px", paddingBottom: "80px", minHeight: "80vh" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "white", marginBottom: "24px", lineHeight: 1.2 }}>
            Terms of Service
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "48px" }}>Last Updated: June 2026</p>

          <article style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.8 }}>
            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>1. Acceptance of Terms</h2>
            <p style={{ marginBottom: "24px" }}>
              By accessing or using the Dserve AI website and our enterprise consulting services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>2. Description of Services</h2>
            <p style={{ marginBottom: "24px" }}>
              Dserve AI provides custom data pipelines, data annotation, and strategic AI consulting services ("Services"). The specifics of any enterprise engagement will be governed by a separate Master Services Agreement (MSA) or Statement of Work (SOW).
            </p>

            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>3. Intellectual Property</h2>
            <p style={{ marginBottom: "24px" }}>
              All content on this website, including text, graphics, logos, and software, is the property of Dserve AI and is protected by intellectual property laws. You may not reproduce or distribute any content without our express written permission.
            </p>

            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>4. Limitation of Liability</h2>
            <p style={{ marginBottom: "24px" }}>
              To the maximum extent permitted by law, Dserve AI shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of our website or services.
            </p>

            <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "16px", marginTop: "32px", fontFamily: "'Outfit', sans-serif" }}>5. Contact Us</h2>
            <p style={{ marginBottom: "24px" }}>
              If you have any questions regarding these Terms of Service, please contact us at <a href="mailto:connect@dserveai.com" style={{ color: "#0ea5e9" }}>connect@dserveai.com</a>.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
