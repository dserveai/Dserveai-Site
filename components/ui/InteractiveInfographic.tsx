"use client";

import React from "react";
import AnnotationQAWorkflow from "./AnnotationQAWorkflow";
import MultiModalWorkflow from "./MultiModalWorkflow";
import SyntheticDataWorkflow from "./SyntheticDataWorkflow";
import CVAnalyticsWorkflow from "./CVAnalyticsWorkflow";
import CustomAIWorkflow from "./CustomAIWorkflow";
import QAWorkflow from "./QAWorkflow";

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
  switch (slug) {
    case "data-annotation-and-qa":
      return <AnnotationQAWorkflow steps={steps} color={color} />;
    case "multi-modal-data-collection":
      return <MultiModalWorkflow steps={steps} color={color} />;
    case "synthetic-data-generation":
      return <SyntheticDataWorkflow steps={steps} color={color} />;
    case "computer-vision-analytics":
      return <CVAnalyticsWorkflow steps={steps} color={color} />;
    case "custom-ai-solutions":
      return <CustomAIWorkflow steps={steps} color={color} />;
    case "quality-assurance":
      return <QAWorkflow steps={steps} color={color} />;
    default:
      // Fallback
      return <AnnotationQAWorkflow steps={steps} color={color} />;
  }
}
