"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Instagram, Phone, Share2, X } from "lucide-react";

export default function FloatingMenu() {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling past the hero (e.g. 400px)
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
        setIsOpen(false); // Close if scrolled back to top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      icon: <MessageCircle size={18} />,
      label: "WhatsApp",
      href: "https://api.whatsapp.com/send?phone=916235456525",
      color: "bg-green-600 hover:bg-green-700 text-white shadow-green-900/40",
      cursorText: "Chat",
    },
    {
      icon: <Instagram size={18} />,
      label: "Instagram",
      href: "https://www.instagram.com/blackholetattoos",
      color: "bg-red-600 hover:bg-red-700 text-white shadow-red-900/40",
      cursorText: "Follow",
    },
    {
      icon: <Phone size={18} />,
      label: "Call Now",
      href: "tel:+916235456525",
      color: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/40",
      cursorText: "Call",
    },
  ];

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3 select-none animate-fade-in">
      
      {/* Expanded Sub-buttons Stack */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-500 origin-bottom ${
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-8 pointer-events-none"
      }`}>
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target={item.href.startsWith("tel:") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 relative group ${item.color}`}
            data-cursor-text={item.cursorText}
          >
            {item.icon}
            
            {/* Custom Tooltip */}
            <span className="absolute right-14 glass px-3 py-1.5 rounded text-[9px] font-bold tracking-widest uppercase text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/5 whitespace-nowrap shadow-md">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-zinc-800 border border-zinc-700 text-zinc-200 rotate-180 shadow-black/40"
            : "bg-red-600 border border-red-500 text-white hover:bg-red-700 shadow-red-900/30 animate-pulse-slow"
        }`}
        data-cursor-text={isOpen ? "Close" : "Connect"}
        aria-label="Toggle Quick Connect Menu"
      >
        {isOpen ? <X size={20} /> : <Share2 size={20} />}
      </button>

    </div>
  );
}
