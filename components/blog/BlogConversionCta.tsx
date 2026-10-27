import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, ArrowRight } from "lucide-react";

interface Props {
  className?: string;
}

export default function BlogConversionCta({ className }: Props) {
  return (
    <div
      className={className}
      style={{
        margin: "48px 0",
        padding: "36px 32px",
        background: "radial-gradient(ellipse at top left, rgba(14, 165, 233, 0.15), rgba(15, 23, 42, 0.95) 70%)",
        border: "1px solid rgba(14, 165, 233, 0.35)",
        borderRadius: "20px",
        boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(14, 165, 233, 0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient decorative glow */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "220px",
          height: "220px",
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Top Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14, 165, 233, 0.12)", border: "1px solid rgba(14, 165, 233, 0.3)", padding: "6px 14px", borderRadius: "100px", marginBottom: "18px" }}>
          <Sparkles size={14} color="#38bdf8" />
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#38bdf8", letterSpacing: "1px", textTransform: "uppercase" }}>
            Enterprise AI Data Solution
          </span>
        </div>

        {/* Headline */}
        <h3
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "12px",
            lineHeight: 1.3,
          }}
        >
          Need Proprietary Data Instead of Public Lists?
        </h3>

        {/* Copy */}
        <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "24px", maxWidth: "680px" }}>
          Public datasets are great for tutorials, but production AI requires bespoke ground truth. Dserve AI delivers custom, domain-certified annotation pipelines with <strong>99.8% precision</strong>, HIPAA/SOC 2 clean rooms, and zero data leakage.
        </p>

        {/* Value Prop Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255, 255, 255, 0.85)", fontSize: "0.9rem" }}>
            <Zap size={16} color="#38bdf8" />
            <span>48-Hour Turnaround</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255, 255, 255, 0.85)", fontSize: "0.9rem" }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>99.8% Quality SLA</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255, 255, 255, 0.85)", fontSize: "0.9rem" }}>
            <ShieldCheck size={16} color="#a855f7" />
            <span>HIPAA & SOC 2 Ready</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
          <Link
            href="/contact?type=pilot"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
              color: "#ffffff",
              padding: "14px 24px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(14, 165, 233, 0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <span>Request Free 50-Item Pilot</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/compare/dserve-vs-scale-ai"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "rgba(255, 255, 255, 0.9)",
              padding: "13px 20px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "0.92rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            <span>Why Dserve vs Scale AI</span>
            <ArrowRight size={14} color="rgba(255, 255, 255, 0.5)" />
          </Link>
        </div>
      </div>
    </div>
  );
}
