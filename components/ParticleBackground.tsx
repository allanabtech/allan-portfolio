"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "#0D1017";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse movement tracking
    const handleMouseMove = (e: MouseEvent) => {
      const glow = glowRef.current;
      if (glow) {
        // Direct DOM manipulation for maximum 120fps performance
        glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const glow = glowRef.current;
        if (glow) {
          glow.style.transform = `translate3d(${e.touches[0].clientX}px, ${e.touches[0].clientY}px, 0)`;
        }
      }
    };

    // Hide cursor glow on hero section (first viewport height), show on all others
    const handleScroll = () => {
      const glow = glowRef.current;
      if (!glow) return;
      // Hero section occupies the first 100vh — hide glow there
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      glow.style.opacity = pastHero ? "1" : "0";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount to set initial state

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-30 bg-[#0D1017]"
      />
      {/* Absolute cursor spotlight glow overlay */}
      <div
        ref={glowRef}
        className="custom-cursor-glow fixed top-0 left-0 w-80 h-80 -mt-40 -ml-40 rounded-full pointer-events-none -z-20 bg-[radial-gradient(circle,rgba(0,240,255,0.12)_0%,rgba(0,240,255,0.01)_40%,transparent_70%)] mix-blend-screen transition-opacity duration-300 transform will-change-transform"
        style={{ transform: "translate3d(-1000px, -1000px, 0)" }}
      />
    </>
  );
}
