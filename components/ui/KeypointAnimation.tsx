"use client";
import { useEffect, useRef } from "react";

/*
  THE DATA REFINERY PIPELINE (V5 - Flawless Positioning)
  ──────────────────────────────────────────────────────
  Upgrades implemented based on feedback:
  1. Full Screen Balance: Fixed the mathematical projection offset that was
     pushing all objects to the top of the screen. Objects now spawn perfectly 
     evenly across the entire top-to-bottom height of the desktop.
  2. Locked Center Scanner: The converter line is now strictly locked to exactly 
     50% width and is no longer shifted by the user's mouse parallax.
  3. Perfect Neural Lines: Fixed a bug where neural connections weren't passing 
     through the 3D projection matrix, ensuring lines now snap perfectly to the 
     center of the annotated boxes.
*/

const FOV = 800;
const proj = (x: number, y: number, z: number, cx: number, cy: number) => {
  const p = FOV / Math.max(1, (FOV + z));
  return { sx: cx + x * p, sy: cy + y * p, sc: p };
};

const geometries = {
  cube: {
    vertices: [
      [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
      [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]
    ],
    edges: [
      [0,1], [1,2], [2,3], [3,0],
      [4,5], [5,6], [6,7], [7,4],
      [0,4], [1,5], [2,6], [3,7]
    ]
  },
  octahedron: {
    vertices: [
      [1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]
    ],
    edges: [
      [0,2], [0,3], [0,4], [0,5],
      [1,2], [1,3], [1,4], [1,5],
      [2,4], [4,3], [3,5], [5,2]
    ]
  },
  pyramid: {
    vertices: [
      [0, 1.5, 0], [-1, -1, 1], [1, -1, 1], [1, -1, -1], [-1, -1, -1]
    ],
    edges: [
      [0,1], [0,2], [0,3], [0,4],
      [1,2], [2,3], [3,4], [4,1]
    ]
  }
};

type GeoType = keyof typeof geometries;

class DataObject {
  x: number; y: number; z: number;
  vx: number;
  rotX: number; rotY: number; rotZ: number;
  vRotX: number; vRotY: number; vRotZ: number;
  type: GeoType;
  scale: number;
  id: string;
  status: 'RAW' | 'PROCESSING' | 'ANNOTATED';
  processProgress: number;
  tagLine: string;
  
  swarmDots: { targetVertex: number; x: number; y: number; z: number; radius: number; speed: number; offset: number }[];

  constructor(w: number, h: number, startX: number) {
    this.x = startX;
    // CRITICAL FIX: Math.random() * h perfectly distributes across the full height
    this.y = Math.random() * h; 
    this.z = Math.random() * 600 - 300; 
    
    // Constant, uniform, smooth speed for both RAW and ANNOTATED states
    this.vx = 0.8 + Math.random() * 0.4;
    
    this.rotX = Math.random() * Math.PI;
    this.rotY = Math.random() * Math.PI;
    this.rotZ = Math.random() * Math.PI;
    
    this.vRotX = (Math.random() - 0.5) * 0.015;
    this.vRotY = (Math.random() - 0.5) * 0.015;
    this.vRotZ = (Math.random() - 0.5) * 0.015;
    
    const types: GeoType[] = ['cube', 'octahedron', 'pyramid'];
    this.type = types[Math.floor(Math.random() * types.length)];
    this.scale = 30 + Math.random() * 25;
    this.id = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    
    const tags = [
      "KEYPOINT_ANNOTATION",
      "OBJECT_DETECTED",
      "3D_BBOX_STRUCTURED",
      "KEYPOINTS_MAPPED",
      "DATA_VERIFIED",
      "AI_MODEL_READY"
    ];
    // We add a random ID to the tag so it looks like "OBJ:4921 | KEYPOINT_ANNOTATION"
    this.tagLine = `OBJ:${this.id} | ${tags[Math.floor(Math.random() * tags.length)]}`;
    
    this.status = 'RAW';
    this.processProgress = 0;

    this.swarmDots = [];
    const geo = geometries[this.type];
    for (let j = 0; j < geo.vertices.length; j++) {
      for (let k = 0; k < 5; k++) { 
        this.swarmDots.push({
          targetVertex: j,
          x: 0, y: 0, z: 0,
          radius: 15 + Math.random() * 30,
          speed: 0.1 + Math.random() * 0.2, // Very slow, calm orbit
          offset: Math.random() * Math.PI * 2
        });
      }
    }
  }

  update(scannerX: number, time: number) {
    this.x += this.vx;
    this.rotX += this.vRotX;
    this.rotY += this.vRotY;
    this.rotZ += this.vRotZ;

    if (this.x > scannerX && this.status === 'RAW') {
      this.status = 'PROCESSING';
    }

    if (this.status === 'PROCESSING') {
      this.processProgress += 0.04;
      if (this.processProgress >= 1) {
        this.processProgress = 1;
        this.status = 'ANNOTATED';
      }
    }

    if (this.status === 'RAW') {
      for (const dot of this.swarmDots) {
        const angle = time * dot.speed + dot.offset;
        dot.x = Math.sin(angle) * dot.radius;
        dot.y = Math.cos(angle * 0.8) * dot.radius;
        dot.z = Math.sin(angle * 1.2) * dot.radius;
      }
    } else if (this.status === 'PROCESSING') {
      for (const dot of this.swarmDots) {
        dot.x += (0 - dot.x) * 0.1;
        dot.y += (0 - dot.y) * 0.1;
        dot.z += (0 - dot.z) * 0.1;
      }
    }
  }
}

export default function DataRefinery() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const objects = useRef<DataObject[]>([]);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
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
      const numObjects = window.innerWidth > 768 ? 25 : 12;
      for (let i = 0; i < numObjects; i++) {
        arr.push(new DataObject(canvas.width, canvas.height, (Math.random() * canvas.width) - canvas.width * 0.2));
      }
      objects.current = arr;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouse.current.targetX = (e.clientX - cx) * 0.05; // Slightly reduced parallax
      mouse.current.targetY = (e.clientY - cy) * 0.05;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const drawBracket = (cx: CanvasRenderingContext2D, x: number, y: number, size: number, dirX: number, dirY: number) => {
      cx.beginPath();
      cx.moveTo(x + size * dirX, y);
      cx.lineTo(x, y);
      cx.lineTo(x, y + size * dirY);
      cx.stroke();
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      t.current += 0.015;

      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      const cx = W / 2 + mouse.current.x;
      const cy = H / 2 + mouse.current.y;

      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);

      // CRITICAL FIX: Scanner is STRICTLY locked to the exact 50% middle of the screen
      const SCANNER_X = W * 0.50;

      // Draw Super Subtle Scanner Line
      ctx.fillStyle = "rgba(0, 210, 255, 0.015)";
      ctx.fillRect(SCANNER_X, 0, 100, H);

      ctx.strokeStyle = "rgba(0, 210, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(SCANNER_X, 0);
      ctx.lineTo(SCANNER_X, H);
      ctx.stroke();

      ctx.globalCompositeOperation = "screen";

      // Calculate projected centers for perfect neural line connections
      const getProjectedCenter = (obj: DataObject) => {
        return proj(obj.x - cx, obj.y - cy, obj.z, cx, cy);
      };

      // Draw Neural Connections between annotated boxes
      ctx.lineWidth = 1;
      for (let i = 0; i < objects.current.length; i++) {
        const a = objects.current[i];
        if (a.status !== 'ANNOTATED') continue;
        const pA = getProjectedCenter(a);

        for (let j = i + 1; j < objects.current.length; j++) {
          const b = objects.current[j];
          if (b.status !== 'ANNOTATED') continue;
          const pB = getProjectedCenter(b);
          
          const dx = pA.sx - pB.sx;
          const dy = pA.sy - pB.sy;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 250) {
            ctx.strokeStyle = `rgba(58, 123, 213, ${0.2 * (1 - dist/250)})`;
            ctx.beginPath();
            ctx.moveTo(pA.sx, pA.sy);
            ctx.lineTo(pB.sx, pB.sy);
            ctx.stroke();
          }
        }
      }

      // Process and Draw Objects
      for (let i = 0; i < objects.current.length; i++) {
        const obj = objects.current[i];
        obj.update(SCANNER_X, t.current);

        if (obj.x > W + 300) {
          objects.current[i] = new DataObject(W, H, -300);
          continue;
        }

        const geo = geometries[obj.type];
        const cosX = Math.cos(obj.rotX), sinX = Math.sin(obj.rotX);
        const cosY = Math.cos(obj.rotY), sinY = Math.sin(obj.rotY);
        const cosZ = Math.cos(obj.rotZ), sinZ = Math.sin(obj.rotZ);

        const baseVertices = [];
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;

        for (let j = 0; j < geo.vertices.length; j++) {
          const v = geo.vertices[j];
          const rx = v[0] * obj.scale;
          const ry = v[1] * obj.scale;
          const rz = v[2] * obj.scale;

          const x1 = rx * cosZ - ry * sinZ;
          const y1 = rx * sinZ + ry * cosZ;
          const z1 = rz;
          const x2 = x1 * cosY + z1 * sinY;
          const y2 = y1;
          const z2 = -x1 * sinY + z1 * cosY;
          const x3 = x2;
          const y3 = y2 * cosX - z2 * sinX;
          const z3 = y2 * sinX + z2 * cosX;

          baseVertices.push({ x: x3, y: y3, z: z3 });
          
          if (obj.status !== 'RAW') {
            const p2d = proj(obj.x + x3 - cx, obj.y + y3 - cy, obj.z + z3, cx, cy);
            minX = Math.min(minX, p2d.sx); maxX = Math.max(maxX, p2d.sx);
            minY = Math.min(minY, p2d.sy); maxY = Math.max(maxY, p2d.sy);
          }
        }

        // Draw Swarming Dots
        ctx.fillStyle = obj.status === 'ANNOTATED' ? "rgba(0, 210, 255, 0.7)" : "rgba(255, 255, 255, 0.4)";
        for (const dot of obj.swarmDots) {
          const targetV = baseVertices[dot.targetVertex];
          const chaos = 1 - obj.processProgress;
          
          const px = obj.x + targetV.x + (dot.x * chaos) - cx;
          const py = obj.y + targetV.y + (dot.y * chaos) - cy;
          const pz = obj.z + targetV.z + (dot.z * chaos);
          const p2d = proj(px, py, pz, cx, cy);

          ctx.beginPath();
          ctx.arc(p2d.sx, p2d.sy, 1.5 * p2d.sc, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Wireframe
        if (obj.status !== 'RAW') {
          ctx.strokeStyle = obj.status === 'ANNOTATED' ? "rgba(58, 123, 213, 0.7)" : `rgba(255, 255, 255, ${obj.processProgress * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (const edge of geo.edges) {
            const v1 = baseVertices[edge[0]];
            const v2 = baseVertices[edge[1]];
            const p1 = proj(obj.x + v1.x - cx, obj.y + v1.y - cy, obj.z + v1.z, cx, cy);
            const p2 = proj(obj.x + v2.x - cx, obj.y + v2.y - cy, obj.z + v2.z, cx, cy);
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
          }
          ctx.stroke();
        }

        // Draw Bounding Box & AI Taglines
        if (obj.status === 'ANNOTATED') {
          const pad = 12;
          const bx = minX - pad;
          const by = minY - pad;
          const bw = maxX - minX + pad * 2;
          const bh = maxY - minY + pad * 2;

          ctx.strokeStyle = "rgba(0, 210, 255, 0.7)";
          ctx.lineWidth = 1;
          
          const cSize = 8;
          drawBracket(ctx, bx, by, cSize, 1, 1);
          drawBracket(ctx, bx + bw, by, cSize, -1, 1);
          drawBracket(ctx, bx, by + bh, cSize, 1, -1);
          drawBracket(ctx, bx + bw, by + bh, cSize, -1, -1);

          ctx.strokeStyle = "rgba(0, 210, 255, 0.1)";
          ctx.strokeRect(bx, by, bw, bh);

          ctx.fillStyle = "rgba(0, 210, 255, 0.85)";
          const labelW = 195; // Wider for the new text
          ctx.fillRect(bx, by - 24, labelW, 22);
          
          ctx.fillStyle = "#000000";
          ctx.font = "bold 11px sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillText(obj.tagLine, bx + 6, by - 13);
        }
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
