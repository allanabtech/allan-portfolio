"use client";

import React from "react";
import { Cpu, Terminal, Shield, Wrench } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      {/* Background compiler code rain */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] overflow-hidden pointer-events-none font-mono text-[9px] text-accent select-none">
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

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text">01. About Me</h2>
          <div className="h-[1px] flex-1 bg-glass-border" />
        </div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          
          {/* Story Text (7 columns) */}
          <div className="lg:col-span-7 space-y-5 text-sm md:text-base text-muted leading-relaxed">
            <motion.p variants={itemVariants}>
              Hi, I'm Allan.
            </motion.p>
            <motion.p variants={itemVariants}>
              Most of my interest in technology comes from a simple question that has followed me for years: <span className="text-text font-medium">"How does this actually work?"</span>
            </motion.p>
            <motion.p variants={itemVariants}>
              That question has led me down many rabbit holes—building projects, automating repetitive tasks, troubleshooting networks, and <span className="text-[#FF5F56] font-medium">occasionally spending three hours fixing a problem that could have been solved by restarting the device</span>. <span className="italic text-xs block mt-1 text-muted-foreground">(The restart was eventually attempted.)</span>
            </motion.p>
            <motion.p variants={itemVariants}>
              My curiosity started long before I wrote my first line of code. Growing up, I had a habit of opening toys, gadgets, and electronics just to see what was inside. Over time, that evolved into hardware and software modifications, repairing devices, and experimenting with ideas that probably sounded questionable at first—like <span className="text-accent font-medium">upgrading a GPU with twice its original VRAM</span> simply because I wanted to know if it could be done.
            </motion.p>
            <motion.p variants={itemVariants}>
              I enjoy working on problems that force me to <span className="text-text font-medium">understand what's happening beneath the surface</span> instead of treating technology as a black box. Whether it's tracking down a stubborn bug, building a project from scratch, or figuring out why something works the way it does, I like taking things apart and putting them back together with a better understanding than before.
            </motion.p>
            <motion.p variants={itemVariants}>
              When I'm not working on projects, you'll probably find me exploring new technologies, comparing hardware I probably don't need, optimizing setups that were already working fine, or <span className="text-[#FFBD2E] font-medium">convincing myself that this next side project will definitely be finished</span>.
            </motion.p>
            <motion.p variants={itemVariants}>
              If you've got a challenging problem, there's a good chance <span className="text-accent font-medium">I'll be curious enough to take it apart</span> just to see how it works.
            </motion.p>
          </div>

          {/* Principle Dashboard (5 columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            
            <motion.div
              variants={cardVariants}
              className="glass-panel hover:border-accent/40 hover:bg-[#161B22]/80 transition-all p-4 rounded-xl border-glass-border shadow-md hover:shadow-accent/5 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                  <Cpu className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text">Artificial Intelligence</h4>
                  <p className="text-xs text-muted mt-0.5 font-mono">Telemetry-guided modeling & patterns.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="glass-panel hover:border-[#27C93F]/40 hover:bg-[#161B22]/80 transition-all p-4 rounded-xl border-glass-border shadow-md hover:shadow-[#27C93F]/5 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#27C93F]/10 border border-[#27C93F]/20">
                  <Terminal className="w-5 h-5 text-[#27C93F]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text">Cloud & DevOps</h4>
                  <p className="text-xs text-muted mt-0.5 font-mono">Automated builds & network pipelines.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="glass-panel hover:border-[#FFBD2E]/40 hover:bg-[#161B22]/80 transition-all p-4 rounded-xl border-glass-border shadow-md hover:shadow-[#FFBD2E]/5 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#FFBD2E]/10 border border-[#FFBD2E]/20">
                  <Wrench className="w-5 h-5 text-[#FFBD2E]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text">Robotics & Systems</h4>
                  <p className="text-xs text-muted mt-0.5 font-mono">I2C, SPI and real-time microcontroller nodes.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="glass-panel hover:border-[#FF5F56]/40 hover:bg-[#161B22]/80 transition-all p-4 rounded-xl border-glass-border shadow-md hover:shadow-[#FF5F56]/5 hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#FF5F56]/10 border border-[#FF5F56]/20">
                  <Shield className="w-5 h-5 text-[#FF5F56]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text">Problem Solving First</h4>
                  <p className="text-xs text-muted mt-0.5 font-mono">Eschewing bloat for minimal active logic.</p>
                </div>
              </div>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </div>
  );
}
