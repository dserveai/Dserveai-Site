import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Mic2, Globe2, MessageSquareText, AudioLines } from "lucide-react";

export default function ConversationalPageContent({ solution, color }: { solution: any, color: string }) {
  return (
    <section style={{ padding: "100px 0", background: "#040810" }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "80px", maxWidth: "800px", margin: "0 auto 80px" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "24px", color: "#fff" }}>
              Global Voices. <span style={{ color }}>Perfect Transcription.</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              Voice assistants and NLU engines need diverse, authentic speech data. We collect, transcribe, and annotate conversational utterances across a multitude of languages and dialects to build robust speech AI.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }}>
          <ScrollReveal delay={0}>
            <div style={{ background: "rgba(255,255,255,0.02)", borderTop: `4px solid ${color}`, padding: "40px", borderRadius: "16px", height: "100%" }}>
              <Mic2 size={32} color={color} style={{ marginBottom: "20px" }} />
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Conversational Utterance Collection</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                We deploy global crowd-sourcing to capture natural, spontaneous conversational utterances, both single-speaker queries and multi-participant dialogues, across varied acoustic environments.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ background: "rgba(255,255,255,0.02)", borderTop: `4px solid ${color}`, padding: "40px", borderRadius: "16px", height: "100%" }}>
              <MessageSquareText size={32} color={color} style={{ marginBottom: "20px" }} />
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Single Speaker Transcription & TTS</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Our expert linguists transcribe audio with phoneme-level precision. We also build high-fidelity voice corpuses designed specifically for training Text-to-Speech (TTS) models.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          <ScrollReveal delay={200}>
            <div style={{ background: "rgba(255,255,255,0.02)", borderTop: `4px solid ${color}`, padding: "40px", borderRadius: "16px", height: "100%" }}>
              <Globe2 size={32} color={color} style={{ marginBottom: "20px" }} />
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Multi-Language Support</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                We operate across 50+ languages and regional dialects, ensuring your speech models understand local idioms, accents, and code-switching without bias.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div style={{ background: "rgba(255,255,255,0.02)", borderTop: `4px solid ${color}`, padding: "40px", borderRadius: "16px", height: "100%" }}>
              <AudioLines size={32} color={color} style={{ marginBottom: "20px" }} />
              <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "16px" }}>Linguistic QA</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Every transcript goes through a rigorous linguistic QA process. We verify intent classification, sentiment tags, and ensure exact alignment between audio waveforms and text.
              </p>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
