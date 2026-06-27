import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Bot, Network, GitPullRequest } from "lucide-react";

export default function AgenticPageContent({ solution, color }: { solution: any, color: string }) {
  return (
    <section style={{ padding: "120px 0", background: "#040810", position: "relative" }}>
      <div className="container">
        
        {/* Intro */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "100px" }}>
          <ScrollReveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: `${color}15`, padding: "8px 24px", borderRadius: "100px", color: color, fontWeight: 600, marginBottom: "24px" }}>
              <Bot size={20} /> Autonomous Agent Infrastructure
            </div>
            <h2 style={{ fontSize: "3rem", color: "white", marginBottom: "24px", maxWidth: "800px" }}>
              Training data for <br/>systems that <span style={{ color }}>think and act.</span>
            </h2>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto" }}>
              We build specialized demonstration trajectories and decision loops to train agentic models how to use tools, reason through multi-step workflows, and recover from errors.
            </p>
          </ScrollReveal>
        </div>

        {/* Feature Layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          
          <ScrollReveal>
            <div style={{ display: "flex", gap: "48px", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "2rem", color: "white", marginBottom: "16px" }}>Workflow Testing & Modification</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  Our AI trainers map out complex digital environments, creating diverse testing scenarios. We generate massive datasets of successful workflows, modifications to existing scripts, and recovery actions when API calls or tasks fail.
                </p>
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <GitPullRequest size={120} color={color} style={{ opacity: 0.8 }} />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{ display: "flex", gap: "48px", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", flexDirection: "row-reverse" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "2rem", color: "white", marginBottom: "16px" }}>Agentic AI Customization</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  Every agent operates in a unique corporate environment. We create custom instructional datasets that align your autonomous models to your specific internal tools, proprietary databases, and secure company protocols.
                </p>
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <Network size={120} color={color} style={{ opacity: 0.8 }} />
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
