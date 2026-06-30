import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BoxSelect, BarChart3, Target } from "lucide-react";

export default function CVPageContent({ color }: { solution?: any, color: string }) {
  return (
    <section style={{ padding: "100px 0", background: `linear-gradient(to bottom, #040810, ${color}10, #040810)` }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 style={{ fontSize: "3rem", color: "white", marginBottom: "24px" }}>
              The Engine Behind <span style={{ color }}>Visual AI</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "700px", margin: "0 auto" }}>
              Computer vision models are only as good as the pixels they are trained on. We provide massive-scale data collection, precision annotation, and deep visual analytics to power the next generation of autonomous systems.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          
          <ScrollReveal delay={0}>
            <div style={{ background: "rgba(0,0,0,0.5)", border: `1px solid rgba(255,255,255,0.1)`, padding: "40px", borderRadius: "20px", height: "100%" }}>
              <BoxSelect size={40} color={color} style={{ marginBottom: "24px" }} />
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Annotation & Labeling</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Pixel-perfect polygons, tight bounding boxes, and complex 3D cuboids. We specialize in annotating high-density scenes where occlusion and edge-cases break generic labeling systems.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ background: "rgba(0,0,0,0.5)", border: `1px solid rgba(255,255,255,0.1)`, padding: "40px", borderRadius: "20px", height: "100%" }}>
              <Target size={40} color={color} style={{ marginBottom: "24px" }} />
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Data Collection</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                We deploy hardware and human collectors globally to capture real-world visual variance, from specific weather conditions to rare long-tail scenarios your models struggle with.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="col-span-full">
            <div style={{ background: `${color}15`, border: `1px solid ${color}40`, padding: "40px", borderRadius: "20px", display: "flex", gap: "32px", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "2rem", color: "white", marginBottom: "16px" }}>Visual Analytics QA</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6, fontSize: "1.1rem" }}>
                  We don't just deliver data. Our visual analytics dashboards provide deep insights into your dataset's class distribution, bounding box density, and potential bias, allowing you to iterate on your ontology faster.
                </p>
              </div>
              <div style={{ padding: "32px", background: "rgba(0,0,0,0.3)", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BarChart3 size={80} color={color} />
              </div>
            </div>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
