"use client";
import { useRef, ReactNode, MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // degrees max tilt, default 8
  onClick?: () => void;
  as?: "div" | "button" | "a";
  href?: string;
  "aria-label"?: string;
}

export default function TiltCard({
  children,
  className = "",
  style,
  intensity = 8,
  onClick,
  "aria-label": ariaLabel,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    // Disable on touch devices to prevent stuck transforms
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    
    const el = ref.current;
    const glow = glowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -intensity;
    const rotY = ((x - cx) / cx) * intensity;

    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
    el.style.transition = "transform 0.05s linear";

    if (glow) {
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, color-mix(in srgb, var(--c, #6366f1) 20%, transparent) 0%, transparent 65%)`;
      glow.style.opacity = "1";
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    const glow = glowRef.current;
    if (el) {
      el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
      el.style.transition = "transform 0.5s cubic-bezier(0.4,0,0.2,1)";
    }
    if (glow) glow.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, position: "relative", willChange: "transform", transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {/* Spotlight glow layer */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      {/* Content sits above glow */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
