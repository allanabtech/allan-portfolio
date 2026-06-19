"use client";

import React, { useEffect, useState } from "react";
import { Mail, FileText, ArrowUpRight, Copy, Check } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useAchievements } from "../AchievementContext";
import SpotlightCard from "../SpotlightCard";

export default function ContactSection() {
  const { triggerViewContact } = useAchievements();
  const [copiedStatus, setCopiedStatus] = useState<Record<string, boolean>>({});

  const handleCopy = (e: React.MouseEvent, text: string, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStatus((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStatus((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

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
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 22, damping: 20 },
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
        <SpotlightCard className="border-accent/25 rounded-3xl p-8 md:p-12 text-center bg-gradient-to-b from-[#0A0A0C]/60 to-[#000000]/95 shadow-2xl relative overflow-hidden group/container select-none">
          
          {/* Moving Ambient light bar */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
          
          {/* Subtle animated border glow line */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 rounded-3xl pointer-events-none opacity-50 group-hover/container:opacity-100 transition-opacity duration-700 animate-pulse" />

          <div className="space-y-6 max-w-2xl mx-auto relative z-10">
            {/* Header */}
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full mx-auto mt-12 relative z-10"
          >
            
            <motion.a
              variants={itemVariants}
              href="mailto:allanabraham271299@gmail.com"
              onClick={triggerViewContact}
              className="block group"
            >
              <SpotlightCard className="p-5 rounded-2xl flex flex-col items-center justify-between text-center gap-4 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-accent/5 h-full bg-[#0A0A0C]/50 hover:bg-[#0A0A0C]/90">
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/15 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div className="space-y-2 w-full flex flex-col items-center">
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider">Email Me</h4>
                    <div 
                      onClick={(e) => e.stopPropagation()} 
                      className="flex items-center justify-between gap-1.5 bg-[#0D1017]/80 border border-glass-border py-1.5 px-2 rounded-lg w-full max-w-full select-text transition-colors hover:border-accent/30"
                    >
                      <span className="text-[10px] lg:text-[11px] text-muted font-mono break-all select-all leading-tight">
                        allanabraham271299@gmail.com
                      </span>
                      <button
                        onClick={(e) => handleCopy(e, "allanabraham271299@gmail.com", "email")}
                        className="p-1 rounded hover:bg-glass-border/60 text-muted hover:text-accent transition-all flex-shrink-0 cursor-pointer"
                        title="Copy Email"
                      >
                        {copiedStatus["email"] ? (
                          <Check className="w-3.5 h-3.5 text-green-400 animate-scale-in" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
              </SpotlightCard>
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="https://www.linkedin.com/in/abrahamallan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerViewContact}
              className="block group"
            >
              <SpotlightCard className="p-5 rounded-2xl flex flex-col items-center justify-between text-center gap-4 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-[#27C93F]/5 h-full bg-[#0A0A0C]/50 hover:bg-[#0A0A0C]/90">
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="p-3.5 rounded-xl bg-[#27C93F]/10 border border-[#27C93F]/15 group-hover:bg-[#27C93F]/20 group-hover:scale-110 transition-all duration-300">
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#27C93F] fill-none">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div className="space-y-2 w-full flex flex-col items-center">
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider">LinkedIn</h4>
                    <div 
                      onClick={(e) => e.stopPropagation()} 
                      className="flex items-center justify-between gap-1.5 bg-[#0D1017]/80 border border-glass-border py-1.5 px-2 rounded-lg w-full max-w-full select-text transition-colors hover:border-[#27C93F]/30"
                    >
                      <span className="text-[10px] lg:text-[11px] text-muted font-mono break-all select-all leading-tight">
                        linkedin.com/in/abrahamallan
                      </span>
                      <button
                        onClick={(e) => handleCopy(e, "https://www.linkedin.com/in/abrahamallan", "linkedin")}
                        className="p-1 rounded hover:bg-glass-border/60 text-muted hover:text-[#27C93F] transition-all flex-shrink-0 cursor-pointer"
                        title="Copy LinkedIn URL"
                      >
                        {copiedStatus["linkedin"] ? (
                          <Check className="w-3.5 h-3.5 text-green-400 animate-scale-in" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-[#27C93F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
              </SpotlightCard>
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="https://github.com/allanabtech"
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerViewContact}
              className="block group"
            >
              <SpotlightCard className="p-5 rounded-2xl flex flex-col items-center justify-between text-center gap-4 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-[#FFBD2E]/5 h-full bg-[#0A0A0C]/50 hover:bg-[#0A0A0C]/90">
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="p-3.5 rounded-xl bg-[#FFBD2E]/10 border border-[#FFBD2E]/15 group-hover:bg-[#FFBD2E]/20 group-hover:scale-110 transition-all duration-300">
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#FFBD2E] fill-none">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </div>
                  <div className="space-y-2 w-full flex flex-col items-center">
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider">GitHub</h4>
                    <div 
                      onClick={(e) => e.stopPropagation()} 
                      className="flex items-center justify-between gap-1.5 bg-[#0D1017]/80 border border-glass-border py-1.5 px-2 rounded-lg w-full max-w-full select-text transition-colors hover:border-[#FFBD2E]/30"
                    >
                      <span className="text-[10px] lg:text-[11px] text-muted font-mono break-all select-all leading-tight">
                        github.com/allanabtech
                      </span>
                      <button
                        onClick={(e) => handleCopy(e, "https://github.com/allanabtech", "github")}
                        className="p-1 rounded hover:bg-glass-border/60 text-muted hover:text-[#FFBD2E] transition-all flex-shrink-0 cursor-pointer"
                        title="Copy GitHub URL"
                      >
                        {copiedStatus["github"] ? (
                          <Check className="w-3.5 h-3.5 text-green-400 animate-scale-in" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-[#FFBD2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
              </SpotlightCard>
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                triggerViewContact();
                alert("Resume PDF is loaded! (Simulation: Download registered in telemetry)");
              }}
              className="block group"
            >
              <SpotlightCard className="p-5 rounded-2xl flex flex-col items-center justify-between text-center gap-4 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-[#FF5F56]/5 h-full bg-[#0A0A0C]/50 hover:bg-[#0A0A0C]/90">
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="p-3.5 rounded-xl bg-[#FF5F56]/10 border border-[#FF5F56]/15 group-hover:bg-[#FF5F56]/20 group-hover:scale-110 transition-all duration-300">
                    <FileText className="w-5 h-5 text-[#FF5F56]" />
                  </div>
                  <div className="space-y-2 w-full flex flex-col items-center">
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider">CV / Resume</h4>
                    <div 
                      onClick={(e) => e.stopPropagation()} 
                      className="flex items-center justify-between gap-1.5 bg-[#0D1017]/80 border border-glass-border py-1.5 px-2 rounded-lg w-full max-w-full select-text transition-colors hover:border-[#FF5F56]/30"
                    >
                      <span className="text-[10px] lg:text-[11px] text-muted font-mono break-all select-all leading-tight">
                        allanabraham_cv.pdf
                      </span>
                      <button
                        onClick={(e) => handleCopy(e, "allanabraham_cv.pdf", "resume")}
                        className="p-1 rounded hover:bg-glass-border/60 text-muted hover:text-[#FF5F56] transition-all flex-shrink-0 cursor-pointer"
                        title="Copy Resume Name"
                      >
                        {copiedStatus["resume"] ? (
                          <Check className="w-3.5 h-3.5 text-green-400 animate-scale-in" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-[#FF5F56] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
              </SpotlightCard>
            </motion.a>

          </motion.div>

        </SpotlightCard>

      </div>
    </div>
  );
}
