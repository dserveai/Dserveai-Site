"use client";
import { useEffect, useRef } from "react";

/*
  THE ENTERPRISE DATA STRUCTURING ENGINE
  ──────────────────────────────────────────────────────
  The pinnacle of $1B Tech Aesthetics (Scale AI / Palantir inspired).
  
  Background: Pure, deep dark slate.
  Entities: A cinematic, massive 3D ocean of 6,000 hyper-fine point cloud dust 
            particles, flowing elegantly across the entire screen.
  Interaction: The mouse is a Precision AI Structuring Tool.
  Effect: When the scanner sweeps over the chaotic dust, the raw data INSTANTLY 
          condenses and snaps into massive, perfect 3D Voxel geometry. A pristine, 
          hyper-minimalist Bounding Box wraps the structured sector.
          
  Message: "We take vast amounts of raw Point Cloud dust and instantly 
            structure it into precise 3D AI models and Bounding Boxes."
*/

class PointDust {
  x: number; y: number; z: number;
  baseZ: number; speedX: number;

  constructor(w: number) {
    this.x = -w + Math.random() * w * 3; // Massive horizontal spread
    this.baseZ = (Math.random() - 0.5) * 1200; // Deep 3D volume
    this.z = this.baseZ;
    this.y = 0;
    this.speedX = 0.5 + Math.random() * 1.5;
  }

  update(w: number, t: number) {
    this.x += this.speedX;
    if (this.x > w * 1.5) {
      this.x = -w * 0.5 - Math.random() * w;
    }
    
    // Cinematic flowing ocean wave math
    const wave1 = Math.sin(this.x * 0.002 + t * 0.01) * 200;
    const wave2 = Math.cos(this.z * 0.003 + t * 0.015) * 150;
    this.y = wave1 + wave2 + 100; // Shifted slightly down
  }
}

