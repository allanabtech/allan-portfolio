"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function LinkScrollManager() {
  const isAnimating = useRef(false);
  const activeAnimation = useRef<any>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const targetY = rect.top + window.scrollY;

    if (activeAnimation.current) {
      activeAnimation.current.stop();
    }

    isAnimating.current = true;
    const currentY = window.scrollY;

    activeAnimation.current = animate(currentY, targetY, {
      type: "spring",
      stiffness: 85,
      damping: 17,
      mass: 0.9,
      onUpdate: (latest) => {
        window.scrollTo(0, latest);
      },
      onComplete: () => {
        isAnimating.current = false;
        activeAnimation.current = null;
      }
    });
  };

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        const href = anchor.getAttribute("href")!;
        const id = href.slice(1);

        if (id === "") {
          e.preventDefault();
          // Scroll to top
          if (activeAnimation.current) activeAnimation.current.stop();
          isAnimating.current = true;
          activeAnimation.current = animate(window.scrollY, 0, {
            type: "spring",
            stiffness: 85,
            damping: 17,
            mass: 0.9,
            onUpdate: (latest) => window.scrollTo(0, latest),
            onComplete: () => {
              isAnimating.current = false;
              activeAnimation.current = null;
            }
          });
          return;
        }

        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          scrollToSection(id);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return null;
}
