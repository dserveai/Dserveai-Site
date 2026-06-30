import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Activity, Crosshair, UserCheck, ShieldPlus } from "lucide-react";

export default function HealthcarePageContent({ color }: { solution?: any, color: string }) {
  return (
    <section style={{ padding: "100px 0", background: `radial-gradient(circle at right, ${color}10, transparent 40%)` }}>
      <div className="container">
        
        {/* Header */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "80px", maxWidth: "800px", margin: "0 auto 80px" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "24px", color: "#fff" }}>
              Medical-Grade Precision. <span style={{ color }}>Zero Compromise.</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              Healthcare AI requires flawless execution. Our data collection and annotation pipelines are designed exclusively for medical contexts, ensuring every dataset meets the stringent requirements of clinical ML models.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Architecture */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", marginBottom: "80px" }}>
          
          <ScrollReveal delay={0}>
            <div style={{ background: "rgba(10,15,25,0.6)", padding: "40px", borderRadius: "24px", border: `1px solid ${color}30`, height: "100%" }}>
              <Activity size={32} color={color} style={{ marginBottom: "24px" }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#fff" }}>Healthcare Expert Annotation</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                We don't use general crowds. Your data is labeled exclusively by healthcare professionals, clinicians, and medical experts who understand the nuances of the human anatomy.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ background: "rgba(10,15,25,0.6)", padding: "40px", borderRadius: "24px", border: `1px solid ${color}30`, height: "100%" }}>
              <Crosshair size={32} color={color} style={{ marginBottom: "24px" }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#fff" }}>Slice Thickness & Segmentation</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                From 3D volumetric masking to slice thickness analysis, our tools support advanced semantic segmentation and key-point annotation covering the entire human anatomy.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div style={{ background: "rgba(10,15,25,0.6)", padding: "40px", borderRadius: "24px", border: `1px solid ${color}30`, height: "100%" }}>
              <UserCheck size={32} color={color} style={{ marginBottom: "24px" }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#fff" }}>Radiologist Final QA Audit</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                The final quality audit is executed by specialized doctors and board-certified radiologists. This ensures your ground-truth data is clinically valid before it hits your training servers.
              </p>
            </div>
          </ScrollReveal>

        </div>

        {/* Highlight Banner */}
        <ScrollReveal delay={300}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", background: `linear-gradient(90deg, ${color}20, transparent)`, padding: "40px", borderRadius: "20px", borderLeft: `4px solid ${color}` }}>
            <ShieldPlus size={48} color={color} />
            <div>
              <h4 style={{ fontSize: "1.25rem", color: "#fff", marginBottom: "8px" }}>Secure Data Collection Pipeline</h4>
              <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>
                HIPAA-compliant, fully anonymized EHR, DICOM, and clinical text extraction at scale.
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