export default function EnterpriseDataStream() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const points = useRef<PointDust[]>([]);
  const t = useRef(0);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const N = window.innerWidth > 768 ? 6000 : 2500;
      const arr = [];
      for (let i = 0; i < N; i++) {
        arr.push(new PointDust(canvas.width));
      }
      points.current = arr;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const FOV = 1600; // Very wide, cinematic lens
    const angleX = Math.PI * 0.15; // 27 degrees down
    const angleY = Math.PI * -0.05; // Slight isometric pan
    const cosX = Math.cos(angleX); const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY); const sinY = Math.sin(angleY);

    const proj = (x: number, y: number, z: number, cx: number, cy: number) => {
      // Rotate X
      const py = y * cosX - z * sinX;
      const pz = y * sinX + z * cosX;
      // Rotate Y
      const px = x * cosY - pz * sinY;
      const fz = x * sinY + pz * cosY;
      
      const camZ = FOV + fz;
      if (camZ < 10) return null;
      
      const p = FOV / camZ;
      return { sx: cx + px * p, sy: cy + py * p, sc: p };
    };

    const boxEdges = [
      [0,1], [1,2], [2,3], [3,0],
      [4,5], [5,6], [6,7], [7,4],
      [0,4], [1,5], [2,6], [3,7]
    ];

    const drawBracket = (p1: any, p2: any, alpha: number) => {
      if (!p1 || !p2) return;
      const dx = p2.sx - p1.sx;
      const dy = p2.sy - p1.sy;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p1.sx + dx*0.2, p1.sy + dy*0.2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(p2.sx, p2.sy); ctx.lineTo(p2.sx - dx*0.2, p2.sy - dy*0.2); ctx.stroke();
    };

    const SCAN_RADIUS = 280;
    const GRID_SIZE = 55;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      t.current += 1;

      if (!mouse.current.active) {
        mouse.current.x = W * 0.70 + Math.cos(t.current * 0.02) * 200;
        mouse.current.y = H * 0.5 + Math.sin(t.current * 0.015) * 150;
      }

      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let minZ = Infinity, maxZ = -Infinity;
      const voxels = new Map<string, any>();

      // 1. Process and Render Point Cloud Dust (Ultra-fast batch rendering)
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.beginPath();
      
      for (const p of points.current) {
        p.update(W, t.current);
        const p2d = proj(p.x, p.y, p.z, cx, cy);
        if (!p2d) continue;

        const dist = Math.hypot(p2d.sx - mouse.current.x, p2d.sy - mouse.current.y);
        
        if (dist < SCAN_RADIUS) {
          // Voxelize the point cloud!
          const qX = Math.round(p.x / GRID_SIZE) * GRID_SIZE;
          const qY = Math.round(p.y / GRID_SIZE) * GRID_SIZE;
          const qZ = Math.round(p.z / GRID_SIZE) * GRID_SIZE;
          const key = `${qX},${qY},${qZ}`;
          
          if (!voxels.has(key)) {
            voxels.set(key, { x: qX, y: qY, z: qZ });
            minX = Math.min(minX, qX); maxX = Math.max(maxX, qX);
            minY = Math.min(minY, qY); maxY = Math.max(maxY, qY);
            minZ = Math.min(minZ, qZ); maxZ = Math.max(maxZ, qZ);
          }
        } else {
          // Render raw dust
          const r = Math.max(0.5, p2d.sc);
          ctx.rect(p2d.sx - r, p2d.sy - r, r*2, r*2);
        }
      }
      ctx.fill();

      // 2. Render Voxel Geometry
      if (voxels.size > 0) {
        for (const v of voxels.values()) {
          const s = GRID_SIZE / 2;
          const corners = [
            proj(v.x-s, v.y-s, v.z-s, cx, cy), proj(v.x+s, v.y-s, v.z-s, cx, cy),
            proj(v.x+s, v.y+s, v.z-s, cx, cy), proj(v.x-s, v.y+s, v.z-s, cx, cy),
            proj(v.x-s, v.y-s, v.z+s, cx, cy), proj(v.x+s, v.y-s, v.z+s, cx, cy),
            proj(v.x+s, v.y+s, v.z+s, cx, cy), proj(v.x-s, v.y+s, v.z+s, cx, cy)
          ];

          // Draw faint glowing voxel faces
          ctx.fillStyle = "rgba(0, 210, 255, 0.03)";
          if (corners[0] && corners[1] && corners[2] && corners[3]) {
            ctx.beginPath(); ctx.moveTo(corners[0].sx, corners[0].sy); ctx.lineTo(corners[1].sx, corners[1].sy);
            ctx.lineTo(corners[2].sx, corners[2].sy); ctx.lineTo(corners[3].sx, corners[3].sy); ctx.fill();
          }

          // Draw strict wireframe
          ctx.strokeStyle = "rgba(0, 210, 255, 0.35)";
          ctx.lineWidth = 1;
          for (const edge of boxEdges) {
            const p1 = corners[edge[0]];
            const p2 = corners[edge[1]];
            if(p1 && p2) {
              ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke();
            }
          }
          
          // Core Keypoint Data Dot
          const center = proj(v.x, v.y, v.z, cx, cy);
          if (center) {
            ctx.fillStyle = "rgba(0, 210, 255, 0.8)";
            ctx.beginPath(); ctx.arc(center.sx, center.sy, 1.5, 0, Math.PI*2); ctx.fill();
          }
        }

        // 3. Render Hyper-Crisp Macro Bounding Box
        const pad = GRID_SIZE / 2 + 10;
        const bMinX = minX - pad, bMaxX = maxX + pad;
        const bMinY = minY - pad, bMaxY = maxY + pad;
        const bMinZ = minZ - pad, bMaxZ = maxZ + pad;
        
        const boxVerts = [
          proj(bMinX, bMinY, bMinZ, cx, cy), proj(bMaxX, bMinY, bMinZ, cx, cy),
          proj(bMaxX, bMaxY, bMinZ, cx, cy), proj(bMinX, bMaxY, bMinZ, cx, cy),
          proj(bMinX, bMinY, bMaxZ, cx, cy), proj(bMaxX, bMinY, bMaxZ, cx, cy),
          proj(bMaxX, bMaxY, bMaxZ, cx, cy), proj(bMinX, bMaxY, bMaxZ, cx, cy)
        ];

        // Draw pristine white bounding brackets
        for (const edge of boxEdges) {
          drawBracket(boxVerts[edge[0]], boxVerts[edge[1]], 0.9);
          
          // Faint full line
          const p1 = boxVerts[edge[0]], p2 = boxVerts[edge[1]];
          if (p1 && p2) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke();
          }
        }

        // Premium Minimalist UI Label
        let minSy = Infinity;
        let cX = 0; let count = 0;
        for (const p of boxVerts) {
          if (p) { if (p.sy < minSy) minSy = p.sy; cX += p.sx; count++; }
        }
        if (count > 0) cX /= count;

        const labelY = minSy - 30;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cX, minSy); ctx.lineTo(cX, labelY); ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "10px monospace";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";
        ctx.fillText(`AI_STRUCTURING // VOXELS: ${voxels.size}`, cX, labelY - 5);
        ctx.textAlign = "left";
      }

      // Scanner Reticle
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, SCAN_RADIUS, 0, Math.PI*2);
      ctx.stroke();

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
