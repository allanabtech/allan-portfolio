"use client";

import React from "react";
import { Brain, Cloud, Terminal, Code, Award, Cpu } from "lucide-react";
import { motion, Variants } from "framer-motion";
import SpotlightCard from "../SpotlightCard";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;      // underglow box-shadow color
  glowColor: string;  // hover spotlight color (slightly more opaque)
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: <Brain className="w-5 h-5 text-[#A855F7]" />,
    skills: ["Machine Learning", "Deep Learning", "Data Analysis", "OpenCV"],
    color: "rgba(168, 85, 247, 0.18)",
    glowColor: "rgba(168, 85, 247, 0.45)",
  },
  {
    title: "Cloud Technologies",
    icon: <Cloud className="w-5 h-5 text-[#27C93F]" />,
    skills: ["AWS Solutions", "Cloud Infrastructure", "Cloud Architecture", "S3 & EC2"],
    color: "rgba(39, 201, 63, 0.18)",
    glowColor: "rgba(39, 201, 63, 0.45)",
  },
  {
    title: "DevOps & Automation",
    icon: <Terminal className="w-5 h-5 text-[#FFBD2E]" />,
    skills: ["Docker Containers", "CI/CD Pipelines", "Linux Shell", "Automation Scripts"],
    color: "rgba(255, 189, 46, 0.18)",
    glowColor: "rgba(255, 189, 46, 0.45)",
  },
  {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5 text-[#00E676]" />,
    skills: ["Python", "Java", "JavaScript", "HTML & CSS", "Bash scripting"],
    color: "rgba(0, 230, 118, 0.18)",
    glowColor: "rgba(0, 230, 118, 0.45)",
  },
  {
    title: "Professional Skills",
    icon: <Award className="w-5 h-5 text-[#FF5F56]" />,
    skills: ["Technical Leadership", "Team Collaboration", "Analytical Problem Solving", "Systems Design"],
    color: "rgba(255, 95, 86, 0.18)",
    glowColor: "rgba(255, 95, 86, 0.45)",
  },
  {
    title: "Embedded & Robotics",
    icon: <Cpu className="w-5 h-5 text-[#38BDF8]" />,
    skills: ["Arduino & STM32", "Sensor Integration", "I2C / SPI / UART", "Real-time Control Systems"],
    color: "rgba(56, 189, 248, 0.18)",
    glowColor: "rgba(56, 189, 248, 0.45)",
  },
];

export default function SkillsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.38,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "tween", duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Telemetry Subtitle Bar */}
        <div className="flex items-center gap-6 mb-10 text-[10px] text-muted font-mono select-none">
          <span>NODES ACTIVATED: {SKILL_CATEGORIES.length}</span>
          <span>•</span>
          <span>COMPILER: CLANG/GCC</span>
          <span>•</span>
          <span>STATE: IN-MEMORY STACK</span>
        </div>

        {/* Categories Grid — 3 columns × 2 rows */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
            >
              <SpotlightCard
                className="p-6 rounded-xl flex flex-col justify-between h-full"
                glowColor={cat.glowColor}
                style={{
                  boxShadow: `0 8px 30px -10px ${cat.color}`,
                }}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-glass-border">
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
                          style={{ background: cat.glowColor.replace(/[\d.]+\)$/, "0.9)") }}
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

      </div>
    </div>
  );
}
