"use client";
import { useEffect, useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function ScrollReveal({ children, delay = 0, className = "", direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translate(0,0)";
            el.style.filter = "blur(0px)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  const initTransform = direction === "up"
    ? "translateY(32px)"
    : direction === "left"
    ? "translateX(-32px)"
    : direction === "right"
    ? "translateX(32px)"
    : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initTransform,
        filter: "blur(4px)",
        transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.6s ease`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
