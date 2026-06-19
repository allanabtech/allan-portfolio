"use client";

import React, { useEffect } from "react";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useAchievements } from "../AchievementContext";

export default function ContactSection() {
  const { triggerViewContact } = useAchievements();

  // Trigger achievement when contact section is loaded
  useEffect(() => {
    triggerViewContact();
  }, [triggerViewContact]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 15 },
    },
  };

  return (
    <div className="py-24 container mx-auto px-6 relative">
      
      {/* Drifting cosmic cloud backgrounds */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <div className="absolute -left-[10%] -top-[10%] w-[60%] h-[60%] rounded-full bg-accent/5 filter blur-[120px] animate-drift-cloud" />
        <div className="absolute -right-[10%] -bottom-[10%] w-[50%] h-[50%] rounded-full bg-[#FF5F56]/3 filter blur-[100px] animate-drift-cloud" style={{ animationDelay: "4s" }} />
      </div>

      {/* Subtle Background Glow Blobs */}
      <div className="absolute -top-12 left-1/3 w-80 h-80 bg-accent/8 rounded-full filter blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute -bottom-12 right-1/4 w-72 h-72 bg-[#9fcbff]/6 rounded-full filter blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "2.5s" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Large Glowing Centerpiece CTA Container */}
        <div className="glass-panel border-accent/20 rounded-3xl p-8 md:p-12 text-center bg-gradient-to-b from-[#161B22]/60 to-[#0D1117]/90 shadow-2xl relative overflow-hidden group/container select-none">
          
          {/* Moving Ambient light bar */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,166,255,0.08),transparent_50%)] pointer-events-none" />
          
          {/* Subtle animated border glow line */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 rounded-3xl pointer-events-none opacity-50 group-hover/container:opacity-100 transition-opacity duration-700 animate-pulse" />

          <div className="space-y-6 max-w-2xl mx-auto relative z-10">
            {/* Header */}
            <span className="text-xs uppercase font-mono tracking-widest text-accent font-bold px-3 py-1 bg-accent/10 border border-accent/15 rounded-full select-none">
              03. CONCLUSION
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text tracking-tight select-text">
              Ready to build something interesting?
            </h2>
            <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-[#8B949E] via-text to-[#8B949E] bg-clip-text text-transparent pb-4">
              Let's connect.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed max-w-xl mx-auto select-text">
              I'm always seeking opportunities to collaborate on cloud infrastructure automation, deep learning models, CI/CD optimization, or hardware-software integration projects. Reach out directly.
            </p>
          </div>

          {/* Contacts Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12 relative z-10"
          >
            
            <motion.a
              variants={itemVariants}
              href="mailto:contact@allanabraham.dev"
              onClick={triggerViewContact}
              className="glass-panel border-glass-border/60 hover:border-accent/40 bg-[#161B22]/50 hover:bg-[#161B22]/90 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:scale-[1.03] active:scale-95 group shadow-md hover:shadow-accent/5"
            >
              <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/15 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text uppercase tracking-wider">Email Me</h4>
                <p className="text-[11px] text-muted truncate max-w-[160px] font-mono">contact@allanabraham.dev</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="https://linkedin.com/in/allan-abraham"
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerViewContact}
              className="glass-panel border-glass-border/60 hover:border-[#27C93F]/40 bg-[#161B22]/50 hover:bg-[#161B22]/90 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:scale-[1.03] active:scale-95 group shadow-md hover:shadow-[#27C93F]/5"
            >
              <div className="p-3.5 rounded-xl bg-[#27C93F]/10 border border-[#27C93F]/15 group-hover:bg-[#27C93F]/20 group-hover:scale-110 transition-all duration-300">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#27C93F] fill-none">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text uppercase tracking-wider">LinkedIn</h4>
                <p className="text-[11px] text-muted font-mono">/in/allan-abraham</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-[#27C93F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="https://github.com/allan-abraham"
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerViewContact}
              className="glass-panel border-glass-border/60 hover:border-[#FFBD2E]/40 bg-[#161B22]/50 hover:bg-[#161B22]/90 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:scale-[1.03] active:scale-95 group shadow-md hover:shadow-[#FFBD2E]/5"
            >
              <div className="p-3.5 rounded-xl bg-[#FFBD2E]/10 border border-[#FFBD2E]/15 group-hover:bg-[#FFBD2E]/20 group-hover:scale-110 transition-all duration-300">
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#FFBD2E] fill-none">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text uppercase tracking-wider">GitHub</h4>
                <p className="text-[11px] text-muted font-mono">/allan-abraham</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-[#FFBD2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                triggerViewContact();
                alert("Resume PDF is loaded! (Simulation: Download registered in telemetry)");
              }}
              className="glass-panel border-glass-border/60 hover:border-[#FF5F56]/40 bg-[#161B22]/50 hover:bg-[#161B22]/90 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:scale-[1.03] active:scale-95 group shadow-md hover:shadow-[#FF5F56]/5"
            >
              <div className="p-3.5 rounded-xl bg-[#FF5F56]/10 border border-[#FF5F56]/15 group-hover:bg-[#FF5F56]/20 group-hover:scale-110 transition-all duration-300">
                <FileText className="w-5 h-5 text-[#FF5F56]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text uppercase tracking-wider">CV / Resume</h4>
                <p className="text-[11px] text-muted font-mono">Download PDF</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-[#FF5F56] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
            </motion.a>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
