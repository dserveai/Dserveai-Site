import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "../legal.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Dserve AI",
  description: "Read the Dserve AI Privacy Policy to understand how we protect your data and comply with global standards like GDPR and HIPAA.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.legalHero}>
          <div className={styles.heroGrid} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.subtitle}>
              We are committed to protecting your privacy and ensuring the security of your enterprise data. This policy outlines our data processing practices.
            </p>
          </div>
        </section>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTitle}>On this page</div>
            <nav className={styles.nav}>
              <Link href="#introduction" className={styles.navLink}>1. Introduction</Link>
              <Link href="#data-collection" className={styles.navLink}>2. Data Collection</Link>
              <Link href="#ai-processing" className={styles.navLink}>3. AI & Model Training</Link>
              <Link href="#security" className={styles.navLink}>4. Enterprise Security</Link>
              <Link href="#compliance" className={styles.navLink}>5. Compliance & Rights</Link>
              <Link href="#contact" className={styles.navLink}>6. Contact Us</Link>
            </nav>
          </aside>

          <article className={styles.content}>
            <section id="introduction">
              <h2>1. Introduction</h2>
              <p>
                At Dserve AI ("Company", "we", "us", or "our"), we prioritize the confidentiality and security of the data we handle. This Privacy Policy applies to all information collected through our website (dserveai.com), our enterprise AI consulting services, and our proprietary data pipeline infrastructure.
              </p>
              <p>
                By accessing or using our services, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

            <section id="data-collection">
              <h2>2. Information We Collect</h2>
              <p>
                We only collect information that is strictly necessary to provide and improve our enterprise AI services. This includes:
              </p>
              <ul>
                <li><strong>Business Contact Information:</strong> Names, corporate email addresses, phone numbers, and job titles when you request a consultation or use our contact forms.</li>
                <li><strong>Client Data Assets:</strong> Raw data, datasets, and proprietary assets securely transferred to us under a Master Services Agreement (MSA) for annotation or model training.</li>
                <li><strong>Technical Telemetry:</strong> IP addresses, browser types, and anonymous usage analytics to maintain the performance and security of our web infrastructure.</li>
              </ul>
            </section>

            <section id="ai-processing">
              <h2>3. AI Processing & Model Training</h2>
              <p>
                As a provider of Custom AI Solutions and Data Annotation, we process vast amounts of data. We maintain strict ethical AI standards:
              </p>
              <ul>
                <li>We <strong>never</strong> use proprietary client data to train our own foundation models unless explicitly authorized via contract.</li>
                <li>Client datasets remain siloed and mathematically isolated during the annotation and fine-tuning lifecycle.</li>
                <li>Any synthetic data generated is subject to rigorous bias detection and domain randomization protocols to prevent the accidental inclusion of Personally Identifiable Information (PII).</li>
              </ul>
            </section>

            <section id="security">
              <h2>4. Enterprise Security Measures</h2>
              <p>
                Securing your intellectual property is our highest priority. Our infrastructure utilizes state-of-the-art protections:
              </p>
              <ul>
                <li>End-to-end AES-256 encryption for data at rest and TLS 1.3 for data in transit.</li>
                <li>Role-Based Access Control (RBAC) ensuring our annotators and engineers only access data on a strict need-to-know basis.</li>
                <li>Regular third-party penetration testing and SOC 2 Type II compliant data centers.</li>
              </ul>
            </section>

            <section id="compliance">
              <h2>5. Global Compliance & Your Rights</h2>
              <p>
                Dserve AI operates in full compliance with major global privacy frameworks, including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and HIPAA for healthcare data workflows.
              </p>
              <p>
                Depending on your jurisdiction, you retain the right to:
              </p>
              <ul>
                <li>Request access to the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request deletion of your personal data ("Right to be Forgotten").</li>
                <li>Opt-out of any marketing communications at any time.</li>
              </ul>
            </section>

            <section id="contact">
              <h2>6. Contact Our Privacy Team</h2>
              <p>
                If you have questions regarding this Privacy Policy, our data processing practices, or wish to exercise your privacy rights, please contact our Data Protection Officer at:
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:connect@dserveai.com">connect@dserveai.com</a>
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
