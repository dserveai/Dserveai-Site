import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services } from "@/lib/data";
import { DynamicIcon } from "@/components/ui/Icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  CollectionVisualizer,
  AnnotationVisualizer,
  QAVisualizer,
  DeliveryVisualizer,
  HealthcareVisualizer,
  ComputerVisionVisualizer,
} from "@/components/ui/ServiceVisualizer";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ============================================================
   SEO: unique title, description, keywords per service
   ============================================================ */
const seoMeta: Record<string, { title: string; description: string; keywords: string }> = {
  "custom-dataset-collection": {
    title: "Custom Dataset Collection Services for AI & ML | Dserve AI",
    description: "Dserve AI builds custom training datasets for AI and machine learning models. Images, video, audio, text and LiDAR — ethically sourced from 30+ countries. Request a pilot.",
    keywords: "custom dataset collection, AI training data, machine learning datasets, data collection service, training data provider",
  },
  "data-annotation-labeling": {
    title: "Data Annotation & Labeling Services for AI Models | Dserve AI",
    description: "Expert data annotation and labeling: bounding boxes, semantic segmentation, keypoints, NLP tagging — with 95%+ IAA scores and 3-stage QA. Scalable to millions of assets.",
    keywords: "data annotation service, image labeling, bounding box annotation, semantic segmentation, NLP data labeling, AI data annotation",
  },
  "quality-assurance": {
    title: "AI Dataset Quality Assurance & Validation | Dserve AI",
    description: "Rigorous QA for AI training data — annotation audits, consistency checks, bias scans and complete QA reports. We guarantee data that meets production-grade standards.",
    keywords: "AI dataset quality assurance, data validation, annotation accuracy, inter-annotator agreement, training data QA",
  },
  "rapid-dataset-delivery": {
    title: "Fast AI Dataset Delivery & Turnaround | Dserve AI",
    description: "Production-ready AI training datasets delivered in days, not weeks. Dedicated project managers, cloud delivery (S3, GCS, Azure), and revision cycles included.",
    keywords: "fast dataset delivery, AI data pipeline, training data turnaround, machine learning data delivery, rapid AI datasets",
  },
  "healthcare-ai-datasets": {
    title: "HIPAA-Compliant Healthcare AI Datasets | Dserve AI",
    description: "Medical imaging, clinical text, EHR and genomics datasets for healthcare AI. HIPAA and GDPR compliant, de-identified and built by domain-trained annotators.",
    keywords: "healthcare AI datasets, HIPAA compliant medical data, medical imaging annotation, clinical NLP data, healthcare machine learning",
  },
  "computer-vision-data": {
    title: "Computer Vision Training Data & Annotation | Dserve AI",
    description: "High-quality datasets for object detection, semantic segmentation, image classification and video tracking. COCO, YOLO, Pascal VOC and custom formats supported.",
    keywords: "computer vision dataset, object detection training data, image segmentation dataset, CV annotation service, COCO dataset",
  },
};

/* ============================================================
   PROOF NUMBERS per service
   ============================================================ */
const proofNumbers: Record<string, { value: string; label: string }[]> = {
  "custom-dataset-collection": [
    { value: "1M+", label: "Data units collected across all modalities" },
    { value: "30+", label: "Countries sourced across 6 continents" },
    { value: "50+", label: "Dataset categories and specializations" },
  ],
  "data-annotation-labeling": [
    { value: "95%+", label: "Inter-Annotator Agreement score on all projects" },
    { value: "3-Stage", label: "QA review on every single annotation" },
    { value: "10+", label: "Annotation formats supported out of the box" },
  ],
  "quality-assurance": [
    { value: "99%+", label: "Final annotation accuracy rate delivered" },
    { value: "100%", label: "Projects delivered with full QA reports" },
    { value: "0", label: "Projects returned for quality failures" },
  ],
  "rapid-dataset-delivery": [
    { value: "6 Days", label: "Average delivery for standard-scale datasets" },
    { value: "100%", label: "On-time delivery rate across all engagements" },
    { value: "5+", label: "Cloud delivery destinations supported" },
  ],
  "healthcare-ai-datasets": [
    { value: "500K+", label: "Medical images annotated and delivered" },
    { value: "HIPAA", label: "Fully compliant workflows on every project" },
    { value: "100%", label: "Projects completed under BAA agreements" },
  ],
  "computer-vision-data": [
    { value: "80+", label: "Object classes annotated across CV projects" },
    { value: "5", label: "Industry-standard export formats supported" },
    { value: "3D", label: "Point cloud annotation capability included" },
  ],
};

