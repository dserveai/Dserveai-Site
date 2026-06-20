"use client";
import { useEffect, useRef } from "react";

/*
  THE SEMANTIC POLYGON SEGMENTER
  ──────────────────────────────────────────────────────
  The ultimate blend of Minimalist Aesthetics, Jaw-Dropping Interaction, 
  and Explicit Company Messaging.
  
  Background: Pure, deep dark slate. Zero noise. Zero particles.
  Entities: A full-screen stream of abstract, fluid, organic blobs flowing
            from left to right. They represent raw, unstructured data.
  Interaction: The user's mouse acts as a Volumetric AI Scanner.
  Effect: When the scanner hits a fluid blob, the blob INSTANTLY loses its 
          organic shape and is forcibly mapped into a rigid AI Polygon Mesh!
          Glowing Keypoints snap to the perimeter, a True 2D Bounding Box 
          wraps the object, and a Laser Tether connects it to the mouse.
          
  Message: "We take raw, unstructured, organic data and structure it perfectly 
            using Keypoints, Polygon Segmentation, and Bounding Boxes."
*/

class OrganicBlob {
  x: number; y: number; baseR: number;
  speedX: number;
  seed1: number; seed2: number; seed3: number;
  id: string;
  numPoints: number;

  constructor(w: number, h: number, startX?: number) {
    this.x = startX !== undefined ? startX : -150 - Math.random() * w;
    this.y = Math.random() * h;
    this.baseR = 30 + Math.random() * 80; // Various sizes
    this.speedX = 0.8 + Math.random() * 1.5; // Flow left to right
    this.seed1 = 0.01 + Math.random() * 0.04;
    this.seed2 = 0.01 + Math.random() * 0.04;
    this.seed3 = Math.random() * Math.PI * 2;
    this.id = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    // Number of keypoints for this specific blob (8 to 16)
    this.numPoints = 8 + Math.floor(Math.random() * 8); 
  }

  update(w: number, h: number) {
    this.x += this.speedX;
    if (this.x > w + this.baseR * 2 + 100) {
      this.x = -this.baseR * 2 - 100;
      this.y = Math.random() * h;
    }
  }

  getPoints(t: number) {
    const pts = [];
    for (let i = 0; i < this.numPoints; i++) {
      const angle = (i / this.numPoints) * Math.PI * 2;
      // Beautiful complex organic wobble simulating liquid physics
      const wobble = Math.sin(angle * 3 + t * this.seed1 + this.seed3) * (this.baseR * 0.15) +
                     Math.cos(angle * 5 - t * this.seed2) * (this.baseR * 0.1);
      const r = this.baseR + wobble;
      pts.push({
        x: this.x + Math.cos(angle) * r,
        y: this.y + Math.sin(angle) * r
      });
    }
    return pts;
  }
}

