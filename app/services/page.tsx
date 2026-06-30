import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Database, Code2, Zap, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services, solutions, process } from "@/lib/data";
import { DynamicIcon } from "@/components/ui/Icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import InteractiveCanvas from "@/components/ui/InteractiveCanvas";
import RotatingServiceText from "@/components/ui/RotatingServiceText";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateCollectionPage, generateBreadcrumbList } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services | Custom AI Data Pipelines | Dserve AI",
  description: "End-to-end AI data services: custom dataset collection, precision annotation, quality assurance, and enterprise consulting across healthcare, computer vision, NLP, and more.",
};

const statsData = [
  { value: "1M+", label: "Data Units Delivered" },
  { value: "50+", label: "Dataset Categories" },
  { value: "99%+", label: "Annotation Accuracy (IAA)" },
  { value: "30+", label: "Countries Sourced" },
];

export default function ServicesPage() {
  return (
    <>
      <SchemaScript 
        schema={[
          generateCollectionPage({
            title: "Services | Custom AI Data Pipelines | Dserve AI",
            description: "End-to-end AI data services: custom dataset collection, precision annotation, quality assurance, and enterprise consulting.",
            path: "/services"
          }),
          generateBreadcrumbList([
            { name: "Services", path: "/services" }
          ])
        ]}
      />
      <Navbar />
      <main>

        {/* ============================================
            ENTRY PANEL — Unified Fullscreen Hero
            Canvas behind EVERYTHING, text + stats float
        ============================================= */}
        <section className={styles.entryPanel}>

          {/* Full-width canvas — spans the entire hero, including text side */}
          <div className={styles.canvasWrap}>
            <InteractiveCanvas />
          </div>

          {/* Ambient color glow layers */}
          <div className={styles.entryAmbient} />

          {/* Content grid — inside the same container as the navbar */}
          <div className={`container ${styles.entryInner}`}>

            {/* Left: hero text */}
            <div className={styles.entryLeft}>
              <h1 className="sr-only">Enterprise AI Data Pipelines and Services</h1>
              <h2 className={styles.entryTitle}>
                Data that trains<br />
                the world&apos;s best<br />
                <div className={styles.rotatingContainer}>
                  <RotatingServiceText />
                </div>
              </h2>

              <p className={styles.entryDesc}>
                Fueling the next generation of AI breakthroughs. We provide the high-fidelity data and specialized solutions needed to turn ambitious concepts into production-ready reality.
              </p>

              <div className={styles.entryCtas}>
                <Link href="/contact" className="btn btn--primary btn--lg">Start a Project</Link>
                <a href="#services" className="btn btn--secondary btn--lg">See All Services</a>
              </div>
            </div>

            {/* Right: floating glassmorphic stat cards */}
            <div className={styles.entryRight}>
              <div className={styles.floatingStats}>
                {statsData.map((s, i) => (
                  <div key={i} className={styles.floatStat}>
                    <div className={styles.floatStatValue}>{s.value}</div>
                    <div className={styles.floatStatLabel}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ============================================
            SERVICES SHOWCASE — Card Grid
        ============================================= */}
        <section className={styles.servicesShowcase} id="services">
          <div className="container">

            <ScrollReveal>
              <div className={styles.showroomHeader}>
                <div className={styles.showroomHeaderLeft}>
                  <span className="section-label" style={{ marginBottom: "20px", display: "block" }}>Core Capabilities</span>
                  <h2 className={styles.showroomTitle}>
                    End-to-end capabilities.<br /><em>One pipeline.</em>
                  </h2>
                </div>
              </div>
            </ScrollReveal>

            <div className={styles.serviceRail}>
              {services.map((service, index) => (
                <ScrollReveal key={service.slug} delay={index * 80} className={styles.scrollRevealWrap}>
                  <article style={{ display: 'flex', width: '100%', height: '100%' }}>
                    <Link
                      href={`/services/${service.slug}`}
                      className={styles.serviceCard}
                      style={{ "--svc-color": service.color, flex: 1, height: '100%' } as React.CSSProperties}
                    >
                      <div className={styles.serviceCardGlow} />

                      <div className={styles.serviceIconRow}>
                        <div
                          className={styles.serviceIcon}
                          style={{
                            background: `${service.color}15`,
                          }}
                        >
                          <DynamicIcon name={service.iconName} size={26} color={service.color} />
                        </div>
                        <div className={styles.serviceArrow}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 17L17 7M17 7H7M17 7v10"/>
                          </svg>
                        </div>
                      </div>

                      <h3 className={styles.serviceTitle}>{service.title}</h3>
                      <p className={styles.serviceDesc}>{service.description}</p>

                      <div className={styles.serviceTags}>
                        {service.features.slice(0, 3).map(f => (
                          <span key={f} className={styles.serviceTag}>{f}</span>
                        ))}
                      </div>
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            SOLUTIONS STRIP
        ============================================= */}
        <section className={styles.solutionsStrip}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.stripHeader}>
                <span className="section-label" style={{ flexShrink: 0, margin: 0 }}>Solutions We Offer</span>
                <div className={styles.stripLine} />
              </div>
            </ScrollReveal>
            <div className={styles.bentoGrid}>
              {solutions.map((ind, i) => (
                <ScrollReveal key={ind.name} delay={i * 40}>
                  <Link href={`/solutions/${ind.slug}`} style={{ textDecoration: 'none' }}>
                    <TiltCard 
                      className={styles.bentoCard}
                      style={{ "--c": ind.color } as React.CSSProperties}
                    >
                      <div className={styles.bentoTop}>
                        <div className={styles.bentoIcon}>
                          <DynamicIcon name={ind.iconName} size={24} color={ind.color} />
                        </div>
                        <span className={styles.bentoArrow}>Explore <ArrowRight size={14} /></span>
                      </div>
                      <div className={styles.bentoBottom}>
                        <h4 className={styles.bentoName}>{ind.name}</h4>
                        <p className={styles.bentoDesc}>{ind.desc}</p>
                      </div>
                    </TiltCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            POC VALIDATION ENGINE
        ============================================= */}
        <section className={styles.pocSection}>
          <div className="container">
            <div className={styles.pocHeader}>
              <ScrollReveal>
                <h2 className={styles.pocTitle}>
                  The Proof of Concept Engine
                </h2>
                <p className={styles.pocDesc}>
                  We don't ask for blind trust. Validate our accuracy, latency, and throughput on a subset of your raw data before committing to production scale.
                </p>
              </ScrollReveal>
            </div>

            <div className={styles.pocGrid}>
              
              {/* Step 1 */}
              <ScrollReveal delay={0}>
                <div className={styles.pocCard}>
                  <div className={styles.pocCardTop}>
                    <div className={styles.pocIconBox} style={{ color: "#0ea5e9" }}>
                      <Database size={28} />
                    </div>
                    <span className={styles.pocStep}>01</span>
                  </div>
                  <h3 className={styles.pocCardTitle}>Secure Ingestion</h3>
                  <p className={styles.pocCardDesc}>
                    You provide a subset of your data. It is ingested into our highly secure, air-gapped sandbox environment where it is profiled and encrypted at rest.
                  </p>
                  <div className={styles.pocMetrics}>
                    <div className={styles.pocMetric}>
                      <span className={styles.pocMetricValue}>AES-256</span>
                      <span className={styles.pocMetricLabel}>Encryption</span>
                    </div>
                    <div className={styles.pocMetric}>
                      <span className={styles.pocMetricValue}>Enterprise</span>
                      <span className={styles.pocMetricLabel}>Security</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Step 2 */}
              <ScrollReveal delay={100}>
                <div className={styles.pocCard}>
                  <div className={styles.pocCardTop}>
                    <div className={styles.pocIconBox} style={{ color: "#8b5cf6", borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.05)" }}>
                      <Code2 size={28} />
                    </div>
                    <span className={styles.pocStep}>02</span>
                  </div>
                  <h3 className={styles.pocCardTitle}>Ontology Hardening</h3>
                  <p className={styles.pocCardDesc}>
                    Our Project Manager reviews your existing labeling guidelines. We convert any ambiguous instructions into deterministic, mathematically verifiable rules.
                  </p>
                  <div className={styles.pocMetrics}>
                    <div className={styles.pocMetric}>
                      <span className={styles.pocMetricValue} style={{ color: "#8b5cf6" }}>Deterministic</span>
                      <span className={styles.pocMetricLabel}>Logic Gates</span>
                    </div>
                    <div className={styles.pocMetric}>
                      <span className={styles.pocMetricValue}>Project</span>
                      <span className={styles.pocMetricLabel}>Manager</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Step 3 */}
              <ScrollReveal delay={200}>
                <div className={styles.pocCard}>
                  <div className={styles.pocCardTop}>
                    <div className={styles.pocIconBox} style={{ color: "#10b981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)" }}>
                      <ShieldCheck size={28} />
                    </div>
                    <span className={styles.pocStep}>03</span>
                  </div>
                  <h3 className={styles.pocCardTitle}>Inference & Audit</h3>
                  <p className={styles.pocCardDesc}>
                    We execute the sprint in 72 hours. The final dataset is delivered alongside a quality audit proving we hit the required accuracy.
                  </p>
                  <div className={styles.pocMetrics}>
                    <div className={styles.pocMetric}>
                      <span className={styles.pocMetricValue} style={{ color: "#10b981" }}>&gt;99%</span>
                      <span className={styles.pocMetricLabel}>Accuracy Guarantee</span>
                    </div>
                    <div className={styles.pocMetric}>
                      <span className={styles.pocMetricValue}>72 Hours</span>
                      <span className={styles.pocMetricLabel}>Turnaround</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* ============================================
            FINAL CTA
        ============================================= */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBg} />
          <div className="container">
            <ScrollReveal>
              <div className={styles.ctaInner}>
                <div>
                  <h2 className={styles.ctaTitle}>
                    Your foundation model deserves<br /><em>better data.</em>
                  </h2>
                  <p className={styles.ctaSubtitle}>
                    Partner with Dserve AI to build proprietary, high-fidelity datasets that unlock your competitive edge. Scoped in hours, execution in days, scale in weeks.
                  </p>
                </div>
                <div className={styles.ctaActions}>
                  <Link href="/contact" className="btn btn--primary btn--lg">Start a Pilot Project <ArrowRight size={18} /></Link>
                  <Link href="/case-studies" className="btn btn--secondary btn--lg" style={{ justifyContent: 'center' }}>See Case Studies</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
