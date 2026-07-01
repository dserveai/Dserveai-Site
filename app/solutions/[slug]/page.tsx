import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { solutions } from "@/lib/data";
import { DynamicIcon } from "@/components/ui/Icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import LiveDashboard from "@/components/ui/LiveDashboard";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateService, generateBreadcrumbList } from "@/lib/schema";
import styles from "./page.module.css";

// Import bespoke custom content blocks
import HealthcarePageContent from "@/components/solutions/HealthcarePageContent";
import AgenticPageContent from "@/components/solutions/AgenticPageContent";
import CVPageContent from "@/components/solutions/CVPageContent";
import GenAIPageContent from "@/components/solutions/GenAIPageContent";
import MultimodalPageContent from "@/components/solutions/MultimodalPageContent";
import BiometricsPageContent from "@/components/solutions/BiometricsPageContent";
import ConversationalPageContent from "@/components/solutions/ConversationalPageContent";
import PhysicalPageContent from "@/components/solutions/PhysicalPageContent";

// Import Pipeline Animations
import { 
  HealthcareOrb, 
  AgenticOrb, 
  CVOrb, 
  GenAIOrb, 
  MultimodalOrb, 
  BiometricsOrb, 
  ConversationalOrb, 
  PhysicalOrb 
} from "@/components/solutions/PipelineOrbs";

function getCustomContent(slug: string, solution: any, color: string) {
  switch (slug) {
    case "healthcare-ai": return <HealthcarePageContent solution={solution} color={color} />;
    case "agentic-ai": return <AgenticPageContent solution={solution} color={color} />;
    case "computer-vision": return <CVPageContent solution={solution} color={color} />;
    case "generative-ai": return <GenAIPageContent solution={solution} color={color} />;
    case "multimodal-ai": return <MultimodalPageContent solution={solution} color={color} />;
    case "biometric-ai": return <BiometricsPageContent solution={solution} color={color} />;
    case "conversational-ai": return <ConversationalPageContent solution={solution} color={color} />;
    case "physical-ai": return <PhysicalPageContent solution={solution} color={color} />;
    default: return <CVPageContent solution={solution} color={color} />;
  }
}

function getPipelineAnimation(slug: string, color: string) {
  switch (slug) {
    case "healthcare-ai": return <HealthcareOrb color={color} />;
    case "agentic-ai": return <AgenticOrb color={color} />;
    case "computer-vision": return <CVOrb color={color} />;
    case "generative-ai": return <GenAIOrb color={color} />;
    case "multimodal-ai": return <MultimodalOrb color={color} />;
    case "biometric-ai": return <BiometricsOrb color={color} />;
    case "conversational-ai": return <ConversationalOrb color={color} />;
    case "physical-ai": return <PhysicalOrb color={color} />;
    default: return <CVOrb color={color} />;
  }
}

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
  const solution = solutions.find((i) => i.slug === params.slug);
  if (!solution) return { title: "Not Found" };

  const title = `Enterprise AI Data Pipelines for ${solution.name} | Dserve AI`;
  const description = `Accelerate your ${solution.name} models with our secure, highly accurate, and scalable data processing engine. ${solution.details.overview.substring(0, 100)}...`;

  return {
    title,
    description,
    keywords: `${solution.name.toLowerCase()} ai, ${solution.name.toLowerCase()} training data, ai data pipelines for ${solution.name.toLowerCase()}`,
    alternates: { canonical: `https://dserveai.com/solutions/${params.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://dserveai.com/solutions/${params.slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: solution.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export async function generateStaticParams() {
  return solutions.map((i) => ({ slug: i.slug }));
}

/* ============================================================
   PAGE
   ============================================================ */
export default async function SolutionPage(props: Props) {
  const params = await props.params;
  const solution = solutions.find((i) => i.slug === params.slug);
  if (!solution) notFound();

  const workflow = workflowData[solution.slug] ?? [];
  const color = solution.color;

  return (
    <>
      <SchemaScript 
        schema={[
          generateService({
            name: `AI Data Pipelines for ${solution.name}`,
            description: solution.details.overview,
            path: `/solutions/${solution.slug}`
          }),
          generateBreadcrumbList([
            { name: "Solutions", path: "/solutions" },
            { name: solution.name, path: `/solutions/${solution.slug}` }
          ])
        ]}
      />
      <Navbar />
      <main id="main">

        {/* ============================================================
            1. IMMERSIVE SCROLL-JACKING HERO
        ============================================================ */}
        <section className={styles.heroSection} style={{ "--c": color } as React.CSSProperties}>
          <div className={styles.heroBg} />
          
          <div className={styles.heroContent}>
            {/* Label Removed */}
            <h1 className={styles.heroTitle}>
              Enterprise Data Pipelines for {solution.name}
            </h1>
          </div>

          <div className={`container ${styles.dashboardWrapper}`}>
            <ScrollReveal>
              <LiveDashboard slug={solution.slug} color={color} solutionName={solution.name} />
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================
            2. SEO DEEP DIVE BENTO GRID
        ============================================================ */}
        {/* ============================================================
            2. CUSTOM BESPOKE CONTENT
        ============================================================ */}
        {getCustomContent(solution.slug, solution, color)}

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
                  {getPipelineAnimation(solution.slug, color)}
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
                <h2 className={styles.leadTitle}>Start Your {solution.name} Pilot</h2>
                <p className={styles.leadDesc}>
                  Stop worrying about data quality. Book a technical scoping call with our engineers today to design a custom pipeline for your model.
                </p>
                <div className={styles.leadForm} style={{ justifyContent: 'center' }}>
                  <Link href="/contact" className={styles.leadBtn} style={{ background: color }}>
                    Book Scoping Call
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================
            RELATED SOLUTIONS (INTERNAL LINKING)
        ============================================================ */}
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Explore Other Solutions</h2>
            <div className={styles.relatedGrid}>
              {solutions.filter(i => i.slug !== solution.slug).map(ind => (
                <Link 
                  key={ind.slug} 
                  href={`/solutions/${ind.slug}`} 
                  className={styles.relatedCard}
                  style={{ "--hover-color": `${ind.color}15` } as React.CSSProperties}
                >
                  <div className={styles.relatedCardTop}>
                    <div className={styles.relatedIconWrap} style={{ color: ind.color, background: `${ind.color}15` }}>
                      <DynamicIcon name={ind.iconName} size={24} color={ind.color} />
                    </div>
                    <span className={styles.relatedArrow}>→</span>
                  </div>
                  <h4 className={styles.relatedCardTitle}>{ind.name}</h4>
                  <p className={styles.relatedCardDesc}>{ind.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
