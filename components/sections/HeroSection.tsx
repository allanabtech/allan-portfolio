"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Mail, Terminal as TermIcon, Briefcase } from "lucide-react";

const LEARNING_ITEMS = [
  "AWS Solutions Architecture",
  "Advanced DevOps Pipelines",
  "Cloud Infrastructure Automation",
];

export default function HeroSection() {
  const [learningIdx, setLearningIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLearningIdx((prev) => (prev + 1) % LEARNING_ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const subheadlineVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-24 pb-12 relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full"
      >
        
        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Status Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 bg-[#0D1017]/80 border border-glass-border px-3.5 py-1.5 rounded-full text-xs text-text font-medium select-none shadow-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
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

          {/* Headline Animation (phrase-by-phrase) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text leading-[1.1] flex flex-col gap-2">
            <motion.span variants={itemVariants} className="block">
              Building AI,
            </motion.span>
            <motion.span variants={itemVariants} className="block text-[#C9D1D9]">
              Cloud &
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="block bg-gradient-to-r from-accent to-[#38BDF8] bg-clip-text text-transparent accent-glow-text"
            >
              DevOps Solutions.
            </motion.span>
          </h1>

          {/* Subheadline (fades in after) */}
          <motion.p
            variants={subheadlineVariants}
            className="text-base md:text-lg text-muted max-w-xl leading-relaxed"
          >
            I enjoy turning ideas into reliable systems through automation, cloud technologies, artificial intelligence, and hands-on engineering.
          </motion.p>

          {/* CTA Buttons (appear last) */}
          <motion.div
            variants={ctaVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="bg-accent hover:bg-accent-hover text-[#0D1017] font-semibold text-sm px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-accent/20 hover:scale-[1.02] active:scale-95 group"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="bg-[#0D1017] border border-glass-border hover:border-accent/30 text-text font-semibold text-sm px-6 py-3 rounded-lg flex items-center gap-2 transition-all hover:bg-[#1f2630] active:scale-95"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>Contact Me</span>
            </a>
          </motion.div>
        </div>

        {/* Profile Image Placeholder */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80 select-none">
            {/* Animated Glow Rings */}
            <div className="absolute inset-0 rounded-full border border-accent/10 animate-pulse-slow scale-110 accent-glow" />
            <div className="absolute inset-4 rounded-full border border-dashed border-accent/15 animate-[spin_50s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-accent/20 animate-[spin_30s_linear_infinite_reverse]" />

            {/* Inner Profile Box */}
            <div className="absolute inset-12 bg-gradient-to-tr from-[#0D1017] to-[#1f2630] border border-glass-border rounded-full overflow-hidden shadow-2xl flex items-center justify-center p-3">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-accent/60 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Network nodes */}
                <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.3" />
                <circle cx="150" cy="40" r="3.5" fill="currentColor" opacity="0.4" />
                <circle cx="40" cy="140" r="2.5" fill="currentColor" opacity="0.2" />
                <circle cx="160" cy="150" r="3" fill="currentColor" opacity="0.35" />
                <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                <line x1="150" y1="40" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                <line x1="40" y1="140" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                <line x1="160" y1="150" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />

                {/* Animated Orb core */}
                <circle cx="100" cy="100" r="40" fill="url(#orb-grad)" className="animate-pulse" />
                <circle cx="100" cy="100" r="22" fill="#0D1017" />
                
                {/* Code symbol bracket overlays */}
                <path d="M 85 90 L 75 100 L 85 110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 115 90 L 125 100 L 115 110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="104" y1="88" x2="96" y2="112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="orb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#0D1017" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Tech badges floating */}
            <div className="absolute top-8 left-8 bg-[#0D1017]/90 border border-glass-border p-2 rounded-lg shadow-md animate-float z-20">
              <TermIcon className="w-4 h-4 text-accent" />
            </div>
            <div className="absolute bottom-6 right-6 bg-[#0D1017]/90 border border-glass-border p-2 rounded-lg shadow-md animate-float z-20" style={{ animationDelay: "1.5s" }}>
              <Briefcase className="w-4 h-4 text-[#FFBD2E]" />
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
