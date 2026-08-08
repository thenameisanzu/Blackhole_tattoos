"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, MessageCircle, Instagram, MapPin, Clock, Star, Send, CheckCircle2, Navigation, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact Message Submitted: ", data);
    
    const serviceLabel = data.service === "tattoo" 
      ? "Custom Tattooing" 
      : data.service === "piercing" 
      ? "Precision Piercing" 
      : "General Consultation / Enquiry";

    let message = `*BLACKHOLE TATTOO STUDIO - GENERAL ENQUIRY*\n\n`;
    message += `\uD83D\uDC64 *Name:* ${data.name}\n`;
    message += `\uD83D\uDCDE *Phone:* ${data.phone}\n`;
    message += `\uD83D\uDCE7 *Email:* ${data.email}\n`;
    message += `\u2728 *Service Interested In:* ${serviceLabel}\n`;
    message += `\uD83D\uDCDD *Message:* ${data.message}\n`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=916235456525&text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    
    // Trigger small confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#bf0a0a", "#ffffff"],
    });

    setTimeout(() => {
      reset();
    }, 1000);
  };

  const businessHours = [
    { days: "Tuesday – Sunday", hours: "10:30 AM – 08:00 PM" },
    { days: "Monday", hours: "By Prior Appointment" },
  ];

  const reviewHighlights = [
    {
      author: "Gokul S.",
      text: "The premier custom tattoo studio in Kerala. Exceptional craftsmanship, absolute hygiene, and brilliant artists.",
      stars: 5,
    },
    {
      author: "Anjali Mukundan",
      text: "Extremely clinical sterilization. They guided me through the entire design consultation process flawlessly.",
      stars: 5,
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-36 bg-soft-bone dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="text-xs font-bold tracking-[0.4em] text-gold-accent uppercase mb-4">
            07 <span className="text-red-500">//</span> CONNECTING COORDINATES
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
            ESTABLISH <br />
            <span className="font-serif italic font-light text-gold-accent tracking-wide">CREATIVE LIASON</span>
          </h2>
          <p className="mt-6 font-sans text-zinc-650 dark:text-zinc-400 font-light max-w-lg">
            Have questions about a custom design or scheduling? Drop us a line or visit our studio gallery in Kottayam.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* LEFT: Contact details, business profile & custom styled map (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Studio Coordinates */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <MapPin size={14} className="text-gold-accent" /> Studio Location
                </h3>
                <p className="font-sans text-sm font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  **BLACKHOLE TATTOOS** <br />
                  2nd Floor, Grand Opera Building, <br />
                  Near KSRTC Terminal, Kottayam, <br />
                  Kerala - 686001
                </p>
              </div>

              {/* Business Hours */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Clock size={14} className="text-gold-accent" /> Operating Hours
                </h3>
                <div className="space-y-2 text-sm font-light text-zinc-600 dark:text-zinc-400">
                  {businessHours.map((bh, i) => (
                    <div key={i} className="flex justify-between border-b border-zinc-800/40 pb-1.5 max-w-[280px]">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">{bh.days}</span>
                      <span className="text-zinc-550 dark:text-zinc-450 font-mono text-xs">{bh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://api.whatsapp.com/send?phone=916235456525"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-green-950/20 hover:bg-green-600 border border-green-800 text-white font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/blackholetattoos"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-red-950/20 hover:bg-red-600 border border-red-800 text-white font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300"
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href="tel:+916235456525"
                className="px-6 py-3 rounded-lg bg-blue-950/20 hover:bg-blue-600 border border-blue-800 text-white font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300"
              >
                <Phone size={16} /> +91 62354 56525
              </a>
            </div>

            {/* Custom Google Map Embed with cinematic dark theme filters */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 aspect-video w-full shadow-2xl group">
              <iframe
                title="BLACKHOLE Tattoos Kottayam Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.332306232757!2d76.5204683!3d9.5923984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062b0051d98993%3A0xe543fa0dfde94539!2sBLACK%20HOLE%20TATTOOS%20%26%20PIERCING%20KOTTAYAM!5e0!3m2!1sen!2sin!4v1719391200000!5m2!1sen!2sin"
                className="w-full h-full border-none transition-all duration-700 filter invert-[90%] hue-rotate-[180deg] brightness-[85%] contrast-[95%] dark:invert-[90%] dark:hue-rotate-[180deg] dark:brightness-[85%] group-hover:filter-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Floating Directions Button */}
              <a
                href="https://share.google/4FXHASNLBeZGetgfm"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 glass px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-200 hover:bg-gold-accent hover:text-black hover:border-gold-accent transition-all duration-300 shadow-lg"
                data-cursor-text="MAP"
              >
                <Navigation size={12} /> Directions
              </a>
            </div>

            {/* Google Business Profile Reviews Highlight */}
            <div className="glass-premium bg-white/90 dark:bg-zinc-900/90 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/60 shadow-lg">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/40 pb-4 mb-4">
                <div>
                  <h4 className="font-sans text-xs font-bold tracking-widest text-zinc-700 dark:text-zinc-300 uppercase">
                    Google Business Profile
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">4.9</span>
                    <div className="flex items-center text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className="fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-450">(142+ Reviews)</span>
                  </div>
                </div>
                
                <a
                  href="https://share.google/4FXHASNLBeZGetgfm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold tracking-widest text-gold-accent hover:text-gold-accent/80 uppercase underline"
                >
                  Write Review
                </a>
              </div>

              {/* Review Snippets Carousel */}
              <div className="space-y-4">
                {reviewHighlights.map((rev, i) => (
                  <div key={i} className="text-xs font-light leading-relaxed text-zinc-650 dark:text-zinc-400 pl-4 border-l border-red-600/30">
                    <p className="italic">"{rev.text}"</p>
                    <span className="block mt-1 font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[9px]">
                      — {rev.author}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: High-end Contact Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="glass-premium bg-white/90 dark:bg-zinc-900/90 p-8 md:p-10 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <h3 className="font-display text-xs font-bold tracking-[0.25em] text-gold-accent uppercase pb-4 border-b border-zinc-200 dark:border-zinc-800/60 mb-6">
                FORM <span className="text-red-500">//</span> EXPRESS INQUIRY
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-500/20 flex items-center justify-center text-red-500 mb-6 animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-display text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                    MESSAGE DELIVERED
                  </h4>
                  <p className="font-sans text-xs font-light text-zinc-650 dark:text-zinc-400 leading-relaxed mb-6">
                    Your transmission has been logged. Our booking manager will respond to you directly within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-[10px] font-bold tracking-widest text-zinc-700 dark:text-zinc-300 border border-zinc-250 dark:border-zinc-800 hover:border-red-600 hover:text-white rounded-full uppercase transition-all duration-300 bg-transparent cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-name" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Name
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      placeholder="Your Name"
                      {...register("name", { required: true })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                    />
                    {errors.name && <span className="text-[9px] text-red-500">Name is required</span>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-phone" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Phone Number
                    </label>
                    <input
                      id="c-phone"
                      type="tel"
                      placeholder="Your Phone Number"
                      {...register("phone", { required: true })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                    />
                    {errors.phone && <span className="text-[9px] text-red-500">Phone number is required</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-email" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Email Address
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      placeholder="Your Email Address"
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                    />
                    {errors.email && <span className="text-[9px] text-red-500">Please enter a valid email</span>}
                  </div>

                  {/* Service Interested In */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-service" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Service Interested In
                    </label>
                    <div className="relative">
                      <select
                        id="c-service"
                        {...register("service", { required: true })}
                        className="w-full px-4 py-3 pr-10 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all appearance-none cursor-pointer"
                        defaultValue="tattoo"
                      >
                        <option value="tattoo">Custom Tattooing</option>
                        <option value="piercing">Precision Piercing</option>
                        <option value="general">General Consultation / Enquiry</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-650">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                    {errors.service && <span className="text-[9px] text-red-500">Service is required</span>}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-message" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Your Message
                    </label>
                    <textarea
                      id="c-message"
                      rows={4}
                      placeholder="Write your message here..."
                      {...register("message", { required: true })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all resize-none"
                    />
                    {errors.message && <span className="text-[9px] text-red-500">Message is required</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 text-[10px] font-black tracking-[0.25em] bg-gold-accent hover:bg-gold-accent/90 text-black uppercase rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(221,177,30,0.2)] flex items-center justify-center gap-2 cursor-pointer group"
                    data-cursor-text="SEND"
                  >
                    <span className="font-bold">SEND MESSAGE</span>
                    <Send size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
