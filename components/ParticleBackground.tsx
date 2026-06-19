"use client";

import React, { useEffect, useRef } from "react";

interface GridNode {
  x: number;      // X relative to camera center (0,0)
  y: number;      // Y relative to camera center (0,0)
  z: number;      // Z depth (0 = viewport, >0 is deeper)
  homeX: number;
  homeY: number;
  homeZ: number;
  vx: number;
  vy: number;
  vz: number;
  projX: number;  // cached 2D projected X
  projY: number;  // cached 2D projected Y
}

interface SpaceStar {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: GridNode[] = [];
    let stars: SpaceStar[] = [];
    
    // 3D & Physics settings
    const spacing = 50; // Grid dimensions spacing
    const focalLength = 320; // Virtual camera focal length
    const maxZ = 600; // Far clipping plane limit
    const stiffness = 0.018; // Spring restoration coefficient
    const damping = 0.90; // Dampens velocities (friction)
    const repulsionStrength = 14; // X/Y mouse push strength
    const zRepelStrength = 75; // Z-axis indentation caving strength (gravitational well)
    
    const mouse = { x: -1000, y: -1000, radius: 170 };
    let rows = 0;
    let cols = 0;
    let centerX = 0;
    let centerY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
      init3DSpace();
    };

    const init3DSpace = () => {
      nodes = [];
      stars = [];

      cols = Math.ceil(canvas.width / spacing) + 3;
      rows = Math.ceil(canvas.height / spacing) + 3;
      
      const startX = -((cols - 1) * spacing) / 2;
      const startY = -((rows - 1) * spacing) / 2;

      // 1. Initialize 3D Coordinate Grid
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hX = startX + c * spacing;
          const hY = startY + r * spacing;
          const hZ = 0; // Flat coordinate sheet initially
          nodes.push({
            x: hX,
            y: hY,
            z: hZ,
            homeX: hX,
            homeY: hY,
            homeZ: hZ,
            vx: 0,
            vy: 0,
            vz: 0,
            projX: 0,
            projY: 0,
          });
        }
      }

      // 2. Initialize Drifting Space Stars
      const starCount = 90;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: (Math.random() - 0.5) * canvas.width * 2.5,
          y: (Math.random() - 0.5) * canvas.height * 2.5,
          z: Math.random() * maxZ,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 1.2 + 0.4,
        });
      }
    };

    const updatePhysics = () => {
      const time = Date.now() * 0.0008; // Wave clock

      // Update 3D Grid Nodes
      nodes.forEach((n) => {
        // A. Spring restoration pulling back to home coordinate
        const springX = (n.homeX - n.x) * stiffness;
        const springY = (n.homeY - n.y) * stiffness;
        const springZ = (n.homeZ - n.z) * stiffness;

        // B. Perspective Projection calculation
        const scale = focalLength / (focalLength + n.z);
        n.projX = centerX + n.x * scale;
        n.projY = centerY + n.y * scale;

        // C. Mouse repulsion based on 2D projected distance
        let ax = 0;
        let ay = 0;
        let az = 0;

        const dxProj = n.projX - mouse.x;
        const dyProj = n.projY - mouse.y;
        const distProj = Math.sqrt(dxProj * dxProj + dyProj * dyProj);

        if (distProj < mouse.radius && distProj > 0) {
          const force = Math.pow(1 - distProj / mouse.radius, 2);
          const angle = Math.atan2(dyProj, dxProj);
          
          // Push X/Y outwards relative to camera
          ax = Math.cos(angle) * force * repulsionStrength;
          ay = Math.sin(angle) * force * repulsionStrength;
          
          // Push Z inwards (positive Z caving the mesh into screen depth)
          az = force * zRepelStrength;
        }

        // D. Organic wave breathing offset (wind ripple)
        const waveX = Math.sin(time + n.homeY * 0.01) * 0.12;
        const waveY = Math.cos(time + n.homeX * 0.01) * 0.12;

        // E. Update velocities & coordinates
        n.vx = (n.vx + springX + ax + waveX) * damping;
        n.vy = (n.vy + springY + ay + waveY) * damping;
        n.vz = (n.vz + springZ + az) * damping;

        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;
      });

      // Update Drifting Stars
      stars.forEach((s) => {
        s.z -= s.speed; // Drift Z toward camera

        // Wrap stars that pass the camera
        if (s.z <= 0) {
          s.z = maxZ;
          s.x = (Math.random() - 0.5) * canvas.width * 2.5;
          s.y = (Math.random() - 0.5) * canvas.height * 2.5;
        }

        // Slight mouse displacement on stars for fluid flow
        const scale = focalLength / (focalLength + s.z);
        const pX = centerX + s.x * scale;
        const pY = centerY + s.y * scale;
        const dx = pX - mouse.x;
        const dy = pY - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < mouse.radius && d > 0) {
          const force = (1 - d / mouse.radius) * 0.45;
          const angle = Math.atan2(dy, dx);
          s.x += Math.cos(angle) * force;
          s.y += Math.sin(angle) * force;
        }
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePhysics();

      // 1. Draw Space Stars (Twinkling particles in depth)
      stars.forEach((s) => {
        const scale = focalLength / (focalLength + s.z);
        const pX = centerX + s.x * scale;
        const pY = centerY + s.y * scale;
        const pSize = s.size * scale;
        
        const alpha = (1 - s.z / maxZ) * 0.4;
        ctx.fillStyle = `rgba(230, 237, 243, ${alpha})`;
        
        ctx.beginPath();
        ctx.arc(pX, pY, Math.max(0.5, pSize), 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Warping Grid Lines (Render connects in 3D projection)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const node = nodes[idx];
          if (!node) continue;

          // Connect to right node
          if (c < cols - 1) {
            const rightNode = nodes[idx + 1];
            if (rightNode) {
              const avgZ = (node.z + rightNode.z) / 2;
              const alpha = Math.max(0, (1 - avgZ / (maxZ * 0.5)) * 0.05);
              ctx.strokeStyle = `rgba(88, 166, 255, ${alpha})`;
              ctx.lineWidth = 0.6 * (focalLength / (focalLength + avgZ));
              ctx.beginPath();
              ctx.moveTo(node.projX, node.projY);
              ctx.lineTo(rightNode.projX, rightNode.projY);
              ctx.stroke();
            }
          }

          // Connect to bottom node
          if (r < rows - 1) {
            const bottomNode = nodes[idx + cols];
            if (bottomNode) {
              const avgZ = (node.z + bottomNode.z) / 2;
              const alpha = Math.max(0, (1 - avgZ / (maxZ * 0.5)) * 0.05);
              ctx.strokeStyle = `rgba(88, 166, 255, ${alpha})`;
              ctx.lineWidth = 0.6 * (focalLength / (focalLength + avgZ));
              ctx.beginPath();
              ctx.moveTo(node.projX, node.projY);
              ctx.lineTo(bottomNode.projX, bottomNode.projY);
              ctx.stroke();
            }
          }
        }
      }

      // 3. Draw Grid Intersection Dots
      nodes.forEach((n) => {
        const scale = focalLength / (focalLength + n.z);
        const pSize = 0.95 * scale;
        
        // Glow caved depth nodes
        if (n.z > 4) {
          const glowAlpha = Math.min(0.28 + n.z * 0.005, 0.6);
          ctx.fillStyle = `rgba(159, 203, 255, ${glowAlpha})`;
          ctx.beginPath();
          ctx.arc(n.projX, n.projY, Math.min(1.2 + n.z * 0.015, 2.2), 0, Math.PI * 2);
        } else {
          ctx.fillStyle = "rgba(88, 166, 255, 0.28)";
          ctx.beginPath();
          ctx.arc(n.projX, n.projY, Math.max(0.5, pSize), 0, Math.PI * 2);
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-[#0D1117]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
