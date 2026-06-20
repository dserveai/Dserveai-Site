"use client";

import React, { useEffect, useState } from "react";
import styles from "./ServiceVisualizer.module.css";

/* ========================================================
   INDUSTRY VISUALIZER: Reuses the 3-Panel logic from
   ServiceVisualizer but genericizes it for any industry.
   ======================================================== */

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
  phase: number;
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
  }, [timings]);
  return phase;
}

export function GenericIndustryVisualizer({ 
  color = "#3b82f6", 
  industryName = "Industry",
  capabilities = []
}: { 
  color?: string;
  industryName?: string;
  capabilities?: string[];
}) {
  const phase = usePhaseLoop([1200, 2000, 2000, 2500]);
  const [processCount, setProcessCount] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  useEffect(() => {
    if (phase === 1) { 
      setProcessCount(0); 
      setOutputCount(0); 
      let i = 0; 
      const t = setInterval(() => { i++; setProcessCount(i); if (i >= 5) clearInterval(t); }, 300); 
      return () => clearInterval(t); 
    }
    if (phase === 2) { 
      setOutputCount(0); 
      let i = 0; 
      const t = setInterval(() => { i++; setOutputCount(i); if (i >= 4) clearInterval(t); }, 350); 
      return () => clearInterval(t); 
    }
    if (phase === 0) { 
      setProcessCount(0); 
      setOutputCount(0); 
    }
  }, [phase]);

  const tasks = capabilities.length > 0 ? capabilities : ["Data Ingestion", "Schema Alignment", "Annotation Pass", "QA Review", "Model Export"];
  const metrics = [
    { label: "Data Quality", val: "99.2%", s: "#10b981" },
    { label: "Edge Cases", val: "Resolved", s: "#10b981" },
    { label: "Throughput", val: "Optimized", s: "#10b981" },
    { label: "Compliance", val: "Verified", s: "#10b981" },
  ];

  return (
    <div className={styles.vizCard}>
      <div className={styles.vizLabel} style={{ color }}>
        <span className={styles.vizLabelDot} style={{ background: color }} />
        {industryName} Pipeline
      </div>
      <ThreePanelFlow color={color} phase={phase}
        inputPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Ingestion</div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Target</span><span className={styles.mockFieldVal}>Production Model</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Volume</span><span className={styles.mockFieldVal}>High-Scale</span></div>
            <div className={styles.mockField}><span className={styles.mockFieldLabel}>Domain</span><span className={styles.mockFieldVal}>{industryName}</span></div>
          </div>
        }
        processPanel={
          <div className={styles.panelBody}>
            <div className={styles.panelTitle}>Active Workflows</div>
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
            <div className={styles.panelTitle}>Validation</div>
            {metrics.slice(0, outputCount).map((m, i) => (
              <div key={i} className={styles.outputRow}>
                <span className={styles.outputLabel}>{m.label}</span>
                <span className={styles.checkBadge} style={{ color: m.s, borderColor: `${m.s}30`, background: `${m.s}10` }}>{m.val}</span>
              </div>
            ))}
            {outputCount >= 4 && (
              <div className={styles.outputSummary} style={{ borderColor: `${color}30`, background: `${color}08` }}>
                <span style={{ color }}>✓</span> Ready for Deployment
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
