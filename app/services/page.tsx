import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services, industries, process } from "@/lib/data";
import { DynamicIcon } from "@/components/ui/Icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import InteractiveCanvas from "@/components/ui/InteractiveCanvas";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services — Custom AI Data Pipelines | Dserve AI",
  description: "End-to-end AI data services: custom dataset collection, precision annotation, quality assurance, and enterprise consulting across healthcare, computer vision, NLP, and more.",
};

const statsData = [
  { value: "1M+", label: "Data Units Delivered" },
  { value: "50+", label: "Dataset Categories" },
  { value: "95%+", label: "Annotation Accuracy (IAA)" },
  { value: "30+", label: "Countries Sourced" },
];

export default function ServicesPage() {
  return (
    <>
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
              <h1 className={styles.entryTitle}>
                Data that trains<br />
                the world&apos;s<br />
                <em>best AI.</em>
              </h1>

              <p className={styles.entryDesc}>
                We handle everything from custom data collection and precision labeling to rigorous quality assurance. Our complete pipeline ensures your engineering team gets exactly what they need to build reliable models.
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
                <ScrollReveal key={service.slug} delay={index * 80}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={styles.serviceCard}
                    style={{ "--svc-color": service.color } as React.CSSProperties}
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            INDUSTRIES STRIP
        ============================================= */}
        <section className={styles.industriesStrip}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.stripHeader}>
                <span className="section-label" style={{ flexShrink: 0, margin: 0 }}>Solutions We Offer</span>
                <div className={styles.stripLine} />
              </div>
            </ScrollReveal>
            <div className={styles.bentoGrid}>
              {industries.map((ind, i) => (
                <ScrollReveal key={ind.name} delay={i * 40}>
                  <Link href={`/industries/${ind.slug}`} style={{ textDecoration: 'none' }}>
                    <TiltCard 
                      className={styles.bentoCard}
                      style={{ "--c": ind.color } as React.CSSProperties}
                    >
                      <div className={styles.bentoTop}>
                        <div className={styles.bentoIcon}>
                          <DynamicIcon name={ind.iconName} size={24} color={ind.color} />
                        </div>
                        <span className={styles.bentoArrow}>Explore →</span>
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
            PROCESS — Vertical Timeline
        ============================================= */}
        <section className={styles.processSection}>
          <div className="container">
            <div className={styles.processGrid}>

              {/* Left: sticky label */}
              <ScrollReveal>
                <div className={styles.processLeft}>
                  <span className="section-label" style={{ marginBottom: "24px", display: "block" }}>How We Work</span>
                  <h2 className={styles.processTitle}>
                    A workflow built<br />for <em>production.</em>
                  </h2>
                  <p className={styles.processSubtitle}>
                    Every engagement follows our battle-tested four-phase process. No surprises. No missed deadlines. Just reliable, high-quality data delivered to your cloud.
                  </p>
                  <Link href="/contact" className="btn btn--primary">Discuss Your Workflow →</Link>
                </div>
              </ScrollReveal>

              {/* Right: timeline steps */}
              <div className={styles.processRight}>
                {process.map((p, i) => (
                  <ScrollReveal key={p.step} delay={i * 100}>
                    <div className={styles.processStep}>
                      <div className={styles.processStepNum}>{p.step}</div>
                      <div className={styles.processStepContent}>
                        <h4 className={styles.processStepTitle}>{p.title}</h4>
                        <p className={styles.processStepDesc}>{p.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

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
                    Ready to build your<br /><em>data advantage?</em>
                  </h2>
                  <p className={styles.ctaSubtitle}>
                    Tell us about your project. We&apos;ll scope a custom pipeline, align on your delivery timeline, and get your team moving in days — not months.
                  </p>
                </div>
                <div className={styles.ctaActions}>
                  <Link href="/contact" className="btn btn--primary btn--lg">Start a Pilot Project →</Link>
                  <Link href="/case-studies" className="btn btn--secondary btn--lg">See Case Studies</Link>
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
