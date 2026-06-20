"use client";
import { useEffect, useRef } from "react";

/*
  THE INTERACTIVE LIDAR TOPOGRAPHY MATRIX
  ──────────────────────────────────────────────────────
  The ultimate balance: Jaw-dropping, Minimal, Interactive, and Meaningful.
  
  Background: A very sleek, completely minimal 3D flat grid spans the screen.
              It is extremely faint and does not distract.
  Interaction: The user's mouse acts as a volumetric 3D LiDAR scanner.
  Effect: When hovered, the flat grid violently but smoothly morphs into 
          complex 3D mountainous topography right under the cursor!
          A True 3D Bounding Cuboid instantly locks onto the peak of the 
          new terrain, tracking it dynamically as it flows.
  Message: "We reveal structure in flat data and map it perfectly."
*/

class GridNode {
  x: number; z: number;
  y: number; alpha: number;

  constructor(x: number, z: number) {
    this.x = x; this.z = z;
    this.y = 0; // Flat base
    this.alpha = 0.03; // Almost invisible base state
  }

  update(targetY: number, targetAlpha: number) {
    this.y += (targetY - this.y) * 0.15; // Smooth 3D morphing
    this.alpha += (targetAlpha - this.alpha) * 0.15;
  }
}

export default function LidarTopographyMatrix() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const nodes = useRef<GridNode[]>([]);
  const scrollX = useRef(0);
  const t = useRef(0);

  const ROWS = 60;
  const COLS = 80;
  const SPACING = 45;

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const arr = [];
      const totalWidth = COLS * SPACING;
      const totalDepth = ROWS * SPACING;
      
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * SPACING - totalWidth / 2;
          const z = r * SPACING - 600; // Start slightly behind camera
          arr.push(new GridNode(x, z));
        }
      }
      nodes.current = arr;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const FOV = 900;
    const angleX = Math.PI * 0.22; // Look down at a 40 degree angle
    const cosX = Math.cos(angleX); 
    const sinX = Math.sin(angleX);

    const proj = (x: number, y: number, z: number, cx: number, cy: number) => {
      const py = y + 250; // Shift down so it sits below camera
      const rY = py * cosX - z * sinX;
      const rZ = py * sinX + z * cosX;
      
      const camZ = FOV + rZ;
      if (camZ < 10) return null; // Behind camera
      
      const p = FOV / camZ;
      return { sx: cx + x * p, sy: cy + rY * p, sc: p, ox: x, oz: z };
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      
      t.current += 1;
      scrollX.current += 1.5; // Constant Left-to-Right Flow

      // Auto-Wander Mouse if user hasn't interacted yet
      if (!mouse.current.active) {
        mouse.current.x = cx + Math.cos(t.current * 0.02) * (W * 0.25);
        mouse.current.y = cy + Math.sin(t.current * 0.015) * 150;
      }

      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let minZ = Infinity, maxZ = -Infinity;
      let activeNodes = 0;
      let peakNode: any = null;
      let highestYCanvas = Infinity;

      const projected: any[] = new Array(nodes.current.length);

      // 1. Calculate the Live Topology Matrix
      for (let i = 0; i < nodes.current.length; i++) {
        const node = nodes.current[i];
        
        // Find base flat projection to see if mouse is hovering over this geographical sector
        const baseP2d = proj(node.x, 0, node.z, cx, cy);
        
        let targetY = 0;
        let targetAlpha = 0.03; // Very minimal background grid
        
        if (baseP2d) {
          const distToMouse = Math.hypot(baseP2d.sx - mouse.current.x, baseP2d.sy - mouse.current.y);
          const SCAN_RADIUS = 300;
          
          if (distToMouse < SCAN_RADIUS) {
            // Morph the terrain into complex mountains!
            const worldX = node.x - scrollX.current;
            const noise = Math.sin(worldX * 0.003) * Math.cos(node.z * 0.003) * 250 +
                          Math.sin(worldX * 0.008) * Math.cos(node.z * 0.008) * 80;
                          
            targetY = -Math.abs(noise); // Negative Y goes up in our projection
            
            // Smooth falloff radius
            const falloff = 1 - (distToMouse / SCAN_RADIUS);
            targetY *= falloff;
            targetAlpha = 0.05 + falloff * 0.95; // Gets incredibly bright in the center
            
            if (falloff > 0.1) {
              activeNodes++;
              minX = Math.min(minX, node.x); maxX = Math.max(maxX, node.x);
              minY = Math.min(minY, targetY); maxY = Math.max(maxY, targetY); // Base is 0
              minZ = Math.min(minZ, node.z); maxZ = Math.max(maxZ, node.z);
            }
          }
        }
        
        node.update(targetY, targetAlpha);
        
        const p2d = proj(node.x, node.y, node.z, cx, cy);
        projected[i] = p2d;

        // Track the absolute peak of the mountain for the UI tether
        if (p2d && node.alpha > 0.2) {
          if (p2d.sy < highestYCanvas) {
            highestYCanvas = p2d.sy;
            peakNode = p2d;
          }
        }
      }

      // 2. Render the 3D Morphing Wireframe
      ctx.lineWidth = 1;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const n1 = nodes.current[idx];
          const p1 = projected[idx];
          if (!p1) continue;

          // Draw Right
          if (c < COLS - 1) {
            const n2 = nodes.current[idx + 1];
            const p2 = projected[idx + 1];
            if (p2) {
              const a = Math.max(n1.alpha, n2.alpha);
              if (a > 0.04) {
                ctx.strokeStyle = `rgba(0, 210, 255, ${a})`;
                ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke();
              }
            }
          }
          // Draw Down
          if (r < ROWS - 1) {
            const n3 = nodes.current[idx + COLS];
            const p3 = projected[idx + COLS];
            if (p3) {
              const a = Math.max(n1.alpha, n3.alpha);
              if (a > 0.04) {
                ctx.strokeStyle = `rgba(0, 210, 255, ${a})`;
                ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p3.sx, p3.sy); ctx.stroke();
              }
            }
          }
        }
      }

      // 3. Render True 3D Bounding Cuboid & AI Targeting Reticle
      if (activeNodes > 10 && peakNode) {
        const pad = 40;
        const bMinX = minX - pad, bMaxX = maxX + pad;
        const bMinY = minY - pad, bMaxY = 0; // Cap bounding box base at the flat floor
        const bMinZ = minZ - pad, bMaxZ = maxZ + pad;
        
        const boxVerts = [
          proj(bMinX, bMinY, bMinZ, cx, cy), proj(bMaxX, bMinY, bMinZ, cx, cy),
          proj(bMaxX, bMaxY, bMinZ, cx, cy), proj(bMinX, bMaxY, bMinZ, cx, cy),
          proj(bMinX, bMinY, bMaxZ, cx, cy), proj(bMaxX, bMinY, bMaxZ, cx, cy),
          proj(bMaxX, bMaxY, bMaxZ, cx, cy), proj(bMinX, bMaxY, bMaxZ, cx, cy)
        ];

        const boxEdges = [
          [0,1], [1,2], [2,3], [3,0],
          [4,5], [5,6], [6,7], [7,4],
          [0,4], [1,5], [2,6], [3,7]
        ];

        // Draw 3D Sci-Fi Corner Brackets
        for (const edge of boxEdges) {
          const p1 = boxVerts[edge[0]];
          const p2 = boxVerts[edge[1]];
          if (!p1 || !p2) continue;
          
          const dx = p2.sx - p1.sx;
          const dy = p2.sy - p1.sy;
          
          ctx.strokeStyle = "rgba(0, 210, 255, 0.9)";
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p1.sx + dx*0.25, p1.sy + dy*0.25); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(p2.sx, p2.sy); ctx.lineTo(p2.sx - dx*0.25, p2.sy - dy*0.25); ctx.stroke();
          
          // Faint full line connection
          ctx.strokeStyle = "rgba(0, 210, 255, 0.15)";
          ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke();
        }

        // Vertical Laser Altitude Tether (Measuring the mountain peak)
        const basePeak = proj(peakNode.ox, 0, peakNode.oz, cx, cy);
        if (basePeak) {
          ctx.strokeStyle = "rgba(0, 210, 255, 0.7)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(peakNode.sx, peakNode.sy);
          ctx.lineTo(basePeak.sx, basePeak.sy);
          ctx.stroke();
          ctx.setLineDash([]);
          
          // Altitude dot on the ground
          ctx.fillStyle = "rgba(0, 210, 255, 0.9)";
          ctx.fillRect(basePeak.sx - 2, basePeak.sy - 2, 4, 4);
        }

        // Premium UI Data Tag
        let minSyBox = Infinity;
        let centerSx = 0;
        let validVerts = 0;
        for (const p of boxVerts) {
          if (!p) continue;
          if (p.sy < minSyBox) minSyBox = p.sy;
          centerSx += p.sx;
          validVerts++;
        }
        if (validVerts > 0) centerSx /= validVerts;

        const labelY = minSyBox - 40;
        
        ctx.strokeStyle = "rgba(0, 210, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerSx, minSyBox);
        ctx.lineTo(centerSx, labelY);
        ctx.stroke();

        const boxW = 280;
        const boxH = 26;
        const boxX = centerSx - boxW / 2;
        const boxY = labelY - boxH;

        ctx.fillStyle = "rgba(5, 8, 16, 0.95)";
        ctx.fillRect(boxX, boxY, boxW, boxH);
        
        ctx.strokeStyle = "rgba(0, 210, 255, 0.6)";
        ctx.strokeRect(boxX, boxY, boxW, boxH);
        
        ctx.fillStyle = "#00d2ff";
        ctx.font = "bold 11px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(`3D_TOPOGRAPHY_MAPPED | BBOX_LOCKED | VOLUME: ${activeNodes * 142}`, centerSx, boxY + boxH/2);
        ctx.textAlign = "left"; // reset
      }

      // Scanner Reticle
      ctx.strokeStyle = "rgba(0, 210, 255, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 35, 0, Math.PI*2);
      ctx.moveTo(mouse.current.x - 45, mouse.current.y); ctx.lineTo(mouse.current.x + 45, mouse.current.y);
      ctx.moveTo(mouse.current.x, mouse.current.y - 45); ctx.lineTo(mouse.current.x, mouse.current.y + 45);
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
