"use client";

import React from "react";
import { Cpu, Terminal, Shield, Wrench } from "lucide-react";
import { motion, Variants } from "framer-motion";
import SpotlightCard from "../SpotlightCard";

const PRINCIPLE_CARDS = [
  {
    icon: <Cpu className="w-5 h-5 text-[#00F0FF]" />,
    color: "#00F0FF",
    title: "Artificial Intelligence",
    desc: "Telemetry-guided modeling & patterns.",
    delay: 0,
  },
  {
    icon: <Terminal className="w-5 h-5 text-[#27C93F]" />,
    color: "#27C93F",
    title: "Cloud & DevOps",
    desc: "Automated builds & network pipelines.",
    delay: 0.8,
  },
  {
    icon: <Wrench className="w-5 h-5 text-[#FFBD2E]" />,
    color: "#FFBD2E",
    title: "Robotics & Systems",
    desc: "I2C, SPI and real-time microcontroller nodes.",
    delay: 1.6,
  },
  {
    icon: <Shield className="w-5 h-5 text-[#FF5F56]" />,
    color: "#FF5F56",
    title: "Problem Solving First",
    desc: "Eschewing bloat for minimal active logic.",
    delay: 2.4,
  },
];

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "tween", duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">

      {/* ── Background: animated circuit SVG ── */}
      <div className="absolute inset-0 -z-10 opacity-[0.04] overflow-hidden pointer-events-none">
        <svg className="w-full h-full text-accent" fill="none" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
          {/* Horizontal traces */}
          <path d="M 0 150 L 200 150 L 250 200 L 500 200" stroke="currentColor" strokeWidth="1.5" strokeDasharray="200" style={{ animation: "circuit-flow 6s linear infinite" }} />
          <path d="M 1200 100 L 950 100 L 900 150 L 700 150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="200" style={{ animation: "circuit-flow 6s linear infinite", animationDelay: "2s" }} />
          <path d="M 0 400 L 300 400 L 350 450 L 700 450" stroke="currentColor" strokeWidth="1.5" strokeDasharray="200" style={{ animation: "circuit-flow 8s linear infinite", animationDelay: "1s" }} />
          <path d="M 1200 500 L 900 500 L 850 450 L 750 450" stroke="currentColor" strokeWidth="1.5" strokeDasharray="200" style={{ animation: "circuit-flow 7s linear infinite", animationDelay: "3s" }} />
          {/* Junction nodes */}
          <circle cx="250" cy="200" r="4" fill="currentColor" style={{ animation: "skill-dot-blink 2s ease-in-out infinite" }} />
          <circle cx="900" cy="150" r="4" fill="currentColor" style={{ animation: "skill-dot-blink 2s ease-in-out infinite", animationDelay: "1s" }} />
          <circle cx="350" cy="450" r="4" fill="currentColor" style={{ animation: "skill-dot-blink 2s ease-in-out infinite", animationDelay: "2s" }} />
          <circle cx="850" cy="450" r="4" fill="currentColor" style={{ animation: "skill-dot-blink 2s ease-in-out infinite", animationDelay: "3s" }} />
        </svg>
      </div>

      {/* ── Background: drifting code rain ── */}
      <div className="absolute inset-0 -z-10 opacity-[0.025] overflow-hidden pointer-events-none font-mono text-[9px] text-accent select-none">
        <div className="absolute left-10 top-0 w-44 h-[200%] animate-drift-down leading-relaxed whitespace-pre">
          {`# systems-config.sh\nexport HOST="allan.dev"\n\ninit_pipeline() {\n  echo "Starting CI/CD..."\n  docker build -t app .\n  docker run -p 80:80 app\n}\n\ncheck_ram() {\n  free -m\n}`}
        </div>
        <div className="absolute right-12 top-0 w-44 h-[200%] animate-drift-down leading-relaxed whitespace-pre" style={{ animationDelay: "5s", animationDuration: "35s" }}>
          {`import torch\nimport cv2\n\nclass AnomalyDetector:\n  def __init__(self):\n    self.model = load_model()\n\n  def predict(self, frame):\n    img = cv2.resize(frame, (224, 224))\n    return self.model(img)`}
        </div>
        <div className="absolute left-1/3 top-0 w-44 h-[200%] animate-drift-down leading-relaxed whitespace-pre" style={{ animationDelay: "12s", animationDuration: "30s" }}>
          {`#include <Arduino.h>\n#define PIN_TRIG 9\n#define PIN_ECHO 10\n\nlong readDistance() {\n  digitalWrite(PIN_TRIG, LOW);\n  delayMicroseconds(2);\n  digitalWrite(PIN_TRIG, HIGH);\n  delayMicroseconds(10);\n}`}
        </div>
      </div>

      {/* ── Ambient aurora blobs ── */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)",
          animation: "aurora-drift 20s ease-in-out infinite",
          willChange: "transform",
          transform: "translateZ(0)",
        }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[90px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
          animation: "aurora-drift 25s ease-in-out infinite reverse",
          willChange: "transform",
          transform: "translateZ(0)",
        }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-5 text-sm md:text-base text-muted leading-relaxed">
            <motion.p variants={itemVariants}>Hi, I'm Allan.</motion.p>
            <motion.p variants={itemVariants}>
              Most of my interest in technology comes from a simple question that has followed me for years:{" "}
              <span className="text-text font-medium">"How does this actually work?"</span>
            </motion.p>
            <motion.p variants={itemVariants}>
              That question has led me down many rabbit holes—building projects, automating repetitive tasks, troubleshooting networks, and{" "}
              <span className="text-[#FF5F56] font-medium">occasionally spending three hours fixing a problem that could have been solved by restarting the device</span>.{" "}
              <span className="italic text-xs block mt-1 text-muted-foreground">(The restart was eventually attempted.)</span>
            </motion.p>
            <motion.p variants={itemVariants}>
              My curiosity started long before I wrote my first line of code. Growing up, I had a habit of opening toys, gadgets, and electronics just to see what was inside. Over time, that evolved into hardware and software modifications, repairing devices, and experimenting with ideas that probably sounded questionable at first—like{" "}
              <span className="text-accent font-medium">upgrading a GPU with twice its original VRAM</span> simply because I wanted to know if it could be done.
            </motion.p>
            <motion.p variants={itemVariants}>
              I enjoy working on problems that force me to{" "}
              <span className="text-text font-medium">understand what's happening beneath the surface</span>{" "}
              instead of treating technology as a black box. Whether it's tracking down a stubborn bug, building a project from scratch, or figuring out why something works the way it does, I like taking things apart and putting them back together with a better understanding than before.
            </motion.p>
            <motion.p variants={itemVariants}>
              When I'm not working on projects, you'll probably find me exploring new technologies, comparing hardware I probably don't need, optimizing setups that were already working fine, or{" "}
              <span className="text-[#FFBD2E] font-medium">convincing myself that this next side project will definitely be finished</span>.
            </motion.p>
            <motion.p variants={itemVariants}>
              If you've got a challenging problem, there's a good chance{" "}
              <span className="text-accent font-medium">I'll be curious enough to take it apart</span> just to see how it works.
            </motion.p>
          </div>

          {/* Principle Dashboard */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {PRINCIPLE_CARDS.map((card, i) => (
              <motion.div key={i} variants={cardVariants}>
                <SpotlightCard
                  className="p-4 rounded-xl relative overflow-hidden"
                  glowColor={`${card.color}70`}
                  style={{
                    boxShadow: `0 4px 24px -6px ${card.color}20`,
                    animation: `card-breathe 5s ease-in-out infinite`,
                    animationDelay: `${card.delay}s`,
                    ["--card-glow" as string]: `${card.color}20`,
                  }}
                >
                  {/* Shimmer sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                    style={{ opacity: 0.4 }}
                  >
                    <div
                      className="absolute top-0 left-0 w-1/3 h-full"
                      style={{
                        background: `linear-gradient(to right, transparent, ${card.color}12, transparent)`,
                        animation: `shimmer-sweep ${6 + i}s ease-in-out infinite`,
                        animationDelay: `${card.delay + 1}s`,
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-3 relative z-10">
                    <div
                      className="p-2 rounded-lg border"
                      style={{
                        background: `${card.color}15`,
                        borderColor: `${card.color}30`,
                        boxShadow: `0 0 10px ${card.color}20`,
                        animation: "hero-glow-breathe 4s ease-in-out infinite",
                        animationDelay: `${card.delay}s`,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text">{card.title}</h4>
                      <p className="text-xs text-muted mt-0.5 font-mono">{card.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
