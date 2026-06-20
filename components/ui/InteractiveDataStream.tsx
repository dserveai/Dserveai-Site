"use client";
import { useEffect, useRef } from "react";

/*
  THE INTERACTIVE DATA STREAM
  ──────────────────────────────────────────────────────
  Upgrades implemented based on feedback:
  1. Full-Screen Coverage: Instead of an isolated object on the right, the
     data now forms an infinite, majestic stream spanning the entire width 
     of the screen from left to right.
  2. Maintained Interactivity: The user's mouse still acts as a live 
     "AI Scanner", dynamically selecting raw data flowing underneath it.
  3. Dynamic Mesh Generation: When raw data is scanned, it instantly 
     structures itself into a glowing Neural Mesh inside a highly responsive 
     Bounding Box.
*/

class DataPoint {
  x: number; y: number; z: number;
  speed: number;
  baseY: number;

  constructor(w: number, h: number) {
    // Distribute massively across the full width and depth of the screen
    this.x = (Math.random() - 0.5) * w * 2.5; 
    this.y = (Math.random() - 0.5) * h * 1.5;
    this.baseY = this.y;
    this.z = Math.random() * 1200 - 600;
    
    // Smooth, constant left-to-right flow
    this.speed = 0.5 + Math.random() * 1.2; 
  }

  update(w: number, time: number) {
    this.x += this.speed;
    
    // Gentle sine wave motion vertically to make the stream feel organic
    this.y = this.baseY + Math.sin(this.x * 0.002 + time) * 60;

    // Infinite wrapping
    if (this.x > w * 1.5) {
      this.x = -w * 1.5;
      this.y = this.baseY;
    }
  }
}

export default function InteractiveDataStream() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const points = useRef<DataPoint[]>([]);
  const t = useRef(0);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const N = window.innerWidth > 768 ? 2000 : 800;
      const arr = [];
      
      for (let i = 0; i < N; i++) {
        arr.push(new DataPoint(canvas.width, canvas.height));
      }
      points.current = arr;
      
      // Default scanner position inside the stream, favoring the right to balance hero text
      mouse.current.x = window.innerWidth > 1024 ? canvas.width * 0.70 : canvas.width / 2;
      mouse.current.y = canvas.height / 2;
      mouse.current.active = true;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const drawBracket = (cx: CanvasRenderingContext2D, x: number, y: number, size: number, dirX: number, dirY: number) => {
      cx.beginPath();
      cx.moveTo(x + size * dirX, y);
      cx.lineTo(x, y);
      cx.lineTo(x, y + size * dirY);
      cx.stroke();
    };

    const FOV = 1000;
    // Slight downward angle to give the stream 3D depth
    const rotX = Math.PI * 0.05; 
    const cosX = Math.cos(rotX); const sinX = Math.sin(rotX);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      t.current += 0.015;

      // Clean Slate Background
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let selectedCount = 0;
      const selectedPoints: {sx: number, sy: number}[] = [];

      // 1. Process 3D Math and AI Scanner Hit Detection
      for (const p of points.current) {
        p.update(W, t.current);

        // Rotate around X axis for 3D perspective
        const y2 = p.y * cosX - p.z * sinX;
        const z2 = p.y * sinX + p.z * cosX;
        
        const scale = FOV / Math.max(1, FOV + z2);
        const sx = cx + p.x * scale;
        const sy = cy + y2 * scale;

        // Is the mouse hovering near this 2D projected point?
        const distToMouse = Math.hypot(sx - mouse.current.x, sy - mouse.current.y);
        const SCAN_RADIUS = 200; 
        const isSelected = mouse.current.active && distToMouse < SCAN_RADIUS;

        if (isSelected) {
          selectedCount++;
          minX = Math.min(minX, sx);
          maxX = Math.max(maxX, sx);
          minY = Math.min(minY, sy);
          maxY = Math.max(maxY, sy);
          selectedPoints.push({ sx, sy });

          // Draw Glowing Active Keypoint
          ctx.fillStyle = "#00d2ff";
          const r = 2.5 * scale;
          ctx.fillRect(sx - r, sy - r, r*2, r*2);
        } else {
          // Draw Faint Unstructured Data Stream
          // Fader based on depth
          const depthAlpha = Math.max(0.05, 0.4 * scale);
          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
          const r = 1.2 * scale;
          ctx.fillRect(sx - r, sy - r, r*2, r*2);
        }
      }

      // 2. Draw Interactive "AI Knowledge Mesh" and Bounding Box
      if (selectedCount > 0) {
        // Draw Neural connections inside the scanned area
        ctx.strokeStyle = "rgba(0, 210, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < selectedPoints.length; i++) {
          for (let j = i + 1; j < selectedPoints.length; j++) {
            const dx = selectedPoints[i].sx - selectedPoints[j].sx;
            const dy = selectedPoints[i].sy - selectedPoints[j].sy;
            if (dx * dx + dy * dy < 8000) { // Connect nodes closer than ~90px
              ctx.moveTo(selectedPoints[i].sx, selectedPoints[i].sy);
              ctx.lineTo(selectedPoints[j].sx, selectedPoints[j].sy);
            }
          }
        }
        ctx.stroke();

        // Connect a faint tracking laser from the mouse to the center of the bounding box
        const centerBx = (minX + maxX) / 2;
        const centerBy = (minY + maxY) / 2;
        ctx.strokeStyle = "rgba(0, 210, 255, 0.3)";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(mouse.current.x, mouse.current.y);
        ctx.lineTo(centerBx, centerBy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Calculate and Draw the Dynamic Bounding Box
        const pad = 15;
        const bx = minX - pad;
        const by = minY - pad;
        const bw = maxX - minX + pad * 2;
        const bh = maxY - minY + pad * 2;

        ctx.strokeStyle = "rgba(0, 210, 255, 0.8)";
        ctx.lineWidth = 1.5;
        
        const cSize = 12; // Bracket size
        drawBracket(ctx, bx, by, cSize, 1, 1);
        drawBracket(ctx, bx + bw, by, cSize, -1, 1);
        drawBracket(ctx, bx, by + bh, cSize, 1, -1);
        drawBracket(ctx, bx + bw, by + bh, cSize, -1, -1);

        ctx.strokeStyle = "rgba(0, 210, 255, 0.15)";
        ctx.strokeRect(bx, by, bw, bh);

        // 3. Draw Premium AI Data Tag
        ctx.fillStyle = "rgba(0, 210, 255, 0.9)";
        const labelW = 230;
        ctx.fillRect(bx, by - 26, labelW, 24);
        
        ctx.fillStyle = "#050810";
        ctx.font = "bold 11px sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText(`LIVE_SCAN | KEYPOINTS_DETECTED: ${selectedCount}`, bx + 8, by - 14);

        // Draw Mouse Reticle (The "AI Scanner Eye")
        ctx.strokeStyle = "rgba(0, 210, 255, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 8, 0, Math.PI*2);
        ctx.moveTo(mouse.current.x - 14, mouse.current.y);
        ctx.lineTo(mouse.current.x + 14, mouse.current.y);
        ctx.moveTo(mouse.current.x, mouse.current.y - 14);
        ctx.lineTo(mouse.current.x, mouse.current.y + 14);
        ctx.stroke();
      }

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
