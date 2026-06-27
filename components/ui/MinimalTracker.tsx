"use client";
import { useEffect, useRef } from "react";

/*
  THE MINIMAL AI OBJECT TRACKER
  ──────────────────────────────────────────────────────
  Concept 6: The ultimate Minimal + Interactive experience.
  Completely removes all chaotic particles and massive 3D scenes.
  
  Visualizes a clean, high-tech "Radar/Scanner" interface.
  15 sleek, abstract 3D wireframe objects float peacefully across the screen.
  The user's mouse is an AI Tracking Reticle.
  Hovering over an object perfectly snaps a dynamic 2D Bounding Box around 
  the rotating 3D geometry in real-time, displaying a premium AI Data Tag.
  
  Minimalist. Interactive. Explicit company messaging.
*/

const geometries = {
  cube: {
    verts: [[-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1], [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]],
    edges: [[0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7]]
  },
  octahedron: {
    verts: [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]],
    edges: [[0,2], [0,3], [0,4], [0,5], [1,2], [1,3], [1,4], [1,5], [2,4], [4,3], [3,5], [5,2]]
  },
  pyramid: {
    verts: [[0, 1.5, 0], [-1, -1, 1], [1, -1, 1], [1, -1, -1], [-1, -1, -1]],
    edges: [[0,1], [0,2], [0,3], [0,4], [1,2], [2,3], [3,4], [4,1]]
  }
};

type GeoType = keyof typeof geometries;

class TrackableEntity {
  x: number; y: number; z: number;
  vx: number; vy: number;
  rotX: number; rotY: number; rotZ: number;
  vRotX: number; vRotY: number; vRotZ: number;
  scale: number;
  type: GeoType;
  id: string;
  className: string;
  lockProgress: number; 

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.z = Math.random() * 400 - 200;
    
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    
    this.rotX = Math.random() * Math.PI;
    this.rotY = Math.random() * Math.PI;
    this.rotZ = Math.random() * Math.PI;
    this.vRotX = (Math.random() - 0.5) * 0.02;
    this.vRotY = (Math.random() - 0.5) * 0.02;
    this.vRotZ = (Math.random() - 0.5) * 0.02;
    
    this.scale = 30 + Math.random() * 20;
    
    const types: GeoType[] = ['cube', 'octahedron', 'pyramid'];
    this.type = types[Math.floor(Math.random() * types.length)];
    
    this.id = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    const classes = ["VEHICLE_NODE", "PEDESTRIAN_OBJ", "SIGN_GEOMETRY", "OBSTACLE_MESH"];
    this.className = classes[Math.floor(Math.random() * classes.length)];
    
    this.lockProgress = 0;
  }

  update(w: number, h: number, isHovered: boolean) {
    this.x += this.vx;
    this.y += this.vy;
    
    this.rotX += this.vRotX;
    this.rotY += this.vRotY;
    this.rotZ += this.vRotZ;
    
    // Smooth wrapping around screen edges
    if (this.x > w + 100) this.x = -100;
    if (this.x < -100) this.x = w + 100;
    if (this.y > h + 100) this.y = -100;
    if (this.y < -100) this.y = h + 100;

    // Smooth UI locking animation when hovered
    if (isHovered) {
      this.lockProgress += 0.08;
      if (this.lockProgress > 1) this.lockProgress = 1;
    } else {
      this.lockProgress -= 0.05;
      if (this.lockProgress < 0) this.lockProgress = 0;
    }
  }
}

