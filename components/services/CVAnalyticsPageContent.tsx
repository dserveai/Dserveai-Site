"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import InteractiveInfographic from "@/components/ui/InteractiveInfographic";
import { Cpu, Eye, CloudLightning, Activity } from "lucide-react";
import custom from "./ServiceLayouts.module.css";
import pageStyles from "@/app/services/[slug]/page.module.css";

export default function CVAnalyticsPageContent({ service, steps, color }: any) {
  return (
    <>
      {/* SECTION 1: HARDWARE & EDGE PROFILING */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.grid2} style={{ alignItems: 'center' }}>
              <div>
                <span className={pageStyles.codePrefix} style={{ color }}>// hardware constraints</span>
                <h2 className={pageStyles.overviewTitle}>Edge & Cloud Hardware Optimization</h2>
                <p className={pageStyles.overviewBody}>
                  A highly accurate model is useless if it runs at 2 FPS on your factory floor. We profile your target deployment hardware before we even begin training, selecting architectures that meet your exact latency and throughput requirements.
                </p>
                <ul className={custom.featureList} style={{ marginTop: '24px' }}>
                  <li className={custom.featureItem}><Cpu size={20} color={color} /> Nvidia Jetson, Coral Edge TPU, & Intel OpenVINO</li>
                  <li className={custom.featureItem}><CloudLightning size={20} color={color} /> Cloud GPU Clusters (A100/H100) for batch processing</li>
                  <li className={custom.featureItem}><Activity size={20} color={color} /> INT8 & FP16 Quantization via TensorRT</li>
                </ul>
              </div>
              <div className={custom.infoCard} style={{ background: `linear-gradient(135deg, rgba(10,15,25,0.9), ${color}15)`, border: `1px solid ${color}40` }}>
                <h3 className={custom.cardTitle}>Latency vs. Accuracy Tuning</h3>
                <p className={custom.cardDesc} style={{ marginBottom: '16px' }}>
                  We don't just deploy heavy transformer models by default. Depending on the task, we might deploy a lightweight YOLOv8-tiny architecture perfectly quantized to run at 60 FPS on a Jetson Nano, maintaining 98% of the accuracy of a massive cloud model.
                </p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>50ms</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Avg Edge Latency</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color }}>99%</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Accuracy Retained (INT8)</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: MODEL ARCHITECTURES */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader} style={{ textAlign: 'center' }}>
              <span className={pageStyles.codePrefix} style={{ color }}>// architectures</span>
              <h2 className={pageStyles.overviewTitle}>State-of-the-Art Vision Models</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px', margin: '0 auto' }}>
                We deploy the most advanced computer vision architectures available, fine-tuned specifically on your proprietary data.
              </p>
            </div>
            
            <div className={custom.grid3}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <Eye size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Object Detection & Tracking</h3>
                <p className={custom.cardDesc}>YOLO series (v8/v10), RT-DETR, and DeepSORT algorithms deployed for high-speed tracking, counting, and trajectory prediction.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <Eye size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Semantic Segmentation</h3>
                <p className={custom.cardDesc}>Mask R-CNN, Segment Anything Model (SAM), and U-Net architectures for pixel-perfect defect detection and medical imaging.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40`, padding: '32px' }}>
                <Eye size={32} color={color} style={{ marginBottom: '16px' }} />
                <h3 className={custom.cardTitle} style={{ fontSize: '1.2rem' }}>Action & Pose Recognition</h3>
                <p className={custom.cardDesc}>OpenPose, MediaPipe, and custom action-recognition transformers for worker safety, ergonomics, and behavioral analysis.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: PIPELINE WORKFLOW (Interactive) */}
      <section className={pageStyles.howSection} id="how-it-works">
        <div className="container">
          <div className={pageStyles.stickyHeader} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className={pageStyles.codePrefix} style={{ color }}>// workflow</span>
            <h2 className={pageStyles.overviewTitle}>The Real-Time Tracker Radar</h2>
            <p className={pageStyles.overviewBody} style={{ maxWidth: '700px', margin: '16px auto 0' }}>
              Interact with the nodes below to explore how our deployed models detect, track, and aggregate insights in real-time.
            </p>
          </div>
          <InteractiveInfographic steps={steps} color={color} slug={service.slug} />
        </div>
      </section>

      {/* SECTION 4: DASHBOARD INTEGRATION */}
      <section className={custom.customSection}>
        <div className="container">
          <ScrollReveal>
            <div className={custom.sectionHeader}>
              <span className={pageStyles.codePrefix} style={{ color }}>// insights</span>
              <h2 className={pageStyles.overviewTitle}>Live Dashboard & BI Integration</h2>
              <p className={pageStyles.overviewBody} style={{ maxWidth: '800px' }}>
                A model's predictions are only valuable if they drive business decisions. We don't just deliver an inference container; we build the pipelines that pipe telemetry directly into your BI tools.
              </p>
            </div>
            
            <div className={custom.grid2}>
              <div className={custom.infoCard} style={{ borderColor: `${color}40` }}>
                <h3 className={custom.cardTitle}>Custom UI Dashboards</h3>
                <p className={custom.cardDesc}>We build bespoke, low-latency web dashboards (React/Next.js) that stream live camera feeds overlaid with bounding boxes, heatmaps, and real-time metric aggregates.</p>
              </div>
              <div className={custom.infoCard} style={{ borderColor: `${color}40` }}>
                <h3 className={custom.cardTitle}>BI & API Hookups</h3>
                <p className={custom.cardDesc}>If you already use Tableau, PowerBI, or Grafana, we build the REST/GraphQL APIs and Kafka streaming pipelines to push model telemetry directly into your existing infrastructure.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
