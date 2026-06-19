"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface AnimeCarouselProps {
  className?: string;
}

const ANIME_POSTERS = [
  {
    src: "/assets/anime_darling.png",
    title: "Darling in the FranXX",
    subtitle: "TRIGGER × A-1 Pictures",
    accent: "#FF3366",
  },
  {
    src: "/assets/anime_naruto.png",
    title: "Naruto Shippuden",
    subtitle: "Studio Pierrot",
    accent: "#FF7A00",
  },
  {
    src: "/assets/anime_bleach.png",
    title: "Bleach: TYBW",
    subtitle: "Studio Pierrot",
    accent: "#A0C4FF",
  },
  {
    src: "/assets/anime_slime.png",
    title: "Tensura: Slime",
    subtitle: "8bit",
    accent: "#5CE1C0",
  },
];

// Duplicate for seamless infinite loop
const LOOP_POSTERS = [...ANIME_POSTERS, ...ANIME_POSTERS, ...ANIME_POSTERS];

export default function AnimeCarousel({ className = "" }: AnimeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const directionRef = useRef<1 | -1>(1); // 1 = left→right scroll, -1 = right→left
  const isHoveringRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const SPEED = 0.6; // px per frame
  const CARD_WIDTH = 160; // px including gap
  const SINGLE_SET = ANIME_POSTERS.length * CARD_WIDTH;

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (isHoveringRef.current) {
      posRef.current += SPEED * directionRef.current;

      // Seamless loop: when we've scrolled a full set, jump back
      if (directionRef.current === 1 && posRef.current >= SINGLE_SET) {
        posRef.current -= SINGLE_SET;
      } else if (directionRef.current === -1 && posRef.current <= 0) {
        posRef.current += SINGLE_SET;
      }

      track.style.transform = `translateX(${-posRef.current}px)`;
    }

    animRef.current = requestAnimationFrame(animate);
  }, [SINGLE_SET]);

  useEffect(() => {
    // Start at the middle set so both directions have room to loop
    posRef.current = SINGLE_SET;
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [animate, SINGLE_SET]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    setIsHovering(false);
    // Alternate direction each hover session
    directionRef.current = directionRef.current === 1 ? -1 : 1;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-glass-border/40 group/carousel ${className}`}
      style={{ height: "140px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient fade masks on left & right edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-[#0D1017] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-[#0D1017] to-transparent" />

      {/* Idle overlay hint */}
      {!isHovering && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <span className="text-[9px] font-mono text-white/50 bg-black/40 px-2 py-1 rounded tracking-widest uppercase">
            Hover to scroll
          </span>
        </div>
      )}

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-3 absolute top-0 left-0 h-full"
        style={{ willChange: "transform", paddingLeft: "12px" }}
      >
        {LOOP_POSTERS.map((poster, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-md overflow-hidden border border-glass-border/30 group/poster"
            style={{ width: "100px", height: "134px" }}
          >
            {/* Poster image */}
            <img
              src={poster.src}
              alt={poster.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Bottom gradient label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2">
              <span
                className="text-[8px] font-bold leading-tight"
                style={{ color: poster.accent }}
              >
                {poster.title}
              </span>
              <span className="text-[7px] text-white/50 font-mono">{poster.subtitle}</span>
            </div>
            {/* Accent glow on the card edge */}
            <div
              className="absolute inset-0 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 rounded-md pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px ${poster.accent}66` }}
            />
          </div>
        ))}
      </div>

      {/* Bottom caption bar */}
      <div className="absolute bottom-0 inset-x-0 flex items-center px-3 py-1 bg-gradient-to-t from-[#0D1017]/90 to-transparent z-10 select-none">
        <span className="text-[9px] font-mono text-white/60 font-bold">
          ALLAN&apos;S WATCH-LIST // CURRENTLY AIRING
        </span>
        <span className="ml-auto text-[8px] font-mono text-white/30">
          {isHovering
            ? directionRef.current === 1
              ? "→ scrolling"
              : "← scrolling"
            : "paused"}
        </span>
      </div>
    </div>
  );
}
