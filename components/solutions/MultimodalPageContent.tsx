import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FileVideo, PenTool, ClipboardCheck, Video } from "lucide-react";

export default function MultimodalPageContent({ color }: { solution?: any, color: string }) {
  return (
    <section style={{ padding: "100px 0", background: "#040810" }}>
      <div className="container">
        
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "80px", maxWidth: "800px", margin: "0 auto 80px" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "24px", color: "#fff" }}>
              Bridging the gap between <span style={{ color }}>Vision, Sound, and Text.</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              Modern foundation models require perfectly aligned cross-modal data. We provide the end-to-end data pipelines necessary to synchronize text, visual, and audio streams into unified multimodal assets.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          
          <ScrollReveal delay={0}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "64px", height: "64px", background: `${color}15`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <FileVideo size={32} color={color} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Data Collection</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, flexGrow: 1 }}>
                We source vast amounts of paired data, from video streams coupled with ambient audio to massive image-text caption pairs, ensuring high diversity and real-world variance.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "64px", height: "64px", background: `${color}15`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <PenTool size={32} color={color} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Data Annotation</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, flexGrow: 1 }}>
                Our annotators provide dense captioning, temporal bounding boxes for video, and precise audio transcription, effectively linking modalities with exact timestamp synchronization.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "64px", height: "64px", background: `${color}15`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <Video size={32} color={color} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Data Creation</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, flexGrow: 1 }}>
                When sourcing falls short, we actively generate synthetic scenes, record studio-grade multimodal interactions, and build entirely new custom scenarios for your VQA (Visual Question Answering) models.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "64px", height: "64px", background: `${color}15`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <ClipboardCheck size={32} color={color} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Rigorous QA</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, flexGrow: 1 }}>
                Multimodal alignment requires strict auditing. Our QA pipelines test for contextual hallucination, temporal misalignment, and cross-modal bias before final delivery.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
