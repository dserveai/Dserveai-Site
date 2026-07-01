"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, TrendingDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DetailDrawer from "@/components/ui/DetailDrawer";
import ParticleField from "@/components/ui/ParticleField";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import { DynamicIcon, IconStar } from "@/components/ui/Icons";
import { partnerLogos } from "@/components/ui/PartnerLogos";
import {
  stats, services, solutions, process as processSteps,
  testimonials, blogPosts, caseStudies, partners,
} from "@/lib/data";
import styles from "./page.module.css";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateHomepageGraph } from "@/lib/schema";

// ─── Types ────────────────────────────────────────────────────────────────────
type DrawerPayload =
  | { type: "service"; title: string; description: string; color: string; details: (typeof services)[0]["details"]; iconName: string }
  | { type: "solution"; name: string; desc: string; color: string; details: (typeof solutions)[0]["details"]; iconName: string }
  | { type: "caseStudy"; title: string; description: string; fullDescription: string; solution: string; result: string; tags: string[]; color: string; stats: { v: string; l: string }[] };

// ─── Rotating Hero Text ───────────────────────────────────────────────────────
const heroWords = ["Precision", "Diversity", "Scale", "Quality", "Speed"];

function RotatingText() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % heroWords.length), 2500);
    return () => clearInterval(t);
  }, []);
  return <span className={styles.rotatingWord} key={idx}>{heroWords[idx]}</span>;
}

// ─── Hero Background ──────────────────────────────────────────────────────────
function HeroBg() {
  return (
    <div className={styles.heroBg}>
      <ParticleField />
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
      <div className={styles.gridOverlay} />
      <div className={styles.noiseOverlay} />
    </div>
  );
}

