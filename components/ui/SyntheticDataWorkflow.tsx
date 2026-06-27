"use client";

import React, { useState } from "react";
import styles from "./SyntheticDataWorkflow.module.css";

interface Step {
  num: string;
  title: string;
  desc: string;
  detail: string;
  tags?: string[];
}

interface Props {
  steps: Step[];
  color: string;
}

export default function SyntheticDataWorkflow({ steps, color }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const step1 = steps[0];
  const step2 = steps[1];
  const step3 = steps[2];
  const step4 = steps[3];

  return (
    <div className={styles.container} style={{ "--c": color } as React.CSSProperties}>
      
      {/* Procedural Geometry Engine Core */}
      <div className={styles.engineCore}>
        <div className={`${styles.engineCore} ${hoveredIdx !== null ? styles[`mode-${hoveredIdx}`] : ''}`}>
          
          {/* Seed and Streams */}
          <div className={styles.seedCore} />
          <div className={`${styles.codeStream} ${styles.cs1}`} />
          <div className={`${styles.codeStream} ${styles.cs2}`} />
          <div className={`${styles.codeStream} ${styles.cs3}`} />

          {/* 3D Cube */}
          <div className={styles.cube}>
            <div className={`${styles.face} ${styles.front}`} />
            <div className={`${styles.face} ${styles.back}`} />
            <div className={`${styles.face} ${styles.right}`} />
            <div className={`${styles.face} ${styles.left}`} />
            <div className={`${styles.face} ${styles.top}`} />
            <div className={`${styles.face} ${styles.bottom}`} />
          </div>

          {/* Floating Assets */}
          <div className={`${styles.syntheticAsset} ${styles.asset1}`} />
          <div className={`${styles.syntheticAsset} ${styles.asset2}`} />
          <div className={`${styles.syntheticAsset} ${styles.asset3}`} />

          {/* Validation Scanner Ring */}
          <div className={styles.scannerRing} />

        </div>
      </div>

      {/* Static SVG Connector Lines */}
      <svg className={styles.svgLayer} preserveAspectRatio="none">
        <path d="M 50% 50% Q 30% 20% 10% 25%" className={`${styles.connectorLine} ${hoveredIdx === 0 ? styles.connectorLineActive : ''}`} />
        <path d="M 50% 50% Q 30% 80% 10% 75%" className={`${styles.connectorLine} ${hoveredIdx === 2 ? styles.connectorLineActive : ''}`} />
        <path d="M 50% 50% Q 70% 20% 90% 35%" className={`${styles.connectorLine} ${hoveredIdx === 1 ? styles.connectorLineActive : ''}`} />
        <path d="M 50% 50% Q 70% 80% 90% 85%" className={`${styles.connectorLine} ${hoveredIdx === 3 ? styles.connectorLineActive : ''}`} />
      </svg>

      {/* Workflow Cards */}
      <div className={styles.cardsWrapper}>
        <div className={styles.col}>
          {step1 && (
            <div className={styles.card} onMouseEnter={() => setHoveredIdx(0)} onMouseLeave={() => setHoveredIdx(null)}>
              <div className={styles.cardConnectionPoint} />
              <div className={styles.stepNum}>//{step1.num}</div>
              <h3 className={styles.stepTitle}>{step1.title}</h3>
              <p className={styles.stepDesc}>{step1.desc}</p>
              <p className={styles.stepDetail}>{step1.detail}</p>
              {step1.tags && <div className={styles.stepTags}>{step1.tags.map(tag => <span key={tag} className={styles.stepTag}>{tag}</span>)}</div>}
            </div>
          )}
          {step3 && (
            <div className={styles.card} onMouseEnter={() => setHoveredIdx(2)} onMouseLeave={() => setHoveredIdx(null)}>
              <div className={styles.cardConnectionPoint} />
              <div className={styles.stepNum}>//{step3.num}</div>
              <h3 className={styles.stepTitle}>{step3.title}</h3>
              <p className={styles.stepDesc}>{step3.desc}</p>
              <p className={styles.stepDetail}>{step3.detail}</p>
              {step3.tags && <div className={styles.stepTags}>{step3.tags.map(tag => <span key={tag} className={styles.stepTag}>{tag}</span>)}</div>}
            </div>
          )}
        </div>
        <div className={styles.col}>
          {step2 && (
            <div className={styles.card} onMouseEnter={() => setHoveredIdx(1)} onMouseLeave={() => setHoveredIdx(null)}>
              <div className={styles.cardConnectionPoint} />
              <div className={styles.stepNum}>//{step2.num}</div>
              <h3 className={styles.stepTitle}>{step2.title}</h3>
              <p className={styles.stepDesc}>{step2.desc}</p>
              <p className={styles.stepDetail}>{step2.detail}</p>
              {step2.tags && <div className={styles.stepTags}>{step2.tags.map(tag => <span key={tag} className={styles.stepTag}>{tag}</span>)}</div>}
            </div>
          )}
          {step4 && (
            <div className={styles.card} onMouseEnter={() => setHoveredIdx(3)} onMouseLeave={() => setHoveredIdx(null)}>
              <div className={styles.cardConnectionPoint} />
              <div className={styles.stepNum}>//{step4.num}</div>
              <h3 className={styles.stepTitle}>{step4.title}</h3>
              <p className={styles.stepDesc}>{step4.desc}</p>
              <p className={styles.stepDetail}>{step4.detail}</p>
              {step4.tags && <div className={styles.stepTags}>{step4.tags.map(tag => <span key={tag} className={styles.stepTag}>{tag}</span>)}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
