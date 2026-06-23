"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useAchievements } from "./AchievementContext";

// Global Framer Motion config: force GPU compositing on all animated elements
const TRANSITION_BASE = { type: "tween" as const };

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  title?: string;
  showDivider?: boolean;
}

export default function SectionWrapper({ children, id, className = "", title, showDivider = false }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const { trackSectionView } = useAchievements();
  
  // Trigger once — prevents re-animation jitter on scroll-back
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  useEffect(() => {
    if (isInView) {
      trackSectionView(id);
    }
  }, [isInView, id, trackSectionView]);

  // Lean GPU-only header animation — translateY + opacity only (no scale/x)
  // Uses transform compositor path exclusively → zero layout thrash
  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...TRANSITION_BASE,
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad — fast settle
      }
    }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...TRANSITION_BASE,
        delay: 0.15, // minimal delay so content appears right after header
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  // The hero section does not get the zooming header
  const isHero = id === "hero";

  return (
    <section
      ref={ref}
      id={id}
      className={`relative w-full min-h-screen flex flex-col ${
        isHero ? "justify-center" : "justify-start pt-16 pb-0"
      } ${className}`}
    >
      <div className="w-full relative pt-8 pb-0 flex-1 flex flex-col justify-between">
        <div className="w-full">
          {!isHero && title && (
            <div className="w-full max-w-5xl mx-auto px-6 mb-8 relative z-20 pointer-events-none select-none">
              {/* Top rule with animated scan */}
              <div className="h-[1px] w-full relative mb-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-glass-border/60 via-glass-border/20 to-transparent" />
                <div
                  className="absolute top-0 left-0 h-full w-16"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(0,240,255,0.6), transparent)",
                    animation: "shimmer-sweep 5s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Heading with blinking cursor */}
              <div className="flex items-center gap-3">
                {/* Glowing accent dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: "#00F0FF",
                    boxShadow: "0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4)",
                    animation: "hero-glow-breathe 3s ease-in-out infinite",
                  }}
                />
                <motion.h2
                  variants={headerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ willChange: "transform, opacity" }}
                  className="text-3xl font-bold text-accent tracking-[0.1em] uppercase py-1 flex items-center gap-1"
                >
                  {title}
                  <span className="animate-blink-cursor text-accent/70 font-light ml-1">_</span>
                </motion.h2>
              </div>

              {/* Bottom rule with animated scan */}
              <div className="h-[1px] w-full relative mt-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-glass-border/60 via-glass-border/20 to-transparent" />
                <div
                  className="absolute top-0 left-0 h-full w-12"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(0,240,255,0.4), transparent)",
                    animation: "shimmer-sweep 7s ease-in-out infinite",
                    animationDelay: "2s",
                  }}
                />
              </div>
            </div>
          )}

          {isHero ? (
            <div className="w-full">
              {children}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={contentVariants}
              style={{ willChange: "transform, opacity" }}
              className="w-full"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
