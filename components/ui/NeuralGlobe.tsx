"use client";
import { useEffect, useRef } from "react";

/*
  THE NEURAL KNOWLEDGE CORE (The Global Brain)
  ──────────────────────────────────────────────────────
  An entirely new visual metaphor. Zero pipelines. Zero bounding boxes.
  
  This visualizes an active AI Foundation Model and Global Data Infrastructure.
  A majestic, slow-rotating 3D sphere composed of hundreds of data nodes.
  Data pulses (bright cyan comets) continuously travel across the 
  surface of the sphere, transferring data through the neural network.
  
  Surrounded by massive gyroscopic orbital rings, this represents 
  the pinnacle of a $1B Enterprise AI aesthetic.
*/

class DataNode {
  x: number; y: number; z: number;
  connections: number[];
  constructor(x: number, y: number, z: number) {
    this.x = x; this.y = y; this.z = z;
    this.connections = [];
  }
}

class DataPulse {
  currentNode: number;
  nextNode: number;
  progress: number;
  speed: number;

  constructor(startNode: number, nodes: DataNode[]) {
    this.currentNode = startNode;
    this.progress = 0;
    this.speed = 0.008 + Math.random() * 0.015; // Slow, elegant comet speed
    
    const node = nodes[this.currentNode];
    if (node.connections.length > 0) {
      this.nextNode = node.connections[Math.floor(Math.random() * node.connections.length)];
    } else {
      this.nextNode = startNode;
    }
  }

  update(nodes: DataNode[]) {
    this.progress += this.speed;
    if (this.progress >= 1) {
      this.progress = 0;
      this.currentNode = this.nextNode;
      const node = nodes[this.currentNode];
      if (node.connections.length > 0) {
        this.nextNode = node.connections[Math.floor(Math.random() * node.connections.length)];
      }
    }
  }
}

