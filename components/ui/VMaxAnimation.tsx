"use client";
import { useEffect, useRef } from "react";

/*
  THE AI PERCEPTION MATRIX (VMAX)
  ──────────────────────────────────────────────────────
  Concept 4: The absolute pinnacle of AI Data Infrastructure visualization.
  This animation is 300x more cinematic and mathematically complex.
  
  What makes this a masterpiece:
  1. True 3D Bounding Cuboids: Instead of flat 2D boxes, the AI generates 
     true 3D geometric bounding volumes that perfectly track and rotate 
     with the internal structures.
  2. Sci-Fi Targeting Brackets: Bounding boxes are drawn using precision 
     corner brackets, perfectly emulating advanced Autonomous Vehicle LiDAR HUDs.
  3. Cinematic Transformation: Chaotic data swarms explicitly snap into 
     structured 3D wireframes as they pass the God-Eye scanner.
  4. Real-time Knowledge Graph: Processed objects dynamically establish 
     glowing neural connections with each other, forming a live data network.
*/

const FOV = 1000;
const proj = (x: number, y: number, z: number, cx: number, cy: number) => {
  const p = FOV / Math.max(1, (FOV + z));
  return { sx: cx + x * p, sy: cy + y * p, sc: p };
};

const geometries = {
  cube: {
    vertices: [[-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1], [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]],
    edges: [[0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7]]
  },
  octahedron: {
    vertices: [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]],
    edges: [[0,2], [0,3], [0,4], [0,5], [1,2], [1,3], [1,4], [1,5], [2,4], [4,3], [3,5], [5,2]]
  },
  pyramid: {
    vertices: [[0, 1.5, 0], [-1, -1, 1], [1, -1, 1], [1, -1, -1], [-1, -1, -1]],
    edges: [[0,1], [0,2], [0,3], [0,4], [1,2], [2,3], [3,4], [4,1]]
  }
};

