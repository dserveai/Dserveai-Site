"use client";

import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "./page.module.css";
import { faqs } from "@/lib/data";

export default function FAQPage() {
  // Store the index of the currently open FAQ. Null means all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first item

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
      <Navbar />
      <main>
        {/* Minimalist Hero */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className="sr-only">AI Data Services and Annotation FAQ</h1>
            <h2 className={styles.heroTitle}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className={styles.heroDesc}>
              Everything you need to know about Dserve AI's data collection, annotation services, and enterprise pipelines.
            </p>
          </div>
        </section>

        {/* Sleek Accordion Section */}
        <section className={styles.faqSection}>
          <div className="container">
            <div className={styles.faqContainer}>
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <article 
                    key={index} 
                    className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
                  >
                    <button 
                      className={styles.faqButton} 
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      {faq.q}
                      <span className={styles.faqIcon}>
                        <Plus size={20} strokeWidth={2.5} />
                      </span>
                    </button>
                    
                    <div className={styles.faqContent}>
                      <div className={styles.faqContentInner}>
                        {faq.a}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center", marginTop: 80, padding: "80px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 32, backdropFilter: "blur(20px)" }}>
              <h2 style={{ color: "white", fontFamily: "'Outfit', sans-serif", fontSize: "2.5rem", marginBottom: 20 }}>
                Still Have <span className="gradient-text">Questions?</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 40, maxWidth: 500, marginLeft: "auto", marginRight: "auto", fontSize: "1.05rem", lineHeight: 1.7 }}>
                Our team of data engineering experts is ready to discuss your unique ML requirements.
              </p>
              <a href="/contact" className="btn btn--primary btn--lg">Contact Us <ArrowRight size={18} /></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
