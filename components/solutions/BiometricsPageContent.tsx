import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScanFace, Fingerprint, ShieldAlert, Users, Video } from "lucide-react";

export default function BiometricsPageContent({ color }: { solution?: any, color: string }) {
  return (
    <section style={{ padding: "100px 0", background: "#040810", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        
        <ScrollReveal>
          <div style={{ marginBottom: "64px" }}>
            <h2 style={{ fontSize: "3rem", color: "white", marginBottom: "24px" }}>
              Ethical. Diverse. <span style={{ color }}>Secure.</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", lineHeight: 1.6 }}>
              Biometric AI demands absolute precision and strict ethical sourcing. We provide highly diverse datasets collected under robust consent frameworks, ensuring your models are globally representative and highly secure against spoofing attacks.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "40px" }}>
          
          <ScrollReveal delay={0}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "32px", borderRadius: "16px" }}>
              <ScanFace size={32} color={color} style={{ marginBottom: "16px" }} />
              <h4 style={{ fontSize: "1.2rem", color: "white", marginBottom: "8px" }}>Facial & Eye Scan</h4>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>High-res facial topography and precise iris/eye tracking datasets captured across varying lighting conditions.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "32px", borderRadius: "16px" }}>
              <Fingerprint size={32} color={color} style={{ marginBottom: "16px" }} />
              <h4 style={{ fontSize: "1.2rem", color: "white", marginBottom: "8px" }}>Fingerprint Collection</h4>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>Multi-angle, varied pressure fingerprint mapping to train highly robust tactile and optical security sensors.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "32px", borderRadius: "16px" }}>
              <ShieldAlert size={32} color={color} style={{ marginBottom: "16px" }} />
              <h4 style={{ fontSize: "1.2rem", color: "white", marginBottom: "8px" }}>Anti-Spoofing (Liveness)</h4>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>We generate presentation attacks (masks, digital replays) so your liveness detection models can catch fraud.</p>
            </div>
          </ScrollReveal>

        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <ScrollReveal delay={300}>
            <div style={{ background: `linear-gradient(135deg, ${color}15, rgba(0,0,0,0.5))`, padding: "40px", borderRadius: "24px", display: "flex", gap: "24px", alignItems: "center" }}>
              <Users size={48} color={color} />
              <div>
                <h3 style={{ color: "white", fontSize: "1.3rem", marginBottom: "8px" }}>Synthetic Identity Datasets</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>Need massive scale without PII risk? We procedurally generate highly realistic synthetic human datasets.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div style={{ background: `linear-gradient(135deg, ${color}15, rgba(0,0,0,0.5))`, padding: "40px", borderRadius: "24px", display: "flex", gap: "24px", alignItems: "center" }}>
              <Video size={48} color={color} />
              <div>
                <h3 style={{ color: "white", fontSize: "1.3rem", marginBottom: "8px" }}>Live Personal Video</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>We capture consented, multi-angle live personal video for advanced temporal biometric tracking.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
