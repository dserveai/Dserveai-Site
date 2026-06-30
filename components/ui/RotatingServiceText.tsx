"use client";
import { useEffect, useState } from "react";
import styles from "./RotatingServiceText.module.css";

const words = ["Generative AI.", "Physical AI.", "Agentic AI.", "Healthcare AI.", "Vision AI."];

export default function RotatingServiceText() {
  const [idx, setIdx] = useState(0);
  
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);
  
  return <span className={styles.rotatingWord} key={idx}>{words[idx]}</span>;
}
