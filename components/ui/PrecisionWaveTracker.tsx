"use client";
import { useEffect, useRef } from "react";

/*
  THE PRECISION WAVE TRACKER
  ──────────────────────────────────────────────────────
  The absolute pinnacle of Minimalism + Interaction + Jaw-Dropping Polish.
  
  Background: Pure, deep dark slate. Zero particles, zero chaotic noise.
  Entities: A single, highly elegant "Silk Ribbon" made of 14 incredibly fine, 
            mathematically perfect curves flowing across the screen.
  Interaction: The mouse is a physical disturbance. When it sweeps through 
               the ribbon, it physically displaces the waves using fluid spring physics.
  Effect: The AI instantly detects this anomaly! The disturbed sections of the 
          wave glow brilliantly, and a stark, pristine white Bounding Box 
          dynamically grows and locks perfectly around the disturbance.
          
  Message: "We pinpoint, track, and annotate anomalies in the data stream 
            with hyper-minimalist precision."
*/

class SilkNode {
  x: number; baseY: number; y: number; vy: number;
  phaseOffset: number; ampMult: number;
  isDisturbed: boolean;

  constructor(x: number, cy: number, phase: number, amp: number) {
    this.x = x;
    this.baseY = cy;
    this.y = cy;
    this.vy = 0;
    this.phaseOffset = phase;
    this.ampMult = amp;
    this.isDisturbed = false;
  }

  update(t: number, mouseX: number, mouseY: number, isMouseActive: boolean) {
    // 1. Natural, elegant, extremely slow flowing wave math
    const naturalY = this.baseY 
      + Math.sin(this.x * 0.002 + t * 0.01 + this.phaseOffset) * 60 * this.ampMult
      + Math.sin(this.x * 0.005 - t * 0.015) * 20 * this.ampMult;

    // 2. Mouse Interaction (Physical Repulsion)
    let targetY = naturalY;
    if (isMouseActive) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.hypot(dx, dy);
      const RADIUS = 180; // Size of the scanner influence
      
      if (dist < RADIUS) {
        // Create a beautiful, smooth splashing effect
        const force = Math.pow((RADIUS - dist) / RADIUS, 2); 
        const pushDir = dy > 0 ? 1 : -1;
        targetY = naturalY + pushDir * force * 150;
      }
    }

    // 3. Fluid Spring Physics (Allows the ribbon to bounce gracefully)
    const spring = 0.08;
    const friction = 0.82;
    this.vy += (targetY - this.y) * spring;
    this.vy *= friction;
    this.y += this.vy;
    
    // 4. Record anomaly state for the AI Bounding Box
    const disturbance = Math.abs(this.y - naturalY);
    this.isDisturbed = disturbance > 8; // Threshold for being "detected"
    
    return this.isDisturbed;
  }
}

