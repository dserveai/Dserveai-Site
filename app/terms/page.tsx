import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "../legal.module.css";
import Link from "next/link";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateWebPage, generateBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms of Service | Dserve AI",
  description: "Read the Dserve AI Terms of Service governing the use of our website and enterprise AI data services.",
  alternates: { canonical: "https://dserveai.com/terms" },
  openGraph: {
    title: "Terms of Service | Dserve AI",
    description: "Read the Dserve AI Terms of Service governing the use of our website and enterprise AI data services.",
    type: "website",
    url: "https://dserveai.com/terms",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Dserve AI",
    description: "Read the Dserve AI Terms of Service governing the use of our website and enterprise AI data services.",
    images: ["/og-image.jpg"],
  },
};

export default function TermsPage() {
  return (
    <>
      <SchemaScript 
        schema={[
          generateWebPage({
            title: "Terms of Service | Dserve AI",
            path: "/terms"
          }),
          generateBreadcrumbList([
            { name: "Terms of Service", path: "/terms" }
          ])
        ]}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.legalHero}>
          <div className={styles.heroGrid} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.subtitle}>
              These terms govern your use of Dserve AI's website and outline the foundational agreements for our enterprise services.
            </p>
          </div>
        </section>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTitle}>On this page</div>
            <nav className={styles.nav}>
              <Link href="#acceptance" className={styles.navLink}>1. Acceptance of Terms</Link>
              <Link href="#services" className={styles.navLink}>2. Enterprise Services</Link>
              <Link href="#intellectual-property" className={styles.navLink}>3. Intellectual Property</Link>
              <Link href="#data-usage" className={styles.navLink}>4. Client Data Usage</Link>
              <Link href="#liability" className={styles.navLink}>5. Limitation of Liability</Link>
              <Link href="#contact" className={styles.navLink}>6. Contact Us</Link>
            </nav>
          </aside>

          <article className={styles.content}>
            <section id="acceptance">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website (dserveai.com) and the services offered by Dserve AI ("Company", "we", "us"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you must discontinue your use of our website immediately.
              </p>
            </section>

            <section id="services">
              <h2>2. Enterprise Services & MSAs</h2>
              <p>
                Dserve AI provides premium data pipelines, annotation services, and strategic AI consulting. Please note:
              </p>
              <ul>
                <li>These Terms govern general website usage.</li>
                <li>Specific commercial engagements (e.g., custom AI workflows, data generation) will be governed by a separate, mutually executed Master Services Agreement (MSA) and Statement of Work (SOW).</li>
                <li>In the event of a conflict between these Terms and an executed MSA, the terms of the MSA shall take precedence.</li>
              </ul>
            </section>

            <section id="intellectual-property">
              <h2>3. Intellectual Property</h2>
              <p>
                The Dserve AI website and its original content, features, and functionality (including but not limited to design systems, text, graphics, and code) are owned by Dserve AI and are protected by international copyright, trademark, patent, and trade secret laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any of our proprietary content without our express written consent.
              </p>
            </section>

            <section id="data-usage">
              <h2>4. Client Data & Confidentiality</h2>
              <p>
                We understand that in the realm of AI, data is your most valuable asset. When you submit inquiries through our website:
              </p>
              <ul>
                <li>Your submission is treated as confidential business information.</li>
                <li>We will not use your company name or project details in our marketing materials or case studies without explicit prior approval.</li>
                <li>Data submitted through contact forms is subject to our <Link href="/privacy">Privacy Policy</Link>.</li>
              </ul>
            </section>

            <section id="liability">
              <h2>5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, in no event shall Dserve AI, its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul>
                <li>Your access to or use of or inability to access or use the website.</li>
                <li>Any unauthorized access, use, or alteration of your transmissions or content.</li>
                <li>Any bugs, viruses, or trojan horses transmitted to or through our website by any third party.</li>
              </ul>
            </section>

            <section id="contact">
              <h2>6. Contact Us</h2>
              <p>
                If you have any questions regarding these Terms of Service, please contact our legal department at:
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
