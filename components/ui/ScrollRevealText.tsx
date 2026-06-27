"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollRevealText.module.css";

interface Props {
  text: string;
  className?: string;
}

export default function ScrollRevealText({ text, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    charsRef.current = [];

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const span = document.createElement("span");
      span.className = styles.char;

      if (ch === " ") {
        span.textContent = " ";
        span.classList.add(styles.space);
      } else {
        span.textContent = ch;
      }

      container.appendChild(span);
      charsRef.current.push(span);
    }

    const totalChars = charsRef.current.length;

    const update = () => {
      // Use the container itself, not the parent section
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start revealing when the text is 65% down the screen (moved up from the bottom)
      const startReveal = vh * 0.65;
      // Finish revealing when the text hits 25% of the screen
      const finishReveal = vh * 0.25;

      const rawProgress = (startReveal - rect.top) / (startReveal - finishReveal);
      const progress = Math.min(1, Math.max(0, rawProgress));

      // How many characters should be visible
      const visibleCount = Math.floor(progress * totalChars);

      charsRef.current.forEach((el, i) => {
        if (i < visibleCount) {
          el.classList.add(styles.visible);
        } else {
          el.classList.remove(styles.visible);
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [text]);

  return (
    <div ref={containerRef} className={`${styles.revealText} ${className || ""}`} />
  );
}
