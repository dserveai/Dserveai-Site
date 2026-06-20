"use client";

import React from "react";
import DatasetCollectionWorkflow from "./DatasetCollectionWorkflow";
import DataAnnotationWorkflow from "./DataAnnotationWorkflow";
import ModelEvalWorkflow from "./ModelEvalWorkflow";
import ComputerVisionWorkflow from "./ComputerVisionWorkflow";
import NLPWorkflow from "./NLPWorkflow";
import RapidDeliveryWorkflow from "./RapidDeliveryWorkflow";
import QAWorkflow from "./QAWorkflow";
import HealthcareWorkflow from "./HealthcareWorkflow";
import styles from "./InteractiveInfographic.module.css";

interface Step {
  num: string;
  title: string;
  desc: string;
  detail: string;
  tags?: string[];
}

interface Props {
  steps: Step[];
  slug: string;
  color: string;
}

export default function InteractiveInfographic({ steps, slug, color }: Props) {

  // If we have a fully custom page-specific component, return it here.
  if (slug === "custom-dataset-collection") {
    return <DatasetCollectionWorkflow steps={steps} color={color} />;
  }
  if (slug === "data-annotation-labeling") {
    return <DataAnnotationWorkflow steps={steps} color={color} />;
  }
  if (slug === "model-evaluation-rlhf") {
    return <ModelEvalWorkflow steps={steps} color={color} />;
  }
  if (slug === "computer-vision-data") {
    return <ComputerVisionWorkflow steps={steps} color={color} />;
  }
  if (slug === "nlp-text-data") {
    return <NLPWorkflow steps={steps} color={color} />;
  }
  if (slug === "rapid-dataset-delivery") {
    return <RapidDeliveryWorkflow steps={steps} color={color} />;
  }
  if (slug === "quality-assurance") {
    return <QAWorkflow steps={steps} color={color} />;
  }
  if (slug === "healthcare-ai-datasets") {
    return <HealthcareWorkflow steps={steps} color={color} />;
  }

  const getLayoutType = () => {
    switch (slug) {
      case "custom-dataset-collection": return "map";
      case "data-annotation-labeling": return "matrix";
      case "quality-assurance": return "radar";
      case "rapid-dataset-delivery": return "pipeline";
      case "healthcare-ai-datasets": return "dna";
      case "computer-vision-data": return "cube";
      default: return "radar";
    }
  };

  const layout = getLayoutType();

  const renderEnvironmentalAnimation = () => {
    switch (layout) {
      case "map":
        return (
          <div className={`${styles.bgEnvironment} ${styles.env_map}`}>
            <div className={styles.mapPulse} />
          </div>
        );
      case "matrix":
        return (
          <div className={`${styles.bgEnvironment} ${styles.env_matrix}`}>
            <div className={styles.laserGrid} />
            <div className={styles.laserScannerLine} />
          </div>
        );
      case "radar":
        return (
          <div className={`${styles.bgEnvironment} ${styles.env_radar}`}>
            <div className={styles.verticalScanner} />
          </div>
        );
      case "pipeline":
        return (
          <div className={`${styles.bgEnvironment} ${styles.env_pipeline}`}>
            <div className={styles.centralPipe} />
            <div className={styles.dataPacket} style={{ animationDelay: "0s" }} />
            <div className={styles.dataPacket} style={{ animationDelay: "0.8s" }} />
          </div>
        );
      case "dna":
        return (
          <div className={`${styles.bgEnvironment} ${styles.env_dna}`}>
            <div className={styles.dnaWaveLine} />
          </div>
        );
      case "cube":
        return (
          <div className={`${styles.bgEnvironment} ${styles.env_cube}`}>
            <div className={styles.isoBase} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`${styles.container} ${styles[`layout_${layout}`]}`}
      style={{ "--c": color } as React.CSSProperties}
    >
      {/* Massive Borderless Environmental Background */}
      {renderEnvironmentalAnimation()}

      {/* Floating Typographic Nodes (No Boxes) */}
      <div className={styles.layoutGrid}>
        {steps.map((step, i) => (
          <div key={i} className={styles.nodeText}>
            <div className={styles.stepNum}>//{step.num}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
            <p className={styles.stepDetail}>{step.detail}</p>

            {step.tags && step.tags.length > 0 && (
              <div className={styles.stepTags}>
                {step.tags.map((tag, ti) => (
                  <span key={ti} className={styles.stepTag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
