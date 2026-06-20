import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { industries } from "@/lib/data";
import { DynamicIcon } from "@/components/ui/Icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import LiveDashboard from "@/components/ui/LiveDashboard";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ============================================================
   WORKFLOW STEPS (Apple-style Sticky Scroll)
   ============================================================ */
const workflowData: Record<string, { title: string; desc: string }[]> = {
  "healthcare-ai": [
    { title: "Secure BAA Intake", desc: "Data is securely transferred into our HIPAA-compliant, zero-trust cloud environment." },
    { title: "Automated Redaction", desc: "Proprietary models strip 18+ types of PHI from text, DICOM, and metadata." },
    { title: "Expert Annotation", desc: "Board-certified radiologists and clinicians label the de-identified data." },
    { title: "Audit & Delivery", desc: "A final QA pass guarantees 98%+ IAA before secure delivery to your AWS/GCP buckets." },
  ],
  "computer-vision": [
    { title: "Ontology Mapping", desc: "We map your precise edge cases, occlusion rules, and taxonomy." },
    { title: "Pixel-Perfect Labeling", desc: "Annotators apply tight bounding boxes, polygons, and keypoints." },
    { title: "Multi-Stage QA", desc: "Our 3-tier review process filters out human error and ensures model-ready data." },
    { title: "Format Export", desc: "Delivered instantly in native formats like COCO JSON, YOLO, or Pascal VOC." },
  ],
  "agentic-ai": [
    { title: "Environment Mapping", desc: "We define the APIs, tools, and constraints your AI agent will interact with." },
    { title: "Trajectory Collection", desc: "Human experts record complete Chain-of-Thought demonstrations for complex tasks." },
    { title: "Preference Ranking", desc: "Alternative agent actions are ranked to build RLHF reward models." },
    { title: "Dataset Delivery", desc: "Structured logs are compiled and formatted for immediate training loops." },
  ],
  "generative-ai": [
    { title: "Adversarial Prompting", desc: "We red-team the model with diverse, complex prompt sets." },
    { title: "Instruction Tuning", desc: "Domain experts write accurate, logically structured, and formatted responses." },
    { title: "RLHF Scoring", desc: "Outputs are evaluated based on Helpfulness, Honesty, and Harmlessness." },
    { title: "Safety Alignment", desc: "Final checks remove bias, toxicity, and hallucinations before export." },
  ],
  "multimodal-ai": [
    { title: "Cross-Modal Sourcing", desc: "We ingest massive streams of video, audio, and textual data simultaneously." },
    { title: "Dense Captioning", desc: "Annotators write highly descriptive text linking visual frames to language." },
    { title: "Temporal Sync", desc: "Timestamps align audio waveforms, video frames, and descriptive metadata." },
    { title: "Unified Schema Export", desc: "Delivered in WebDataset or JSON formats ready for multi-modal ingestion." },
  ],
  "biometric-ai": [
    { title: "Ethical Sourcing", desc: "We deploy global teams to collect biometric data under strict opt-in consent." },
    { title: "Diverse Acquisition", desc: "Data is captured across 80+ demographics and varying lighting conditions." },
    { title: "Anti-Spoofing Generation", desc: "We create presentation attacks to train liveness detection systems." },
    { title: "Anonymized Delivery", desc: "All non-essential PII is scrubbed before the biometric dataset is delivered securely." },
  ],
  "geospatial-ai": [
    { title: "Satellite Sourcing", desc: "Acquiring high-resolution multi-spectral and SAR observation data." },
    { title: "Terrain Annotation", desc: "Precision polygon mapping for infrastructure, land-use, and agriculture." },
    { title: "Change Detection", desc: "Aligning temporal imagery to map urban growth and disaster impact." },
    { title: "Georeferenced Export", desc: "Delivering shapefiles and GeoJSON strictly aligned to Earth coordinate systems." },
  ],
  "conversational-ai": [
    { title: "Corpus Design", desc: "Structuring intent hierarchies, entities, and dialogue flows." },
    { title: "Speech Collection", desc: "Native speakers generate authentic dialogue across diverse dialects and acoustics." },
    { title: "Diarization & Transcription", desc: "Perfectly aligning audio with structured text and sentiment layers." },
    { title: "NLU Export", desc: "Delivering utterance-intent pairs ready for ASR and NLU engine training." },
  ],
};

/* ============================================================
   METADATA
   ============================================================ */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return { title: "Not Found" };
  return {
    title: `Enterprise Data Pipelines for ${industry.name} | Dserve AI`,
    description: `Accelerate your ${industry.name} models with our secure, highly accurate, and scalable data processing engine.`,
    openGraph: {
      title: `Enterprise Data Pipelines for ${industry.name}`,
      description: industry.details.overview,
    },
  };
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

/* ============================================================
   PAGE
   ============================================================ */