export default function SemanticPolygonSegmenter() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const blobs = useRef<OrganicBlob[]>([]);
  const t = useRef(0);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const N = window.innerWidth > 768 ? 35 : 15;
      const arr = [];
      for (let i = 0; i < N; i++) {
        // Distribute them evenly across the screen initially
        arr.push(new OrganicBlob(canvas.width, canvas.height, Math.random() * canvas.width));
      }
      blobs.current = arr;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const drawSmooth = (pts: {x:number, y:number}[]) => {
      // Represents raw, unstructured organic data (beautiful but blurry/faint)
      ctx.fillStyle = `rgba(14, 165, 233, 0.04)`; 
      ctx.beginPath();
      let p0 = pts[pts.length - 1];
      let p1 = pts[0];
      let midX = (p0.x + p1.x) / 2;
      let midY = (p0.y + p1.y) / 2;
      ctx.moveTo(midX, midY);

      for (let i = 0; i < pts.length; i++) {
        p0 = pts[i];
        p1 = pts[(i + 1) % pts.length];
        midX = (p0.x + p1.x) / 2;
        midY = (p0.y + p1.y) / 2;
        ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
      }
      ctx.closePath();
      ctx.fill();
    };

    const drawPolygon = (pts: {x:number, y:number}[]) => {
      // 1. Rigid Polygon Mesh (Represents AI Semantic Segmentation)
      ctx.fillStyle = "rgba(0, 210, 255, 0.08)";
      ctx.strokeStyle = "rgba(0, 210, 255, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 2. Glowing Keypoints (Represents Keypoint Annotation)
      ctx.fillStyle = "#ffffff";
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawBracket = (x: number, y: number, size: number, dirX: number, dirY: number) => {
      ctx.beginPath();
      ctx.moveTo(x + size * dirX, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + size * dirY);
      ctx.stroke();
    };

    const SCAN_RADIUS = 260;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      t.current += 1;

      // Pure dark, perfectly minimal background
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);

      // Auto-Wander Mouse if user hasn't interacted yet
      if (!mouse.current.active) {
        mouse.current.x = W * 0.65 + Math.cos(t.current * 0.02) * 200;
        mouse.current.y = H * 0.5 + Math.sin(t.current * 0.015) * 150;
      }

      ctx.globalCompositeOperation = "screen";

      // Draw Scanner Reticle & Halo
      ctx.strokeStyle = "rgba(0, 210, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, SCAN_RADIUS, 0, Math.PI * 2);
      ctx.stroke();
      
      const grad = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, SCAN_RADIUS);
      grad.addColorStop(0, "rgba(0, 210, 255, 0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fill();

      // Crosshair
      ctx.strokeStyle = "rgba(0, 210, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 8, 0, Math.PI*2);
      ctx.moveTo(mouse.current.x - 14, mouse.current.y); ctx.lineTo(mouse.current.x + 14, mouse.current.y);
      ctx.moveTo(mouse.current.x, mouse.current.y - 14); ctx.lineTo(mouse.current.x, mouse.current.y + 14);
      ctx.stroke();

      let activeTargets = 0;

      for (const blob of blobs.current) {
        blob.update(W, H);
        const pts = blob.getPoints(t.current);

        // Hit Detection: Distance from mouse to center of blob
        const distToMouse = Math.hypot(blob.x - mouse.current.x, blob.y - mouse.current.y);
        const isHovered = distToMouse < SCAN_RADIUS;

        if (isHovered) {
          activeTargets++;
          
          // INSTANT SHIFT: Organic Liquid becomes Rigid AI Polygon!
          drawPolygon(pts);

          // Calculate exact 2D Bounding Box around the new polygon
          let minX = Infinity, maxX = -Infinity;
          let minY = Infinity, maxY = -Infinity;
          for (const p of pts) {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
          }

          const pad = 12;
          minX -= pad; maxX += pad; minY -= pad; maxY += pad;
          const bw = maxX - minX;
          const bh = maxY - minY;

          // Draw Sci-Fi Bounding Box Brackets
          ctx.strokeStyle = "rgba(0, 210, 255, 0.8)";
          ctx.lineWidth = 2;
          const corner = 10;
          drawBracket(minX, minY, corner, 1, 1);
          drawBracket(maxX, minY, corner, -1, 1);
          drawBracket(minX, maxY, corner, 1, -1);
          drawBracket(maxX, maxY, corner, -1, -1);
          
          ctx.strokeStyle = "rgba(0, 210, 255, 0.15)";
          ctx.strokeRect(minX, minY, bw, bh);

          // Draw Multi-Target Laser Tether from Mouse to Object
          ctx.strokeStyle = "rgba(0, 210, 255, 0.35)";
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(mouse.current.x, mouse.current.y);
          ctx.lineTo(blob.x, blob.y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Object Info Tag
          ctx.fillStyle = "#00d2ff";
          ctx.font = "10px monospace";
          ctx.fillText(`ID:${blob.id} | KP:${blob.numPoints}`, maxX + 8, minY + 5);

        } else {
          // If unhovered, it remains a smooth, faint liquid data blob
          drawSmooth(pts);
        }
      }

      // Draw Central Premium AI Scanner UI if targets are acquired
      if (activeTargets > 0) {
        const text = `AI_SEGMENTATION_ACTIVE // TARGETS: ${activeTargets} // POLYGONS_LOCKED`;
        ctx.font = "bold 11px sans-serif";
        const textW = ctx.measureText(text).width;
        
        const boxW = textW + 40;
        const boxH = 26;
        const boxX = mouse.current.x - boxW / 2;
        const boxY = mouse.current.y + SCAN_RADIUS + 20; // Float right below the scanner circle

        // Tether line to UI
        ctx.strokeStyle = "rgba(0, 210, 255, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.current.x, mouse.current.y + SCAN_RADIUS);
        ctx.lineTo(mouse.current.x, boxY);
        ctx.stroke();

        ctx.fillStyle = "rgba(5, 8, 16, 0.95)";
        ctx.fillRect(boxX, boxY, boxW, boxH);
        
        ctx.strokeStyle = "rgba(0, 210, 255, 0.6)";
        ctx.strokeRect(boxX, boxY, boxW, boxH);
        
        ctx.fillStyle = "#00d2ff";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(text, mouse.current.x, boxY + boxH/2);
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
