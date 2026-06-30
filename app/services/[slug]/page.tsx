import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services } from "@/lib/data";
import SchemaScript from "@/components/seo/SchemaScript";
import { generateService, generateBreadcrumbList } from "@/lib/schema";
import { DynamicIcon } from "@/components/ui/Icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  CollectionVisualizer,
  AnnotationVisualizer,
  QAVisualizer,
  ComputerVisionVisualizer,
  SyntheticVisualizer,
  CustomAIVisualizer,
} from "@/components/ui/ServiceVisualizer";
import AnnotationPageContent from "@/components/services/AnnotationPageContent";
import MultiModalPageContent from "@/components/services/MultiModalPageContent";
import SyntheticPageContent from "@/components/services/SyntheticPageContent";
import CVAnalyticsPageContent from "@/components/services/CVAnalyticsPageContent";
import CustomAIPageContent from "@/components/services/CustomAIPageContent";
import QAPageContent from "@/components/services/QAPageContent";

/* ============================================================
   VISUALIZER selector (Hero Animation)
   ============================================================ */
function getVisualizer(slug: string, color: string) {
  switch (slug) {
    case "data-annotation-and-qa":      return <AnnotationVisualizer color={color} />;
    case "multi-modal-data-collection": return <CollectionVisualizer color={color} />;
    case "synthetic-data-generation":   return <SyntheticVisualizer color={color} />;
    case "computer-vision-analytics":   return <ComputerVisionVisualizer color={color} />;
    case "custom-ai-solutions":         return <CustomAIVisualizer color={color} />;
    case "quality-assurance":           return <QAVisualizer color={color} />;
    default:                            return <CollectionVisualizer color={color} />;
  }
}
function getCustomContent(slug: string, service: any, steps: any, color: string) {
  switch (slug) {
    case "data-annotation-and-qa": return <AnnotationPageContent service={service} steps={steps} color={color} />;
    case "multi-modal-data-collection": return <MultiModalPageContent service={service} steps={steps} color={color} />;
    case "synthetic-data-generation": return <SyntheticPageContent service={service} steps={steps} color={color} />;
    case "computer-vision-analytics": return <CVAnalyticsPageContent service={service} steps={steps} color={color} />;
    case "custom-ai-solutions": return <CustomAIPageContent service={service} steps={steps} color={color} />;
    case "quality-assurance": return <QAPageContent service={service} steps={steps} color={color} />;
    default: return <AnnotationPageContent service={service} steps={steps} color={color} />;
  }
}
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ============================================================
   SEO: unique title, description, keywords per service
   ============================================================ */
const seoMeta: Record<string, { title: string; description: string; keywords: string }> = {
  "data-annotation-and-qa": {
    title: "Data Annotation & QA Services for AI Models | Dserve AI",
    description: "Expert data annotation and labeling: bounding boxes, semantic segmentation, keypoints, and NLP tagging. We deliver 99%+ IAA scores with 3-stage QA, scalable to millions of assets.",
    keywords: "data annotation service, image labeling, bounding box annotation, semantic segmentation, NLP data labeling, AI data annotation, data qa",
  },
  "multi-modal-data-collection": {
    title: "Multi-Modal Dataset Collection Services | Dserve AI",
    description: "Dserve AI captures real-world training datasets across DICOM, EHR, Biometric, Sensor, Egocentric Data, audio, video, LiDAR, and text for complex AI systems. Sourced from 30+ countries ethically.",
    keywords: "multi-modal dataset, data collection, audio recording, video datasets, LiDAR data collection, text corpus curation",
  },
  "synthetic-data-generation": {
    title: "Synthetic Data Generation Services | Dserve AI",
    description: "Generate precise synthetic data for documents, audio, and video to augment real-world datasets. Overcome data scarcity with procedural 3D environments.",
    keywords: "synthetic data, data generation, procedural 3D environments, synthetic document generation, deepfake audio, domain randomization",
  },
  "computer-vision-analytics": {
    title: "Computer Vision Analytics & Deployment | Dserve AI",
    description: "Deploy custom vision solutions to automate industrial workflows. End-to-end computer vision analytics, defect detection, and behavioral analysis.",
    keywords: "computer vision analytics, defect detection, object tracking, facial recognition pipeline, custom vision model deployment",
  },
  "custom-ai-solutions": {
    title: "Custom AI Solutions & Proprietary Algorithms | Dserve AI",
    description: "Industry-specific AI solutions built from the ground up to address your unique operational challenges. Bespoke architectures, model training, and integration.",
    keywords: "custom AI solutions, predictive maintenance, proprietary algorithms, bespoke model training, supply chain optimization",
  },
  "quality-assurance": {
    title: "AI Dataset Quality Assurance & Validation | Dserve AI",
    description: "Rigorous QA for AI training data. We provide annotation audits, consistency checks, bias scans, and complete QA reports. Your data will meet production-grade standards.",
    keywords: "AI dataset quality assurance, data validation, annotation accuracy, inter-annotator agreement, training data QA",
  },
};

