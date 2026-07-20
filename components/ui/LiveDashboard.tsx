"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./LiveDashboard.module.css";

interface LiveDashboardProps {
  slug: string;
  color: string;
  solutionName: string;
}

export default function LiveDashboard({ slug, color, solutionName }: LiveDashboardProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const content = React.useMemo(() => {
    switch (slug) {
      case "healthcare-ai":
        return {
          image: "/solutions/.webp",
          throughput: "450 scans/s",
          accuracy: "99.2%",
          logs: [
            "> Initializing secure HIPAA pipeline...",
            "> Connecting to medical nodes...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting DICOM dataset [batch_01]...",
            "> Redacting PHI from metadata...",
            "> Executing radiology labeling pass...",
            "> Running multi-stage QA...",
            "> Generating clinical confidence scores...",
            "> Encrypted package ready for delivery."
          ]
        };
      case "computer-vision":
        return {
          image: "/solutions/.webp",
          throughput: "12k frames/s",
          accuracy: "98.7%",
          logs: [
            "> Initializing vision pipeline...",
            "> Connecting to edge nodes...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting raw video dataset [batch_01]...",
            "> Extracting temporal frames...",
            "> Executing bounding box pass...",
            "> Running multi-stage QA...",
            "> Generating mAP confidence scores...",
            "> Dataset package ready for delivery."
          ]
        };
      case "agentic-ai":
        return {
          image: "/solutions/.webp",
          throughput: "2.4k actions/s",
          accuracy: "97.5%",
          logs: [
            "> Initializing agent environment...",
            "> Connecting to API tool nodes...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting trajectory dataset [batch_01]...",
            "> Validating chain-of-thought rules...",
            "> Executing action labeling pass...",
            "> Running reasoning QA...",
            "> Generating reward model scores...",
            "> RLHF package ready for delivery."
          ]
        };
      case "generative-ai":
        return {
          image: "/solutions/.webp",
          throughput: "1.8k prompts/s",
          accuracy: "98.9%",
          logs: [
            "> Initializing generation pipeline...",
            "> Connecting to LLM nodes...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting prompt dataset [batch_01]...",
            "> Validating safety and alignment...",
            "> Executing RLHF preference pass...",
            "> Running toxicity QA...",
            "> Generating helpfulness scores...",
            "> Fine-tuning package ready for delivery."
          ]
        };
      case "multimodal-ai":
        return {
          image: "/solutions/.webp",
          throughput: "8.5k pairs/s",
          accuracy: "98.1%",
          logs: [
            "> Initializing multi-modal pipeline...",
            "> Connecting to cross-modal nodes...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting text-image-audio dataset [batch_01]...",
            "> Synchronizing temporal alignments...",
            "> Executing dense captioning pass...",
            "> Running cross-reference QA...",
            "> Generating CLIP confidence scores...",
            "> WebDataset package ready for delivery."
          ]
        };
      case "biometric-ai":
        return {
          image: "/solutions/.webp",
          throughput: "920 streams/s",
          accuracy: "99.9%",
          logs: [
            "> Initializing biometric ingestion...",
            "> Validating strict opt-in consent...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting multi-demographic dataset [batch_01]...",
            "> Generating presentation attacks (anti-spoofing)...",
            "> Executing liveness detection labeling...",
            "> Scrubbing non-essential PII...",
            "> Generating demographic bias reports...",
            "> Anonymized package ready for delivery."
          ]
        };
      case "geospatial-ai":
        return {
          image: "/solutions/.webp",
          throughput: "120 tiles/s",
          accuracy: "98.5%",
          logs: [
            "> Initializing satellite ingestion pipeline...",
            "> Connecting to SAR/multispectral nodes...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting high-res imagery [batch_01]...",
            "> Aligning Earth coordinate systems...",
            "> Executing terrain and polygon annotation...",
            "> Running temporal change detection QA...",
            "> Generating GeoJSON mapping scores...",
            "> Georeferenced package ready for delivery."
          ]
        };
      case "conversational-ai":
        return {
          image: "/solutions/.webp",
          throughput: "5.5k hrs/day",
          accuracy: "99.1%",
          logs: [
            "> Initializing conversational ingestion...",
            "> Connecting to acoustic processing nodes...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting multi-dialect audio [batch_01]...",
            "> Executing diarization and transcription...",
            "> Mapping intent and entity hierarchies...",
            "> Running multi-turn dialogue QA...",
            "> Generating sentiment analysis scores...",
            "> NLU-ready package ready for delivery."
          ]
        };
      default:
        return {
          image: "/solutions/.webp",
          throughput: "System OK",
          accuracy: "99.0%",
          logs: [
            "> Initializing pipeline...",
            "> Connecting to nodes...",
            "> [SUCCESS] Environment mapped.",
            "> Ingesting dataset...",
            "> Executing annotation pass...",
            "> Running QA protocols...",
            "> Generating confidence scores...",
            "> Package ready for delivery."
          ]
        };
    }
  }, [slug]);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const runLogs = async () => {
      while (isMounted) {
        setLogs([]);
        
        for (let i = 0; i < content.logs.length; i++) {
          if (!isMounted) return;
          // Wait 1.2s between logs
          await new Promise(resolve => { timeoutId = setTimeout(resolve, 1200); });
          
          if (!isMounted) return;
          setLogs(prev => [...prev, content.logs[i]]);
        }
        
        if (!isMounted) return;
        // Wait 3s before clearing and looping
        await new Promise(resolve => { timeoutId = setTimeout(resolve, 3000); });
      }
    };

    runLogs();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [content.logs]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

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
          DSERVE AI PLATFORM
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.mainPanel}>
          <div className={styles.imageWrapper}>
            <Image 
              src={content.image} 
              alt={`${solutionName} visualization`} 
              fill 
              className={styles.insightImage}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* The CSS animations on top of the image make it act like a moving video */}
            <div className={styles.videoOverlay}>
              <div className={styles.scanline} />
              <div className={styles.gridOverlay} />
              <div className={styles.radarSweep} />
            </div>
            
            <div className={styles.liveBadge}>
              <div className={styles.liveDot} /> LIVE
            </div>
          </div>
        </div>

        <div className={styles.sidePanel}>
          <div className={styles.cmdHeader}>
            <span>{slug}_processing.exe</span>
            <span className={styles.cmdTime}>Up: 99.9%</span>
          </div>
          
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Throughput</span>
              <span className={styles.statValue}>{content.throughput}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Accuracy</span>
              <span className={styles.statValue} style={{ color: color }}>{content.accuracy}</span>
            </div>
          </div>

          <div className={styles.terminal} ref={scrollRef}>
            {logs.map((log, i) => (
              <div key={i} className={styles.logLine}>
                <span className={styles.logTimestamp}>[{new Date().toISOString().substring(11, 19)}]</span>
                <span className={styles.logText} style={log.includes("[SUCCESS]") ? { color: "#10b981" } : {}}>{log}</span>
              </div>
            ))}
            <div className={styles.cursor} />
          </div>
        </div>
      </div>
    </div>
  );
}
