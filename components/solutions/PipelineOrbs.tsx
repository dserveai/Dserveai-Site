"use client";

import React from "react";
import { Activity, Bot, Eye, Sparkles, Layers, Fingerprint, MessageSquare, Cpu } from "lucide-react";
import styles from "./PipelineOrbs.module.css";

// 1. Healthcare
export function HealthcareOrb({ color }: { color: string }) {
  return (
    <div className={styles.orbWrapper}>
      <div className={styles.ring1} style={{ borderColor: color }} />
      <div className={styles.ring2} style={{ borderColor: color }} />
      <Activity size={48} color={color} className={styles.pulseIcon} />
    </div>
  );
}

// 2. Agentic
export function AgenticOrb({ color }: { color: string }) {
  return (
    <div className={styles.orbWrapper}>
      <div className={styles.dashRing} style={{ borderColor: color }} />
      <div className={styles.nodesContainer}>
        <div className={styles.node1} style={{ background: color }} />
        <div className={styles.node2} style={{ background: color }} />
        <div className={styles.node3} style={{ background: color }} />
      </div>
      <Bot size={48} color={color} />
    </div>
  );
}

// 3. Computer Vision
export function CVOrb({ color }: { color: string }) {
  return (
    <div className={styles.orbWrapper}>
      <div className={styles.scanner} style={{ background: `linear-gradient(to bottom, transparent, ${color})` }} />
      <div className={styles.crosshair} style={{ borderColor: color }} />
      <Eye size={48} color={color} />
    </div>
  );
}

// 4. Gen AI
export function GenAIOrb({ color }: { color: string }) {
  return (
    <div className={styles.orbWrapper}>
      <div className={styles.sparkleRing} style={{ borderColor: color }} />
      <Sparkles size={48} color={color} className={styles.spinIcon} />
    </div>
  );
}

// 5. Multimodal
export function MultimodalOrb({ color }: { color: string }) {
  return (
    <div className={styles.orbWrapper}>
      <div className={styles.layer1} style={{ borderColor: color }} />
      <div className={styles.layer2} style={{ borderColor: color }} />
      <div className={styles.layer3} style={{ borderColor: color }} />
      <Layers size={48} color={color} />
    </div>
  );
}

// 6. Biometrics
export function BiometricsOrb({ color }: { color: string }) {
  return (
    <div className={styles.orbWrapper}>
      <div className={styles.fingerprintScan} style={{ background: color }} />
      <Fingerprint size={48} color={color} />
    </div>
  );
}

// 7. Conversational
export function ConversationalOrb({ color }: { color: string }) {
  return (
    <div className={styles.orbWrapper}>
      <div className={styles.soundWave1} style={{ background: color }} />
      <div className={styles.soundWave2} style={{ background: color }} />
      <div className={styles.soundWave3} style={{ background: color }} />
      <MessageSquare size={48} color={color} style={{ zIndex: 2 }} />
    </div>
  );
}

// 8. Physical
export function PhysicalOrb({ color }: { color: string }) {
  return (
    <div className={styles.orbWrapper}>
      <div className={styles.gearRing} style={{ borderColor: color }} />
      <Cpu size={48} color={color} />
    </div>
  );
}