/* ============================================================
   PROOF NUMBERS per service
   ============================================================ */
const proofNumbers: Record<string, { value: string; label: string }[]> = {
  "data-annotation-and-qa": [
    { value: "99%+", label: "Inter-Annotator Agreement score on all projects" },
    { value: "3-Stage", label: "QA review on every single annotation" },
    { value: "10+", label: "Annotation formats supported out of the box" },
  ],
  "multi-modal-data-collection": [
    { value: "1M+", label: "Data units collected across all modalities" },
    { value: "30+", label: "Countries sourced across 6 continents" },
    { value: "50+", label: "Dataset categories and specializations" },
  ],
  "synthetic-data-generation": [
    { value: "100M+", label: "Synthetic Documents/Images" },
    { value: "0", label: "Privacy or copyright risks attached" },
    { value: "Docs", label: "Synthetic Document Generation" },
  ],
  "computer-vision-analytics": [
    { value: "+28%", label: "Average operational efficiency increase" },
    { value: "-45%", label: "Reduction in defect rates/errors" },
    { value: "$1.2M", label: "Average annual cost savings" },
  ],
  "custom-ai-solutions": [
    { value: "4-6 Wks", label: "Average time to initial model deployment" },
    { value: "100%", label: "Proprietary IP retained by your business" },
    { value: "End-to-End", label: "From strategy to cloud infrastructure" },
  ],
  "quality-assurance": [
    { value: "100%", label: "Strict ML Guideline Enforcement" },
    { value: "Unlimited", label: "Vendors & Freelancers Managed" },
    { value: "0", label: "Format Inconsistencies Delivered" },
  ],
};

/* ============================================================
   STICKY STEPS data — Deccan-inspired //01. code prefix style
   ============================================================ */
