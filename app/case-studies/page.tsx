"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { caseStudies } from "@/lib/data";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateCollectionPage, generateBreadcrumbList } from "@/lib/schema";
import styles from "./page.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 70, damping: 15 } }
};

export default function CaseStudiesPage() {
  const featured = caseStudies[0];
  const bentoItems = caseStudies.slice(1);

  return (
    <>
      <SchemaScript 
        schema={[
          generateCollectionPage({
            title: "Case Studies | Dserve AI",
            description: "Read about how our AI data pipelines power the world's leading technology innovators.",
            path: "/case-studies"
          }),
          generateBreadcrumbList([
            { name: "Case Studies", path: "/case-studies" }
          ])
        ]}
      />
      <div className={styles.pageWrapper}>
      <Navbar />
      
      {/* Ambient Orbs */}
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />
      <div className={styles.ambientOrb3} />

      <main id="main" className={styles.main}>
        {/* Immersive Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`container ${styles.heroContent}`}
          >
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} /> Impact at Scale
            </div>
            <h1 className="sr-only">AI Data Annotation Case Studies</h1>
            <h2 className={styles.heroTitle}>
              Case Studies That<br />
              <span className={styles.gradientText}>Speak for Themselves</span>
            </h2>
            <p className={styles.heroDesc}>
              Real projects. Real results. See how Dserve AI has powered transformative AI systems for companies worldwide with perfectly engineered data.
            </p>
          </motion.div>
        </section>

        {/* Sticky Scroll Architecture */}
        <div className={styles.stickyContainer}>
          
          {/* Featured Showcase (Sticky Layer) */}
          {featured && (
            <div className={styles.stickyItem}>
              <section className={styles.featuredSection}>
                <div className="container">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <Link 
                      href={`/case-studies/${featured.slug}`} 
                      className={styles.featuredCard}
                      style={{ "--c": featured.color } as React.CSSProperties}
                    >
                      <div className={styles.featuredImageWrapper}>
                        <Image 
                          src={`/case-studies/${featured.slug}.webp`} 
                          alt={featured.title} 
                          fill 
                          className={styles.featureImage}
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority
                        />
                        <div className={styles.imageOverlay} />
                      </div>
                      
                      <div className={styles.featuredContent}>
                        <div className={styles.featuredHeader}>
                          <span className={styles.tag}>{featured.solution}</span>
                          <span className={styles.featuredResult}>{featured.result}</span>
                        </div>
                        
                        <div className={styles.featuredBody}>
                          <h3 className={styles.featuredTitle}>{featured.title}</h3>
                          <p className={styles.featuredDesc}>{featured.description}</p>
                          
                          <div className={styles.tags}>
                            {featured.tags.map(t => <span key={t} className={styles.microTag}>{t}</span>)}
                          </div>
                        </div>
                        
                        <div className={styles.exploreBtn}>
                          Read Case Study <ArrowRight size={18} className={styles.exploreIcon} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </section>
            </div>
          )}

          {/* Bento Grid Showcase (Scrolling Layer) */}
          <div className={styles.scrollItem}>
            <section className={styles.bentoSection}>
              <div className="container">
                <motion.div 
                  variants={containerVariants as any}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className={styles.bentoGrid}
                >
                  {bentoItems.map((cs, i) => (
                    <motion.div key={cs.id} variants={itemVariants as any} className={`${styles.bentoCardWrapper} ${styles[`bentoCard${i+1}`]}`}>
                      <Link 
                        href={`/case-studies/${cs.slug}`} 
                        className={styles.bentoCard}
                        style={{ '--c': cs.color } as React.CSSProperties}
                      >
                        <Image 
                          src={`/case-studies/${cs.slug}.webp`} 
                          alt={cs.title} 
                          fill 
                          className={styles.bentoImage} 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className={styles.bentoOverlay} />
                        
                        <div className={styles.bentoContent}>
                          <div className={styles.bentoHeader}>
                            <span className={styles.tag}>{cs.solution}</span>
                            <span className={styles.bentoResult}>{cs.result}</span>
                          </div>
                          
                          <div className={styles.bentoFooter}>
                            <h3 className={styles.bentoTitle}>{cs.title}</h3>
                            <p className={styles.bentoDesc}>{cs.description}</p>
                            <div className={styles.exploreBtnBento}>
                              Read Case Study <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Premium CTA */}
            <section className={styles.ctaSection}>
              <div className="container">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={styles.cta}
                >
                  <div className={styles.ctaGlow} />
                  <h2 className={styles.ctaTitle}>
                    Ready to Be Our Next <span className={styles.gradientText}>Success Story?</span>
                  </h2>
                  <p className={styles.ctaDesc}>
                    Join the growing list of leading AI companies that trust Dserve AI for their most critical, custom data pipelines.
                  </p>
                  <div className={styles.ctaButtons}>
                    <Link href="/contact" className="btn btn--primary btn--lg">Start Your Pilot Project <ArrowRight size={18} /></Link>
                    <Link href="/services" className="btn btn--secondary btn--lg">Explore Consulting</Link>
                  </div>
                </motion.div>
              </div>
            </section>
            
            <Footer />
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
