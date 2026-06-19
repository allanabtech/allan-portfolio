"use client";

import React from "react";
import { Brain, Cloud, Terminal, Code, Award } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: <Brain className="w-5 h-5 text-accent" />,
    skills: ["Machine Learning", "Deep Learning", "Data Analysis", "OpenCV"],
    color: "rgba(88, 166, 255, 0.2)",
  },
  {
    title: "Cloud Technologies",
    icon: <Cloud className="w-5 h-5 text-[#27C93F]" />,
    skills: ["AWS Solutions", "Cloud Infrastructure", "Cloud Architecture", "S3 & EC2"],
    color: "rgba(39, 201, 63, 0.2)",
  },
  {
    title: "DevOps & Automation",
    icon: <Terminal className="w-5 h-5 text-[#FFBD2E]" />,
    skills: ["Docker Containers", "CI/CD Pipelines", "Linux Shell", "Automation Scripts"],
    color: "rgba(255, 189, 46, 0.2)",
  },
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5 text-[#9fcbff]" />,
    skills: ["Python", "Java", "JavaScript", "HTML & CSS", "Bash scripting"],
    color: "rgba(159, 203, 255, 0.2)",
  },
  {
    title: "Professional Skills",
    icon: <Award className="w-5 h-5 text-[#FF5F56]" />,
    skills: ["Technical Leadership", "Team Collaboration", "Analytical Problem Solving", "Systems Design"],
    color: "rgba(255, 95, 86, 0.2)",
  },
];

export default function SkillsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 15,
      },
    },
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03] animate-scroll-grid pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #58A6FF 1px, transparent 1px),
            linear-gradient(to bottom, #58A6FF 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text">02. Skills & Expertise</h2>
          <div className="h-[1px] flex-1 bg-glass-border" />
        </div>

        {/* Telemetry Subtitle Bar */}
        <div className="flex items-center gap-6 mb-10 text-[10px] text-muted font-mono select-none">
          <span>NODES ACTIVATED: {SKILL_CATEGORIES.length}</span>
          <span>•</span>
          <span>COMPILER: CLANG/GCC</span>
          <span>•</span>
          <span>STATE: IN-MEMORY STACK</span>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-panel glass-panel-hover p-6 rounded-xl border-glass-border flex flex-col justify-between"
              style={{
                boxShadow: `0 8px 30px -10px ${cat.color}`,
              }}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-glass-border group-hover:scale-110 transition-transform duration-300">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse" />
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
