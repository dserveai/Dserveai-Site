import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const footerLinks = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ],
  Services: [
    { href: "/services/data-annotation-and-qa", label: "Data Annotation & QA" },
    { href: "/services/multi-modal-data-collection", label: "Multi-Modal Collection" },
    { href: "/services/synthetic-data-generation", label: "Synthetic Data" },
    { href: "/services/computer-vision-analytics", label: "Computer Vision" },
    { href: "/services/custom-ai-solutions", label: "Custom AI Solutions" },
    { href: "/services/quality-assurance", label: "Quality Assurance" },
  ],
  Solutions: [
    { href: "/solutions/healthcare-ai", label: "Healthcare AI" },
    { href: "/solutions/computer-vision", label: "Computer Vision" },
    { href: "/solutions/multimodal-ai", label: "Multimodal AI" },
    { href: "/solutions/generative-ai", label: "Generative AI" },
    { href: "/solutions/physical-ai", label: "Physical AI" },
    { href: "/solutions/biometric-ai", label: "Biometric AI" },
    { href: "/solutions/agentic-ai", label: "Agentic AI" },
    { href: "/solutions/conversational-ai", label: "Conversational AI" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Top border glow */}
      <div className={styles.topGlow} />

      <div className="container">
        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Image src="/logo.png" alt="Dserve AI Logo" width={36} height={36} className={styles.logoIcon} />
              <span className={styles.logoText}>
                Dserve<span className={styles.logoAI}>AI</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Bridging the gap between AI ambition and execution with reliable, scalable, and real-world data solutions.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/company/dserve-ai/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
            <div className={styles.contactInfo}>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@dserveai.com" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                connect@dserveai.com
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>{section}</h4>
              <ul className={styles.linkList}>
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className={styles.footerLink}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Global Presence */}
          <div className={styles.linkGroup}>
            <h4 className={styles.linkGroupTitle}>Global Presence</h4>
            <div className={styles.radarLocations}>
              {["Dubai", "Mumbai", "Ahmedabad"].map((city, i) => (
                <div key={city} className={styles.radarLocation}>
                  <div className={styles.radarDot}>
                    <div className={styles.radarPing} style={{ animationDelay: `${i * 0.4}s` }} />
                  </div>
                  <span className={styles.radarCity}>{city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <p className={styles.copyright}>
              © {year} Dserve AI. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
          <div className={styles.bottomBadges}>
            <span className="badge badge--green">HIPAA Compliant</span>
            <span className="badge badge--green">GDPR Compliant</span>
            <span className="badge">Compiled with Global Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
