"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Activity, Eye, Calendar, ShieldCheck, Palette } from "lucide-react";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: "tattoos",
      title: "Custom Tattooing",
      subtitle: "Bespoke Ink Craftsmanship",
      image: "/assets/media__1782481912436.png", // Bio-mech sleeve
      icon: <Palette className="w-5 h-5 text-red-500" />,
      description:
        "Specializing in highly custom, award-winning masterpieces. From intricate micro-realism, fine-line graphics, and heavy blackwork to dark bio-mechanical sleeves, our resident artists translate your vision into a living canvas.",
      features: [
        "100% Unique Custom Designs",
        "Fine-Line & Micro-Realism Experts",
        "Premium Imported Vegan Inks",
        "Comprehensive Aftercare Program",
      ],
    },
    {
      id: "piercings",
      title: "Precision Piercing",
      subtitle: "Premium Jewelry & Styling",
      image: "/assets/media__1782481680893.jpg", // Ear piercing
      icon: <ShieldCheck className="w-5 h-5 text-yellow-500" />,
      description:
        "Medical-grade body piercing executed with surgical precision. We prioritize your anatomy and aesthetic, utilizing exclusively implant-grade titanium, solid 18k gold, and sterile single-use cannulas in an aseptic clinic environment.",
      features: [
        "Implant-Grade Titanium Jewelry",
        "Aseptic Piercing Techniques",
        "Curated Ear Styling Consultations",
        "Free Checkups & Healing Support",
      ],
    },
  ];

  // 3D Tilt Effect State & Handler
  const [tiltStyles, setTiltStyles] = useState<{ [key: string]: string }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    // Bypass tilt on mobile and tablet touch devices
    if (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    // Calculate rotation angles based on mouse position
    // Center of card is 0, 0. Range is -1 to 1.
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTiltStyles({
      [cardId]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = (cardId: string) => {
    setTiltStyles({
      [cardId]: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
  };

  const handleScrollToBooking = () => {
    const element = document.querySelector("#booking");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="services-details"
      ref={containerRef}
      className="relative w-full py-24 md:py-36 bg-warm-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500"
    >
      {/* Background glow overlay */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-yellow-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="text-xs font-bold tracking-[0.4em] text-gold-accent uppercase mb-4">
            03 <span className="text-red-500">//</span> SERVICES OF EXCELLENCE
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            OUR SPECIALIZED <br />
            <span className="font-serif italic font-light text-gold-accent tracking-wide">CRAFT DISCIPLINARY</span>
          </h2>
          <p className="mt-6 font-sans text-zinc-600 dark:text-zinc-400 font-light max-w-xl mx-auto">
            We focus exclusively on two core creative pillars, ensuring that each practitioner is a dedicated master of their craft.
          </p>
        </div>

        {/* 3D Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative p-8 md:p-12 rounded-2xl bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-2xl transition-all duration-300 ease-out cursor-pointer group hover:border-gold-accent/30 flex flex-col justify-between overflow-hidden"
              style={{
                transform: tiltStyles[service.id] || "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              onMouseMove={(e) => handleMouseMove(e, service.id)}
              onMouseLeave={() => handleMouseLeave(service.id)}
            >
              {/* Radial gradient glow on card hover */}
              <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(239,68,68,0.03)_0%,transparent_70%) opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div>
                {/* Large visual image with premium mask */}
                <div 
                  className="relative aspect-video w-full mb-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-black"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Floating category tag */}
                  <div className="absolute top-4 right-4 z-10 glass px-4 py-1.5 rounded-full border border-white/5 text-[10px] font-bold tracking-widest uppercase text-zinc-700 dark:text-zinc-300">
                    {service.subtitle}
                  </div>
                </div>

                {/* Card Title & Icon */}
                <div 
                  className="flex items-center gap-4 mb-6"
                  style={{ transform: "translateZ(45px)" }}
                >
                  <div className="p-3 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-gold-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p 
                  className="font-sans text-sm font-light text-zinc-650 dark:text-zinc-400 leading-relaxed mb-8"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {service.description}
                </p>

                {/* Bullet Highlights */}
                <ul 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-xs font-semibold tracking-wide text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/60 pt-6"
                  style={{ transform: "translateZ(35px)" }}
                >
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div 
                className="flex items-center gap-4 pt-4 border-t border-zinc-800/40"
                style={{ transform: "translateZ(50px)" }}
              >
                <button
                  onClick={handleScrollToBooking}
                  className="flex-1 py-3.5 text-center text-xs font-black tracking-widest bg-gold-accent hover:bg-gold-accent/90 text-black uppercase rounded-lg transition-colors duration-300 shadow-[0_4px_15px_rgba(221,177,30,0.2)] cursor-pointer"
                >
                  Book Appointment
                </button>
                <button
                  onClick={handleScrollToBooking}
                  className="px-6 py-3.5 text-center text-xs font-bold tracking-widest text-zinc-650 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:border-gold-accent hover:text-white uppercase rounded-lg transition-colors duration-300 bg-transparent cursor-pointer"
                >
                  Consult
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
