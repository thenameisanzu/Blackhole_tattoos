"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, MessageCircle, Instagram, Phone } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [offsets, setOffsets] = useState({ x: 0, y: 0, scale: 1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Scroll listener to drive flight animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure coordinates between Hero logo and Navbar logo at scroll = 0
  useEffect(() => {
    const measure = () => {
      const heroLogo = document.querySelector(".hero-logo-o") as HTMLElement;
      const navLogo = document.querySelector(".navbar-logo") as HTMLElement;
      if (!heroLogo || !navLogo) return;

      const prevTransform = heroLogo.style.transform;
      heroLogo.style.transform = "none";
      
      const heroRect = heroLogo.getBoundingClientRect();
      const navRect = navLogo.getBoundingClientRect();

      heroLogo.style.transform = prevTransform;

      const dx = navRect.left - heroRect.left;
      const dy = navRect.top - heroRect.top;
      const scale = navRect.width / heroRect.width;

      setOffsets({ x: dx, y: dy, scale });
    };

    // Delay slightly to ensure images are loaded and layout is ready
    const timer = setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // 2D Canvas Spacetime Warp & Accretion Particle Trail Animation
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;
    let isMouseOver = false;

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      isMouseOver = true;

      // Spawn accretion trail particles on mouse move (glowing light trail)
      if (Math.random() < 0.6) {
        spawnParticle(mouseX, mouseY, "trail");
      }
    };

    const onMouseLeave = () => {
      isMouseOver = false;
      mouseX = width / 2;
      mouseY = height / 2;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // Accretion light particle definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      life: number;
    }
    const particles: Particle[] = [];

    const spawnParticle = (px: number, py: number, type: "trail" | "burst") => {
      const count = type === "burst" ? 30 : 1;
      const colors = [
        "rgba(234, 179, 8, ",   // Gold
        "rgba(249, 115, 22, ",  // Orange
        "rgba(239, 68, 68, ",   // Red
        "rgba(255, 255, 255, "  // White
      ];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = type === "burst" ? Math.random() * 5 + 1.5 : Math.random() * 0.8 + 0.2;
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        
        particles.push({
          x: px,
          y: py,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: type === "burst" ? Math.random() * 3 + 1.2 : Math.random() * 2.2 + 0.6,
          color: colorBase,
          alpha: type === "burst" ? 0.95 : 0.65,
          decay: type === "burst" ? Math.random() * 0.02 + 0.012 : Math.random() * 0.01 + 0.004,
          life: 1.0
        });
      }
    };

    const onCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      spawnParticle(clickX, clickY, "burst");
    };

    canvas.addEventListener("click", onCanvasClick);

    // Spacetime Grid configurations - increase spacing on mobile for performance
    const spacing = width < 768 ? 65 : 45;
    let cols = Math.ceil(width / spacing) + 2;
    let rows = Math.ceil(height / spacing) + 2;

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause drawing loop when scrolled completely out of view to save battery and GPU cycles
      if (window.scrollY > window.innerHeight) {
        return;
      }

      // Matte Black background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse coordinate tracking
      if (isMouseOver) {
        currentMouseX += (mouseX - currentMouseX) * 0.08;
        currentMouseY += (mouseY - currentMouseY) * 0.08;
      } else {
        currentMouseX += (width / 2 - currentMouseX) * 0.05;
        currentMouseY += (height / 2 - currentMouseY) * 0.05;
      }

      const cx = width / 2;
      const cy = height / 2;

      // Warp calculations
      const gravityRange = 220;
      const gravityStrength = 0.82;
      const mouseRange = 160;
      const mouseStrength = 0.28;

      const getWarpedPoint = (x: number, y: number) => {
        let wx = x;
        let wy = y;

        // 1. Spacetime gravity warp (Singularity at center)
        const dx_c = x - cx;
        const dy_c = y - cy;
        const dist_c = Math.hypot(dx_c, dy_c);

        if (dist_c > 0) {
          const pull = Math.exp(- (dist_c * dist_c) / (2 * gravityRange * gravityRange));
          wx = wx - dx_c * pull * gravityStrength;
          wy = wy - dy_c * pull * gravityStrength;
        }

        // 2. Mouse spacetime distortion
        const dx_m = wx - currentMouseX;
        const dy_m = wy - currentMouseY;
        const dist_m = Math.hypot(dx_m, dy_m);

        if (dist_m > 0 && dist_m < mouseRange) {
          const push = (1 - dist_m / mouseRange) * mouseStrength;
          wx = wx + dx_m * push;
          wy = wy + dy_m * push;
        }

        return { x: wx, y: wy };
      };

      // Draw horizontal curved lines
      for (let r = -1; r < rows; r++) {
        const yBase = r * spacing;
        ctx.beginPath();
        for (let c = -1; c < cols; c++) {
          const xBase = c * spacing;
          const warped = getWarpedPoint(xBase, yBase);
          if (c === -1) {
            ctx.moveTo(warped.x, warped.y);
          } else {
            ctx.lineTo(warped.x, warped.y);
          }
        }
        ctx.strokeStyle = "rgba(234, 179, 8, 0.045)"; // Soft gold grid lines
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw vertical curved lines
      for (let c = -1; c < cols; c++) {
        const xBase = c * spacing;
        ctx.beginPath();
        for (let r = -1; r < rows; r++) {
          const yBase = r * spacing;
          const warped = getWarpedPoint(xBase, yBase);
          if (r === -1) {
            ctx.moveTo(warped.x, warped.y);
          } else {
            ctx.lineTo(warped.x, warped.y);
          }
        }
        ctx.strokeStyle = "rgba(234, 179, 8, 0.045)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Render glowing accretion particles (light trail & bursts)
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        // Dynamic gravitational pull towards the black hole singularity
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 50) {
          const pullSpeed = 0.08;
          p.vx += (dx / dist) * pullSpeed;
          p.vy += (dy / dist) * pullSpeed;
        }

        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.alpha * p.life).toFixed(2) + ")";
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // Render the black hole accretion halo gradient (radial glow behind logo)
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
      grad.addColorStop(0, "rgba(10, 10, 10, 1)");
      grad.addColorStop(0.25, "rgba(10, 10, 10, 0.95)");
      grad.addColorStop(0.42, "rgba(234, 179, 8, 0.035)"); // Golden accretion glow ring
      grad.addColorStop(1, "rgba(10, 10, 10, 0)");
      
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Black Hole shadow center
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(10, 10, 10, 0.85)";
      ctx.fill();
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      canvas.addEventListener("click", onCanvasClick);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Intro Entrance Animations
  useGSAP(() => {
    // Prevent flash of final state
    gsap.set(".hero-logo-wrapper", { scale: 3.5, rotation: -540, opacity: 0, filter: "blur(15px)" });
    gsap.set(".hero-letter", { opacity: 0, filter: "blur(12px)" });
    gsap.set(".hero-fade-up", { y: 40, opacity: 0, filter: "blur(5px)" });
    gsap.set(".hero-fade-in", { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Logo wrapper implodes
    tl.to(".hero-logo-wrapper", {
      scale: 1,
      rotation: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "power3.inOut"
    })
    // 2. Letters slide/vacuum in from edges
    .fromTo(".hero-letter",
      {
        x: (index) => index < 6 ? -80 : 80,
        opacity: 0,
        filter: "blur(12px)"
      },
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          each: 0.08,
          from: "edges"
        }
      },
      "-=1.0"
    )
    // 3. Subtitles, tags, and CTAs fade up
    .to(".hero-fade-up", {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.0,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.6")
    // 4. Social links and scroll indicator fade in
    .to(".hero-fade-in", {
      opacity: 1,
      duration: 0.8,
      stagger: 0.1
    }, "-=0.6");

    // 5. Infinite slow accretion rotation on the logo image
    gsap.to(".hero-logo-img", {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: "none"
    });
  }, { scope: containerRef });

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const maxScroll = 300;
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Dynamic CSS translation and scaling to fly into the navbar logo slot
  const logoStyle: React.CSSProperties = isMobile ? {
    opacity: scrollY >= 280 ? 0 : 1,
    pointerEvents: scrollY >= 280 ? "none" : "auto",
    willChange: "opacity",
  } : {
    transform: `translate(${scrollProgress * offsets.x}px, ${scrollProgress * offsets.y + scrollY * scrollProgress}px) scale(${1 - scrollProgress * (1 - offsets.scale)})`,
    opacity: scrollY >= 280 ? 0 : 1,
    pointerEvents: scrollY >= 280 ? "none" : "auto",
    willChange: "transform, opacity",
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-matte-black select-none"
    >
      {/* 2D Spacetime Grid Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 cursor-crosshair" />

      {/* Cinematic Shadow Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%) z-10 pointer-events-none" />
      
      {/* Editorial Content */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center max-w-5xl px-6 w-full">
        {/* Cinematic Mini Tag */}
        <div className="mb-4 text-[10px] md:text-xs font-bold tracking-[0.6em] text-red-500 uppercase flex items-center gap-3 hero-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          ESTD. 2018 • PREMIUM TATTOO COLLECTIVE
        </div>

        {/* Massive Hero Heading - Using fluid text-size to fit mobile screens */}
        <h1 
          className="flex items-center justify-center font-display text-[9vw] sm:text-[9vw] md:text-[8.5vw] xl:text-[9.5rem] font-extrabold tracking-[-0.03em] leading-none select-none text-zinc-100 uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] filter blur-[0.3px] w-full"
          style={{ willChange: "transform, filter" }}
        >
          <span className="hero-letter inline-block">B</span>
          <span className="hero-letter inline-block">L</span>
          <span className="hero-letter inline-block">A</span>
          <span className="hero-letter inline-block">C</span>
          <span className="hero-letter inline-block">K</span>
          <span className="hero-letter inline-block">H</span>
          
          {/* Scroll-driven outer flight container */}
          <span 
            className="hero-logo-o relative inline-block w-[0.82em] h-[0.82em] aspect-square flex-none align-middle mx-[0.02em]"
            style={logoStyle}
          >
            {/* GSAP entrance animated inner wrapper */}
            <span className="hero-logo-wrapper relative block w-full h-full aspect-square">
              <Image
                src="/assets/logo_transparent.png"
                alt="O"
                fill
                priority
                sizes="(max-width: 768px) 72px, 176px"
                className="object-contain filter drop-shadow-[0_0_15px_rgba(221,177,30,0.45)] hero-logo-img"
                style={{ objectFit: "contain" }}
              />
            </span>
          </span>
          
          <span className="hero-letter inline-block">L</span>
          <span className="hero-letter inline-block">E</span>
        </h1>

        {/* Luxury Subtitle */}
        <p className="mt-6 font-serif text-lg md:text-2xl font-light italic tracking-widest text-zinc-400 max-w-2xl text-center hero-fade-up">
          Premium Tattoos • Artistic Piercings
          <span className="block mt-1 font-sans text-xs not-italic font-bold tracking-[0.4em] text-zinc-500 uppercase">
            Kottayam, Kerala
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-5 hero-fade-up">
          <button
            onClick={() => handleScrollTo("#booking")}
            className="px-8 py-4 text-xs font-bold tracking-widest text-black bg-white dark:bg-white rounded-full uppercase transition-all duration-300 hover:bg-red-600 hover:text-white hover:scale-105 shadow-[0_4px_30px_rgba(255,255,255,0.08)] cursor-pointer"
            data-cursor-text="Book"
          >
            Book Consultation
          </button>
          
          <button
            onClick={() => handleScrollTo("#gallery")}
            className="px-8 py-4 text-xs font-bold tracking-widest text-white border border-zinc-700 hover:border-red-600 rounded-full bg-zinc-900/40 hover:bg-zinc-900/80 uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
            data-cursor-text="View"
          >
            Explore Gallery
          </button>
        </div>
      </div>

      {/* Quick Action Sidebars (Floating) */}
      <div className="absolute bottom-10 left-10 z-20 hidden md:flex items-center gap-6 text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase hero-fade-in">
        <a 
          href="https://wa.me/916235456525" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-green-500 flex items-center gap-2 transition-colors duration-300"
          data-cursor-text="Chat"
        >
          <MessageCircle size={14} /> WHATSAPP
        </a>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        <a 
          href="https://www.instagram.com/blackholetattoos" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-red-500 flex items-center gap-2 transition-colors duration-300"
          data-cursor-text="Follow"
        >
          <Instagram size={14} /> INSTAGRAM
        </a>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        <a 
          href="tel:+916235456525" 
          className="hover:text-blue-400 flex items-center gap-2 transition-colors duration-300"
          data-cursor-text="Call"
        >
          <Phone size={14} /> CALL NOW
        </a>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() => handleScrollTo("#gallery")}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2 text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase hover:text-red-500 transition-colors duration-300 cursor-pointer hero-fade-in"
        aria-label="Scroll Down"
        data-cursor-text="Scroll"
      >
        <span>DISCOVER</span>
        <ArrowDown size={12} className="animate-bounce" />
      </button>
    </section>
  );
}
