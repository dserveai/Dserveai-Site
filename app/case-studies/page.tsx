"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { caseStudies } from "@/lib/data";
import styles from "./page.module.css";

// Note: Metadata cannot be exported from a "use client" component.
// In a real Next.js app, we'd extract this to a separate layout or page wrapper, 
// but for the sake of this redesign keeping it as a client component is fine for interactions.

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Immersive Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={`container ${styles.heroContent}`}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} /> Proven Results
            </div>
            <h1 className={styles.heroTitle}>
              Case Studies That<br />
              <span className="gradient-text">Speak for Themselves</span>
            </h1>
            <p className={styles.heroDesc}>
              Real projects. Real results. See how Dserve AI has powered transformative AI systems for companies worldwide with perfectly engineered data.
            </p>
          </div>
        </section>

        {/* Dynamic Trophy Grid */}
        <section className={styles.gridSection}>
          <div className="container">
            <div className={styles.grid}>
              {caseStudies.map(({ id, slug, title, description, industry, result, tags, color }) => (
                <Link 
                  href={`/case-studies/${slug}`} 
                  key={id} 
                  className={styles.card}
                  // Injecting CSS variables to power the mouse-tracking radial gradient
                  style={{ 
                    '--card-color': color, 
                    '--card-color-dim': `${color}15`,
                    '--card-color-border': `${color}30` 
                  } as React.CSSProperties}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <span className={styles.tag}>{industry}</span>
                      <span className={styles.result}>{result}</span>
                    </div>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.tags}>
                      {tags.map(t => <span key={t} className={styles.microTag}>{t}</span>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className={styles.cta}>
              <h2>
                Ready to Be Our Next <span className="gradient-text">Success Story?</span>
              </h2>
              <p>
                Join the growing list of leading AI companies that trust Dserve AI for their most critical, custom data pipelines.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className="btn btn--primary btn--lg">Start Your Pilot Project →</Link>
                <Link href="/services" className="btn btn--secondary btn--lg">Explore Consulting</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
