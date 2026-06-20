"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { 
    href: "/services", 
    label: "Services",
    dropdown: [
      { href: "/services/data-annotation-labeling", label: "Data Annotation & Labeling" },
      { href: "/services/custom-dataset-collection", label: "Custom Dataset Collection" },
      { href: "/services/quality-assurance", label: "Quality Assurance" },
    ]
  },
  { href: "/blog", label: "Blog" },
  { 
    href: "/case-studies", 
    label: "Case Studies",
    dropdown: [
      { href: "/case-studies/healthcare-diagnostics-ai", label: "Healthcare AI" },
      { href: "/case-studies/autonomous-vehicle-perception", label: "Autonomous Vehicles" },
      { href: "/case-studies/conversational-ai-training", label: "Conversational AI" },
    ]
  },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        {/* Wordmark and Logo */}
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="Dserve AI Logo" width={36} height={36} className={styles.logoIcon} />
          <span className={styles.logoText}>
            Dserve <span className={styles.logoAI}>AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label} className={styles.navItem}>
              <Link href={link.href} className={styles.link}>
                {link.label}
                {link.dropdown && (
                  <svg className={styles.chevron} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                )}
              </Link>
              {link.dropdown && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownInner}>
                    {link.dropdown.map((sub) => (
                      <Link key={sub.href} href={sub.href} className={styles.dropdownLink}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={styles.actions}>
          <Link href="/contact" className="btn btn--primary btn--sm">Get in Touch</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileCtas}>
          <Link href="/contact" className="btn btn--primary w-full" onClick={() => setMobileOpen(false)}>Get in Touch</Link>
        </div>
      </div>
    </header>
  );
}