// ─── Video Tabs Data ──────────────────────────────────────────────────────────
const videoTabs = [
  { id: 0, title: "Data Annotation and QA", desc: "High-speed, pixel-perfect annotations for complex datasets.", video: "/videos/1.mp4" },
  { id: 1, title: "Multi-Modal Data Collection", desc: "Capture real-world data across DICOM, EHR, Biometric, Sensor, Egocentric Data, audio, video, LiDAR, and text.", video: "/videos/2.mp4" },
  { id: 2, title: "Synthetic Data Generation", desc: "Generate precise synthetic data for documents, audio, and video.", video: "/videos/3.mp4" },
  { id: 3, title: "Computer Vision Analytics", desc: "Deploy custom vision solutions to automate industrial workflows.", video: "/videos/4.mp4" }
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  const [drawer, setDrawer] = useState<DrawerPayload | null>(null);
  const [activeVideoTab, setActiveVideoTab] = useState(0);
  const closeDrawer = useCallback(() => setDrawer(null), []);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      
      if (isVideoVisible && idx === activeVideoTab) {
        // Only play the active video when the section is in view
        video.play().catch(() => {});
      } else {
        // Pause all other videos and the active one if scrolled out of view
        video.pause();
        // Optional: reset time for inactive videos so they start fresh when clicked again
        if (idx !== activeVideoTab) {
          video.currentTime = 0;
        }
      }
    });
  }, [activeVideoTab, isVideoVisible]);

  return (
    <>
      <SchemaScript schema={generateHomepageGraph()} />
      <Navbar />
      <DetailDrawer data={drawer} onClose={closeDrawer} />
      <main>

        {/* ── HERO ──────────────────────────────────────── */}
        <header className={styles.hero}>
          <HeroBg />
          <div className={`container ${styles.heroContent}`}>
            <h1 className="sr-only">AI Data Annotation and Custom Dataset Collection Services</h1>
            <h2 className={styles.heroTitle}>
              Fuel Your AI With<br />
              Data Built For<br />
              <div className={styles.rotatingContainer}>
                <RotatingText />
              </div>
            </h2>
            <p className={styles.heroDesc}>
              Dserve AI is an AI Data & Solutions Company bridging the gap between AI ambition and execution. We provide the high-quality data, intelligent workflows, and custom solutions required to build reliable, scalable, and real-world AI systems across industries.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/services" className="btn btn--primary btn--lg">Explore Solutions <ArrowRight size={18} /></Link>
              <Link href="/case-studies" className="btn btn--secondary btn--lg" style={{ justifyContent: 'center' }}>See Case Studies</Link>
            </div>
            <div className={styles.heroTrust}>
              <span className={styles.trustLabel}>Trusted by:</span>
              {partners.slice(0, 6).map(p => (
                <span key={p.name} className={styles.trustName}>{p.name}</span>
              ))}
            </div>
          </div>
        </header>

        {/* ── STATS ─────────────────────────────────────── */}
        <section className={styles.statsSection}>
          <div className={styles.statsDivider} />
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map(({ value, label, desc }) => (
                <article key={label} className={styles.statItem}>
                  <div className={styles.statValue}>{value}</div>
                  <div className={styles.statLabel}>{label}</div>
                  <div className={styles.statDesc}>{desc}</div>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.statsDivider} />
        </section>

        {/* ── PARTNERS MARQUEE ──────────────────────────── */}
        <section className={styles.partnersSection}>
          <div className="container">
            <p className={styles.partnersLabel}>Partnered with solution leaders</p>
          </div>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeTrack}>
              {[...partners, ...partners, ...partners].map((p, i) => {
                const Logo = partnerLogos[p.name];
                return (
                  <div key={i} className={styles.partnerBadge}>
                    {Logo
                      ? <Logo height={22} />
                      : <span className={styles.partnerText}>{p.name}</span>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SERVICES (What We Do) ─────────────────────── */}
        <section className={`section ${styles.servicesSection}`} id="services" ref={videoSectionRef}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="section-label">What We Do</span>
              <h2>End-to-End AI Data<br /><span className="gradient-text">Solutions That Scale</span></h2>
              <p className={styles.sectionDesc}>
                Explore our full-stack capabilities with real-time workflow demonstrations.
              </p>
            </div>
            <div className={styles.videoShowcase}>
              <div className={styles.videoTabs}>
                {videoTabs.map((tab) => (
                  <button 
                    key={tab.id}
                    className={`${styles.videoTab} ${activeVideoTab === tab.id ? styles.activeTab : ''}`}
                    onClick={() => setActiveVideoTab(tab.id)}
                  >
                    <h3 className={styles.tabTitle}>{tab.title}</h3>
                    <p className={styles.tabDesc}>{tab.desc}</p>
                  </button>
                ))}
              </div>
              <div className={styles.videoPlayer}>
                <div className={styles.videoWrapper}>
                  {videoTabs.map((tab, idx) => (
                    <video
                      key={tab.id}
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={tab.video}
                      muted
                      loop
                      playsInline
                      className={`${styles.videoElement} ${activeVideoTab === tab.id ? styles.activeVideo : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────── */}
        <section className={`section ${styles.processSection}`} id="process">
          <div className={styles.processGlow} />
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="section-label">Our Process</span>
              <h2>From Request to Results<br /><span className="gradient-text">In 4 Simple Steps</span></h2>
              <p className={styles.sectionDesc}>
                Our streamlined process ensures high-quality AI datasets delivered fast, no matter how complex your requirements.
              </p>
            </div>
            <div className={styles.processPipeline}>
              {processSteps.map(({ step, title, desc }, i) => (
                <article key={step} className={styles.pipelineStep}>
                  <div className={styles.stepWatermark}>{step}</div>
                  <div className={styles.stepContent}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepNumOrb}>{step}</div>
                      {i < processSteps.length - 1 && (
                        <div className={styles.stepConnector}>
                          <div className={styles.connectorLine} />
                        </div>
                      )}
                    </div>
                    <h4 className={styles.stepTitle}>{title}</h4>
                    <p className={styles.stepDesc}>{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTIONS ────────────────────────────────── */}
        <section className={`section ${styles.solutionsSection}`} id="solutions">
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="section-label">Solutions We Provide</span>
              <h2>AI-Driven Data Solutions<br /><span className="gradient-text">For Every Use Case</span></h2>
              <p className={styles.sectionDesc}>Click any solution to see exactly what we deliver for it.</p>
            </div>
            <div className={styles.bentoGrid}>
              {solutions.map((ind, i) => (
                <ScrollReveal key={ind.name} delay={i * 50}>
                  <article>
                    <Link href={`/solutions/${ind.slug}`} style={{ textDecoration: 'none' }}>
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
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ──────────────────────────────── */}
        <section className={`section ${styles.caseSection}`} id="case-studies">
          <div className="container">
            <div className={styles.sectionHeaderRow}>
              <div>
                <span className="section-label">Proven Results</span>
                <h2>Real-World Success.<br /><span className="gradient-text">Proven Case Studies.</span></h2>
              </div>
              <Link href="/case-studies" className="btn btn--secondary">View All Cases <ArrowRight size={18} /></Link>
            </div>
            <div className={styles.caseMinimalGrid}>
              {caseStudies.map((cs, i) => (
                <ScrollReveal key={cs.id} delay={i * 100}>
                  <article>
                    <Link 
                      href={`/case-studies/${cs.slug}`}
                      className={styles.caseMinimalCard}
                      style={{ "--c": cs.color, textDecoration: 'none', display: 'flex' } as React.CSSProperties}
                    >
                      <div className={styles.caseCardBg} />
                      <div className={styles.caseCardContent}>
                        <div className={styles.caseCardTop}>
                          <span className={styles.caseMinimalSolution}>{cs.solution}</span>
                          <div className={styles.caseMinimalMetric}>
                            {cs.result}
                          </div>
                        </div>
                        <div className={styles.caseCardMiddle}>
                          <h4 className={styles.caseMinimalTitle}>{cs.title}</h4>
                          <p className={styles.caseMinimalDesc}>{cs.description}</p>
                        </div>
                        <div className={styles.caseCardBottom}>
                          <span className={styles.caseMinimalReadMore}>Read case study</span>
                          <div className={styles.caseMinimalArrow}><ArrowRight size={18} /></div>
                        </div>
                      </div>
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────── */}
        <section className={`section ${styles.testimonialsSection}`}>
          <div className={styles.testimonialsBg} />
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="section-label">Client Stories</span>
              <h2>Voices of <span className="gradient-text">Success</span></h2>
            </div>
            <div className={styles.testimonialsMarqueeWrapper}>
              <div className={styles.testimonialsMarqueeTrack}>
                {[...testimonials, ...testimonials].map(({ role, text, rating }, i) => (
                  <article key={i} className={styles.testimonialPremiumCard}>
                    <div className={styles.testiQuoteMark}>"</div>
                    <div className={styles.testimonialContent}>
                      <div className={styles.testimonialStars}>
                        {Array.from({ length: rating }).map((_, i) => (
                          <IconStar key={i} size={18} fill="#0ea5e9" color="#0ea5e9" />
                        ))}
                      </div>
                      <p className={styles.testimonialText}>{text}</p>
                      <div className={styles.testimonialAuthorGroup}>
                        <div className={styles.testiAuthorInfo}>
                          <div className={styles.testimonialRolePremium}>{role}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOG PREVIEW ──────────────────────────────── */}
        <section className={`section ${styles.blogSection}`} id="blog">
          <div className="container">
            <div className={styles.sectionHeaderRow}>
              <div>
                <span className="section-label">Latest Insights</span>
                <h2>Explore Our <span className="gradient-text">Blog</span></h2>
              </div>
              <Link href="/blog" className="btn btn--secondary">View All Posts <ArrowRight size={18} /></Link>
            </div>
            <div className={styles.blogPremiumGrid}>
              {blogPosts.slice(0, 6).map(({ slug, title, category, date, readTime }, i) => (
                <ScrollReveal key={slug} delay={i * 100}>
                  <article>
                    <Link href={`/blog/${slug}`} className={styles.blogPremiumCard}>
                      <div className={styles.blogCardGlow} />
                      <div className={styles.blogContentWrapper}>
                        <div className={styles.blogMeta}>
                          <span className={styles.blogCategory}>{category}</span>
                          <span className={styles.blogReadTime}>{readTime} read</span>
                        </div>
                        <h4 className={styles.blogPremiumTitle}>{title}</h4>
                        <div className={styles.blogPremiumFooter}>
                          <span className={styles.blogDate}>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          <div className={styles.blogPremiumArrow}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBg} />
          <div className="container">
            <div className={styles.ctaBox}>
              <div className={styles.ctaTopLine} />
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                  Ready to Build<br />
                  <span className={styles.ctaGradientText}>Smarter AI?</span>
                </h2>
                <p className={styles.ctaDesc}>
                  Tell us about your AI project and our experts will design a custom data pipeline tailored to your unique requirements. Let&apos;s build the future of AI together.
                </p>
                <div className={styles.ctaCtas}>
                  <Link href="/contact" className={styles.ctaBtnPrimary}>
                    <span>Discuss Your Project</span>
                    <div className={styles.ctaBtnArrow}><ArrowRight size={18} /></div>
                  </Link>
                  <Link href="/services" className={styles.ctaBtnSecondary}>Explore Services</Link>
                </div>
                <div className={styles.ctaFeatures}>
                  {["Custom data pipelines", "HIPAA & GDPR compliant", "Expert QA teams", "Enterprise scalability"].map(f => (
                    <div key={f} className={styles.ctaFeature}>
                      <div className={styles.ctaFeatureCheck}>✓</div> {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.ctaVisual}>
                <div className={styles.ctaOrbContainer}>
                  <div className={styles.ctaOrb1} />
                  <div className={styles.ctaOrb2} />
                  <div className={styles.ctaOrb3} />
                </div>
                <div className={styles.ctaCard}>
                  <div className={styles.ctaCardIcon}><DynamicIcon name="rocket" size={24} color="#0ea5e9" /></div>
                  <div className={styles.ctaCardText}><strong>10x</strong><br />Faster time to market</div>
                </div>
                <div className={styles.ctaCard2}>
                  <div className={styles.ctaCardIcon}><IconStar size={24} color="#f59e0b" /></div>
                  <div className={styles.ctaCardText}><strong>100%</strong><br />Quality guaranteed</div>
                </div>
                <div className={styles.ctaCard3}>
                  <div className={styles.ctaCardIcon}><TrendingDown size={24} color="#10b981" /></div>
                  <div className={styles.ctaCardText}><strong>Huge</strong><br />Cost savings</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
