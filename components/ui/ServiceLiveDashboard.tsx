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
      case "custom-dataset-collection":
        return (
          <div className={styles.worldMap} style={{ "--c": color } as React.CSSProperties}>
            <div className={`${styles.node} ${styles.node1}`} />
            <div className={`${styles.node} ${styles.node2}`} />
            <div className={`${styles.node} ${styles.node3}`} />
            <div className={`${styles.node} ${styles.node4}`} />
            <div className={styles.connection} />
          </div>
        );
      
      case "data-annotation-labeling":
        return (
          <div className={styles.annotationFrame} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.boundingBox}>
              <div className={styles.labelBadge}>object: 0.99</div>
            </div>
          </div>
        );

      case "quality-assurance":
        return (
          <div className={styles.qaContainer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.dataRow}></div>
            <div className={styles.dataRow}>
              <div className={styles.errorBlock} />
            </div>
            <div className={styles.dataRow}></div>
            <div className={styles.dataRow}></div>
            <div className={styles.qaScanner} />
          </div>
        );

      case "rapid-dataset-delivery":
        return (
          <div className={styles.deliveryContainer} style={{ "--c": color } as React.CSSProperties}>
            <div className={styles.serverNode}>
              <DynamicIcon name="Server" size={24} color={color} />
            </div>
            <div className={styles.packetStream}>
              <div className={styles.packet} style={{ animationDelay: "0s" }} />
              <div className={styles.packet} style={{ animationDelay: "0.3s" }} />
              <div className={styles.packet} style={{ animationDelay: "0.6s" }} />
            </div>
            <div className={styles.cloudNode}>
              <DynamicIcon name="CloudUpload" size={24} color={color} />
            </div>
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
