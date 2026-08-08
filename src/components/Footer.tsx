"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Instagram, Phone, MessageCircle, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    console.log("Newsletter subscription: ", email);
    setSubscribed(true);
    setEmail("");

    // Trigger miniature confetti
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.95 },
      colors: ["#bf0a0a", "#eaac08"],
    });

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
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
    <footer className="relative w-full bg-black text-zinc-400 pt-24 pb-12 overflow-hidden border-t border-zinc-900/50 select-none">
      
      {/* Soft bottom glow lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[120px] bg-red-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-zinc-900">
          
          {/* Col 1: Brand & Newsletter (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 transition-transform duration-500 group-hover:rotate-12">
                <Image
                  src="/assets/logo_transparent.png"
                  alt="BLACKHOLE Logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <span className="font-sans text-base font-black tracking-[0.25em] text-zinc-100">
                BLACKHOLE
              </span>
            </a>

            <p className="font-sans text-xs font-light leading-relaxed text-zinc-500 max-w-xs">
              A bespoke contemporary tattoo collective delivering high-end custom body illustration, clinical precision, and luxury hospitality in Kottayam, Kerala.
            </p>

            {/* Newsletter Sign Up */}
            <div className="space-y-3 max-w-sm">
              <h4 className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
                Subscribe to our Newsletter
              </h4>
              {subscribed ? (
                <p className="text-xs text-red-500 font-semibold animate-pulse">
                  Welcome to the collective. Inquiries log secured.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-zinc-800 focus-within:border-red-600 transition-colors py-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none pr-8 font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 text-zinc-500 hover:text-red-500 transition-colors cursor-pointer"
                    aria-label="Submit Newsletter"
                  >
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links (2 Columns) */}
          <div className="lg:col-span-2 lg:pl-4 space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              {[
                { label: "Home", href: "#home" },
                { label: "Gallery", href: "#gallery" },
                { label: "Services", href: "#services" },
                { label: "Why Us", href: "#why-us" },
                { label: "Booking", href: "#booking" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="hover:text-red-500 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (2 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              STUDIO SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-red-500 transition-colors duration-300">
                  Custom Tattooing
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-red-500 transition-colors duration-300">
                  Precision Piercing
                </a>
              </li>
              <li>
                <a href="#booking" onClick={(e) => handleScrollTo(e, "#booking")} className="hover:text-red-500 transition-colors duration-300">
                  Curated Ear Styling
                </a>
              </li>
              <li>
                <a href="#booking" onClick={(e) => handleScrollTo(e, "#booking")} className="hover:text-red-500 transition-colors duration-300">
                  Creative Design Consults
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Socials (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              STUDIO ENQUIRIES
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <span className="block text-[9px] font-bold tracking-widest text-zinc-600 uppercase mb-0.5">Phone Line</span>
                <a href="tel:+916235456525" className="text-zinc-300 hover:text-red-500 transition-colors">
                  +91 62354 56525
                </a>
              </li>
              <li>
                <span className="block text-[9px] font-bold tracking-widest text-zinc-600 uppercase mb-0.5">Social Connects</span>
                <div className="flex items-center gap-4 mt-1.5">
                  <a
                    href="https://www.instagram.com/blackholetattoos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-red-500 transition-colors"
                    aria-label="Instagram Link"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="https://wa.me/916235456525"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-green-500 transition-colors"
                    aria-label="WhatsApp Link"
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Grand Typography Logo (Locomotive-style Signature) */}
        <div className="py-12 select-none pointer-events-none text-center">
          <h2 className="font-display text-[8vw] font-black tracking-[-0.04em] leading-none text-zinc-900/40 select-none uppercase">
            BLACKHOLE
          </h2>
        </div>

        {/* Bottom copyright metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-900/50 text-[10px] tracking-widest text-zinc-600 uppercase font-bold">
          <div>
            © {new Date().getFullYear()} BLACKHOLE TATTOO COLLECTIVE. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex items-center gap-1.5 font-light normal-case tracking-normal">
            Handcrafted with <Heart size={10} className="fill-red-600 text-red-600 animate-pulse" /> in Kottayam, Kerala.
          </div>
        </div>

      </div>
    </footer>
  );
}
