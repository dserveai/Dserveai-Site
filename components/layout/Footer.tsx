import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const footerLinks = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
  ],
  Services: [
    { href: "/services#custom-dataset-collection", label: "Data Collection" },
    { href: "/services#data-annotation-&-labeling", label: "Data Annotation" },
    { href: "/services#quality-assurance", label: "Quality Assurance" },
    { href: "/contact", label: "Enterprise Consulting" },
  ],
  Industries: [
    { href: "/#industries", label: "Healthcare AI" },
    { href: "/#industries", label: "Computer Vision" },
    { href: "/#industries", label: "Conversational AI" },
    { href: "/#industries", label: "Autonomous Vehicles" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact Us" },
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
              <Image src="/logo.png" alt="Dserve AI Logo" width={32} height={32} className={styles.logoIcon} />
              <span className={styles.logoText}>
                Dserve <span className={styles.logoAI}>AI</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Empowering AI with High-Quality Data. Trusted by the world&apos;s leading AI teams.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/company/106909852/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
            <div className={styles.contactInfo}>
              <a href="mailto:enterprise@dserveai.com" className={styles.contactItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                enterprise@dserveai.com
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
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {year} Dserve AI. All rights reserved.
          </p>
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