export default function MinimalTracker() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const entities = useRef<TrackableEntity[]>([]);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const N = window.innerWidth > 768 ? 20 : 10;
      const arr = [];
      for (let i = 0; i < N; i++) {
        arr.push(new TrackableEntity(canvas.width, canvas.height));
      }
      entities.current = arr;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // 3D Rotation Math
    const rotate3D = (v: number[], rx: number, ry: number, rz: number) => {
      const x = v[0], y = v[1], z = v[2];
      const x1 = x * Math.cos(rz) - y * Math.sin(rz);
      const y1 = x * Math.sin(rz) + y * Math.cos(rz);
      const x2 = x1 * Math.cos(ry) + z * Math.sin(ry);
      const z2 = -x1 * Math.sin(ry) + z * Math.cos(ry);
      const y3 = y1 * Math.cos(rx) - z2 * Math.sin(rx);
      const z3 = y1 * Math.sin(rx) + z2 * Math.cos(rx);
      return { x: x2, y: y3, z: z3 };
    };

    const drawBracket = (x: number, y: number, size: number, dirX: number, dirY: number) => {
      ctx.beginPath();
      ctx.moveTo(x + size * dirX, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + size * dirY);
      ctx.stroke();
    };

    const FOV = 1000;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      // Deep, pure minimal slate background
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);

      // Draw active scanner mouse reticle
      if (mouse.current.active) {
        ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 25, 0, Math.PI * 2);
        ctx.moveTo(mouse.current.x - 35, mouse.current.y); ctx.lineTo(mouse.current.x + 35, mouse.current.y);
        ctx.moveTo(mouse.current.x, mouse.current.y - 35); ctx.lineTo(mouse.current.x, mouse.current.y + 35);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "screen";

      for (const ent of entities.current) {
        const geo = geometries[ent.type];
        
        // 1. Calculate 3D Projection
        const projectedVerts = geo.verts.map(v => {
          const r3d = rotate3D(v, ent.rotX, ent.rotY, ent.rotZ);
          // Scale and translate to world space
          const wx = ent.x + r3d.x * ent.scale;
          const wy = ent.y + r3d.y * ent.scale;
          const wz = ent.z + r3d.z * ent.scale;
          
          // Project to 2D
          const p = FOV / Math.max(1, FOV + wz);
          // Center projection on screen
          const px = cx + (wx - cx) * p;
          const py = cy + (wy - cy) * p;
          
          return { x: px, y: py };
        });

        // Calculate 2D Extents to perfectly track the rotating 3D shape
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        for (const p of projectedVerts) {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        }
        
        // Center of the object on screen
        const center2DX = (minX + maxX) / 2;
        const center2DY = (minY + maxY) / 2;

        // Hit Detection for AI Scanner (120px radius around mouse)
        const distToMouse = Math.hypot(center2DX - mouse.current.x, center2DY - mouse.current.y);
        const isHovered = mouse.current.active && distToMouse < 120;
        
        ent.update(W, H, isHovered);
        const lock = ent.lockProgress; // 0 to 1

        // 2. Render 3D Wireframe Object
        ctx.lineWidth = 1.5;
        // Color shifts from faint white to intense cyan when locked
        const rC = 255 - lock * (255 - 0);
        const gC = 255 - lock * (255 - 210);
        const bC = 255;
        const aC = Math.max(0.15, lock * 0.9);
        ctx.strokeStyle = `rgba(${rC}, ${gC}, ${bC}, ${aC})`;
        
        ctx.beginPath();
        for (const edge of geo.edges) {
          const p1 = projectedVerts[edge[0]];
          const p2 = projectedVerts[edge[1]];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();

        // 3. Render AI Bounding Box & UI Label (Only when Locked)
        if (lock > 0.01) {
          const pad = 15;
          const bx = minX - pad;
          const by = minY - pad;
          const bw = maxX - minX + pad * 2;
          const bh = maxY - minY + pad * 2;

          // Draw the Box Brackets
          ctx.strokeStyle = `rgba(0, 210, 255, ${lock})`;
          ctx.lineWidth = 2;
          const cornerSize = 12;
          drawBracket(bx, by, cornerSize, 1, 1);
          drawBracket(bx + bw, by, cornerSize, -1, 1);
          drawBracket(bx, by + bh, cornerSize, 1, -1);
          drawBracket(bx + bw, by + bh, cornerSize, -1, -1);
          
          // Draw faint full box
          ctx.strokeStyle = `rgba(0, 210, 255, ${lock * 0.2})`;
          ctx.strokeRect(bx, by, bw, bh);

          // Draw Premium Data Tag
          const ease = 1 - Math.pow(1 - lock, 3); // Smooth pop
          const labelY = by - 35 * ease;

          // Tether line
          ctx.strokeStyle = `rgba(0, 210, 255, ${lock * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(center2DX, by);
          ctx.lineTo(center2DX, labelY);
          ctx.stroke();

          // Label Plate
          const labelW = 180;
          const labelH = 24;
          const lx = center2DX - labelW / 2;
          const ly = labelY - labelH;

          ctx.fillStyle = `rgba(5, 8, 16, ${ease * 0.9})`;
          ctx.fillRect(lx, ly, labelW, labelH);
          ctx.strokeStyle = `rgba(0, 210, 255, ${ease * 0.5})`;
          ctx.strokeRect(lx, ly, labelW, labelH);

          // Label Text
          if (ease > 0.8) {
            ctx.fillStyle = "#00d2ff";
            ctx.font = "bold 10px monospace";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(`AI_TRACKING | OBJ_${ent.id}`, center2DX, ly + labelH/2);
            ctx.textAlign = "left";
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
