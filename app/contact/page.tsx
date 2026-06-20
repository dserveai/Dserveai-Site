"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DynamicIcon } from "@/components/ui/Icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./page.module.css";

// Note: Metadata export is not allowed with "use client", so we remove it.
// In a real app we'd split the layout/metadata from the client form.

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here we would typically send the data to an API
  };
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={`container ${styles.heroContent}`}>
            <ScrollReveal>
              <span className="section-label">Enterprise Consulting</span>
              <h1 className={styles.heroTitle}>Engineer Your Custom<br /><span className="gradient-text">Data Pipeline</span></h1>
              <p className={styles.heroDesc}>
                Tell us about your model requirements. Our engineering team will respond within 24 hours with a tailored architecture and pilot proposal.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`section ${styles.contactSection}`}>
          <div className="container">
            <div className={styles.contactGrid}>
              {/* Form */}
              <ScrollReveal delay={100}>
                <div className={styles.formWrap}>
                  <h2 className={styles.formTitle}>Request a Pilot Project</h2>
                  <p className={styles.formDesc}>Detail your data needs, and we&apos;ll design a scalable pipeline optimized for your AI architecture.</p>
                  <form className={styles.form} onSubmit={handleSubmit}>
                    {submitted ? (
                      <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px' }}>
                        <DynamicIcon name="shieldCheck" size={48} color="#10b981" />
                        <h3 style={{ color: '#10b981', fontSize: '1.5rem', margin: '16px 0 8px' }}>Request Received!</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)' }}>Our engineering team will review your requirements and get back to you within 24 hours.</p>
                      </div>
                    ) : (
                      <>
                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Your Name *</label>
                            <input type="text" className={`input ${styles.customInput}`} placeholder="First Name" required />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Company *</label>
                            <input type="text" className={`input ${styles.customInput}`} placeholder="Company Name" required />
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Work Email *</label>
                          <input type="email" className={`input ${styles.customInput}`} placeholder="you@company.com" required />
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Project Timeline *</label>
                            <select className={`input ${styles.customInput}`} required>
                              <option value="">Select Timeline</option>
                              <option>Immediate (within 1 month)</option>
                              <option>1-3 months</option>
                              <option>3-6 months</option>
                              <option>Exploring options</option>
                            </select>
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Estimated Volume</label>
                            <select className={`input ${styles.customInput}`} required>
                              <option value="">Select Volume</option>
                              <option>&lt; 100K data points</option>
                              <option>100K - 1M data points</option>
                              <option>1M+ data points</option>
                              <option>Ongoing pipeline</option>
                            </select>
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Project Details *</label>
                          <textarea 
                            className={`input ${styles.textarea} ${styles.customInput}`} 
                            placeholder="Describe your model architecture, data modalities (text, image, LiDAR, etc.), and any strict compliance requirements..."
                            required
                          />
                        </div>
                        <button type="submit" className={`btn btn--primary btn--lg ${styles.submitBtn}`}>
                          Get in Touch →
                        </button>
                        <p className={styles.formNote}>
                          <span style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}>
                            <DynamicIcon name="shieldCheck" size={14} color="currentColor" />
                          </span>
                          Your data is protected. We never share your information with third parties.
                        </p>
                      </>
                    )}
                  </form>
                </div>
              </ScrollReveal>

              {/* Info Panel */}
              <ScrollReveal delay={200}>
                <div className={styles.infoPanels}>
                  <div className={styles.infoCard}>
                    <h3 className={styles.infoTitle}>Engagement Process</h3>
                    <div className={styles.infoSteps}>
                      {[
                        { n: "1", t: "Architecture Review", d: "Our engineers review your pipeline requirements within 24 hours." },
                        { n: "2", t: "Consultation Call", d: "Deep dive into your taxonomy, edge cases, and QA rubric." },
                        { n: "3", t: "Pilot Execution", d: "We deliver a representative pilot sample to calibrate our tooling." },
                        { n: "4", t: "Production Scale", d: "Full deployment with dedicated QA and real-time delivery hooks." },
                      ].map(({ n, t, d }) => (
                        <div key={n} className={styles.infoStep}>
                          <div className={styles.infoStepNum}>{n}</div>
                          <div>
                            <div className={styles.infoStepTitle}>{t}</div>
                            <div className={styles.infoStepDesc}>{d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <h3 className={styles.infoTitle}>Enterprise SLAs</h3>
                    {[
                      "Custom pilot projects",
                      "Dedicated project management",
                      "HIPAA, SOC2 & GDPR compliant",
                      ">99% QA accuracy threshold",
                      "Custom API integrations",
                      "Global 24/7 delivery teams",
                    ].map(item => (
                      <div key={item} className={styles.infoBullet}>
                        <span style={{ color: "#0ea5e9", fontWeight: 700 }}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.contactDirect}>
                    <h4>Direct Contact</h4>
                    <a href="mailto:enterprise@dserveai.com" className={styles.contactEmail}>
                      <DynamicIcon name="mail" size={16} color="currentColor" />
                      enterprise@dserveai.com
                    </a>
                    <a href="https://www.linkedin.com/company/106909852/" target="_blank" rel="noopener noreferrer" className={styles.contactEmail}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                      LinkedIn Corporate
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
