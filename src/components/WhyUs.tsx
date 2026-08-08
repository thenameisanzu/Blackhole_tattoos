"use client";

import React, { useEffect, useRef, useState } from "react";
import { Award, ShieldCheck, HeartHandshake, Eye, Sparkles, Users } from "lucide-react";

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const features = [
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      title: "Professional Artists",
      description: "Our roster comprises internationally recognized, award-winning illustrators and stylists specializing in bespoke body designs.",
    },
    {
      icon: <Award className="w-6 h-6 text-gold-accent" />,
      title: "Premium Equipment",
      description: "We employ industry-leading rotary machines, medical-grade pigment inks, and precision needles for seamless lines.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Highest Hygiene Standards",
      description: "A clinical environment featuring hospital-grade sterilization (autoclave) and 100% single-use medical consumables.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: "Custom Artwork",
      description: "We never replicate templates. Every tattoo is a completely bespoke creation, designed to fit your unique anatomy.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-blue-500" />,
      title: "Safe Procedures",
      description: "Full compliance with healthcare directives, sterile setup procedures, and a detailed client health check before booking.",
    },
    {
      icon: <Eye className="w-6 h-6 text-pink-500" />,
      title: "Creative Consultation",
      description: "Exhaustive, collaborative design sessions over custom mood boards to bring your conceptual visions to reality.",
    },
  ];

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 bg-soft-bone dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500"
    >
      {/* Dynamic glow overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="text-xs font-bold tracking-[0.4em] text-red-500 uppercase mb-4">
            04 <span className="text-gold-accent">//</span> UNCOMPROMISING STANDARDS
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
            WHY CLIENTS TRUST <br />
            <span className="font-serif italic font-light text-red-500 tracking-wide">BLACKHOLE STUDIO</span>
          </h2>
          <p className="mt-6 font-sans text-zinc-600 dark:text-zinc-400 font-light max-w-xl">
            We operate at the intersection of contemporary art, luxury hospitality, and medical-grade clinical precision.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 md:p-10 rounded-xl bg-white/40 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-red-600/30 transition-all duration-700 hover:scale-[1.01] flex flex-col group shadow-lg ${
                inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Glowing back-dot on hover */}
              <div className="w-12 h-12 mb-6 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative z-10 group-hover:border-red-600/40 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all duration-500">
                {feature.icon}
              </div>

              <h3 className="font-display text-xl font-bold uppercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-4 group-hover:text-red-500 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="font-sans text-sm font-light text-zinc-650 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
