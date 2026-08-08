"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Counter Hook to animate stats
function useCounter(endValue: number, duration: number = 2000, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * endValue));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [endValue, duration, trigger]);

  return count;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const el = sectionRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  // Animate stats
  const years = useCounter(8, 2000, inView);
  const clients = useCounter(5000, 2500, inView);
  const designs = useCounter(3500, 2500, inView);
  const rating = useCounter(49, 1500, inView); // will represent 4.9⭐

  return (
    <section
      id="services" // Use services ID so smooth scroll routes correctly
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 bg-soft-bone dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* LEFT Side: Immersive Image with editorial framing */}
        <div 
          className={`relative group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 shadow-2xl transition-all duration-1000 transform ${
            inView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
          
          {/* Film Grain overlay specific to this image */}
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="relative aspect-[3/4] w-full max-w-md lg:max-w-none mx-auto overflow-hidden">
            <Image
              src="/assets/media__1782481718951.png"
              alt="Artistic Craftsmanship at BLACKHOLE"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              priority
            />
          </div>

          {/* Hanging Tag */}
          <div className="absolute bottom-6 left-6 z-20 glass px-5 py-3 rounded-md border border-white/5">
            <p className="font-serif text-sm italic text-zinc-700 dark:text-zinc-300">"Art is in the details, trust is in the hygiene."</p>
          </div>
        </div>

        {/* RIGHT Side: Luxury Editorial Copy */}
        <div 
          className={`flex flex-col transition-all duration-1000 delay-200 transform ${
            inView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
        >
          {/* Editorial Section Index */}
          <div className="text-xs font-bold tracking-[0.4em] text-gold-accent uppercase mb-4">
            02 <span className="text-red-500">//</span> ESTABLISHED EXCELLENCE
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight uppercase text-zinc-900 dark:text-zinc-100 mb-8 leading-tight">
            CRAFTING IMMORTAL <br />
            <span className="font-serif italic font-light text-gold-accent tracking-wide">DIGITAL ARTISTRY</span> ON SKIN
          </h2>

          <div className="font-sans text-sm md:text-base text-zinc-650 dark:text-zinc-400 font-light space-y-6 leading-relaxed">
            <p>
              Located in the heart of Kottayam, Kerala, **BLACKHOLE** is not just a tattoo studio. It is a premium contemporary art space where personal narratives undergo a transition into custom-crafted, bespoke body illustration.
            </p>
            <p>
              Our artistic philosophy revolves around absolute precision, custom designs, and high-fashion aesthetics. We believe that every tattoo is an extension of the soul. Thus, we work closely with you through exhaustive creative consultations to develop artwork that is uniquely yours.
            </p>
            <p>
              We pride ourselves on maintaining medical-grade sterilization standards and using the highest quality premium equipment in the industry. Your safety, comfort, and premium experience are our absolute commitments.
            </p>
          </div>

          {/* Animated Statistics Block */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-zinc-200 dark:border-zinc-800">
            
            {/* Stat 1 */}
            <div className="flex flex-col">
              <span className="font-mono text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
                {years}
                <span className="text-gold-accent ml-1">+</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mt-2">
                Years Experience
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col">
              <span className="font-mono text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
                {clients}
                <span className="text-gold-accent ml-1">+</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mt-2">
                Happy Clients
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col">
              <span className="font-mono text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
                {designs}
                <span className="text-gold-accent ml-1">+</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mt-2">
                Custom Designs
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col">
              <span className="font-mono text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
                {(rating / 10).toFixed(1)}
                <span className="text-gold-accent ml-1 text-3xl">★</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mt-2">
                Google Rating
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
