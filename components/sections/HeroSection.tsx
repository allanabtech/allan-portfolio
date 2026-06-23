"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Mail, Terminal as TermIcon, Briefcase, Zap, Code2, Cpu } from "lucide-react";

const LEARNING_ITEMS = [
  "AWS Solutions Architecture",
  "Advanced DevOps Pipelines",
  "Cloud Infrastructure Automation",
];

// Floating particles config
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 1.5 + Math.random() * 2.5,
  delay: Math.random() * 12,
  duration: 8 + Math.random() * 14,
  color: i % 3 === 0 ? "#00F0FF" : i % 3 === 1 ? "#38BDF8" : "#A78BFA",
}));

// Code rain columns
const RAIN_COLS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 3 + (i / 13) * 94,
  chars: ["0", "1", "{", "}", "<", ">", "/", "λ", "π", "∑", "fn", "if"],
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 10,
  opacity: 0.04 + Math.random() * 0.08,
}));

// Floating tech badges
const TECH_BADGES = [
  { icon: <TermIcon className="w-3.5 h-3.5" />, label: "bash", color: "#27C93F", x: "8%", y: "18%", delay: 0 },
  { icon: <Cpu className="w-3.5 h-3.5" />, label: "C++", color: "#00F0FF", x: "82%", y: "12%", delay: 1.2 },
  { icon: <Code2 className="w-3.5 h-3.5" />, label: "Python", color: "#FFBD2E", x: "88%", y: "72%", delay: 2.4 },
  { icon: <Zap className="w-3.5 h-3.5" />, label: "AWS", color: "#FF9E64", x: "6%", y: "75%", delay: 0.8 },
];

