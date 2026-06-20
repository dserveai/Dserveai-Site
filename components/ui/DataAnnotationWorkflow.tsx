"use client";

import React, { useState } from "react";
import styles from "./DataAnnotationWorkflow.module.css";

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

export default function DataAnnotationWorkflow({ steps, color }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const step1 = steps[0];
  const step2 = steps[1];
  const step3 = steps[2];
  const step4 = steps[3];

  return (
    <div className={styles.container} style={{ "--c": color } as React.CSSProperties}>
      
      {/* Central Annotation Canvas */}
      <div className={styles.centralMap}>
        <div className={`${styles.mapCore} ${hoveredIdx !== null ? styles[`mode-${hoveredIdx}`] : ''}`}>
          
          {/* Tracking Reticle */}
          <div className={styles.reticle} />

          {/* The Central Data Object (3D Isometric Cube) */}
          <div className={styles.dataObject}>
            <div className={`${styles.cubeFace} ${styles.cubeFaceFront}`} />
            <div className={`${styles.cubeFace} ${styles.cubeFaceBack}`} />
            <div className={`${styles.cubeFace} ${styles.cubeFaceRight}`} />
            <div className={`${styles.cubeFace} ${styles.cubeFaceLeft}`} />
            <div className={`${styles.cubeFace} ${styles.cubeFaceTop}`} />
            <div className={`${styles.cubeFace} ${styles.cubeFaceBottom}`} />
          </div>

          {/* Animation Layer: Bounding Box (Snaps on mode-1) */}
          <div className={styles.boundingBox}>
            <div className={`${styles.bboxCorner} ${styles.bboxCornerTL}`} />
            <div className={`${styles.bboxCorner} ${styles.bboxCornerTR}`} />
            <div className={`${styles.bboxCorner} ${styles.bboxCornerBL}`} />
            <div className={`${styles.bboxCorner} ${styles.bboxCornerBR}`} />
          </div>

          {/* Animation Layer: Segmentation Trace (Draws on mode-2) */}
          <svg className={styles.segmentationPath}>
            {/* Hexagon shape tracing the isometric cube */}
            <path className={styles.segLine} d="M 70 10 L 130 45 L 130 115 L 70 150 L 10 115 L 10 45 Z" />
          </svg>

          {/* Animation Layer: Classification Tag (Pops up on mode-3) */}
          <div className={styles.classificationTag}>
            Label: Verified
          </div>

        </div>
      </div>

      {/* Static SVG Connector Lines */}
      <svg className={styles.svgLayer} preserveAspectRatio="none">
        {/* Top Left Line (Step 1) */}
        <path 
          d="M 50% 50% Q 30% 20% 10% 25%" 
          className={`${styles.connectorLine} ${hoveredIdx === 0 ? styles.connectorLineActive : ''}`} 
        />
        {/* Bottom Left Line (Step 3) */}
        <path 
          d="M 50% 50% Q 30% 80% 10% 75%" 
          className={`${styles.connectorLine} ${hoveredIdx === 2 ? styles.connectorLineActive : ''}`} 
        />
        {/* Top Right Line (Step 2) */}
        <path 
          d="M 50% 50% Q 70% 20% 90% 35%" 
          className={`${styles.connectorLine} ${hoveredIdx === 1 ? styles.connectorLineActive : ''}`} 
        />
        {/* Bottom Right Line (Step 4) */}
        <path 
          d="M 50% 50% Q 70% 80% 90% 85%" 
          className={`${styles.connectorLine} ${hoveredIdx === 3 ? styles.connectorLineActive : ''}`} 
        />
      </svg>

      {/* Workflow Cards */}
      <div className={styles.cardsWrapper}>
        
        {/* Left Column (Step 1 & 3) */}
        <div className={styles.col}>
          {step1 && (
            <div className={styles.card} onMouseEnter={() => setHoveredIdx(0)} onMouseLeave={() => setHoveredIdx(null)}>
              <div className={styles.cardConnectionPoint} />
              <div className={styles.stepNum}>//{step1.num}</div>
              <h3 className={styles.stepTitle}>{step1.title}</h3>
              <p className={styles.stepDesc}>{step1.desc}</p>
              <p className={styles.stepDetail}>{step1.detail}</p>
              {step1.tags && (
                <div className={styles.stepTags}>
                  {step1.tags.map(tag => <span key={tag} className={styles.stepTag}>{tag}</span>)}
                </div>
              )}
            </div>
          )}

          {step3 && (
            <div className={styles.card} onMouseEnter={() => setHoveredIdx(2)} onMouseLeave={() => setHoveredIdx(null)}>
              <div className={styles.cardConnectionPoint} />
              <div className={styles.stepNum}>//{step3.num}</div>
              <h3 className={styles.stepTitle}>{step3.title}</h3>
              <p className={styles.stepDesc}>{step3.desc}</p>
              <p className={styles.stepDetail}>{step3.detail}</p>
              {step3.tags && (
                <div className={styles.stepTags}>
                  {step3.tags.map(tag => <span key={tag} className={styles.stepTag}>{tag}</span>)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (Step 2 & 4) */}
        <div className={styles.col}>
          {step2 && (
            <div className={styles.card} onMouseEnter={() => setHoveredIdx(1)} onMouseLeave={() => setHoveredIdx(null)}>
              <div className={styles.cardConnectionPoint} />
              <div className={styles.stepNum}>//{step2.num}</div>
              <h3 className={styles.stepTitle}>{step2.title}</h3>
              <p className={styles.stepDesc}>{step2.desc}</p>
              <p className={styles.stepDetail}>{step2.detail}</p>
              {step2.tags && (
                <div className={styles.stepTags}>
                  {step2.tags.map(tag => <span key={tag} className={styles.stepTag}>{tag}</span>)}
                </div>
              )}
            </div>
          )}

          {step4 && (
            <div className={styles.card} onMouseEnter={() => setHoveredIdx(3)} onMouseLeave={() => setHoveredIdx(null)}>
              <div className={styles.cardConnectionPoint} />
              <div className={styles.stepNum}>//{step4.num}</div>
              <h3 className={styles.stepTitle}>{step4.title}</h3>
              <p className={styles.stepDesc}>{step4.desc}</p>
              <p className={styles.stepDetail}>{step4.detail}</p>
              {step4.tags && (
                <div className={styles.stepTags}>
                  {step4.tags.map(tag => <span key={tag} className={styles.stepTag}>{tag}</span>)}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
