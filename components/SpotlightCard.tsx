"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Custom glow color for the hover spotlight, e.g. "rgba(168, 85, 247, 0.5)" */
  glowColor?: string;
}

const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className = "", glowColor, style, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);

    useImperativeHandle(ref, () => cardRef.current!);

    useEffect(() => {
      const handleScroll = () => {
        rectRef.current = null; // Invalidate cache on scroll since coordinates shift
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseEnter = () => {
      if (cardRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect();
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      if (!rectRef.current) {
        rectRef.current = card.getBoundingClientRect();
      }

      const x = e.clientX - rectRef.current.left;
      const y = e.clientY - rectRef.current.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      // Apply custom per-card glow color inline on hover
      if (glowColor) {
        const primary = glowColor;
        const faded = glowColor.replace(/[\d.]+\)$/, "0.12)");
        card.style.background = `
          linear-gradient(rgba(13, 16, 23, 0.8), rgba(13, 16, 23, 0.8)) padding-box,
          radial-gradient(
            220px circle at ${x}px ${y}px,
            ${primary},
            ${faded} 50%,
            transparent 100%
          ) border-box
        `;
        card.style.borderColor = "transparent";
        card.style.transform = "translate3d(0, -4px, 0)";
        card.style.boxShadow = `0 16px 40px 0 ${glowColor.replace(/[\d.]+\)$/, "0.15)")}`;
      }
    };

    const handleMouseLeave = () => {
      rectRef.current = null;
      // Reset inline styles applied during hover
      if (glowColor && cardRef.current) {
        cardRef.current.style.background = "";
        cardRef.current.style.borderColor = "";
        cardRef.current.style.transform = "";
        cardRef.current.style.boxShadow = "";
      }
    };

    return (
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`glass-panel ${glowColor ? "" : "glass-panel-hover"} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