const stickyStepsData: Record<string, { num: string; title: string; desc: string; detail: string; tags?: string[] }[]> = {
  "data-annotation-and-qa": [
    {
      num: "01", title: "Taxonomy & Tooling Setup",
      desc: "We build a precise labeling guide and configure the annotation workspace to match your model's exact output schema.",
      detail: "Before any annotator touches your data, we work with your engineering team to build a detailed annotation taxonomy. Every edge case is documented. Tools are configured to enforce your schema: bounding box aspect ratios, class hierarchies, and overlap rules. Every label is consistent from day one.",
      tags: ["Taxonomy design", "Schema configuration", "Edge case docs", "Tool setup"],
    },
    {
      num: "02", title: "Primary Annotation Pass",
      desc: "Trained, domain-matched annotators label every asset under real-time quality supervision.",
      detail: "We match annotators to your domain: CV specialists for images, linguists for NLP, and clinical experts for medical data. Every annotator passes a task-specific calibration test before touching your dataset. You can monitor progress in real time with per-annotator accuracy tracking.",
      tags: ["Domain-matched teams", "Calibration test", "Real-time monitoring", "Accuracy tracking"],
    },
    {
      num: "03", title: "QA Specialist Review",
      desc: "A second expert layer audits every annotation for accuracy, consistency, and schema compliance.",
      detail: "Our QA specialists work independently from the primary annotators. They audit a statistically significant sample per class, apply automated consistency checks, and manually review any flagged items. We maintain Inter-Annotator Agreement (IAA) scores above 99% on every project delivery.",
      tags: ["Independent QA layer", "IAA 99%+", "Automated consistency", "Per-class audits"],
    },
    {
      num: "04", title: "Export & Integration",
      desc: "Delivered in your format, ready to plug directly into your training pipeline.",
      detail: "We handle format conversion for COCO JSON, YOLO TXT, Pascal VOC XML, CONLL, CSV, or custom schemas. We validate the output file structure before delivery and provide an integration guide so your engineering team can onboard the dataset seamlessly.",
      tags: ["COCO JSON", "YOLO", "Pascal VOC", "CONLL", "Custom formats"],
    },
  ],
  "multi-modal-data-collection": [
    {
      num: "01", title: "Define Requirements",
      desc: "We align on exactly what you need before a single asset is captured.",
      detail: "Every project starts with a structured brief covering data types, volume targets, demographics, languages, and compliance constraints. Your project manager confirms the spec before any collection begins. No ambiguity, no rework.",
      tags: ["Data modality", "Volume targets", "Demographics", "Compliance scope"],
    },
    {
      num: "02", title: "Global Collection Campaign",
      desc: "Our specialist network captures data across the exact environments your model needs to learn from.",
      detail: "We deploy field teams and digital collection channels across 30+ countries. Whether you need street-level video in rain, native speech recordings across dialects, or structured text, we capture it to your exact specification. Real-time dashboards keep your team informed.",
      tags: ["30+ countries", "Multi-modal", "Real-time tracking", "Environmental diversity"],
    },
    {
      num: "03", title: "Metadata Tagging & QA",
      desc: "Every asset is reviewed, tagged with structured metadata, and quality-checked before entering your dataset.",
      detail: "Raw collected data passes through our QA layer before it ever counts toward your volume commitment. We attach rich metadata (location, device, lighting conditions, speaker demographics, timestamps) to every asset and verify it against your brief. Nothing ships without passing this gate.",
      tags: ["Rich metadata", "QA gate", "Provenance tracking", "Brief verification"],
    },
    {
      num: "04", title: "Structured Delivery",
      desc: "Packaged, documented, and delivered to your cloud storage in your chosen format.",
      detail: "We bundle your dataset with full provenance documentation, a collection summary report, and metadata index. Delivery goes directly to your S3 bucket, GCS, Azure Blob, or SFTP endpoint. We include one revision cycle so if anything needs adjustment, we handle it without extra charges.",
      tags: ["AWS S3", "GCS", "Azure Blob", "Provenance docs", "Revision included"],
    },
  ],
  "synthetic-data-generation": [
    {
      num: "01", title: "Scenario & Parameter Mapping",
      desc: "We define the exact real-world physics, lighting, and scenarios the synthetic data must replicate.",
      detail: "We collaborate with your ML team to identify model blindspots. We define lighting variances, camera intrinsics/extrinsics, object occlusions, and physics rules to perfectly mirror the target environment.",
      tags: ["Scenario mapping", "Camera intrinsics", "Physics simulation", "Blindspot analysis"],
    },
    {
      num: "02", title: "Procedural Engine Setup",
      desc: "Our technical artists build the 3D environments and procedural logic in Unreal Engine or Unity.",
      detail: "We construct highly realistic 3D assets and environments. Procedural logic is then applied to randomize object placement, textures, and weather conditions, ensuring infinite variability across the generated dataset.",
      tags: ["Unreal Engine", "Unity 3D", "Procedural logic", "Texture randomization"],
    },
    {
      num: "03", title: "Mass Generation & Ground Truth",
      desc: "Millions of perfectly annotated images and videos are rendered via cloud GPU clusters.",
      detail: "The engine runs headless across massive GPU clusters, rendering photorealistic frames. The engine outputs mathematically perfect ground truth labels simultaneously with the images, delivering flawless segmentation masks, depth maps, and bounding boxes.",
      tags: ["Cloud GPU rendering", "Perfect ground truth", "Depth maps", "Instant segmentation"],
    },
    {
      num: "04", title: "Format Packaging & Delivery",
      desc: "Synthetic datasets are packaged into standard AI formats and delivered securely.",
      detail: "The final output is converted into COCO, Pascal VOC, or your custom JSON schema, bundled with full parameter documentation, and transferred securely to your cloud storage.",
      tags: ["COCO JSON", "Parameter metadata", "Secure cloud transfer", "Custom schema"],
    },
  ],
  "computer-vision-analytics": [
    {
      num: "01", title: "Operational Audit",
      desc: "We analyze your operations to identify the highest ROI automation opportunities.",
      detail: "Before writing any code, we evaluate your workflows. We identify areas where human monitoring is a bottleneck—such as manual defect inspection, inventory counting, or safety compliance—and calculate the projected cost savings of automating those tasks with AI.",
      tags: ["Workflow analysis", "Bottleneck identification", "Cost saving projections", "ROI calculation"],
    },
    {
      num: "02", title: "Custom AI Deployment",
      desc: "We deploy vision algorithms trained specifically on your environment's data.",
      detail: "Using your existing camera infrastructure, we deploy custom computer vision models. These models learn the exact specifications of your products, the layouts of your facilities, and the behaviors that matter to your business, operating with superhuman consistency.",
      tags: ["Infrastructure integration", "Custom vision models", "Superhuman consistency", "Environment mapping"],
    },
    {
      num: "03", title: "Automated Actionable Insights",
      desc: "Raw video feeds are transformed into structured, actionable business telemetry.",
      detail: "Pixels are converted into profit. The system automatically flags defects, tracks cycle times, or alerts managers to safety hazards in real-time. Instead of watching screens, your team receives structured data and instant alerts that drive immediate operational corrections.",
      tags: ["Real-time alerts", "Structured telemetry", "Defect flagging", "Cycle time tracking"],
    },
    {
      num: "04", title: "Continuous ROI Optimization",
      desc: "Live dashboards track efficiency gains and labor cost savings 24/7.",
      detail: "We pipe the AI's telemetry directly into custom business intelligence dashboards. You can monitor efficiency increases, defect reductions, and labor cost savings in real-time, proving the exact ROI of your computer vision deployment.",
      tags: ["Live dashboards", "Efficiency metrics", "Cost tracking", "ROI validation"],
    },
  ],
  "custom-ai-solutions": [
    {
      num: "01", title: "Deep Dive Consulting",
      desc: "We embed with your team to understand the core operational bottleneck.",
      detail: "Custom AI starts with understanding the business logic. We analyze your existing data silos, operational workflows, and the specific ROI target, ensuring the AI solution is solving a real, measurable problem.",
      tags: ["Workflow analysis", "ROI targeting", "Data silo audit", "Business logic alignment"],
    },
    {
      num: "02", title: "Bespoke Architecture Design",
      desc: "Our AI engineers design a multi-model architecture tailored to your unique use case.",
      detail: "We don't rely on off-the-shelf APIs. We design a proprietary pipeline that might combine RAG (Retrieval-Augmented Generation) for your documents, custom vision models for your factory floor, and predictive tabular models for your supply chain.",
      tags: ["Multi-model pipelines", "RAG systems", "Proprietary design", "Hybrid architectures"],
    },
    {
      num: "03", title: "Proprietary Training & Integration",
      desc: "We train the models securely on your private data and integrate them into your tech stack.",
      detail: "Your data remains yours. We train models in isolated, secure VPCs. Once the model hits accuracy targets, our backend engineers build custom APIs and microservices to integrate the intelligence directly into your existing software.",
      tags: ["Secure VPC training", "API development", "Microservices", "Tech stack integration"],
    },
    {
      num: "04", title: "Continuous Evaluation (CI/CD for ML)",
      desc: "We set up automated pipelines to monitor data drift and retrain models automatically.",
      detail: "AI decays over time. We implement MLOps best practices, setting up automated drift detection. When the model performance drops below a threshold, the system automatically triggers an alert and initiates a retraining pipeline.",
      tags: ["MLOps setup", "Drift detection", "Automated retraining", "Performance monitoring"],
    },
  ],
  "quality-assurance": [
    {
      num: "01", title: "Guideline Mastery",
      desc: "We embed with your core ML team to master your precise labeling taxonomy and edge cases.",
      detail: "Before we evaluate a single asset, our senior QA engineers work directly with your data scientists. We learn exactly how your model handles ambiguity, what constitutes an edge case, and exactly how the data must be formatted to ensure your pipeline doesn't break.",
      tags: ["Taxonomy alignment", "Edge case mapping", "ML team collaboration", "Rulebook creation"],
    },
    {
      num: "02", title: "Vendor Coordination",
      desc: "We act as the central point of contact for all your disparate data vendors and freelancers.",
      detail: "You no longer need to manage a chaotic web of Slack channels, conflicting delivery formats, and inconsistent quality standards from multiple sourcing partners. We distribute the strict guidelines, enforce the standards, and manage the feedback loop with every contributor.",
      tags: ["Centralized communication", "Multi-vendor management", "Feedback loops", "Freelancer scaling"],
    },
    {
      num: "03", title: "Centralized Quality Gate",
      desc: "Every batch of data from every vendor passes through our strict, unified QA pipeline.",
      detail: "Incoming deliveries are aggressively audited. We run automated statistical checks (like distribution anomaly scans) followed by human expert review. We reject non-compliant batches back to the vendor for correction, ensuring no bad data ever touches your training environment.",
      tags: ["Automated scans", "Expert arbitration", "Vendor rejections", "Unified QA gate"],
    },
    {
      num: "04", title: "Uniform Delivery",
      desc: "Disparate formats are normalized and delivered as a single, perfect dataset.",
      detail: "Vendor A delivers CSVs, Vendor B delivers raw XML. We normalize everything into your required schema (e.g., Unified COCO JSON). You receive a single, perfectly formatted dataset along with a comprehensive QA report detailing the performance of each sourcing channel.",
      tags: ["Format normalization", "Unified schema", "Consolidated reporting", "Single pipeline delivery"],
    },
  ],
};



