"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animate loading progress
  useEffect(() => {
    const start = Date.now();
    const duration = 2400; // 2.4 seconds loading duration

    const updateProgress = () => {
      const elapsed = Date.now() - start;
      const progressPercent = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(progressPercent);

      if (progressPercent < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setFade(true);
          setTimeout(() => {
            onFinished();
          }, 800); // Wait for fade-out animation
        }, 300); // Slight pause at 100%
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onFinished]);

  // Particle dust/smoke simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle definition
    interface DustParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaSpeed: number;
    }

    const particles: DustParticle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      alphaSpeed: (Math.random() - 0.5) * 0.005,
    }));

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial dark background glow
      const bgGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        width / 1.5
      );
      bgGlow.addColorStop(0, "#0e0d0b");
      bgGlow.addColorStop(1, "#020202");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Render dust particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaSpeed;

        // Reset if out of bounds or invisible
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.speedX = -p.speedX;
        }
        if (p.alpha <= 0 || p.alpha >= 0.7) {
          p.alphaSpeed = -p.alphaSpeed;
        }
        p.alpha = Math.max(0.01, Math.min(0.7, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * 0.5})`; // Gold tinted dust
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = "rgba(212, 175, 55, 0.3)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) ${
        fade ? "opacity-0 invisible pointer-events-none scale-105 blur-md" : "opacity-100"
      }`}
    >
      {/* Background drifting particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Loading Content Container */}
      <div className="relative z-10 flex flex-col items-center select-none">
        
        {/* Cinematic pulsating logo */}
        <div className="relative w-36 h-36 mb-8 animate-pulse-slow">
          <div className="absolute inset-0 rounded-full bg-yellow-600/15 blur-2xl animate-pulse" />
          <Image
            src="/assets/logo_transparent.png"
            alt="BLACKHOLE Logo"
            fill
            sizes="144px"
            className="object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.35)] scale-95 hover:scale-100 transition-transform duration-500"
            priority
          />
        </div>

        {/* Studio Name Editorial */}
        <h2 className="font-sans text-xs tracking-[0.4em] text-zinc-400 font-bold uppercase mb-12">
          BLACKHOLE STUDIO
        </h2>

        {/* Counter */}
        <div className="relative flex flex-col items-center">
          <span className="font-mono text-5xl font-light tracking-wider text-zinc-100 tabular-nums">
            {progress.toString().padStart(3, "0")}
            <span className="text-zinc-500 text-lg ml-1">%</span>
          </span>
          
          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-zinc-800 mt-4 overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-red-700 via-yellow-500 to-white transition-all duration-100 ease-out"
              style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(234,179,8,0.5)" }}
            />
          </div>
        </div>

        {/* Loading Footer Tagline */}
        <div className="mt-24 text-[9px] tracking-[0.5em] text-zinc-500 uppercase">
          KOTTAYAM • KERALA
        </div>
      </div>
    </div>
  );
}