export default function NeuralKnowledgeCore() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const nodes = useRef<DataNode[]>([]);
  const pulses = useRef<DataPulse[]>([]);
  const t = useRef(0);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let R = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Massive radius to cover the entire screen
      R = Math.max(canvas.width, canvas.height) * 0.55;
      const N = window.innerWidth > 768 ? 1000 : 400;
      const arr: DataNode[] = [];
      
      // 1. Generate Fibonacci Sphere
      const phi = Math.PI * (3 - Math.sqrt(5)); 
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2; 
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        arr.push(new DataNode(x * R, y * R, z * R));
      }

      // 2. Map Nearest Neighbor Connections (Neural Edges)
      for (let i = 0; i < N; i++) {
        const dists = [];
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const dx = arr[i].x - arr[j].x;
          const dy = arr[i].y - arr[j].y;
          const dz = arr[i].z - arr[j].z;
          dists.push({ id: j, d: dx*dx + dy*dy + dz*dz });
        }
        dists.sort((a,b) => a.d - b.d);
        
        // Connect to 3 closest neighbors to form a beautiful web
        for (let k = 0; k < 3; k++) {
          arr[i].connections.push(dists[k].id);
        }
      }
      
      nodes.current = arr;

      // 3. Initialize Data Pulses
      const numPulses = window.innerWidth > 768 ? 100 : 40;
      const pulseArr: DataPulse[] = [];
      for (let i = 0; i < numPulses; i++) {
        pulseArr.push(new DataPulse(Math.floor(Math.random() * N), arr));
      }
      pulses.current = pulseArr;
    };
    
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const FOV = 2000;

    // Fast 3D Rotation Math
    const rotate3D = (x: number, y: number, z: number, rx: number, ry: number) => {
      let x1 = x * Math.cos(ry) - z * Math.sin(ry);
      let z1 = x * Math.sin(ry) + z * Math.cos(ry);
      let y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      return { x: x1, y: y2, z: z2 };
    };

    const proj = (x: number, y: number, z: number, cx: number, cy: number) => {
      const camZ = FOV + z;
      if (camZ < 10) return null; // Safe guard against points flying behind the camera
      const p = FOV / camZ;
      return { sx: cx + x * p, sy: cy + y * p, sc: p };
    };

    let rotX = 0;
    let rotY = 0;

    const orbitalRings = [
      { tiltX: Math.PI * 0.2, tiltY: Math.PI * 0.1, radiusMult: 1.25, speed: 0.001, dash: [4, 12] },
      { tiltX: -Math.PI * 0.1, tiltY: Math.PI * 0.3, radiusMult: 1.4, speed: -0.0015, dash: [15, 20] },
      { tiltX: Math.PI * 0.4, tiltY: -Math.PI * 0.2, radiusMult: 1.55, speed: 0.0008, dash: [2, 8] }
    ];

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2; // Dead center to fill the screen
      const cy = H / 2;
      t.current += 1;

      // Extremely slow global rotation
      rotX += 0.001;
      rotY += 0.002;

      // Deep Space Slate Background
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";

      // 1. Draw Glowing Core Aura
      const coreP = proj(0, 0, 0, cx, cy);
      if (coreP) {
        const grad = ctx.createRadialGradient(coreP.sx, coreP.sy, 0, coreP.sx, coreP.sy, R * 1.5 * coreP.sc);
        grad.addColorStop(0, "rgba(0, 210, 255, 0.08)");
        grad.addColorStop(0.5, "rgba(0, 210, 255, 0.02)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(coreP.sx, coreP.sy, R * 1.5 * coreP.sc, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Gyroscopic Orbital Rings
      ctx.lineWidth = 1;
      for (const ring of orbitalRings) {
        ctx.strokeStyle = "rgba(14, 165, 233, 0.15)";
        ctx.setLineDash(ring.dash);
        ctx.beginPath();
        
        const ringPoints = 60;
        const innerSpin = t.current * ring.speed;
        let firstPoint = true;
        
        for (let j = 0; j <= ringPoints; j++) {
          const angle = (j / ringPoints) * Math.PI * 2 + innerSpin;
          const x = Math.cos(angle) * (R * ring.radiusMult);
          const y = 0;
          const z = Math.sin(angle) * (R * ring.radiusMult);
          
          const ty = y * Math.cos(ring.tiltX) - z * Math.sin(ring.tiltX);
          const tz = y * Math.sin(ring.tiltX) + z * Math.cos(ring.tiltX);
          const tx = x * Math.cos(ring.tiltY) + tz * Math.sin(ring.tiltY);
          const fz = -x * Math.sin(ring.tiltY) + tz * Math.cos(ring.tiltY);
          
          const r3d = rotate3D(tx, ty, fz, rotX, rotY);
          const p = proj(r3d.x, r3d.y, r3d.z, cx, cy);
          
          if (p) {
            if (firstPoint) {
              ctx.moveTo(p.sx, p.sy);
              firstPoint = false;
            } else {
              ctx.lineTo(p.sx, p.sy);
            }
          }
        }
        ctx.stroke();
      }
      ctx.setLineDash([]); // Reset

      // 3. Draw Neural Network Edges (The Mesh)
      ctx.strokeStyle = "rgba(14, 165, 233, 0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      const projectedNodes = nodes.current.map(n => {
        const r3d = rotate3D(n.x, n.y, n.z, rotX, rotY);
        return { p2d: proj(r3d.x, r3d.y, r3d.z, cx, cy), r3d };
      });

      for (let i = 0; i < nodes.current.length; i++) {
        const pA = projectedNodes[i];
        if (!pA.p2d) continue; // Behind camera
        if (pA.r3d.z < -R * 0.5) continue; // Hide lines very far in the back for clarity

        // Draw node dot
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, 0.3 * pA.p2d.sc)})`;
        ctx.fillRect(pA.p2d.sx - 1, pA.p2d.sy - 1, 2, 2);

        // Draw connections
        for (const conn of nodes.current[i].connections) {
          if (conn < i) continue; // Prevent double drawing lines
          const pB = projectedNodes[conn];
          if (pB.p2d) {
            ctx.moveTo(pA.p2d.sx, pA.p2d.sy);
            ctx.lineTo(pB.p2d.sx, pB.p2d.sy);
          }
        }
      }
      ctx.stroke();

      // 4. Update and Draw Data Pulses (The Comets)
      for (const pulse of pulses.current) {
        pulse.update(nodes.current);
        
        const nA = nodes.current[pulse.currentNode];
        const nB = nodes.current[pulse.nextNode];
        
        // Current position
        const px = nA.x + (nB.x - nA.x) * pulse.progress;
        const py = nA.y + (nB.y - nA.y) * pulse.progress;
        const pz = nA.z + (nB.z - nA.z) * pulse.progress;
        const rHead = rotate3D(px, py, pz, rotX, rotY);
        const pHead = proj(rHead.x, rHead.y, rHead.z, cx, cy);

        // Tail position (20% behind)
        const tailProgress = Math.max(0, pulse.progress - 0.2);
        const tx = nA.x + (nB.x - nA.x) * tailProgress;
        const ty = nA.y + (nB.y - nA.y) * tailProgress;
        const tz = nA.z + (nB.z - nA.z) * tailProgress;
        const rTail = rotate3D(tx, ty, tz, rotX, rotY);
        const pTail = proj(rTail.x, rTail.y, rTail.z, cx, cy);

        if (pHead && pTail) {
          // Draw Comet Line
          ctx.strokeStyle = "rgba(0, 210, 255, 0.9)";
          ctx.lineWidth = 2 * pHead.sc;
          ctx.beginPath();
          ctx.moveTo(pHead.sx, pHead.sy);
          ctx.lineTo(pTail.sx, pTail.sy);
          ctx.stroke();

          // Draw Comet Head Glow
          ctx.fillStyle = "#ffffff";
          const hr = 1.5 * pHead.sc;
          ctx.fillRect(pHead.sx - hr, pHead.sy - hr, hr * 2, hr * 2);
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
