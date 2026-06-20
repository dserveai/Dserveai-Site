"use client";

import React, { useEffect, useState } from "react";
import styles from "./ServiceVisualizer.module.css";

/* ========================================================
   REPROMPT-INSPIRED: Each visualizer is a realistic
   3-panel animated mock — Input → Process → Output
   Data builds up step-by-step, then holds, then resets
   ======================================================== */

/* ---- SHARED: 3-Panel wrapper ---- */
function ThreePanelFlow({
  color,
  inputPanel,
  processPanel,
  outputPanel,
  phase,
}: {
  color: string;
  inputPanel: React.ReactNode;
  processPanel: React.ReactNode;
  outputPanel: React.ReactNode;
  phase: number; // 0=input, 1=process, 2=output, 3=hold
}) {
  return (
    <div className={styles.threePanel}>
      {/* Input */}
      <div className={`${styles.panel} ${styles.panelVisible}`}>
        <div className={styles.panelDot} style={{ background: "rgba(255,255,255,0.2)" }} />
        {inputPanel}
      </div>

      {/* Arrow */}
      <div className={styles.panelArrow} style={{ opacity: phase >= 1 ? 1 : 0.15 }}>
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
          <path d="M0 6h22M18 2l6 4-6 4" stroke={phase >= 1 ? color : "rgba(255,255,255,0.2)"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Process */}
      <div className={`${styles.panel} ${phase >= 1 ? styles.panelVisible : styles.panelHidden}`}
        style={{ borderColor: phase >= 1 ? `${color}30` : undefined }}>
        <div className={styles.panelDot} style={{ background: phase >= 1 ? color : "rgba(255,255,255,0.1)" }} />
        {processPanel}
      </div>

      {/* Arrow */}
      <div className={styles.panelArrow} style={{ opacity: phase >= 2 ? 1 : 0.15 }}>
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
          <path d="M0 6h22M18 2l6 4-6 4" stroke={phase >= 2 ? color : "rgba(255,255,255,0.2)"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Output */}
      <div className={`${styles.panel} ${phase >= 2 ? styles.panelVisible : styles.panelHidden}`}
        style={{ borderColor: phase >= 2 ? `${color}30` : undefined }}>
        <div className={styles.panelDot} style={{ background: phase >= 2 ? color : "rgba(255,255,255,0.1)" }} />
        {outputPanel}
      </div>
    </div>
  );
}

/* usePhaseLoop: cycles through phases 0→1→2→3(hold)→reset */
function usePhaseLoop(timings: number[]) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let current = 0;
    const next = () => {
      current = (current + 1) % timings.length;
      setPhase(current);
    };
    const run = () => {
      const t = setTimeout(() => { next(); run(); }, timings[current]);
      return t;
    };
    const t = run();
    return () => clearTimeout(t);
  }, []);
  return phase;
}

