"use client";

import React, { useState } from "react";
import { Database, Mic, Camera, Smartphone, FileText } from "lucide-react";
import styles from "./DatasetCollectionWorkflow.module.css";

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

export default function DatasetCollectionWorkflow({ steps, color }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Fallbacks if steps aren't exactly 4
  const step1 = steps[0];
  const step2 = steps[1];
  const step3 = steps[2];
  const step4 = steps[3];

  return (
    <div className={styles.container} style={{ "--c": color } as React.CSSProperties}>
      
      {/* Central Data Ingestion Engine */}
      <div className={styles.centralMap}>
        <div className={`${styles.mapCore} ${hoveredIdx !== null ? styles.activeModality : ''}`}>
          
          {/* Central Server / Final Dataset */}
          <div className={styles.serverCore}>
            <Database size={48} className={styles.serverIcon} />
          </div>

          {/* Orbiting Raw Data Modalities and their Particle Streams */}
          <div className={styles.modalityOrbit}>
            <div className={styles.modalityNode}><Mic size={20} /></div>
            <div className={styles.modalityNode}><Camera size={20} /></div>
            <div className={styles.modalityNode}><Smartphone size={20} /></div>
            <div className={styles.modalityNode}><FileText size={20} /></div>

            {/* Data Particles Shooting from Orbit into Server */}
            <div className={`${styles.particleStream} ${styles.particleStreamTop}`}>
              <div className={styles.particle} /><div className={styles.particle} /><div className={styles.particle} />
            </div>
            <div className={`${styles.particleStream} ${styles.particleStreamBottom}`}>
              <div className={styles.particle} /><div className={styles.particle} /><div className={styles.particle} />
            </div>
            <div className={`${styles.particleStream} ${styles.particleStreamLeft}`}>
              <div className={styles.particle} /><div className={styles.particle} /><div className={styles.particle} />
            </div>
            <div className={`${styles.particleStream} ${styles.particleStreamRight}`}>
              <div className={styles.particle} /><div className={styles.particle} /><div className={styles.particle} />
            </div>
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
