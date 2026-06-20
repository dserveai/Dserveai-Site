"use client";
import { useEffect, useRef } from "react";

/*
  THE INTERACTIVE 3D LIDAR MATRIX
  ──────────────────────────────────────────────────────
  The ultimate combination of all requested elements:
  1. Full Screen Left-to-Right Flow: A massive 3D topographical 
     point cloud spans the entire screen and constantly flows right.
  2. High Interactivity: The user's mouse acts as a volumetric AI Scanner.
  3. Explicit Messaging: The AI instantly structures the raw dots into a 
     glowing 3D mesh, wraps a true 3D Bounding Cuboid around the geographical 
     cluster, and explicitly labels it with AI/LiDAR annotation text.
  
  This tells the precise story of AI Data Infrastructure (structuring 
  raw LiDAR point clouds into usable 3D Bounding Boxes).
*/

class TerrainPoint {
  x: number; y: number; z: number;
  speed: number;

  constructor(w: number) {
    // Distribute randomly across a massive space
    this.x = -w * 0.5 - Math.random() * w * 1.5;
    this.z = Math.random() * 2000 - 500;
    this.y = 0;
    this.speed = 0.8 + Math.random() * 0.8; // Flow speed left-to-right
  }

  update(w: number) {
    this.x += this.speed;
    
    // If it flies off the right edge, wrap it seamlessly to the left
    if (this.x > w * 1.5) {
      this.x = -w * 0.5 - Math.random() * w;
    }
    
    // Procedural Topographical Noise (Mountains and Valleys)
    const noiseY = Math.sin(this.x * 0.002) * Math.cos(this.z * 0.002) * 350;
    const detail = Math.sin(this.x * 0.01) * Math.cos(this.z * 0.01) * 60;
    this.y = noiseY + detail;
  }
}

