"use client";

import Image from "next/image";
import styles from "./LogoOrb.module.css";

export default function LogoOrb() {
  return (
    <div className={styles.wrapper}>
      {/* Deep ambient glow layers */}
      <div className={styles.glowDeep} />
      <div className={styles.glowMid} />
      <div className={styles.glowClose} />

      {/* Pulse rings */}
      <div className={styles.pulse} style={{ "--d": "0s" } as React.CSSProperties} />
      <div className={styles.pulse} style={{ "--d": "1.2s" } as React.CSSProperties} />
      <div className={styles.pulse} style={{ "--d": "2.4s" } as React.CSSProperties} />

      {/* The logo — no container, pure floating */}
      <div className={styles.logoFloat}>
        <Image
          src="/logo.png"
          alt="Dserve AI"
          width={260}
          height={260}
          className={styles.logo}
          priority
        />
      </div>

      {/* Orbiting light arcs */}
      <div className={styles.arc1} />
      <div className={styles.arc2} />
    </div>
  );
}
