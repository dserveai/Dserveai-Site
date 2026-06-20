"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";
import styles from "./NLPWorkflow.module.css";

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

export default function NLPWorkflow({ steps, color }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const step1 = steps[0];
  const step2 = steps[1];
  const step3 = steps[2];
  const step4 = steps[3];

  return (
    <div className={styles.container} style={{ "--c": color } as React.CSSProperties}>
      
      {/* Central NLP Matrix */}
      <div className={styles.centralMap}>
        <div className={`${styles.mapCore} ${hoveredIdx !== null ? styles[`mode-${hoveredIdx}`] : ''}`}>
          
          {/* Background Text Stream */}
          <div className={styles.dataStream}>
            <div className={styles.textLine} />
            <div className={styles.textLine} />
            <div className={styles.textLine} />
            <div className={styles.textLine} />
            <div className={styles.textLine} />
            <div className={styles.textLine} />
            <div className={styles.textLine} />
            <div className={styles.textLine} />
          </div>

          {/* Central Document Engine */}
          <div className={styles.docEngine}>
            <FileText size={32} />
          </div>

          {/* Audio Waveform (Appears on Hover 1) */}
          <div className={styles.audioWave}>
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
          </div>

          {/* Sentiment/Entity Tags (Appears on Hover 2) */}
          <div className={`${styles.sentimentTag} ${styles.tagPos}`}>[Positive]</div>
          <div className={`${styles.sentimentTag} ${styles.tagNeg}`}>[Negative]</div>
          <div className={`${styles.sentimentTag} ${styles.tagEnt}`}>[Entity]</div>

          {/* JSON Output Brackets (Appears on Hover 4) */}
          <div className={styles.jsonBrackets}>
            <span>{"{"}</span>
            <span>{"}"}</span>
          </div>

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
