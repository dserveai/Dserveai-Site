"use client";

import React, { useEffect, useRef, useState } from "react";
import ServiceLiveDashboard from "./ServiceLiveDashboard";
import styles from "./StickySteps.module.css";

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
  sectionTitle: string;
  slug?: string;
  visualizer?: React.ReactNode;
}

export default function StickySteps({ steps, color, sectionTitle, slug, visualizer }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveIdx(idx);
          });
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [steps.length]);

  return (
    <div className={styles.stickySection} ref={sectionRef}>
      {/* Section header */}
      <div className={styles.stickyHeader}>
        <span className={styles.codeLabel} style={{ "--c": color } as React.CSSProperties}>
          // {sectionTitle}
        </span>
        <h2 className={styles.stickyTitle}>High-Impact AI Use Cases</h2>
        <p className={styles.stickySubtitle}>
          Discover how our specialized data solutions power state-of-the-art models and drive measurable outcomes across real-world domain projects.
        </p>
      </div>

      <div className={styles.stickyBody}>
        
        {/* LEFT: Massive Sticky Animation Monitor */}
        <div className={styles.stickyLeft}>
          <div className={styles.navDashboardWrapper}>
            {visualizer ? (
              visualizer
            ) : slug ? (
              <ServiceLiveDashboard slug={slug} color={color} />
            ) : (
               <ServiceLiveDashboard slug="default" color={color} />
            )}
          </div>
        </div>

        {/* RIGHT: Scrolling Workflow Steps */}
        <div className={styles.stickyRight}>
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`${styles.scrollStep} ${i === activeIdx ? styles.scrollStepActive : ""}`}
            >
              <div className={styles.stepNum} style={{ "--c": color } as React.CSSProperties}>
                //{step.num}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              <p className={styles.stepDetail}>{step.detail}</p>

              {step.tags && step.tags.length > 0 && (
                <div className={styles.stepTags}>
                  {step.tags.map((tag, ti) => (
                    <span key={ti} className={styles.stepTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