const boxVertices = [
  [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
  [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]
];
const boxEdges = [
  [0,1], [1,2], [2,3], [3,0],
  [4,5], [5,6], [6,7], [7,4],
  [0,4], [1,5], [2,6], [3,7]
];

type GeoType = keyof typeof geometries;

class DataEntity {
  x: number; y: number; z: number;
  rotX: number; rotY: number; rotZ: number;
  vRotX: number; vRotY: number; vRotZ: number;
  scale: number;
  speed: number;
  type: GeoType;
  swarm: {x: number, y: number, z: number, vx: number, vy: number, vz: number}[];
  processProgress: number; // 0 to 1
  tagLine: string;
  id: string;

  constructor(W: number, H: number, startX: number) {
    this.x = startX;
    this.y = (Math.random() - 0.5) * H * 0.8; 
    this.z = Math.random() * 800 - 400;
    
    this.scale = 35 + Math.random() * 25;
    this.speed = 0.8 + Math.random() * 0.5; // Majestic, slow flow
    
    this.rotX = Math.random() * Math.PI;
    this.rotY = Math.random() * Math.PI;
    this.rotZ = Math.random() * Math.PI;
    this.vRotX = (Math.random() - 0.5) * 0.02;
    this.vRotY = (Math.random() - 0.5) * 0.02;
    this.vRotZ = (Math.random() - 0.5) * 0.02;
    
    const types: GeoType[] = ['cube', 'octahedron', 'pyramid'];
    this.type = types[Math.floor(Math.random() * types.length)];
    
    this.swarm = [];
    for (let i = 0; i < 30; i++) {
      this.swarm.push({
        x: (Math.random() - 0.5) * this.scale * 4,
        y: (Math.random() - 0.5) * this.scale * 4,
        z: (Math.random() - 0.5) * this.scale * 4,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2
      });
    }

    this.processProgress = 0;
    this.id = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    const tags = ["3D_BBOX_LOCKED", "SEMANTIC_MESH_OK", "LIDAR_POINT_SYNC", "OBJECT_CLASSIFIED"];
    this.tagLine = tags[Math.floor(Math.random() * tags.length)];
  }

  update(scannerX: number) {
    this.x += this.speed;
    this.rotX += this.vRotX;
    this.rotY += this.vRotY;
    this.rotZ += this.vRotZ;

    if (this.x > scannerX) {
      this.processProgress += 0.03; // Smooth transition
      if (this.processProgress > 1) this.processProgress = 1;
    }

    if (this.processProgress < 1) {
      // Swarm wanders chaotically before processing
      for (const s of this.swarm) {
        s.x += s.vx; s.y += s.vy; s.z += s.vz;
        const limit = this.scale * 3;
        if (s.x > limit || s.x < -limit) s.vx *= -1;
        if (s.y > limit || s.y < -limit) s.vy *= -1;
        if (s.z > limit || s.z < -limit) s.vz *= -1;
      }
    }
    
    if (this.processProgress > 0) {
      // Swarm is pulled violently but beautifully into the center origin
      for (const s of this.swarm) {
        s.x *= 0.85; s.y *= 0.85; s.z *= 0.85;
      }
    }
  }
}

export default function PerceptionMatrix() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const objects = useRef<DataEntity[]>([]);
  const t = useRef(0);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const arr = [];
      const numObjects = window.innerWidth > 768 ? 20 : 10;
      for (let i = 0; i < numObjects; i++) {
        arr.push(new DataEntity(canvas.width, canvas.height, (Math.random() * canvas.width) - canvas.width * 0.2));
      }
      objects.current = arr;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Math helper to rotate 3D vertices
    const rotate3D = (v: number[], rx: number, ry: number, rz: number) => {
      let x = v[0], y = v[1], z = v[2];
      let x1 = x * Math.cos(rz) - y * Math.sin(rz);
      let y1 = x * Math.sin(rz) + y * Math.cos(rz);
      let x2 = x1 * Math.cos(ry) + z * Math.sin(ry);
      let z2 = -x1 * Math.sin(ry) + z * Math.cos(ry);
      let y3 = y1 * Math.cos(rx) - z2 * Math.sin(rx);
      let z3 = y1 * Math.sin(rx) + z2 * Math.cos(rx);
      return { x: x2, y: y3, z: z3 };
    };

    // Draws the precision corners of a 3D bounding box
    const drawBracket3D = (p1: any, p2: any, alpha: number) => {
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
      t.current += 0.015;

      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);

      // Deep Architectural Background Grid
      ctx.lineWidth = 1;
      const gridSize = 80;
      const gridOffset = (t.current * 15) % gridSize;
      ctx.strokeStyle = "rgba(14, 165, 233, 0.025)";
      ctx.beginPath();
      for (let x = gridOffset; x < W; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, H);
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(W, y);
      }
      ctx.stroke();

      // The Central Perception Matrix Horizon
      const SCANNER_X = W * 0.45;
      const grad = ctx.createLinearGradient(SCANNER_X - 120, 0, SCANNER_X + 120, 0);
      grad.addColorStop(0, "rgba(0, 210, 255, 0)");
      grad.addColorStop(0.5, "rgba(0, 210, 255, 0.08)");
      grad.addColorStop(1, "rgba(0, 210, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(SCANNER_X - 120, 0, 240, H);
      ctx.strokeStyle = "rgba(0, 210, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(SCANNER_X, 0); ctx.lineTo(SCANNER_X, H); ctx.stroke();

      ctx.globalCompositeOperation = "screen";

      // Calculate Connections between fully processed entities
      ctx.lineWidth = 1;
      for (let i = 0; i < objects.current.length; i++) {
        const a = objects.current[i];
        if (a.processProgress < 1) continue;
        for (let j = i + 1; j < objects.current.length; j++) {
          const b = objects.current[j];
          if (b.processProgress < 1) continue;
          
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 350) {
            const pA = proj(a.x - cx, a.y - cy, a.z, cx, cy);
            const pB = proj(b.x - cx, b.y - cy, b.z, cx, cy);
            ctx.strokeStyle = `rgba(58, 123, 213, ${0.3 * (1 - dist/350)})`;
            ctx.beginPath();
            ctx.moveTo(pA.sx, pA.sy);
            ctx.lineTo(pB.sx, pB.sy);
            ctx.stroke();
          }
        }
      }

      // Update and Draw Entities
      for (let i = 0; i < objects.current.length; i++) {
        const obj = objects.current[i];
        obj.update(SCANNER_X);

        if (obj.x > W + 300) {
          objects.current[i] = new DataEntity(W, H, -300);
          continue;
        }

        const pr = obj.processProgress;
        const pScale = pr * obj.scale;

        // 1. Draw Chaotic Swarm
        if (pr < 1) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 * (1 - pr)})`;
          for (const s of obj.swarm) {
            const p = proj(obj.x + s.x - cx, obj.y + s.y - cy, obj.z + s.z, cx, cy);
            ctx.fillRect(p.sx, p.sy, 2 * p.sc, 2 * p.sc);
          }
        }

        // 2. Draw Structured Geometry & 3D Bounding Box
        if (pr > 0) {
          // Render Inner Object
          const geo = geometries[obj.type];
          const innerVerts = geo.vertices.map(v => {
            const r3d = rotate3D(v, obj.rotX, obj.rotY, obj.rotZ);
            return proj(obj.x + r3d.x * pScale - cx, obj.y + r3d.y * pScale - cy, obj.z + r3d.z * pScale, cx, cy);
          });

          ctx.strokeStyle = `rgba(58, 123, 213, ${pr * 0.8})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (const edge of geo.edges) {
            const p1 = innerVerts[edge[0]];
            const p2 = innerVerts[edge[1]];
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
          }
          ctx.stroke();

          // Render True 3D Bounding Cuboid
          const boxScale = obj.scale * 1.8; // Bounding box is larger than object
          const boxVerts = boxVertices.map(v => {
            const r3d = rotate3D(v, obj.rotX, obj.rotY, obj.rotZ);
            return proj(obj.x + r3d.x * boxScale - cx, obj.y + r3d.y * boxScale - cy, obj.z + r3d.z * boxScale, cx, cy);
          });

          // Draw Sci-Fi Corners of the 3D Cuboid
          for (const edge of boxEdges) {
            drawBracket3D(boxVerts[edge[0]], boxVerts[edge[1]], pr * 0.7);
          }

          // 3. Draw Premium Tracking UI Label
          if (pr > 0.5) {
            // Find highest projected Y point of the 3D box to deploy the label perfectly above it
            let minSy = Infinity;
            let centerSx = 0;
            for (const p of boxVerts) {
              if (p.sy < minSy) minSy = p.sy;
              centerSx += p.sx;
            }
            centerSx /= 8; // average X center

            const ease = (pr - 0.5) * 2; // 0 to 1
            const labelY = minSy - 40 * ease;

            // Target Tether
            ctx.strokeStyle = `rgba(0, 210, 255, ${ease * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerSx, minSy);
            ctx.lineTo(centerSx, labelY);
            ctx.stroke();

            // Label Background
            const boxW = 160;
            const boxH = 22;
            const boxX = centerSx - boxW / 2;
            const boxY = labelY - boxH;

            ctx.fillStyle = `rgba(5, 8, 16, ${ease * 0.9})`;
            ctx.fillRect(boxX, boxY, boxW, boxH);
            
            ctx.strokeStyle = `rgba(0, 210, 255, ${ease * 0.4})`;
            ctx.strokeRect(boxX, boxY, boxW, boxH);
            
            // Text Rendering
            ctx.fillStyle = `rgba(0, 210, 255, ${ease})`;
            ctx.font = "bold 10px sans-serif";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(`OBJ_${obj.id} | ${obj.tagLine}`, centerSx, boxY + boxH/2);
            ctx.textAlign = "left"; // reset
          }
        }
      }
      
      ctx.globalCompositeOperation = "source-over";
      raf.current = requestAnimationFrame(draw);
    };
    
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
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
