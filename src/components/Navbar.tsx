"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowLogo(y >= 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Gallery", href: "#gallery" },
    { label: "Services", href: "#services" },
    { label: "Why BLACKHOLE", href: "#why-us" },
    { label: "Booking", href: "#booking" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-black/60 dark:bg-black/60 border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="flex items-center gap-3 group"
          >
            <div 
              className="relative w-10 h-10 transition-all duration-500 group-hover:rotate-12 navbar-logo shrink-0"
              style={{
                opacity: showLogo ? 1 : 0,
                transform: `scale(${showLogo ? 1 : 0.7})`,
                pointerEvents: showLogo ? "auto" : "none"
              }}
            >
              <Image
                src="/assets/logo_transparent.png"
                alt="BLACKHOLE Logo"
                fill
                sizes="40px"
                className="object-contain drop-shadow-[0_0_8px_rgba(221,177,30,0.45)]"
              />
            </div>
            <span className="font-sans text-lg font-black tracking-[0.25em] text-zinc-100 dark:text-zinc-100 group-hover:text-gold-accent transition-colors duration-300">
              BLACKHOLE
            </span>
          </a>

          {/* CENTER: Menu Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="relative text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-400 hover:text-zinc-100 dark:hover:text-zinc-100 uppercase py-2 transition-colors duration-300 group"
              >
                {item.label}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </nav>

          {/* RIGHT: Quick Action Icons, Switch & Book Button */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-zinc-400 hover:text-yellow-500 transition-colors duration-300 cursor-pointer"
              aria-label="Toggle Theme"
              data-cursor-text={theme === "dark" ? "Light" : "Dark"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Book Consultation */}
            <a
              href="#booking"
              onClick={(e) => handleScrollTo(e, "#booking")}
              className="relative px-6 py-2.5 text-[11px] font-bold tracking-widest text-white uppercase border border-red-800 rounded-full bg-red-950/20 hover:bg-red-600 transition-all duration-500 overflow-hidden group"
              data-cursor-text="Book"
            >
              <span className="relative z-10">Book Consultation</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
            </a>
          </div>

          {/* Hamburger Menu & Mobile Theme (Mobile Only) */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-100 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center px-12 md:px-24 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 text-left">
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="font-sans text-3xl font-black tracking-wider text-zinc-100 hover:text-red-500 uppercase transition-colors duration-300"
              style={{
                transitionDelay: `${index * 50}ms`,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
                transition: "all 0.4s ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className="mt-12 pt-8 border-t border-zinc-800 flex flex-col gap-6"
          style={{
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: mobileMenuOpen ? 1 : 0,
            transition: "all 0.4s ease 300ms",
          }}
        >

          <a
            href="#booking"
            onClick={(e) => handleScrollTo(e, "#booking")}
            className="w-full text-center py-4 text-xs font-black tracking-widest bg-red-600 hover:bg-red-700 text-white rounded-full uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(220,38,38,0.3)]"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </>
  );
}