export default function InteractiveLidarMatrix() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const points = useRef<TerrainPoint[]>([]);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const N = window.innerWidth > 768 ? 2200 : 900;
      const arr = [];
      for (let i = 0; i < N; i++) {
        arr.push(new TerrainPoint(canvas.width));
      }
      points.current = arr;
      
      // Default scanner position inside the stream, favoring the right to balance hero text
      mouse.current.x = window.innerWidth > 1024 ? canvas.width * 0.70 : canvas.width / 2;
      mouse.current.y = canvas.height / 2;
      mouse.current.active = true;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Global listener so we don't block clicks on HTML buttons
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const FOV = 1200;
    const angleX = Math.PI * 0.18; // Look down 32 degrees to see the landscape depth
    const cosX = Math.cos(angleX); 
    const sinX = Math.sin(angleX);

    // 3D Projection Engine
    const proj = (x: number, y: number, z: number, cx: number, cy: number) => {
      const py = y + 250; // Offset Y so the landscape sits below the camera natively
      
      const rY = py * cosX - z * sinX;
      const rZ = py * sinX + z * cosX;
      
      const camZ = FOV + rZ;
      if (camZ < 10) return null; // Safe guard
      
      const p = FOV / camZ;
      return { sx: cx + x * p, sy: cy + rY * p, sc: p };
    };

    // Draws Sci-Fi Corner Brackets for True 3D Bounding Boxes
    const drawBracket3D = (p1: any, p2: any, alpha: number) => {
      if (!p1 || !p2) return;
      const dx = p2.sx - p1.sx;
      const dy = p2.sy - p1.sy;
      ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p1.sx, p1.sy);
      ctx.lineTo(p1.sx + dx * 0.25, p1.sy + dy * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(p2.sx, p2.sy);
      ctx.lineTo(p2.sx - dx * 0.25, p2.sy - dy * 0.25);
      ctx.stroke();
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      let minZ = Infinity, maxZ = -Infinity;
      const activePoints: { orig: TerrainPoint, p2d: any }[] = [];
      const SCAN_RADIUS = 200;

      // 1. Process 3D Math and AI Scanner Hit Detection
      for (const p of points.current) {
        p.update(W);
        const p2d = proj(p.x, p.y, p.z, cx, cy);
        if (!p2d) continue;

        // Is the mouse hovering near this 2D projected point?
        const distToMouse = Math.hypot(p2d.sx - mouse.current.x, p2d.sy - mouse.current.y);
        const isHovered = mouse.current.active && distToMouse < SCAN_RADIUS;

        if (isHovered) {
          activePoints.push({ orig: p, p2d });
          
          // Track 3D bounds for the Active Bounding Box
          minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
          minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
          minZ = Math.min(minZ, p.z); maxZ = Math.max(maxZ, p.z);

          // Draw Glowing Structured Keypoint
          ctx.fillStyle = "#00d2ff";
          const r = 2.5 * p2d.sc;
          ctx.fillRect(p2d.sx - r, p2d.sy - r, r*2, r*2);
        } else {
          // Draw Faint Unstructured Raw Data Point
          const alpha = Math.max(0.05, 0.3 * p2d.sc);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          const r = 1.2 * p2d.sc;
          ctx.fillRect(p2d.sx - r, p2d.sy - r, r*2, r*2);
        }
      }

      // 2. Render AI Structuring Visuals
      if (activePoints.length > 0) {
        
        // A. Draw 3D Surface Mesh (Delaunay-style triangulation of active region)
        ctx.strokeStyle = "rgba(0, 210, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < activePoints.length; i++) {
          for (let j = i + 1; j < activePoints.length; j++) {
            const dx = activePoints[i].orig.x - activePoints[j].orig.x;
            const dz = activePoints[i].orig.z - activePoints[j].orig.z;
            if (dx * dx + dz * dz < 18000) { // Connect points physically close in 3D
              ctx.moveTo(activePoints[i].p2d.sx, activePoints[i].p2d.sy);
              ctx.lineTo(activePoints[j].p2d.sx, activePoints[j].p2d.sy);
            }
          }
        }
        ctx.stroke();

        // B. Construct True 3D Bounding Cuboid from the Min/Max extents
        const pad = 40;
        minX -= pad; maxX += pad;
        minY -= pad; maxY += pad;
        minZ -= pad; maxZ += pad;
        
        const boxVerts = [
          proj(minX, minY, minZ, cx, cy), proj(maxX, minY, minZ, cx, cy),
          proj(maxX, maxY, minZ, cx, cy), proj(minX, maxY, minZ, cx, cy),
          proj(minX, minY, maxZ, cx, cy), proj(maxX, minY, maxZ, cx, cy),
          proj(maxX, maxY, maxZ, cx, cy), proj(minX, maxY, maxZ, cx, cy)
        ];

        const boxEdges = [
          [0,1], [1,2], [2,3], [3,0], // Bottom plane
          [4,5], [5,6], [6,7], [7,4], // Top plane
          [0,4], [1,5], [2,6], [3,7]  // Vertical pillars
        ];

        for (const edge of boxEdges) {
          drawBracket3D(boxVerts[edge[0]], boxVerts[edge[1]], 0.8);
        }

        // C. Draw the AI Premium UI Tag
        // Find the highest point of the 3D bounding box on screen to attach the tag perfectly
        let minSy = Infinity;
        let centerSx = 0;
        for (const p of boxVerts) {
          if (!p) continue;
          if (p.sy < minSy) minSy = p.sy;
          centerSx += p.sx;
        }
        centerSx /= 8;

        const labelY = minSy - 40;
        
        // Tether line from box to label
        ctx.strokeStyle = "rgba(0, 210, 255, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerSx, minSy);
        ctx.lineTo(centerSx, labelY);
        ctx.stroke();

        const boxW = 280;
        const boxH = 26;
        const boxX = centerSx - boxW / 2;
        const boxY = labelY - boxH;

        ctx.fillStyle = "rgba(5, 8, 16, 0.95)";
        ctx.fillRect(boxX, boxY, boxW, boxH);
        
        ctx.strokeStyle = "rgba(0, 210, 255, 0.5)";
        ctx.strokeRect(boxX, boxY, boxW, boxH);
        
        ctx.fillStyle = "#00d2ff";
        ctx.font = "bold 11px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(`LIDAR_MAPPED | 3D_BOUNDING_BOX_LOCKED | KEYPOINTS: ${activePoints.length}`, centerSx, boxY + boxH/2);
        ctx.textAlign = "left"; // reset

        // D. Draw AI Mouse Reticle
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