/* ============================================================
   METADATA
   ============================================================ */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const seo = seoMeta[params.slug];
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Not Found" };
  
  const title = seo?.title ?? `${service.title} Services | Dserve AI`;
  const description = seo?.description ?? `Explore Dserve AI's ${service.title} services. ${service.description}`;
  
  return {
    title,
    description,
    keywords: seo?.keywords ?? `${service.title.toLowerCase()}, ai training data, data annotation, dserve ai`,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://dserveai.com/services/${params.slug}`,
      images: [{ url: service.imageUrl, width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/* ============================================================
   PAGE
   ============================================================ */
export default async function ServicePage(props: Props) {
  const params = await props.params;
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const proof = proofNumbers[service.slug] ?? [];
  const steps = stickyStepsData[service.slug] ?? [];
  const visualizer = getVisualizer(service.slug, service.color);

  return (
    <>
      <SchemaScript 
        schema={[
          generateService({
            name: service.title,
            description: service.description,
            path: `/services/${service.slug}`
          }),
          generateBreadcrumbList([
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` }
          ])
        ]}
      />
      <Navbar />
      <main>

        {/* ============================================================
            HERO — Left text / Right animated 3-panel visualizer
        ============================================================ */}
        <section className={styles.hero}
          style={{ "--svc-glow": `${service.color}12` } as React.CSSProperties}>
          <div className={styles.heroBg} />
          <div className={styles.heroGrid} />

          <div className={`container ${styles.heroInner}`}>

            {/* Left */}
            <div className={styles.heroLeft}>
              <Link href="/services" className={styles.backLink}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                All Services
              </Link>

              <div className={styles.heroIconRow}>
                <div className={styles.heroIcon}
                  style={{ background: `${service.color}15`, borderColor: `${service.color}35` }}>
                  <DynamicIcon name={service.iconName} size={28} color={service.color} />
                </div>
                <span className={styles.heroCategoryLabel}
                  style={{ color: service.color, background: `${service.color}10`, borderColor: `${service.color}30` }}>
                  Dserve AI Service
                </span>
              </div>

              <h1 className={styles.heroTitle}>{service.title}</h1>
              <p className={styles.heroDesc}>{service.description}</p>

              <div className={styles.heroCtas}>

                <a href="#how-it-works" className="btn btn--secondary btn--lg">
                  See How It Works
                </a>
              </div>
            </div>

            {/* Right: animated 3-panel */}
            <div className={styles.heroRight}>
              {visualizer}
            </div>

          </div>
        </section>

        {/* ============================================================
            PROOF NUMBERS — 3 stats
        ============================================================ */}
        <section className={styles.proofSection}
          style={{ "--svc-color": service.color } as React.CSSProperties}>
          <div className="container">
            <div className={styles.proofGrid}>
              {proof.map((p, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className={styles.proofCard}>
                    <div className={styles.proofNum}>{p.value}</div>
                    <div className={styles.proofLabel}>{p.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CUSTOM PAGE CONTENT
        ============================================================ */}
        {getCustomContent(service.slug, service, steps, service.color)}

        {/* ============================================================
            BOTTOM CTA STRIP
        ============================================================ */}
        <section className={styles.ctaStrip}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.ctaStripInner}
                style={{ borderColor: `${service.color}20`, background: `${service.color}05` }}>
                <div>
                  <div className={styles.ctaStripLabel} style={{ color: service.color }}>// initialize pipeline</div>
                  <h2 className={styles.ctaStripTitle}>Accelerate your AI roadmap.</h2>
                  <p className={styles.ctaStripDesc}>
                    Deploy enterprise-grade data pipelines. Speak with our engineering team to architect a custom solution for your proprietary models.
                  </p>
                </div>
                <div className={styles.ctaStripActions}>
                  <Link href="/contact" className="btn btn--primary btn--lg"
                    style={{ background: service.color }}>
                    Start a Pilot Project
                  </Link>
                  <Link href="/services" className="btn btn--secondary btn--lg" style={{ justifyContent: 'center' }}>
                    View All Services
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================
            RELATED SERVICES (INTERNAL LINKING)
        ============================================================ */}
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 className={styles.overviewTitle} style={{ fontSize: '1.5rem' }}>Explore Other Services</h2>
            <div className={styles.relatedGrid}>
              {services.filter(s => s.slug !== service.slug).map(s => (
                <Link 
                  key={s.slug} 
                  href={`/services/${s.slug}`} 
                  className={styles.relatedCard}
                  style={{ "--hover-color": `${s.color}15` } as React.CSSProperties}
                >
                  <div className={styles.relatedCardTop}>
                    <div className={styles.relatedIconWrap} style={{ color: s.color, background: `${s.color}15` }}>
                      <DynamicIcon name={s.iconName} size={24} color={s.color} />
                    </div>
                    <span className={styles.relatedArrow}>→</span>
                  </div>
                  <h4 className={styles.relatedCardTitle}>{s.title}</h4>
                  <p className={styles.relatedCardDesc}>{s.description}</p>
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
