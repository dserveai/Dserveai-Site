"use client";

import React, { useEffect, useState } from "react";
import styles from "./LiveDashboard.module.css";

interface LiveDashboardProps {
  slug: string;
  color: string;
  industryName: string;
}

export default function LiveDashboard({ slug, color, industryName }: LiveDashboardProps) {
  const [logs, setLogs] = useState<string[]>([]);

  // Simulate incoming log data
  useEffect(() => {
    const defaultLogs = [
      "Initializing secure pipeline...",
      `Connecting to ${industryName} nodes...`,
      "[SUCCESS] Environment mapped.",
      "Ingesting raw dataset [batch_01]...",
      "Validating taxonomy constraints...",
      "Executing primary labeling pass...",
      "Running multi-stage QA...",
      "Generating confidence scores...",
      "Package ready for delivery."
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, defaultLogs[currentIndex]];
        return newLogs.length > 6 ? newLogs.slice(1) : newLogs;
      });
      currentIndex = (currentIndex + 1) % defaultLogs.length;
    }, 1500);

    return () => clearInterval(interval);
  }, [industryName]);

  const renderMainVisual = () => {
    switch (slug) {
      case "computer-vision":
        return (
          <div className={styles.cvVisualizer}>
            <div className={styles.cvGrid} />
            <div className={styles.cvScannerLine} style={{ "--c": color } as React.CSSProperties} />
            <div className={`${styles.cvBBox} ${styles.cvBBox1}`} style={{ "--c": color } as React.CSSProperties}>
              <div className={styles.cvBBoxLabel}>vehicle: 98%</div>
            </div>
            <div className={`${styles.cvBBox} ${styles.cvBBox2}`}>
              <div className={styles.cvBBoxLabel}>pedestrian: 92%</div>
            </div>
          </div>
        );
      
      case "healthcare-ai":
        return (
          <div className={styles.hcVisualizer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.hcBrain}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                 <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/>
                 <path d="M12 4v16M8 6c0 4 2 6 4 6s4-2 4-6"/>
                 <path d="M4 12h16"/>
              </svg>
            </div>
            <div className={styles.hcScanner} />
            <div className={styles.hcAnomaly} style={{ top: "30%", left: "60%" }}>
              <div className={styles.hcPulse} />
            </div>
            <div className={styles.hcAnomaly} style={{ top: "60%", left: "40%", animationDelay: "1s" }}>
              <div className={styles.hcPulse} />
            </div>
          </div>
        );

      case "agentic-ai":
        return (
          <div className={styles.agVisualizer} style={{ "--c": color } as React.CSSProperties}>
            <svg className={styles.agLines} preserveAspectRatio="none" viewBox="0 0 100 100">
               <path d="M 50 15 L 25 50 L 50 85" fill="none" stroke="currentColor" strokeWidth="0.5" className={styles.agPath1} />
               <path d="M 50 15 L 75 50 L 50 85" fill="none" stroke="currentColor" strokeWidth="0.5" className={styles.agPath2} />
               <path d="M 25 50 L 75 50" fill="none" stroke="currentColor" strokeWidth="0.5" className={styles.agPath3} />
            </svg>
            <div className={`${styles.agNode} ${styles.agNode1}`}>Init</div>
            <div className={`${styles.agNode} ${styles.agNode2}`}>Plan</div>
            <div className={`${styles.agNode} ${styles.agNode3}`}>Tool</div>
            <div className={`${styles.agNode} ${styles.agNode4}`}>Action</div>
          </div>
        );

      case "generative-ai":
        return (
          <div className={styles.genVisualizer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.genPromptBar}>
              <span className={styles.genTyping}>/generate image: majestic landscape</span><span className={styles.genCursor} />
            </div>
            <div className={styles.genCanvas}>
              <div className={styles.genNoise} />
              <div className={styles.genResult} />
            </div>
          </div>
        );

      case "multimodal-ai":
        return (
          <div className={styles.mmVisualizer} style={{ "--c": color } as React.CSSProperties}>
            <div className={`${styles.mmStream} ${styles.mmAudio}`}>
              <div className={styles.mmWave} />
            </div>
            <div className={`${styles.mmStream} ${styles.mmVisual}`}>
              <div className={styles.mmGridBox} />
            </div>
            <div className={`${styles.mmStream} ${styles.mmText}`}>
              <div className={styles.mmWords} />
            </div>
            <div className={styles.mmCore}>
              <div className={styles.mmCorePulse} />
            </div>
          </div>
        );

      case "biometric-ai":
        return (
          <div className={styles.bioVisualizer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.bioPrint}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 22v-5M12 13V8M8 22v-4M8 14v-4M16 22v-4M16 14v-4" />
                <path d="M4 22v-6M4 12V6M20 22v-6M20 12V6" />
                <path d="M4 6a8 8 0 0 1 16 0" />
                <path d="M8 8a4 4 0 0 1 8 0" />
              </svg>
            </div>
            <div className={styles.bioScanner} />
            <div className={styles.bioMinutiae} style={{ top: "35%", left: "30%" }} />
            <div className={styles.bioMinutiae} style={{ top: "55%", left: "65%", animationDelay: "0.5s" }} />
            <div className={styles.bioMinutiae} style={{ top: "25%", left: "50%", animationDelay: "1s" }} />
            <div className={styles.bioScore}>Liveness: 99%</div>
          </div>
        );

      case "geospatial-ai":
        return (
          <div className={styles.geoVisualizer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.geoMapBg} />
            <div className={styles.geoReticle}>
              <div className={styles.geoCrosshair} />
            </div>
            <div className={styles.geoPolygon}>
              <svg viewBox="0 0 100 100">
                <polygon points="30,30 70,25 80,70 20,80" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="30" cy="30" r="2" fill="currentColor" />
                <circle cx="70" cy="25" r="2" fill="currentColor" />
                <circle cx="80" cy="70" r="2" fill="currentColor" />
                <circle cx="20" cy="80" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className={styles.geoStats}>Area: 4.2km²</div>
          </div>
        );

      case "conversational-ai":
        return (
          <div className={styles.convVisualizer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.convWaveform}>
              <span /><span /><span /><span /><span />
            </div>
            <div className={styles.convArrow}>→</div>
            <div className={styles.convBubble}>
              <div className={styles.convIntent}>Intent: Booking</div>
              <div className={styles.convEntities}>Entities: [NYC, Friday]</div>
              <div className={styles.convSentiment}>Sentiment: Positive</div>
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.barChart} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboardContainer} style={{ "--c": color } as React.CSSProperties}>
      <div className={styles.header}>
        <div className={styles.trafficLights}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
        <div className={styles.statusBadge}>
          <div className={styles.pulse} />
          LIVE PROCESSING
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.mainPanel}>
          {renderMainVisual()}
        </div>

        <div className={styles.sidePanel}>
          <div className={styles.dataTable}>
            <div className={styles.dataTableRow}>
              <span>Status</span>
              <span className={styles.dataVal} style={{ color: color }}>Active</span>
            </div>
            <div className={styles.dataTableRow}>
              <span>Throughput</span>
              <span className={styles.dataVal}>1.2k units/s</span>
            </div>
            <div className={styles.dataTableRow}>
              <span>Accuracy (IAA)</span>
              <span className={styles.dataVal}>98.4%</span>
            </div>
            <div className={styles.dataTableRow}>
              <span>Compliance</span>
              <span className={styles.dataVal}>Verified</span>
            </div>
          </div>

          <div className={styles.logStream}>
            {logs.map((log, i) => (
              <div 
                key={i} 
                className={`${styles.logLine} ${i === logs.length - 1 ? styles.logLineActive : ''}`}
                style={i === logs.length - 1 ? { "--c": color } as React.CSSProperties : {}}
              >
                &gt; {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