export default function PrecisionWaveTracker() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const threads = useRef<SilkNode[][]>([]);
  const t = useRef(0);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const NUM_THREADS = 14;
      const POINTS_PER_THREAD = window.innerWidth > 768 ? 100 : 50;
      
      const newThreads: SilkNode[][] = [];
      for (let i = 0; i < NUM_THREADS; i++) {
        const thread: SilkNode[] = [];
        const normalized = i / (NUM_THREADS - 1); // 0 to 1
        
        // Stagger phase and amplitude to create a gorgeous 3D silk ribbon effect
        const phase = normalized * Math.PI * 2;
        const amp = 0.4 + Math.sin(normalized * Math.PI) * 0.6; // Thicker in middle
        const yOffset = (normalized - 0.5) * 50; // Spread vertically
        
        for (let j = 0; j < POINTS_PER_THREAD; j++) {
          const x = (j / (POINTS_PER_THREAD - 1)) * canvas.width;
          thread.push(new SilkNode(x, canvas.height / 2 + yOffset, phase, amp));
        }
        newThreads.push(thread);
      }
      threads.current = newThreads;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const drawBracket = (x: number, y: number, size: number, dirX: number, dirY: number) => {
      ctx.beginPath();
      ctx.moveTo(x + size * dirX, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + size * dirY);
      ctx.stroke();
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      t.current += 1;

      // Pure dark, incredibly minimal slate background. No noise.
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);

      // Auto-Wander Mouse if user hasn't interacted yet
      if (!mouse.current.active) {
        mouse.current.x = W * 0.65 + Math.cos(t.current * 0.02) * 200;
        mouse.current.y = H * 0.5 + Math.sin(t.current * 0.015) * 150;
      }

      ctx.globalCompositeOperation = "screen";

      // Draw faint Scanner Halo around the cursor
      ctx.strokeStyle = "rgba(0, 210, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 180, 0, Math.PI * 2);
      ctx.stroke();

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let activeCount = 0;

      // 1. Pass 1: Update Physics and Draw the Faint Elegant Silk Ribbon
      for (let i = 0; i < threads.current.length; i++) {
        const thread = threads.current[i];
        
        // Calculate elegance parameters
        const normalized = i / (threads.current.length - 1);
        const alpha = 0.08 + Math.sin(normalized * Math.PI) * 0.2; // Brighter in the center core
        
        ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let j = 0; j < thread.length; j++) {
          const node = thread[j];
          const isDisturbed = node.update(t.current, mouse.current.x, mouse.current.y, mouse.current.active);
          
          if (isDisturbed) {
            minX = Math.min(minX, node.x); maxX = Math.max(maxX, node.x);
            minY = Math.min(minY, node.y); maxY = Math.max(maxY, node.y);
            activeCount++;
          }
          
          if (j === 0) ctx.moveTo(node.x, node.y);
          else {
            const prev = thread[j - 1];
            // Quadratic curve makes it flawlessly smooth
            const midX = (prev.x + node.x) / 2;
            const midY = (prev.y + node.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.stroke();
      }

      // 2. Pass 2: Draw the Brilliant Cyan Disturbance Overlay (The Detected Anomaly)
      ctx.strokeStyle = "rgba(0, 210, 255, 0.85)";
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i < threads.current.length; i++) {
        const thread = threads.current[i];
        ctx.beginPath();
        let drawing = false;
        
        for (let j = 0; j < thread.length; j++) {
          const node = thread[j];
          if (node.isDisturbed) {
            if (!drawing) {
              ctx.moveTo(node.x, node.y);
              drawing = true;
            } else {
              // Strict rigid lines for the structured AI detection
              ctx.lineTo(node.x, node.y); 
            }
          } else {
            drawing = false;
          }
        }
        ctx.stroke();
      }

      // 3. Render Crisp AI Bounding Box & UI
      if (activeCount > 5) {
        const pad = 25;
        minX -= pad; maxX += pad; minY -= pad; maxY += pad;
        const bw = maxX - minX;
        const bh = maxY - minY;

        // Draw Pristine White Corner Brackets
        ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
        ctx.lineWidth = 2;
        const cSize = 14;
        drawBracket(minX, minY, cSize, 1, 1);
        drawBracket(maxX, minY, cSize, -1, 1);
        drawBracket(minX, maxY, cSize, 1, -1);
        drawBracket(maxX, maxY, cSize, -1, -1);

        // Draw hyper-faint full box outline
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.strokeRect(minX, minY, bw, bh);

        // Premium UI Label (Sleek minimalist style)
        const centerX = (minX + maxX) / 2;
        const labelY = minY - 30;
        
        // Vertical targeting tether from box to UI tag
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath(); ctx.moveTo(centerX, minY); ctx.lineTo(centerX, labelY); ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 10px monospace";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        ctx.fillText(`ANOMALY_DETECTED // BBOX_LOCKED // KEYPOINTS: ${activeCount}`, centerX, labelY - 5);
        ctx.textAlign = "left"; // reset
      }

      ctx.globalCompositeOperation = "source-over";
      raf.current = requestAnimationFrame(draw);
    };
    
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
