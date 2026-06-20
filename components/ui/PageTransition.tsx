"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top instantly before showing the new page content
    window.scrollTo(0, 0);
    
    setIsAnimating(true);
    
    // Let the animation play out for 1.4 seconds before sliding the curtain up
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* The Black Glass Curtain */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isAnimating ? "0%" : "-100%", opacity: isAnimating ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#03050a", // Deep space black
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: isAnimating ? "all" : "none",
        }}
      >
        {isAnimating && <LoaderVisual />}
      </motion.div>
      
      {/* Page Content gently fades and slides up as the curtain lifts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 20 : 0 }}
        transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </>
  );
}

function LoaderVisual() {
  return (
    <div style={{ position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
      
      {/* Connecting Lines (SVG) - Drawing out to the satellite nodes */}
      <svg width="140" height="140" style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}>
        {/* Line to Left Node */}
        <motion.line x1="70" y1="70" x2="30" y2="70" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }} 
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }} 
          transition={{ duration: 1.3, times: [0, 0.4, 0.8, 1] }} 
        />
        {/* Line to Top Right Node */}
        <motion.line x1="70" y1="70" x2="100" y2="40" stroke="rgba(139, 92, 246, 0.6)" strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }} 
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }} 
          transition={{ duration: 1.3, times: [0, 0.5, 0.8, 1] }} 
        />
        {/* Line to Bottom Right Node */}
        <motion.line x1="70" y1="70" x2="100" y2="100" stroke="rgba(14, 165, 233, 0.6)" strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }} 
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }} 
          transition={{ duration: 1.3, times: [0, 0.6, 0.8, 1] }} 
        />
      </svg>

      {/* Dserve Logo Central Core */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 0.8, 15], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.4, times: [0, 0.3, 0.75, 1], ease: "easeInOut" }}
        style={{
          width: 32, height: 32, background: "#ffffff", borderRadius: "50%",
          boxShadow: "0 0 40px 15px rgba(59, 130, 246, 0.8), 0 0 80px 30px rgba(139, 92, 246, 0.5)",
          position: "absolute",
          zIndex: 10
        }}
      />
      
      {/* Left Satellite Node */}
      <motion.div
        initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1, 0], x: [0, -40, -40, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.3, times: [0, 0.4, 0.8, 1], ease: "backOut" }}
        style={{ position: "absolute", width: 16, height: 16, background: "#3b82f6", borderRadius: "50%", boxShadow: "0 0 20px #3b82f6", zIndex: 10 }}
      />
      
      {/* Top Right Satellite Node */}
      <motion.div
        initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1, 0], x: [0, 30, 30, 0], y: [0, -30, -30, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.3, times: [0, 0.5, 0.8, 1], ease: "backOut" }}
        style={{ position: "absolute", width: 16, height: 16, background: "#8b5cf6", borderRadius: "50%", boxShadow: "0 0 20px #8b5cf6", zIndex: 10 }}
      />

      {/* Bottom Right Satellite Node */}
      <motion.div
        initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 1, 0], x: [0, 30, 30, 0], y: [0, 30, 30, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.3, times: [0, 0.6, 0.8, 1], ease: "backOut" }}
        style={{ position: "absolute", width: 16, height: 16, background: "#0ea5e9", borderRadius: "50%", boxShadow: "0 0 20px #0ea5e9", zIndex: 10 }}
      />
      
      {/* Massive Outer Scanning Ring (Data ingestion visual) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5, 3], opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.4, times: [0, 0.5, 1], ease: "circOut" }}
        style={{
          position: "absolute", width: 80, height: 80,
          border: "1px solid rgba(59, 130, 246, 0.4)", borderRadius: "50%",
          boxShadow: "inset 0 0 30px rgba(59,130,246,0.2)"
        }}
      />
    </div>
  );
}
