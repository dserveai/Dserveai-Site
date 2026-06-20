"use client";

import React, { useEffect, useRef } from 'react';

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    
    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180
    };

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resizeCanvas);

    // Track mouse on the entire window so it works even if hovering over other elements
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to canvas bounding rect if canvas isn't full screen
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Reverse direction if hitting boundaries
        if (this.x > canvas!.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas!.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      // Adjust particle count based on screen width for performance
      const numberOfParticles = (canvas.width * canvas.height) / 12000;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2) + 0.5;
        const x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
        const directionX = (Math.random() * 1) - 0.5;
        const directionY = (Math.random() * 1) - 0.5;
        const color = 'rgba(14, 165, 233, 0.8)'; // Brighter Cyber blue

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = (dx * dx) + (dy * dy);

          // Connect particles to each other
          if (distance < (canvas.width / 8) * (canvas.height / 8)) {
            opacityValue = 1 - (distance / 20000);
            
            // If mouse is near, make connections to mouse brighter and thicker
            const mouseDx = particlesArray[a].x - mouse.x;
            const mouseDy = particlesArray[a].y - mouse.y;
            const mouseDistance = Math.sqrt((mouseDx * mouseDx) + (mouseDy * mouseDy));
            
            ctx!.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.6})`; // Brighter default lines
            ctx!.lineWidth = 1.0;

            if (mouseDistance < mouse.radius) {
              // Highlight connections near the mouse
              const highlightOpacity = 1 - (mouseDistance / mouse.radius);
              ctx!.strokeStyle = `rgba(14, 165, 233, ${highlightOpacity * 1.0})`; // Bright cyan
              ctx!.lineWidth = 1.5;
            }

            ctx!.beginPath();
            ctx!.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx!.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Use additive blending for a glowing laser effect when lines overlap
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    // Start
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none' // Allows clicks to pass through to buttons
      }}
    />
  );
}