/* ---- 1. CUSTOM DATASET COLLECTION ---- */
export function CollectionVisualizer({ color = "#3b82f6" }: { color?: string }) {
  // phases: 0=input shown, 1=processing, 2=output results, 3=hold
  const phase = usePhaseLoop([1200, 1800, 1800, 2500]);
  const [processCount, setProcessCount] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  useEffect(() => {
    if (phase === 1) {
      setProcessCount(0);
      setOutputCount(0);
      let i = 0;
      const t = setInterval(() => { i++; setProcessCount(i); if (i >= 5) clearInterval(t); }, 280);
      return () => clearInterval(t);
    }
    if (phase === 2) {
      setOutputCount(0);
      let i = 0;
      const t = setInterval(() => { i++; setOutputCount(i); if (i >= 4) clearInterval(t); }, 300);
      return () => clearInterval(t);
    }
    if (phase === 0) { setProcessCount(0); setOutputCount(0); }
  }, [phase]);

  const sources = ["New York, US", "London, UK", "Tokyo, JP", "Berlin, DE", "Sydney, AU"];
  const modalities = [
    { label: "Images", count: "48,210", icon: "◈" },
    { label: "Videos", count: "3,420", icon: "▶" },
    { label: "Audio", count: "12,800", icon: "♪" },
    { label: "Text", count: "200K", icon: "T" },
  ];

  return (
    <div className={styles.vizCard}>
      <div className={styles.vizLabel} style={{ color }}>
        <span className={styles.vizLabelDot} style={{ background: color }} />
        Live Data Collection
      </div>
      <ThreePanelFlow color={color} phase={phase}
        inputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Project Brief</div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Dataset type</span><span className={styles.mockFieldVal}>Multi-modal</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Target volume</span><span className={styles.mockFieldVal}>250,000 units</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Languages</span><span className={styles.mockFieldVal}>12 languages</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Compliance</span><span className={styles.mockFieldVal}>GDPR, CCPA</span></div>
          </div>
        }
        processPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Collection Active</div>
            {sources.slice(0, processCount).map((s, i) => (
              <div key={i} className={styles.checkRow} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className={styles.checkDot} style={{ background: color }} />
                <span className={styles.checkLabel}>{s}</span>
                <span className={styles.checkBadge} style={{ color, borderColor: `${color}30`, background: `${color}10` }}>Collecting</span>
              </div>
            ))}
          </div>
        }
        outputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Dataset Ready</div>
            {modalities.slice(0, outputCount).map((m, i) => (
              <div key={i} className={styles.outputRow}>
                <span className={styles.outputIcon}>{m.icon}</span>
                <span className={styles.outputLabel}>{m.label}</span>
                <span className={styles.outputVal} style={{ color }}>{m.count}</span>
              </div>
            ))}
            {outputCount >= 4 && (
              <div className={styles.outputSummary} style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <span style={{ color }}>✓</span> 264,430 units collected
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

/* ---- 2. DATA ANNOTATION & LABELING ---- */
export function AnnotationVisualizer({ color = "#8b5cf6" }: { color?: string }) {
  const phase = usePhaseLoop([1200, 2000, 2000, 2500]);
  const [processCount, setProcessCount] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  useEffect(() => {
    if (phase === 1) { setProcessCount(0); setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setProcessCount(i); if (i >= 5) clearInterval(t); }, 320); return () => clearInterval(t); }
    if (phase === 2) { setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setOutputCount(i); if (i >= 5) clearInterval(t); }, 280); return () => clearInterval(t); }
    if (phase === 0) { setProcessCount(0); setOutputCount(0); }
  }, [phase]);

  const tasks = ["Bounding Boxes", "Segmentation Masks", "Keypoint Annotation", "Text Transcription", "NER Tagging"];
  const results = [
    { name: "Bounding Boxes", count: "42,800", status: "Pass", s: "#10b981" },
    { name: "Segmentation", count: "38,200", status: "Pass", s: "#10b981" },
    { name: "Keypoints", count: "18,600", status: "Pass", s: "#10b981" },
    { name: "NER Labels", count: "95,000", status: "Review", s: "#f59e0b" },
    { name: "Audio Trans.", count: "4,200", status: "Pass", s: "#10b981" },
  ];

  return (
    <div className={styles.vizCard}>
      <div className={styles.vizLabel} style={{ color }}>
        <span className={styles.vizLabelDot} style={{ background: color }} />
        Annotation Pipeline
      </div>
      <ThreePanelFlow color={color} phase={phase}
        inputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Raw Asset Batch</div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Asset type</span><span className={styles.mockFieldVal}>Images + Text</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Volume</span><span className={styles.mockFieldVal}>198,800 files</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Taxonomy</span><span className={styles.mockFieldVal}>Custom v2.3</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>IAA target</span><span className={styles.mockFieldVal}>95%+</span></div>
          </div>
        }
        processPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Labeling Active</div>
            {tasks.slice(0, processCount).map((t, i) => (
              <div key={i} className={styles.checkRow}>
                <span className={styles.checkDot} style={{ background: color }} />
                <span className={styles.checkLabel}>{t}</span>
              </div>
            ))}
          </div>
        }
        outputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>QA Report</div>
            {results.slice(0, outputCount).map((r, i) => (
              <div key={i} className={styles.outputRow}>
                <span className={styles.outputLabel}>{r.name}</span>
                <span className={styles.outputVal} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>{r.count}</span>
                <span className={styles.checkBadge} style={{ color: r.s, borderColor: `${r.s}30`, background: `${r.s}10` }}>{r.status}</span>
              </div>
            ))}
            {outputCount >= 5 && (
              <div className={styles.outputSummary} style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <span style={{ color }}>✓</span> IAA Score: 97.2%
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

/* ---- 3. QUALITY ASSURANCE ---- */
export function QAVisualizer({ color = "#06b6d4" }: { color?: string }) {
  const phase = usePhaseLoop([1200, 2200, 2200, 2800]);
  const [processCount, setProcessCount] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  useEffect(() => {
    if (phase === 1) { setProcessCount(0); setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setProcessCount(i); if (i >= 6) clearInterval(t); }, 280); return () => clearInterval(t); }
    if (phase === 2) { setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setOutputCount(i); if (i >= 6) clearInterval(t); }, 260); return () => clearInterval(t); }
    if (phase === 0) { setProcessCount(0); setOutputCount(0); }
  }, [phase]);

  const checks = ["Annotation Accuracy", "Consistency Check", "Bias Scan", "Distribution Analysis", "Edge Case Audit", "Format Validation"];
  const results = [
    { name: "Annotation Accuracy", score: "99.2%", status: "Pass", s: "#10b981" },
    { name: "Consistency", score: "98.8%", status: "Pass", s: "#10b981" },
    { name: "Bias Scan", score: "Clear", status: "Pass", s: "#10b981" },
    { name: "Distribution", score: "97.5%", status: "Pass", s: "#10b981" },
    { name: "Edge Cases", score: "14 flagged", status: "Review", s: "#f59e0b" },
    { name: "Format Valid.", score: "100%", status: "Pass", s: "#10b981" },
  ];

  return (
    <div className={styles.vizCard}>
      <div className={styles.vizLabel} style={{ color }}>
        <span className={styles.vizLabelDot} style={{ background: color }} />
        QA Audit Pipeline
      </div>
      <ThreePanelFlow color={color} phase={phase}
        inputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Dataset Submitted</div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Annotations</span><span className={styles.mockFieldVal}>1.2M labels</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Asset types</span><span className={styles.mockFieldVal}>Image, Text</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Client</span><span className={styles.mockFieldVal}>MedVision Labs</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>SLA</span><span className={styles.mockFieldVal}>72-hour QA</span></div>
          </div>
        }
        processPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Running Checks</div>
            {checks.slice(0, processCount).map((c, i) => (
              <div key={i} className={styles.checkRow}>
                <span className={styles.checkDot} style={{ background: color }} />
                <span className={styles.checkLabel}>{c}</span>
              </div>
            ))}
          </div>
        }
        outputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>QA Results</div>
            {results.slice(0, outputCount).map((r, i) => (
              <div key={i} className={styles.outputRow}>
                <span className={styles.outputLabel}>{r.name}</span>
                <span className={styles.checkBadge} style={{ color: r.s, borderColor: `${r.s}30`, background: `${r.s}10` }}>{r.status}</span>
                <span className={styles.outputVal} style={{ color: r.s }}>{r.score}</span>
              </div>
            ))}
            {outputCount >= 6 && (
              <div className={styles.outputSummary} style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <span style={{ color }}>✓</span> Dataset approved for delivery
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

/* ---- 4. RAPID DELIVERY ---- */
export function DeliveryVisualizer({ color = "#ec4899" }: { color?: string }) {
  const phase = usePhaseLoop([1200, 1800, 1800, 2400]);
  const [processCount, setProcessCount] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  useEffect(() => {
    if (phase === 1) { setProcessCount(0); setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setProcessCount(i); if (i >= 5) clearInterval(t); }, 300); return () => clearInterval(t); }
    if (phase === 2) { setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setOutputCount(i); if (i >= 4) clearInterval(t); }, 320); return () => clearInterval(t); }
    if (phase === 0) { setProcessCount(0); setOutputCount(0); }
  }, [phase]);

  const stages = ["Requirements locked", "Collection sprint", "QA verification", "Format packaging", "Cloud transfer"];
  const deliverables = [
    { name: "Training set", size: "48.2 GB", fmt: "COCO JSON" },
    { name: "Validation set", size: "12.1 GB", fmt: "COCO JSON" },
    { name: "QA Report", size: "2.4 MB", fmt: "PDF" },
    { name: "Metadata index", size: "180 MB", fmt: "JSON-L" },
  ];

  return (
    <div className={styles.vizCard}>
      <div className={styles.vizLabel} style={{ color }}>
        <span className={styles.vizLabelDot} style={{ background: color }} />
        Delivery Pipeline
      </div>
      <ThreePanelFlow color={color} phase={phase}
        inputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Project Order</div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Volume</span><span className={styles.mockFieldVal}>500K units</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Deadline</span><span className={styles.mockFieldVal}>6 business days</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Format</span><span className={styles.mockFieldVal}>COCO JSON</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Destination</span><span className={styles.mockFieldVal}>AWS S3</span></div>
          </div>
        }
        processPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Pipeline Stages</div>
            {stages.slice(0, processCount).map((s, i) => (
              <div key={i} className={styles.checkRow}>
                <span className={styles.checkDot} style={{ background: i < processCount - 1 ? "#10b981" : color }} />
                <span className={styles.checkLabel}>{s}</span>
                {i < processCount - 1 && <span style={{ color: "#10b981", fontSize: "0.7rem" }}>✓</span>}
              </div>
            ))}
          </div>
        }
        outputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Delivered to S3</div>
            {deliverables.slice(0, outputCount).map((d, i) => (
              <div key={i} className={styles.outputRow}>
                <span className={styles.outputLabel}>{d.name}</span>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>{d.size}</span>
                <span className={styles.checkBadge} style={{ color, borderColor: `${color}30`, background: `${color}10` }}>{d.fmt}</span>
              </div>
            ))}
            {outputCount >= 4 && (
              <div className={styles.outputSummary} style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <span style={{ color }}>✓</span> Day 5 — On schedule
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

/* ---- 5. HEALTHCARE ---- */
export function HealthcareVisualizer({ color = "#10b981" }: { color?: string }) {
  const phase = usePhaseLoop([1200, 2000, 2000, 2500]);
  const [processCount, setProcessCount] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  useEffect(() => {
    if (phase === 1) { setProcessCount(0); setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setProcessCount(i); if (i >= 5) clearInterval(t); }, 320); return () => clearInterval(t); }
    if (phase === 2) { setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setOutputCount(i); if (i >= 5) clearInterval(t); }, 290); return () => clearInterval(t); }
    if (phase === 0) { setProcessCount(0); setOutputCount(0); }
  }, [phase]);

  const protocols = ["BAA agreement signed", "HIPAA workflow active", "De-identification pass", "Annotator credentialed", "Encryption verified"];
  const findings = [
    { name: "X-Ray batch", count: "48,200", status: "Annotated", s: "#10b981" },
    { name: "CT scans", count: "12,400", status: "Annotated", s: "#10b981" },
    { name: "Clinical notes", count: "98,000", status: "NLP-labeled", s: "#10b981" },
    { name: "Pathology slides", count: "8,200", status: "Annotated", s: "#10b981" },
    { name: "EHR records", count: "22,000", status: "Reviewed", s: "#f59e0b" },
  ];

  return (
    <div className={styles.vizCard}>
      <div className={styles.vizLabel} style={{ color }}>
        <span className={styles.vizLabelDot} style={{ background: color }} />
        Healthcare Data Pipeline
      </div>
      <ThreePanelFlow color={color} phase={phase}
        inputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Medical Project</div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Data type</span><span className={styles.mockFieldVal}>X-Ray, CT, NLP</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Compliance</span><span className={styles.mockFieldVal}>HIPAA + BAA</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Client</span><span className={styles.mockFieldVal}>MedVision Labs</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Format</span><span className={styles.mockFieldVal}>DICOM, FHIR</span></div>
          </div>
        }
        processPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Compliance Checks</div>
            {protocols.slice(0, processCount).map((p, i) => (
              <div key={i} className={styles.checkRow}>
                <span className={styles.checkDot} style={{ background: color }} />
                <span className={styles.checkLabel}>{p}</span>
              </div>
            ))}
          </div>
        }
        outputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Annotated Assets</div>
            {findings.slice(0, outputCount).map((f, i) => (
              <div key={i} className={styles.outputRow}>
                <span className={styles.outputLabel}>{f.name}</span>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>{f.count}</span>
                <span className={styles.checkBadge} style={{ color: f.s, borderColor: `${f.s}30`, background: `${f.s}10` }}>{f.status}</span>
              </div>
            ))}
            {outputCount >= 5 && (
              <div className={styles.outputSummary} style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <span style={{ color }}>✓</span> HIPAA compliant delivery ready
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

/* ---- 6. COMPUTER VISION ---- */
export function ComputerVisionVisualizer({ color = "#f59e0b" }: { color?: string }) {
  const phase = usePhaseLoop([1200, 2000, 2000, 2500]);
  const [processCount, setProcessCount] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  useEffect(() => {
    if (phase === 1) { setProcessCount(0); setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setProcessCount(i); if (i >= 6) clearInterval(t); }, 280); return () => clearInterval(t); }
    if (phase === 2) { setOutputCount(0); let i = 0; const t = setInterval(() => { i++; setOutputCount(i); if (i >= 5) clearInterval(t); }, 300); return () => clearInterval(t); }
    if (phase === 0) { setProcessCount(0); setOutputCount(0); }
  }, [phase]);

  const tasks = ["Object detection boxes", "Instance segmentation", "Semantic segmentation", "Keypoint annotation", "OCR + text regions", "3D point cloud labels"];
  const classes = [
    { name: "Vehicles", count: "128,400 boxes", conf: "98.2%", s: "#10b981" },
    { name: "Pedestrians", count: "84,200 masks", conf: "96.8%", s: "#10b981" },
    { name: "Traffic Signs", count: "18,600 boxes", conf: "99.1%", s: "#10b981" },
    { name: "Lane Lines", count: "42,000 polygons", conf: "97.5%", s: "#10b981" },
    { name: "Cyclists", count: "9,400 boxes", conf: "94.2%", s: "#f59e0b" },
  ];

  return (
    <div className={styles.vizCard}>
      <div className={styles.vizLabel} style={{ color }}>
        <span className={styles.vizLabelDot} style={{ background: color }} />
        CV Annotation Engine
      </div>
      <ThreePanelFlow color={color} phase={phase}
        inputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Scene Dataset</div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Asset type</span><span className={styles.mockFieldVal}>Images + Video</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Volume</span><span className={styles.mockFieldVal}>280,000 frames</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Classes</span><span className={styles.mockFieldVal}>18 object classes</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Output</span><span className={styles.mockFieldVal}>COCO JSON</span></div>
          </div>
        }
        processPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Annotation Tasks</div>
            {tasks.slice(0, processCount).map((t, i) => (
              <div key={i} className={styles.checkRow}>
                <span className={styles.checkDot} style={{ background: color }} />
                <span className={styles.checkLabel}>{t}</span>
              </div>
            ))}
          </div>
        }
        outputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Class Results</div>
            {classes.slice(0, outputCount).map((c, i) => (
              <div key={i} className={styles.outputRow}>
                <span className={styles.outputLabel}>{c.name}</span>
                <span className={styles.outputVal} style={{ color: c.s }}>{c.conf}</span>
              </div>
            ))}
            {outputCount >= 5 && (
              <div className={styles.outputSummary} style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <span style={{ color }}>✓</span> 283K annotated frames ready
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
