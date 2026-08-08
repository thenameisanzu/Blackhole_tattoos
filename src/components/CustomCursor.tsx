"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (!isTouch) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly position the inner dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      if (hidden) {
        setHidden(false);
      }
    };

    // Smooth lerp for the outer ring
    const render = () => {
      const ease = 0.15; // spring ease factor
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      requestAnimationFrame(render);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const animationFrameId = requestAnimationFrame(render);

    // Setup interactive hovers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], input, select, textarea, .interactive-hover");
      
      if (interactiveEl) {
        setHovered(true);
        const text = interactiveEl.getAttribute("data-cursor-text");
        if (text) {
          setCursorText(text);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], input, select, textarea, .interactive-hover");
      
      if (interactiveEl) {
        setHovered(false);
        setCursorText("");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hidden]);

  if (!mounted) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-red-600 dark:bg-red-500 rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-75" : "scale-100"}`}
        style={{ willChange: "transform" }}
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-zinc-500/40 dark:border-zinc-400/30 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-all duration-250 ease-out ${
          hidden ? "opacity-0 scale-50" : "opacity-100 scale-100"
        } ${clicked ? "scale-50 bg-red-600/10 border-red-600/30 dark:bg-red-500/10 dark:border-red-500/30" : ""} ${
          hovered ? "w-16 h-16 -ml-8 -mt-8 bg-zinc-950/5 dark:bg-zinc-50/5 border-gold-accent scale-110" : ""
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span className="text-[9px] uppercase font-bold tracking-widest text-gold-accent select-none animate-fade-in text-center px-1">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