/* ============================================================
   STICKY STEPS data — Deccan-inspired //01. code prefix style
   ============================================================ */
const stickyStepsData: Record<string, { num: string; title: string; desc: string; detail: string; tags?: string[] }[]> = {
  "custom-dataset-collection": [
    {
      num: "01", title: "Define Requirements",
      desc: "We align on exactly what you need before a single asset is captured.",
      detail: "Every project starts with a structured brief covering data type, volume targets, geographic diversity, demographic requirements, languages, and compliance constraints. Your project manager confirms the spec before any collection campaign begins — no ambiguity, no rework.",
      tags: ["Data modality", "Volume targets", "Demographics", "Compliance scope"],
    },
    {
      num: "02", title: "Global Collection Campaign",
      desc: "Our specialist network captures data across the exact environments your model needs to learn from.",
      detail: "We deploy field teams and digital collection channels across 30+ countries. Whether it's street-level video in specific weather conditions, native speech recordings across dialects, or structured text in multiple languages — we capture it to your specification with real-time progress dashboards visible to your team.",
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
  "data-annotation-labeling": [
    {
      num: "01", title: "Taxonomy & Tooling Setup",
      desc: "We build a precise labeling guide and configure the annotation workspace to match your model's exact output schema.",
      detail: "Before any annotator touches your data, we work with your engineering team to build a detailed annotation taxonomy. Every edge case is documented. Tools are configured to enforce your schema — bounding box aspect ratios, class hierarchies, overlap rules — so every label is consistent from day one.",
      tags: ["Taxonomy design", "Schema configuration", "Edge case docs", "Tool setup"],
    },
    {
      num: "02", title: "Primary Annotation Pass",
      desc: "Trained, domain-matched annotators label every asset under real-time quality supervision.",
      detail: "We match annotators to your domain — CV specialists for image tasks, linguists for NLP, clinical experts for medical data. Every annotator goes through a task-specific calibration test before working on your dataset. Progress is monitored in real time with per-annotator accuracy tracking.",
      tags: ["Domain-matched teams", "Calibration test", "Real-time monitoring", "Accuracy tracking"],
    },
    {
      num: "03", title: "QA Specialist Review",
      desc: "A second expert layer audits every annotation for accuracy, consistency, and schema compliance.",
      detail: "Our QA specialists work independently from the primary annotators. They audit a statistically significant sample per class, apply automated consistency checks, and manually review any flagged items. We maintain Inter-Annotator Agreement (IAA) scores above 95% on every project delivery.",
      tags: ["Independent QA layer", "IAA 95%+", "Automated consistency", "Per-class audits"],
    },
    {
      num: "04", title: "Export & Integration",
      desc: "Delivered in your format, ready to plug directly into your training pipeline.",
      detail: "COCO JSON, YOLO TXT, Pascal VOC XML, CONLL, CSV, or a custom schema — we handle the format conversion and validate the output file structure before delivery. We also provide a format integration guide so your engineering team can onboard the dataset without friction.",
      tags: ["COCO JSON", "YOLO", "Pascal VOC", "CONLL", "Custom formats"],
    },
  ],
  "quality-assurance": [
    {
      num: "01", title: "Dataset Intake Audit",
      desc: "We ingest your dataset and run automated statistical scans before any human review begins.",
      detail: "The first pass is fully automated — we scan for class imbalances, missing labels, duplicate assets, and annotation distribution anomalies. You receive an intake report within hours showing exactly where the risks are before we commit to the full QA timeline.",
      tags: ["Class balance check", "Duplicate detection", "Distribution scan", "Intake report"],
    },
    {
      num: "02", title: "Human Expert Review",
      desc: "Senior QA specialists audit representative samples per class, flagging every error and ambiguity.",
      detail: "Our QA engineers review a minimum statistically valid sample per label class. Edge cases, ambiguous annotations, and systematic errors are flagged with full context so your annotation team can correct them precisely. We don't just say 'wrong' — we show exactly why.",
      tags: ["Per-class sampling", "Edge case audit", "Error taxonomy", "Context-rich flags"],
    },
    {
      num: "03", title: "Bias & Consistency Analysis",
      desc: "We measure Inter-Annotator Agreement, detect demographic bias, and validate label distributions.",
      detail: "Using IAA metrics (Cohen's Kappa, Fleiss Kappa) we surface systematic disagreements between annotators. We also audit for demographic representation bias in the underlying data and check label distributions against your model's required class balance.",
      tags: ["Cohen's Kappa", "Fleiss Kappa", "Demographic audit", "Class balance"],
    },
    {
      num: "04", title: "QA Report Delivery",
      desc: "You receive a comprehensive QA report with per-class confidence scores, corrected annotations, and clear recommendations.",
      detail: "The final deliverable includes a structured QA report (PDF + CSV) with per-class accuracy scores, IAA measurements, a list of corrected items, flagged edge cases requiring your team's decision, and a data quality improvement roadmap for future iterations.",
      tags: ["PDF + CSV report", "Per-class scores", "IAA measurements", "Improvement roadmap"],
    },
  ],
  "rapid-dataset-delivery": [
    {
      num: "01", title: "SLA-Backed Scoping",
      desc: "A dedicated project manager commits to your delivery date in writing before work starts.",
      detail: "We don't start the clock until the spec is locked and the SLA is signed. Your project manager reviews the scope, confirms resource availability, and commits to a specific delivery date. If something changes mid-project, you hear about it from us first — not after a missed deadline.",
      tags: ["Written SLA", "Dedicated PM", "Scope lock", "Resource confirmation"],
    },
    {
      num: "02", title: "Parallel Workstreams",
      desc: "Collection, annotation, and QA run in overlapping phases to compress the total timeline.",
      detail: "Instead of sequential phases, we run parallel tracks. While early batches are being annotated, collection continues. While annotation finishes, QA begins on the first batches. This overlapping architecture consistently cuts delivery time by 40% compared to linear pipelines.",
      tags: ["Parallel execution", "40% faster", "Batch processing", "Overlap scheduling"],
    },
    {
      num: "03", title: "Milestone Tracking",
      desc: "Progress dashboards at every milestone mean there are never any surprises.",
      detail: "You get access to a live progress dashboard showing batch completion rates, QA pass rates, and projected delivery trajectory. Your PM sends milestone updates at pre-agreed checkpoints. Any risk to the deadline is escalated immediately with a mitigation plan.",
      tags: ["Live dashboard", "Milestone alerts", "Risk escalation", "Mitigation planning"],
    },
    {
      num: "04", title: "Cloud Delivery & Revisions",
      desc: "Delivered directly to your cloud storage. One full revision cycle included.",
      detail: "Once QA passes, the dataset is transferred to your specified cloud destination (AWS S3, GCS, Azure Blob, SFTP, or direct download). We include one complete revision cycle in the scope — if any batch needs adjustments after your team reviews it, we handle it at no additional cost.",
      tags: ["AWS S3", "GCS", "Azure", "SFTP", "Revision included"],
    },
  ],
  "healthcare-ai-datasets": [
    {
      num: "01", title: "Compliance Framework Setup",
      desc: "We execute BAA agreements and configure HIPAA-compliant workflows before any data is handled.",
      detail: "Every healthcare engagement starts with legal and compliance setup. We sign a Business Associate Agreement (BAA), configure encrypted, access-controlled work environments, and assign only vetted annotators with healthcare NDA agreements. Your data never touches infrastructure that isn't HIPAA-certified.",
      tags: ["BAA agreement", "HIPAA certified", "Encrypted environment", "Access controls"],
    },
    {
      num: "02", title: "De-identification & Intake",
      desc: "Patient data is de-identified to HIPAA Safe Harbor standards before annotation begins.",
      detail: "All PHI (Protected Health Information) is removed or transformed to Safe Harbor standards — including 18 HIPAA identifiers across image EXIF data, DICOM headers, and free-text fields. We run automated de-identification followed by human verification before any annotator accesses the data.",
      tags: ["Safe Harbor standard", "18 HIPAA identifiers", "DICOM de-id", "PHI removal"],
    },
    {
      num: "03", title: "Domain Expert Annotation",
      desc: "Medical imaging, EHR, and genomics data annotated by credentialed domain specialists.",
      detail: "We don't assign general annotators to healthcare data. Our medical annotation team includes professionals with clinical backgrounds — radiographers for imaging, NLP linguists with clinical training for EHR text, and bioinformatics specialists for genomic datasets. Every annotator is calibrated on your specific task before production annotation begins.",
      tags: ["Clinical annotators", "Radiographer specialists", "Clinical NLP", "Bioinformatics"],
    },
    {
      num: "04", title: "Secure Delivery & Audit Trail",
      desc: "Dataset delivered via encrypted transfer with full audit logs and compliance documentation.",
      detail: "Final delivery goes through encrypted, point-to-point transfer to your approved HIPAA-compliant cloud storage. You receive a complete compliance package: audit trail, annotator credentials log, de-identification certificate, and QA report — everything you need for regulatory review.",
      tags: ["Encrypted transfer", "Audit trail", "De-id certificate", "Regulatory package"],
    },
  ],
  "computer-vision-data": [
    {
      num: "01", title: "CV Task Specification",
      desc: "We align precisely on detection tasks, object classes, annotation granularity, and acceptable tooling.",
      detail: "Computer vision annotation is highly sensitive to specification quality. We work with your ML engineers to define every class, sub-class, occlusion handling rule, minimum bounding box size, and crowd annotation strategy. The annotation guide is reviewed by your team before a single frame is labeled.",
      tags: ["Class taxonomy", "Occlusion rules", "Crowd handling", "ML engineer review"],
    },
    {
      num: "02", title: "Precision Annotation",
      desc: "CV-specialist annotators produce pixel-accurate labels using professional-grade tools.",
      detail: "Our CV annotators use industry-standard platforms (CVAT, Label Studio, Roboflow-compatible exports) to deliver the precision your model requires. For segmentation tasks, we enforce minimum polygon vertex counts. For detection, we track aspect ratio and coverage consistency across classes.",
      tags: ["CVAT", "Label Studio", "Polygon precision", "Coverage consistency"],
    },
    {
      num: "03", title: "Edge Case Curation",
      desc: "We deliberately include rare classes, occluded objects, and challenging conditions to harden your model.",
      detail: "The most common reason CV models fail in production is a lack of edge case coverage in training data. We actively identify and curate rare class instances, partial occlusions, unusual lighting, motion blur, and perspective distortions — building the long-tail examples that make the difference between a demo model and a production model.",
      tags: ["Rare class mining", "Occlusion coverage", "Lighting variation", "Motion blur"],
    },
    {
      num: "04", title: "Format Conversion & Export",
      desc: "Delivered in your pipeline's native format — no conversion work on your end.",
      detail: "We output directly to COCO JSON, YOLO TXT, Pascal VOC XML, TFRecord, Open Images format, or a custom schema. We validate the export against your model's input loader before delivery. If you switch frameworks later, we can re-export from our source annotations at no additional cost.",
      tags: ["COCO JSON", "YOLO", "TFRecord", "Open Images", "Custom schema"],
    },
  ],
};

/* ============================================================
   VISUALIZER selector
   ============================================================ */
function getVisualizer(slug: string, color: string) {
  switch (slug) {
    case "custom-dataset-collection":   return <CollectionVisualizer color={color} />;
    case "data-annotation-labeling":    return <AnnotationVisualizer color={color} />;
    case "quality-assurance":           return <QAVisualizer color={color} />;
    case "rapid-dataset-delivery":      return <DeliveryVisualizer color={color} />;
    case "healthcare-ai-datasets":      return <HealthcareVisualizer color={color} />;
    case "computer-vision-data":        return <ComputerVisionVisualizer color={color} />;
    default:                            return <CollectionVisualizer color={color} />;
  }
}

/* ============================================================
   METADATA
   ============================================================ */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const seo = seoMeta[params.slug];
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Not Found" };
  return {
    title: seo?.title ?? `${service.title} | Dserve AI`,
    description: seo?.description ?? service.description,
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? service.title,
      description: seo?.description ?? service.description,
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
                <Link href="/contact" className="btn btn--primary btn--lg"
                  style={{ background: service.color }}>
                  Request a Pilot
                </Link>
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
            OVERVIEW
        ============================================================ */}
        <section className={styles.overviewSection}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.overviewGrid}>
                <div>
                  <span className={styles.codePrefix} style={{ color: service.color }}>// overview</span>
                  <h2 className={styles.overviewTitle}>What We Do</h2>
                  <p className={styles.overviewBody}>{service.details.overview}</p>
                </div>
                <div className={styles.overviewRight}>
                  <div className={styles.capabilitiesBox}>
                    <div className={styles.capTitle}>Core Capabilities</div>
                    {service.details.what.map((item, i) => (
                      <div key={i} className={styles.capItem}>
                        <div className={styles.capDot} style={{ background: service.color }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.formatsBox}>
                    <div className={styles.capTitle}>Output Formats</div>
                    <div className={styles.formatTags}>
                      {service.details.formats.map((f) => (
                        <span key={f} className={styles.formatTag}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================
            INTERACTIVE INFOGRAPHIC WORKFLOW
        ============================================================ */}
        <section className={styles.howSection} id="how-it-works">
          <div className="container">
            <div className={styles.stickyHeader} style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className={styles.codePrefix} style={{ color: service.color }}>// workflow</span>
              <h2 className={styles.overviewTitle}>The Pipeline Workflow</h2>
              <p className={styles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
                A fully transparent, interactive view into how we execute your project from intake to delivery. Hover over the nodes below to explore the process.
              </p>
            </div>
            <InteractiveInfographic
              steps={steps}
              color={service.color}
              slug={service.slug}
            />
          </div>
        </section>

        {/* ============================================================
            BOTTOM CTA STRIP
        ============================================================ */}
        <section className={styles.ctaStrip}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.ctaStripInner}
                style={{ borderColor: `${service.color}20`, background: `${service.color}05` }}>
                <div>
                  <div className={styles.ctaStripLabel} style={{ color: service.color }}>// ready to build?</div>
                  <h2 className={styles.ctaStripTitle}>No commitment. Results in days.</h2>
                  <p className={styles.ctaStripDesc}>
                    Tell us your requirements. We scope the pilot, deliver data, and earn the full engagement through results.
                  </p>
                </div>
                <div className={styles.ctaStripActions}>
                  <Link href="/contact" className="btn btn--primary btn--lg"
                    style={{ background: service.color }}>
                    Start a Pilot Project
                  </Link>
                  <Link href="/services" className="btn btn--secondary">
                    View All Services
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
