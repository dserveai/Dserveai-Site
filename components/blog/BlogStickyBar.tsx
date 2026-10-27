"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";

export default function BlogStickyBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 100;

      // Show after 25% scroll depth
      if (scrollPercentage > 25) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <aside
      aria-label="Pilot dataset offer"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        width: "calc(100% - 32px)",
        maxWidth: "680px",
        background: "rgba(10, 15, 29, 0.94)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(14, 165, 233, 0.4)",
        borderRadius: "16px",
        padding: "12px 20px",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(14, 165, 233, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        animation: "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(14, 165, 233, 0.15)",
            border: "1px solid rgba(14, 165, 233, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sparkles size={18} color="#38bdf8" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.2 }}>
            Building a Production AI Model?
          </div>
          <div style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "0.82rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Get a custom 50-sample pilot dataset annotated in 48 hours.
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <Link
          href="/contact?type=pilot"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#0ea5e9",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "0.86rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
          }}
        >
          <span>Claim Pilot</span>
          <ArrowRight size={14} />
        </Link>
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255, 255, 255, 0.4)",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
          }}
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}} />
    </aside>
  );
}
