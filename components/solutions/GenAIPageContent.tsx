import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles, ArrowRightLeft, FileCode2 } from "lucide-react";

export default function GenAIPageContent({ solution, color }: { solution: any, color: string }) {
  return (
    <section style={{ padding: "100px 0", background: "#040810", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", height: "400px", background: `radial-gradient(ellipse at top, ${color}20, transparent 70%)` }} />
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", marginBottom: "80px" }}>
          <ScrollReveal>
            <h2 style={{ fontSize: "3.5rem", color: "white", marginBottom: "24px", lineHeight: 1.1 }}>
              Powering the <span style={{ color }}>Generative</span> Frontier.
            </h2>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)" }}>
              Foundation models are a commodity. The competitive moat is proprietary, perfectly formatted data. We build the exact instruction sets and fine-tuning data required to make your LLM an expert.
            </p>
          </ScrollReveal>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          <ScrollReveal delay={0}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px", padding: "48px", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <Sparkles size={48} color={color} style={{ marginBottom: "24px" }} />
                <h3 style={{ fontSize: "1.8rem", color: "white" }}>Model Fine-Tuning</h3>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  Whether it is coding, legal analysis, or creative writing, we generate high-fidelity, highly-reasoned dataset pairs that align base models to perform complex tasks with perfect formatting and domain accuracy.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px", padding: "48px", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <ArrowRightLeft size={48} color={color} style={{ marginBottom: "24px" }} />
                <h3 style={{ fontSize: "1.8rem", color: "white" }}>RLHF & Preferences</h3>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  Our subject-matter experts evaluate model outputs, ranking them based on helpfulness, honesty, and harmlessness to build the reward models that guide generative behavior.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px", padding: "48px", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <FileCode2 size={48} color={color} style={{ marginBottom: "24px" }} />
                <h3 style={{ fontSize: "1.8rem", color: "white" }}>Instruction Generation</h3>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  We don't just label data; we create it from scratch. Our technical writers create massive corpuses of diverse prompts and step-by-step reasoning chains (Chain-of-Thought) to unlock deep model intelligence.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