export default async function IndustryPage(props: Props) {
  const params = await props.params;
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) notFound();

  const workflow = workflowData[industry.slug] ?? [];
  const color = industry.color;

  return (
    <>
      <Navbar />
      <main>

        {/* ============================================================
            1. IMMERSIVE SCROLL-JACKING HERO
        ============================================================ */}
        <section className={styles.heroSection} style={{ "--c": color } as React.CSSProperties}>
          <div className={styles.heroBg} />
          
          <div className={styles.heroContent}>
            <div className={styles.heroLabel}>
              <DynamicIcon name={industry.iconName} size={16} color={color} />
              Industry Data Solution
            </div>
            <h1 className={styles.heroTitle}>
              Enterprise Data Pipelines for {industry.name}
            </h1>
          </div>

          <div className={`container ${styles.dashboardWrapper}`}>
            <ScrollReveal>
              <LiveDashboard slug={industry.slug} color={color} industryName={industry.name} />
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================
            2. SEO DEEP DIVE BENTO GRID
        ============================================================ */}
        <section className={styles.deepDiveSection} style={{ "--c": color } as React.CSSProperties}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.sectionHeader}>
                <h2>Comprehensive {industry.name} Capabilities</h2>
                <p>
                  Our specialized annotators and domain experts execute complex data tasks with unmatched precision. Everything is tailored specifically to the requirements of the {industry.name} sector.
                </p>
              </div>
            </ScrollReveal>

            <div className={styles.bentoGrid6}>
              <ScrollReveal delay={100} className={`${styles.bentoCard} ${styles.bentoCardLarge}`}>
                <h3 className={styles.bentoCardTitle}>Specialized Data Modalities</h3>
                <p className={styles.bentoCardDesc}>
                  We ingest and process exactly what you need. From massive JSON-L files containing conversational turns, to high-resolution DICOM imagery, our platform natively supports the standard data formats essential for {industry.name} training.
                </p>
                <div className={styles.microAnim} />
              </ScrollReveal>
              
              <ScrollReveal delay={200} className={styles.bentoCard}>
                <h3 className={styles.bentoCardTitle}>95%+ IAA Accuracy</h3>
                <p className={styles.bentoCardDesc}>
                  Every dataset undergoes strict Inter-Annotator Agreement checks. We don't deliver data until it passes our multi-stage QA threshold.
                </p>
                <div className={styles.microAnim} style={{ animationDelay: '0.5s' }} />
              </ScrollReveal>

              <ScrollReveal delay={300} className={styles.bentoCard}>
                <h3 className={styles.bentoCardTitle}>Subject Matter Experts</h3>
                <p className={styles.bentoCardDesc}>
                  Crowdsourcing fails for {industry.name}. We utilize vetted domain experts (e.g., clinicians, linguists, engineers) to execute complex labeling tasks.
                </p>
                <div className={styles.microAnim} style={{ animationDelay: '1s' }} />
              </ScrollReveal>

              <ScrollReveal delay={400} className={`${styles.bentoCard} ${styles.bentoCardLarge}`}>
                <h3 className={styles.bentoCardTitle}>Zero-Trust Compliance</h3>
                <p className={styles.bentoCardDesc}>
                  Security is paramount. Data is processed in SOC2 Type II and HIPAA-compliant environments. Annotators work via secure VDI terminals, ensuring your proprietary {industry.name} assets never leave our encrypted sandbox.
                </p>
                <div className={styles.microAnim} style={{ animationDelay: '1.5s' }} />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. STICKY SCROLL PROCESS
        ============================================================ */}
        <section className={styles.stickyProcessSection} style={{ "--c": color } as React.CSSProperties}>
          <div className="container">
            <ScrollReveal>
              <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '80px', textAlign: 'center' }}>
                The Pipeline Engine
              </h2>
            </ScrollReveal>

            <div className={styles.stickyContainer}>
              {/* Sticky Graphic on Left */}
              <div className={styles.stickyLeft}>
                <div className={styles.stickyGraphic} />
                <div className={styles.stickyCenterOrb}>
                  <DynamicIcon name={industry.iconName} size={48} color={color} />
                </div>
              </div>

              {/* Scrolling Text on Right */}
              <div className={styles.stickyRight}>
                {workflow.map((step, i) => (
                  <ScrollReveal key={i} className={styles.scrollStep}>
                    <div className={styles.stepNum}>// Phase 0{i + 1}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. LEAD MAGNET CTA
        ============================================================ */}
        <section className={styles.leadMagnetSection} style={{ "--c": color } as React.CSSProperties}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.leadMagnetBox}>
                <h2 className={styles.leadTitle}>Start Your {industry.name} Pilot</h2>
                <p className={styles.leadDesc}>
                  Stop worrying about data quality. Book a technical scoping call with our engineers today to design a custom pipeline for your model.
                </p>
                <div className={styles.leadForm}>
                  <input type="email" placeholder="Enter your work email..." className={styles.leadInput} />
                  <Link href="/contact" className={styles.leadBtn}>
                    Book Scoping Call
                  </Link>
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
