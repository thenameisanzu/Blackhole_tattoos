"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import LoadingScreen from "../components/LoadingScreen";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
import BookingForm from "../components/BookingForm";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;

    // Only enable smooth scrolling on desktop devices to prevent scroll lag on mobile/tablet screens
    if (window.innerWidth < 1024) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading ? (
        <LoadingScreen onFinished={() => setLoading(false)} />
      ) : (
        <div className="w-full min-h-screen bg-matte-black text-zinc-100 flex flex-col overflow-x-hidden animate-fade-in duration-1000">
          {/* 1. Hero Landing Section */}
          <Hero />

          {/* 2. Portfolio Gallery Exhibition */}
          <Gallery />

          {/* 3. Editorial About Story & Counters */}
          <About />

          {/* 4. Service Divisions (Tattoos & Piercings) */}
          <Services />

          {/* 5. Standards & Safety Benefits */}
          <WhyUs />

          {/* 6. Testimonials Chronicles */}
          <Testimonials />

          {/* 7. Consultation Booking Form */}
          <BookingForm />

          {/* 8. Map, Hours & Message Connects */}
          <Contact />

          {/* 9. Footer Grand Signature */}
          <Footer />
        </div>
      )}
    </>
  );
}
