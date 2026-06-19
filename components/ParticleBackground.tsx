"use client";

import React, { useEffect, useRef } from "react";

interface FluidCell {
  vx: number;
  vy: number;
}

interface FluidParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  hue: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: FluidParticle[] = [];
    
    // Grid settings
    const spacing = 80; // Size of fluid grid cells
    let gridWidth = 0;
    let gridHeight = 0;
    let grid: FluidCell[][] = [];

    // Mouse coordinates tracking
    const mouse = {
      x: -1000,
      y: -1000,
      px: -1000,
      py: -1000,
      radius: 180,
      active: false
    };

    const initGrid = () => {
      gridWidth = Math.ceil(canvas.width / spacing) + 2;
      gridHeight = Math.ceil(canvas.height / spacing) + 2;
      grid = [];

      for (let x = 0; x < gridWidth; x++) {
        grid[x] = [];
        for (let y = 0; y < gridHeight; y++) {
          grid[x][y] = { vx: 0, vy: 0 };
        }
      }
    };

    const initParticles = () => {
      particles = [];
      const particleCount = 140; // High density stardust
      
      for (let i = 0; i < particleCount; i++) {
        const baseAlpha = Math.random() * 0.35 + 0.1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5 - 0.2, // slow upward float
          size: Math.random() * 1.8 + 0.6,
          baseAlpha,
          alpha: baseAlpha,
          hue: Math.random() > 0.85 ? 215 : 205 // custom brand blues/cyans
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Paint initial background fill to avoid artifacts
      ctx.fillStyle = "#0D1117";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      initGrid();
      initParticles();
    };

    const updateFluid = () => {
      // 1. Calculate mouse velocity and inject force to grid
      let m_vx = 0;
      let m_vy = 0;
      
      if (mouse.active && mouse.px !== -1000 && mouse.py !== -1000) {
        m_vx = mouse.x - mouse.px;
        m_vy = mouse.y - mouse.py;
      }
      
      // Update mouse previous positions
      mouse.px = mouse.x;
      mouse.py = mouse.y;

      if (mouse.active) {
        const cellX = Math.floor(mouse.x / spacing);
        const cellY = Math.floor(mouse.y / spacing);

        // Inject forces to nearby cells
        for (let dx = -2; dx <= 2; dx++) {
          for (let dy = -2; dy <= 2; dy++) {
            const gx = cellX + dx;
            const gy = cellY + dy;

            if (gx >= 0 && gx < gridWidth && gy >= 0 && gy < gridHeight) {
              const dSq = dx * dx + dy * dy;
              if (dSq <= 5) {
                const weight = (1 - Math.sqrt(dSq) / 2.3);
                // Repel vector outwards from cursor
                const repelX = dx !== 0 ? (dx / Math.sqrt(dSq)) * 4.5 * weight : 0;
                const repelY = dy !== 0 ? (dy / Math.sqrt(dSq)) * 4.5 * weight : 0;

                grid[gx][gy].vx += m_vx * weight * 0.25 + repelX;
                grid[gx][gy].vy += m_vy * weight * 0.25 + repelY;
              }
            }
          }
        }
      }

      // 2. Velocity Grid relaxation and diffusion loop
      for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
          const cell = grid[x][y];
          // Friction decay
          cell.vx *= 0.94;
          cell.vy *= 0.94;
        }
      }

      // Simple fluid viscosity diffusion
      for (let x = 1; x < gridWidth - 1; x++) {
        for (let y = 1; y < gridHeight - 1; y++) {
          const avgVx = (grid[x-1][y].vx + grid[x+1][y].vx + grid[x][y-1].vx + grid[x][y+1].vx) * 0.25;
          const avgVy = (grid[x-1][y].vy + grid[x+1][y].vy + grid[x][y-1].vy + grid[x][y+1].vy) * 0.25;
          grid[x][y].vx = grid[x][y].vx * 0.85 + avgVx * 0.15;
          grid[x][y].vy = grid[x][y].vy * 0.85 + avgVy * 0.15;
        }
      }

      // 3. Update Particles
      particles.forEach((p) => {
        // Sample velocity grid cell
        const gx = Math.floor(p.x / spacing);
        const gy = Math.floor(p.y / spacing);

        if (gx >= 0 && gx < gridWidth && gy >= 0 && gy < gridHeight) {
          const cell = grid[gx][gy];
          // Transfer fluid velocity momentum
          p.vx += cell.vx * 0.09;
          p.vy += cell.vy * 0.09;
        }

        // Add soft organic drift noise (thermal noise)
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05 - 0.008; // subtle upward draft

        // Direct pressure repulsion from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < mouse.radius && d > 0) {
          const force = Math.pow(1 - d / mouse.radius, 2) * 0.85;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        // Velocity limiters & friction
        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around margins with bounce reflection velocity
        if (p.x < 0) {
          p.x = canvas.width;
          p.vx *= -0.3;
        } else if (p.x > canvas.width) {
          p.x = 0;
          p.vx *= -0.3;
        }

        if (p.y < 0) {
          p.y = canvas.height;
          p.vy *= -0.3;
        } else if (p.y > canvas.height) {
          p.y = 0;
          p.vy *= -0.3;
        }

        // Brighten up stardust when moving rapidly
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        p.alpha = Math.min(p.baseAlpha + speed * 0.09, 0.75);
      });
    };

    const render = () => {
      // Create motion blur stardust trails
      ctx.fillStyle = "rgba(13, 17, 23, 0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      updateFluid();

      // Render glowing stardust
      particles.forEach((p) => {
        ctx.fillStyle = `hsla(${p.hue}, 95%, 72%, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.px = -1000;
      mouse.py = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Add touch support for fluid phone reactions
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseLeave);

    resizeCanvas();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-[#0D1117]"
    />
  );
}
