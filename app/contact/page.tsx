"use client";

import { useState, useRef, useEffect } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DynamicIcon } from "@/components/ui/Icons";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateContactPage, generateBreadcrumbList } from "@/lib/schema";
import styles from "./page.module.css";

const countryList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

function CountryAutocomplete({ name }: { name?: string }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = countryList.filter(c => c.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input 
        type="text" 
        name={name}
        className={`input ${styles.customInput}`} 
        placeholder="Type to search..." 
        value={selected || query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected("");
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        required
      />
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(10, 15, 25, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          marginTop: '8px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 50,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {filtered.length > 0 ? filtered.map(c => (
            <div 
              key={c}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.8)',
                transition: 'background 0.2s',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => {
                setSelected(c);
                setQuery("");
                setIsOpen(false);
              }}
            >
              {c}
            </div>
          )) : (
            <div style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.4)' }}>No countries found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      company: formData.get("company"),
      email: formData.get("email"),
      country: formData.get("country"),
      phone: (formData.get("phoneCode") as string || "") + (formData.get("phoneNumber") as string || ""),
      projectDetails: formData.get("projectDetails"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SchemaScript 
        schema={[
          generateContactPage(),
          generateBreadcrumbList([
            { name: "Contact Us", path: "/contact" }
          ])
        ]}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={`container ${styles.heroContent}`}>
            <ScrollReveal>
              <span className="section-label">Talk to an Expert</span>
              <h1 className="sr-only">Contact Our AI Data Annotation Experts</h1>
              <h2 className={styles.heroTitle}>Engineer Your Custom<br /><span className="gradient-text">Data Pipeline</span></h2>
              <p className={styles.heroDesc}>
                Tell us about your model requirements. Our project management team will get back to you to understand the requirement in detail within 24 hours.
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
                  <h2 className={styles.formTitle}>Request Summary</h2>
                  <p className={styles.formDesc}>Outline your AI data and solution requirements below. Our project management team will connect with you within 24 hours to discuss the details.</p>
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
                            <label className={styles.label}>Full Name *</label>
                            <input type="text" name="fullName" className={`input ${styles.customInput}`} placeholder="John Doe" required />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Company *</label>
                            <input type="text" name="company" className={`input ${styles.customInput}`} placeholder="Company Name" required />
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Work Email *</label>
                          <input type="email" name="email" className={`input ${styles.customInput}`} placeholder="you@company.com" required />
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Country *</label>
                            <CountryAutocomplete name="country" />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Phone No</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input 
                                type="tel" 
                                name="phoneCode"
                                className={`input ${styles.customInput}`} 
                                placeholder="+1" 
                                maxLength={4}
                                style={{ width: '80px', textAlign: 'center' }}
                                onInput={(e) => {
                                  let val = e.currentTarget.value.replace(/[^0-9+]/g, '');
                                  if (val && !val.startsWith('+')) {
                                    val = '+' + val.replace(/\+/g, '');
                                  }
                                  if (val.startsWith('+')) {
                                    val = '+' + val.substring(1).replace(/\+/g, '');
                                  }
                                  e.currentTarget.value = val;
                                }}
                              />
                              <input 
                                type="tel" 
                                name="phoneNumber"
                                className={`input ${styles.customInput}`} 
                                placeholder="5550000000" 
                                maxLength={15}
                                style={{ flex: 1 }}
                                onInput={(e) => {
                                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Project Details *</label>
                          <textarea 
                            name="projectDetails"
                            className={`input ${styles.textarea} ${styles.customInput}`} 
                            placeholder="Describe your model architecture, data modalities (text, image, LiDAR, etc.), and any strict compliance requirements..."
                            required
                          />
                        </div>
                        
                        {errorMsg && (
                          <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem' }}>
                            {errorMsg}
                          </div>
                        )}

                        <button type="submit" disabled={isSubmitting} className={`btn btn--primary btn--lg ${styles.submitBtn}`}>
                          {isSubmitting ? "Sending..." : (
                            <>Get in Touch <ArrowRight size={18} /></>
                          )}
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
                    <a href="mailto:connect@dserveai.com" className={styles.contactEmail}>
                      <DynamicIcon name="mail" size={16} color="currentColor" />
                      connect@dserveai.com
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
