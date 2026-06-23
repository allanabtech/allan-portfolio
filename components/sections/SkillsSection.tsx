"use client";

import React from "react";
import { Brain, Cloud, Terminal, Code, Award, Cpu } from "lucide-react";
import { motion, Variants } from "framer-motion";
import SpotlightCard from "../SpotlightCard";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
  glowColor: string;
  delay: number;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: <Brain className="w-5 h-5 text-[#A855F7]" />,
    skills: ["Machine Learning", "Deep Learning", "Data Analysis", "OpenCV"],
    color: "rgba(168, 85, 247, 0.18)",
    glowColor: "rgba(168, 85, 247, 0.45)",
    delay: 0,
  },
  {
    title: "Cloud Technologies",
    icon: <Cloud className="w-5 h-5 text-[#27C93F]" />,
    skills: ["AWS Solutions", "Cloud Infrastructure & Architecture", "FinOps & Cost Optimization", "S3 & EC2"],
    color: "rgba(39, 201, 63, 0.18)",
    glowColor: "rgba(39, 201, 63, 0.45)",
    delay: 0.4,
  },
  {
    title: "DevOps & Automation",
    icon: <Terminal className="w-5 h-5 text-[#FFBD2E]" />,
    skills: ["Docker Containers", "CI/CD Pipelines", "Linux Shell", "Automation Scripts"],
    color: "rgba(255, 189, 46, 0.18)",
    glowColor: "rgba(255, 189, 46, 0.45)",
    delay: 0.8,
  },
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5 text-[#00E676]" />,
    skills: ["Python", "Java", "C/C++", "JavaScript", "HTML & CSS"],
    color: "rgba(0, 230, 118, 0.18)",
    glowColor: "rgba(0, 230, 118, 0.45)",
    delay: 1.2,
  },
  {
    title: "Professional Skills",
    icon: <Award className="w-5 h-5 text-[#FF5F56]" />,
    skills: ["Technical Leadership", "Team Collaboration", "Analytical Problem Solving", "Systems Design"],
    color: "rgba(255, 95, 86, 0.18)",
    glowColor: "rgba(255, 95, 86, 0.45)",
    delay: 1.6,
  },
  {
    title: "Embedded & Robotics",
    icon: <Cpu className="w-5 h-5 text-[#38BDF8]" />,
    skills: ["Arduino & STM32", "Sensor Integration", "I2C / SPI / UART", "Real-time Control Systems"],
    color: "rgba(56, 189, 248, 0.18)",
    glowColor: "rgba(56, 189, 248, 0.45)",
    delay: 2.0,
  },
];

// Infinite scrolling ticker tags
const TICKER_TAGS = [
  "Python", "C++", "AWS", "Docker", "PyTorch", "OpenCV", "STM32", "Arduino",
  "FastAPI", "React", "Linux", "Git", "CI/CD", "MQTT", "UART", "I2C", "SPI",
  "Kubernetes", "Nginx", "PostgreSQL", "Machine Learning", "Deep Learning",
];

export default function SkillsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { type: "tween", duration: 0.25, ease: "easeOut" } },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">

      {/* ── Background aurora ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", animation: "aurora-drift 18s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(39,201,63,0.05) 0%, transparent 70%)", animation: "aurora-drift 22s ease-in-out infinite reverse" }} />
      </div>

      {/* ── Scanning horizontal beam ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute w-full h-px"
          style={{
            top: "35%",
            background: "linear-gradient(to right, transparent, rgba(168,85,247,0.2) 40%, rgba(168,85,247,0.4) 50%, rgba(168,85,247,0.2) 60%, transparent)",
            animation: "hero-beam-scan 12s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Telemetry Subtitle Bar */}
        <div className="flex items-center gap-6 mb-10 text-[10px] text-muted font-mono select-none">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
            NODES ACTIVATED: {SKILL_CATEGORIES.length}
          </span>
          <span>•</span>
          <span>COMPILER: CLANG/GCC</span>
          <span>•</span>
          <span>STATE: IN-MEMORY STACK</span>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <SpotlightCard
                className="p-6 rounded-xl flex flex-col justify-between h-full relative overflow-hidden"
                glowColor={cat.glowColor}
                style={{
                  boxShadow: `0 8px 30px -10px ${cat.color}`,
                  animation: `card-breathe 6s ease-in-out infinite`,
                  animationDelay: `${cat.delay}s`,
                  ["--card-glow" as string]: cat.color,
                }}
              >
                {/* Diagonal shimmer sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <div
                    className="absolute top-0 left-0 w-1/4 h-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${cat.glowColor.replace(/[.\d]+\)$/, "0.08)")}, transparent)`,
                      animation: `shimmer-sweep ${8 + idx * 1.2}s ease-in-out infinite`,
                      animationDelay: `${cat.delay}s`,
                    }}
                  />
                </div>

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="p-2.5 rounded-lg border"
                      style={{
                        background: cat.color.replace(/[\d.]+\)$/, "0.15)"),
                        borderColor: cat.glowColor.replace(/[\d.]+\)$/, "0.3)"),
                        animation: "hero-glow-breathe 4s ease-in-out infinite",
                        animationDelay: `${cat.delay}s`,
                      }}
                    >
                      {cat.icon}
                    </div>
                    <h3 className="text-base font-semibold text-text">{cat.title}</h3>
                  </div>

                  {/* Skills List */}
                  <motion.ul variants={listVariants} className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.li
                        key={sIdx}
                        variants={itemVariants}
                        className="flex items-center gap-2 text-xs md:text-sm text-muted font-mono"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{
                            background: cat.glowColor.replace(/[\d.]+\)$/, "0.9)"),
                            animation: `skill-dot-blink 3s ease-in-out infinite`,
                            animationDelay: `${sIdx * 0.5 + cat.delay}s`,
                          }}
                        />
                        <span>{skill}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Ticker Strip */}
        <div className="relative overflow-hidden border border-glass-border/30 rounded-xl py-3 bg-[#0D1017]/50"
          style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <div className="flex gap-6 animate-ticker whitespace-nowrap">
            {[...TICKER_TAGS, ...TICKER_TAGS].map((tag, i) => (
              <span key={i} className="text-[10px] font-mono text-muted/60 uppercase tracking-widest select-none flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent/40 inline-block" />
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
