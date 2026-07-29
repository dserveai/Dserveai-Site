"use client";

import React from "react";
import styles from "./ServiceLiveDashboard.module.css";
import { DynamicIcon } from "./Icons";

interface Props {
  slug: string;
  color: string;
}

export default function ServiceLiveDashboard({ slug, color }: Props) {
  const renderVisual = () => {
    switch (slug) {
      case "medical-imaging-ai":
        return (
          <div className={styles.mriContainer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.mriScanner} />
            <div className={styles.mriGrid} />
          </div>
        );

      case "clinical-nlp":
        return (
          <div className={styles.textParser} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.textLine} style={{ width: '80%' }}></div>
            <div className={styles.textLine} style={{ width: '60%' }}><div className={styles.highlight} /></div>
            <div className={styles.textLine} style={{ width: '90%' }}></div>
            <div className={styles.textLine} style={{ width: '40%' }}><div className={styles.highlight} style={{ animationDelay: '1s'}} /></div>
          </div>
        );

      case "drug-discovery":
        return (
          <div className={styles.moleculeGraph} style={{ "--c": color } as React.CSSProperties}>
            <div className={`${styles.atom} ${styles.atom1}`} />
            <div className={`${styles.atom} ${styles.atom2}`} />
            <div className={`${styles.atom} ${styles.atom3}`} />
            <div className={`${styles.atom} ${styles.atom4}`} />
            <div className={styles.bond} style={{ top: '35%', left: '35%', transform: 'rotate(45deg)' }} />
            <div className={styles.bond} style={{ top: '35%', right: '35%', transform: 'rotate(-45deg)' }} />
            <div className={styles.bond} style={{ bottom: '35%', left: '50%', transform: 'rotate(90deg)' }} />
          </div>
        );

      case "healthcare-administration":
        return (
          <div className={styles.documentScanner} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.docBg} />
            <div className={styles.docScannerLine} />
          </div>
        );

      case "remote-patient-monitoring":
        return (
          <div className={styles.ecgContainer} style={{ "--c": color } as React.CSSProperties}>
            <svg className={styles.ecgWave} viewBox="0 0 100 50">
              <path d="M 0 25 L 20 25 L 30 10 L 40 45 L 50 25 L 100 25" fill="none" stroke="var(--c)" strokeWidth="2" />
            </svg>
            <div className={styles.ecgSweeper} />
          </div>
        );

      case "public-health":
        return (
          <div className={styles.worldMap} style={{ "--c": color } as React.CSSProperties}>
            <div className={`${styles.node} ${styles.node1}`} />
            <div className={`${styles.node} ${styles.node2}`} />
            <div className={`${styles.node} ${styles.node3}`} />
            <div className={`${styles.node} ${styles.node4}`} />
            <div className={styles.connection} />
          </div>
        );

      case "financial-services":
        return (
          <div className={styles.tradingChart} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.candle} style={{ height: '40px', left: '10%' }} />
            <div className={styles.candle} style={{ height: '70px', left: '30%', animationDelay: '0.2s' }} />
            <div className={styles.candle} style={{ height: '30px', left: '50%', animationDelay: '0.4s' }} />
            <div className={styles.candle} style={{ height: '90px', left: '70%', animationDelay: '0.6s' }} />
            <div className={styles.candle} style={{ height: '60px', left: '90%', animationDelay: '0.8s' }} />
            <div className={styles.chartLine} />
          </div>
        );

      case "ecommerce-retail":
        return (
          <div className={styles.annotationFrame} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.boundingBox}>
              <div className={styles.labelBadge}>object: 0.99</div>
            </div>
          </div>
        );

      case "autonomous-systems":
        return (
          <div className={styles.pointCloud} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.point} style={{ top: '10%', left: '50%', transform: 'translateZ(20px)' }} />
            <div className={styles.point} style={{ top: '80%', left: '20%', transform: 'translateZ(-20px)' }} />
            <div className={styles.point} style={{ top: '50%', left: '80%', transform: 'translateZ(40px)' }} />
            <div className={styles.point} style={{ top: '20%', left: '20%', transform: 'translateZ(10px)' }} />
            <div className={styles.point} style={{ top: '70%', left: '60%', transform: 'translateZ(-30px)' }} />
            <div className={styles.lidarSweep} />
          </div>
        );

      case "media-entertainment":
        return (
          <div className={styles.audioVisualizer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.bar} style={{ animationDelay: '0.1s' }} />
            <div className={styles.bar} style={{ animationDelay: '0.3s' }} />
            <div className={styles.bar} style={{ animationDelay: '0.0s' }} />
            <div className={styles.bar} style={{ animationDelay: '0.4s' }} />
            <div className={styles.bar} style={{ animationDelay: '0.2s' }} />
          </div>
        );

      case "llms-conversational-ai":
        return (
          <div className={styles.chatContainer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.chatBubbleUser} />
            <div className={styles.chatBubbleAI}><div className={styles.typingDot} /><div className={styles.typingDot} /><div className={styles.typingDot} /></div>
          </div>
        );

      case "enterprise-ai":
        return (
          <div className={styles.serverRack} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.serverUnit}><div className={styles.blinker} /></div>
            <div className={styles.serverUnit}><div className={styles.blinker} style={{ animationDelay: '0.5s' }} /></div>
            <div className={styles.serverUnit}><div className={styles.blinker} style={{ animationDelay: '0.2s' }} /></div>
          </div>
        );

      case "healthcare-ai-datasets":
        return (
          <div className={styles.mriContainer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.mriScanner} />
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        );

      case "computer-vision-data":
        return (
          <div className={styles.pointCloud} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.point} />
            <div className={styles.point} />
            <div className={styles.point} />
            <div className={styles.point} />
            <div className={styles.point} />
          </div>
        );

      default:
        // Fallback simple pulse
        return (
          <div className={styles.mriContainer} style={{ "--c": color } as React.CSSProperties}>
             <div className={styles.mriScanner} />
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      {renderVisual()}
    </div>
  );
}