export default function HeroSection() {
  const [learningIdx, setLearningIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setLearningIdx((prev) => (prev + 1) % LEARNING_ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div
      ref={heroRef}
      className="min-h-screen w-full flex items-center justify-center pt-24 pb-12 relative overflow-hidden"
    >
      {/* ─── BACKGROUND LAYER ─── */}

      {/* Subtle dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none -z-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,240,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          animation: "scroll-grid 25s linear infinite",
        }}
      />

      {/* Aurora blobs — large soft color masses */}
      <div
        className="absolute pointer-events-none -z-10 rounded-full blur-[120px]"
        style={{
          width: "55vw",
          height: "55vw",
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(0,240,255,0.09) 0%, rgba(56,189,248,0.06) 50%, transparent 70%)",
          animation: "aurora-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none -z-10 rounded-full blur-[140px]"
        style={{
          width: "45vw",
          height: "45vw",
          bottom: "-5%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.10) 0%, rgba(56,189,248,0.05) 50%, transparent 70%)",
          animation: "aurora-drift 28s ease-in-out infinite reverse",
          animationDelay: "-10s",
        }}
      />
      <div
        className="absolute pointer-events-none -z-10 rounded-full blur-[100px]"
        style={{
          width: "30vw",
          height: "30vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 65%)",
          animation: "hero-glow-breathe 10s ease-in-out infinite",
        }}
      />

      {/* Horizontal scan beam */}
      {mounted && (
        <div
          className="absolute pointer-events-none -z-10 h-px w-full"
          style={{
            top: "38%",
            background:
              "linear-gradient(to right, transparent, rgba(0,240,255,0.25) 30%, rgba(56,189,248,0.5) 50%, rgba(0,240,255,0.25) 70%, transparent)",
            animation: "hero-beam-scan 9s cubic-bezier(0.4,0,0.6,1) infinite",
            animationDelay: "2s",
          }}
        />
      )}
      {mounted && (
        <div
          className="absolute pointer-events-none -z-10 h-px w-full"
          style={{
            top: "62%",
            background:
              "linear-gradient(to right, transparent, rgba(167,139,250,0.2) 35%, rgba(167,139,250,0.4) 50%, rgba(167,139,250,0.2) 65%, transparent)",
            animation: "hero-beam-scan 13s cubic-bezier(0.4,0,0.6,1) infinite reverse",
            animationDelay: "5s",
          }}
        />
      )}

      {/* Floating particles */}
      {mounted &&
        PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none rounded-full -z-10"
            style={{
              left: `${p.x}%`,
              bottom: "0%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `hero-particle-float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

      {/* Code rain columns */}
      {mounted &&
        RAIN_COLS.map((col) => (
          <div
            key={col.id}
            className="absolute pointer-events-none -z-10 flex flex-col gap-3 font-mono text-[9px] select-none"
            style={{
              left: `${col.x}%`,
              top: 0,
              color: "#00F0FF",
              opacity: col.opacity,
              animation: `data-rain-drop ${col.duration}s linear infinite`,
              animationDelay: `${col.delay}s`,
            }}
          >
            {col.chars.map((c, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>
                {c}
              </span>
            ))}
          </div>
        ))}

      {/* ─── MAIN CONTENT ─── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full"
      >
        {/* ── Text Content ── */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">

          {/* Status Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 bg-[#0D1017]/80 backdrop-blur-sm border border-[rgba(0,240,255,0.15)] px-4 py-2 rounded-full text-xs text-text font-medium select-none"
            style={{
              boxShadow: "0 0 18px rgba(0,240,255,0.06), inset 0 1px 0 rgba(0,240,255,0.08)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-muted">Currently Learning:</span>
              <span className="h-5 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={learningIdx}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-accent font-semibold whitespace-nowrap block"
                  >
                    {LEARNING_ITEMS[learningIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] flex flex-col gap-2">
            <motion.span variants={itemVariants} className="block text-[#C9D1D9]">
              From bare metal
            </motion.span>
            <motion.span variants={itemVariants} className="block text-[#C9D1D9]">
              to cloud at scale —
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="block animate-text-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #00F0FF 0%, #38BDF8 25%, #A78BFA 50%, #00F0FF 75%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                textShadow: "none",
                filter: "drop-shadow(0 0 20px rgba(0,240,255,0.35))",
              }}
            >
              I build it all.
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted max-w-xl leading-relaxed"
          >
            Started by taking electronics apart just to see how they worked.
            Now I design the systems others build on —{" "}
            <span className="text-text font-medium">embedded hardware, cloud infrastructure, AI pipelines</span>.
            I work across the whole stack, and I actually enjoy it.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden bg-accent hover:bg-accent-hover text-[#0D1017] font-bold text-sm px-7 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.55)] hover:scale-[1.03] active:scale-95"
            >
              {/* Shimmer overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative">View Projects</span>
              <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="relative bg-[#0D1017]/80 backdrop-blur-sm border border-[rgba(0,240,255,0.15)] hover:border-[rgba(0,240,255,0.4)] text-text font-semibold text-sm px-7 py-3.5 rounded-xl flex items-center gap-2 transition-all hover:bg-[#0D1017] hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] active:scale-95"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Domain breadth strip */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2 pt-1"
          >
            <span className="text-[10px] text-muted uppercase tracking-widest font-mono mr-1 select-none">domains →</span>
            {[
              { label: "Embedded & Hardware", color: "#27C93F" },
              { label: "Cloud & DevOps",      color: "#00F0FF" },
              { label: "ML & AI",             color: "#A78BFA" },
              { label: "Full-Stack",          color: "#FFBD2E" },
            ].map((d) => (
              <span
                key={d.label}
                className="text-[10px] font-semibold font-mono px-2.5 py-1 rounded-md border select-none"
                style={{
                  color: d.color,
                  borderColor: `${d.color}30`,
                  background: `${d.color}0D`,
                  boxShadow: `0 0 8px ${d.color}15`,
                }}
              >
                {d.label}
              </span>
            ))}
          </motion.div>

        </div>

        {/* ── Visual Orb / Centerpiece ── */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96 select-none">

            {/* Floating tech badges around the orb */}
            {TECH_BADGES.map((badge, i) => (
              <motion.div
                key={i}
                className="absolute z-30 flex items-center gap-1.5 backdrop-blur-sm border px-2.5 py-1.5 rounded-lg text-[10px] font-bold shadow-lg"
                style={{
                  left: badge.x,
                  top: badge.y,
                  borderColor: `${badge.color}30`,
                  background: `${badge.color}0D`,
                  color: badge.color,
                  boxShadow: `0 0 14px ${badge.color}20, inset 0 1px 0 ${badge.color}15`,
                  animation: `float ${4 + i * 0.7}s ease-in-out infinite`,
                  animationDelay: `${badge.delay}s`,
                }}
              >
                <span style={{ color: badge.color }}>{badge.icon}</span>
                {badge.label}
              </motion.div>
            ))}

            {/* Outermost slow rotating dashed ring */}
            <div
              className="absolute inset-0 rounded-full border border-dashed"
              style={{
                borderColor: "rgba(0,240,255,0.1)",
                animation: "orbit-ring 60s linear infinite",
              }}
            />

            {/* Middle ring with dots */}
            <div
              className="absolute inset-6 rounded-full border"
              style={{
                borderColor: "rgba(0,240,255,0.12)",
                animation: "counter-orbit-ring 35s linear infinite",
              }}
            >
              {/* Orbiting dot on middle ring */}
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: "-4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#00F0FF",
                  boxShadow: "0 0 8px #00F0FF, 0 0 18px rgba(0,240,255,0.6)",
                }}
              />
            </div>

            {/* Inner ring */}
            <div
              className="absolute inset-12 rounded-full border border-dashed"
              style={{
                borderColor: "rgba(167,139,250,0.18)",
                animation: "orbit-ring 20s linear infinite",
              }}
            >
              {/* Orbiting dot on inner ring */}
              <div
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  bottom: "-3px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#A78BFA",
                  boxShadow: "0 0 6px #A78BFA, 0 0 14px rgba(167,139,250,0.6)",
                }}
              />
            </div>

            {/* Glow aura behind orb */}
            <div
              className="absolute inset-16 rounded-full blur-2xl"
              style={{
                background: "radial-gradient(circle, rgba(0,240,255,0.2) 0%, rgba(56,189,248,0.1) 50%, transparent 70%)",
                animation: "hero-glow-breathe 5s ease-in-out infinite",
              }}
            />

            {/* Core orb with network SVG */}
            <div className="absolute inset-16 bg-gradient-to-tr from-[#0D1017] via-[#111827] to-[#0D1017] border border-[rgba(0,240,255,0.15)] rounded-full overflow-hidden shadow-2xl flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="hero-orb-grad" cx="50%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0D1017" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="hero-core-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0D1017" />
                    <stop offset="100%" stopColor="#111827" />
                  </radialGradient>
                  <filter id="hero-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Network connection lines */}
                <line x1="100" y1="100" x2="40" y2="55" stroke="#00F0FF" strokeWidth="0.6" strokeDasharray="40" opacity="0.3"
                  style={{ animation: "line-flow 4s linear infinite" }} />
                <line x1="100" y1="100" x2="160" y2="45" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="40" opacity="0.3"
                  style={{ animation: "line-flow 4s linear infinite", animationDelay: "1s" }} />
                <line x1="100" y1="100" x2="35" y2="145" stroke="#A78BFA" strokeWidth="0.6" strokeDasharray="40" opacity="0.3"
                  style={{ animation: "line-flow 4s linear infinite", animationDelay: "2s" }} />
                <line x1="100" y1="100" x2="165" y2="150" stroke="#00F0FF" strokeWidth="0.6" strokeDasharray="40" opacity="0.3"
                  style={{ animation: "line-flow 4s linear infinite", animationDelay: "3s" }} />
                <line x1="100" y1="100" x2="100" y2="30" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="40" opacity="0.25"
                  style={{ animation: "line-flow 4s linear infinite", animationDelay: "0.5s" }} />
                <line x1="100" y1="100" x2="100" y2="170" stroke="#A78BFA" strokeWidth="0.6" strokeDasharray="40" opacity="0.25"
                  style={{ animation: "line-flow 4s linear infinite", animationDelay: "2.5s" }} />

                {/* Network nodes */}
                {[
                  { cx: 40, cy: 55, r: 3.5, color: "#00F0FF", delay: "0s" },
                  { cx: 160, cy: 45, r: 3, color: "#38BDF8", delay: "1s" },
                  { cx: 35, cy: 145, r: 3, color: "#A78BFA", delay: "2s" },
                  { cx: 165, cy: 150, r: 3.5, color: "#00F0FF", delay: "3s" },
                  { cx: 100, cy: 30, r: 2.5, color: "#38BDF8", delay: "0.5s" },
                  { cx: 100, cy: 170, r: 2.5, color: "#A78BFA", delay: "2.5s" },
                ].map((node, i) => (
                  <circle
                    key={i}
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill={node.color}
                    style={{
                      animation: `node-blink 3s ease-in-out infinite`,
                      animationDelay: node.delay,
                      filter: `drop-shadow(0 0 4px ${node.color})`,
                    }}
                  />
                ))}

                {/* Main orb glow */}
                <circle cx="100" cy="100" r="42" fill="url(#hero-orb-grad)" className="animate-pulse" style={{ animationDuration: "3s" }} />

                {/* Core dark circle */}
                <circle cx="100" cy="100" r="26" fill="url(#hero-core-grad)" />

                {/* Code brackets inside */}
                <path d="M 87 88 L 76 100 L 87 112" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 4px #00F0FF)" }} />
                <path d="M 113 88 L 124 100 L 113 112" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 4px #00F0FF)" }} />
                <line x1="105" y1="86" x2="95" y2="114" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 3px #38BDF8)" }} />
              </svg>
            </div>

            {/* Corner floating icon badges */}
            <div
              className="absolute top-6 left-6 bg-[#0D1017]/90 backdrop-blur-sm border border-[rgba(39,201,63,0.25)] p-2.5 rounded-xl shadow-lg z-20"
              style={{
                animation: "float 4s ease-in-out infinite",
                boxShadow: "0 0 12px rgba(39,201,63,0.2), inset 0 1px 0 rgba(39,201,63,0.1)",
              }}
            >
              <TermIcon className="w-4 h-4 text-[#27C93F]" />
            </div>
            <div
              className="absolute bottom-6 right-6 bg-[#0D1017]/90 backdrop-blur-sm border border-[rgba(255,189,46,0.25)] p-2.5 rounded-xl shadow-lg z-20"
              style={{
                animation: "float 5.5s ease-in-out infinite",
                animationDelay: "1.5s",
                boxShadow: "0 0 12px rgba(255,189,46,0.2), inset 0 1px 0 rgba(255,189,46,0.1)",
              }}
            >
              <Briefcase className="w-4 h-4 text-[#FFBD2E]" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none -z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #0D1017)",
        }}
      />
    </div>
  );
}
