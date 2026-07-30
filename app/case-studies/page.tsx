"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", ...Array.from(new Set(caseStudies.map(cs => cs.solution)))];
  
  // If "All", show all. Else, filter by solution.
  const filteredCaseStudies = activeCategory === "All" 
    ? caseStudies 
    : caseStudies.filter(cs => cs.solution === activeCategory);

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

        {/* Filter & Grid Showcase */}
        <section className={styles.bentoSection}>
          <div className="container">
            
            {/* Filter Bar */}
            <div className={styles.filterBar}>
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div 
              variants={containerVariants as any}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className={styles.bentoGrid}
            >
              <AnimatePresence>
                {filteredCaseStudies.map((cs, i) => {
                  const bentoImages = [
                    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
                  ];
                  
                  return (
                    <motion.div 
                      layout
                      layoutId={`card-${cs.id}`}
                      transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
                      key={cs.id} 
                      variants={itemVariants as any} 
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }}
                      className={styles.caseStudyCardWrapper}
                    >
                      <Link 
                        href={`/case-studies/${cs.slug}`} 
                        className={styles.caseStudyCard}
                        style={{ '--c': cs.color } as React.CSSProperties}
                      >
                        <div className={styles.cardImageWrapper}>
                          <img src={bentoImages[(cs.id - 1) % bentoImages.length]} alt={cs.title} className={styles.cardImage} />
                          <div className={styles.cardOverlay} />
                        </div>
                        
                        <div className={styles.cardContent}>
                          <div className={styles.cardHeader}>
                            <span className={styles.tag}>{cs.solution}</span>
                            <span className={styles.cardResult}>{cs.result}</span>
                          </div>
                          
                          <div className={styles.cardFooter}>
                            <h3 className={styles.cardTitle}>{cs.title}</h3>
                            <p className={styles.cardDesc}>{cs.description}</p>
                            <div className={styles.exploreBtnCard}>
                              Read Case Study <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </>
  );
}
