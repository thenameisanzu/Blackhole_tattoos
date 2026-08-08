"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string; // "tattoos" | "piercings"
  subcategory: string; // "recent" | "featured"
  src: string;
  placement: string;
  aspect: string; // tailwind aspect ratio class
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"all" | "tattoos" | "piercings" | "recent" | "featured">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left -> Next image
      setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryItems.length));
    } else if (isRightSwipe) {
      // Swipe right -> Prev image
      setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length));
    }
  };

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Bio-Mechanical Sleeve",
      category: "tattoos",
      subcategory: "featured",
      src: "/assets/media__1782481912436.png",
      placement: "Full Arm Sleeve",
      aspect: "aspect-[3/4] h-[380px] md:h-[480px]"
    },
    {
      id: 2,
      title: "Daith & Lobe Curation",
      category: "piercings",
      subcategory: "recent",
      src: "/assets/media__1782481680893.jpg",
      placement: "Ear Piercing",
      aspect: "aspect-[1/1] h-[280px] md:h-[320px]"
    },
    {
      id: 3,
      title: "Baphomet & Earth",
      category: "tattoos",
      subcategory: "featured",
      src: "/assets/media__1782481858355.jpg",
      placement: "Shoulder",
      aspect: "aspect-[3/4] h-[380px] md:h-[480px]"
    },
    {
      id: 4,
      title: "Helix Piercing & Blessed script",
      category: "piercings",
      subcategory: "recent",
      src: "/assets/media__1782481697243.jpg",
      placement: "Ear & Neck",
      aspect: "aspect-[3/4] h-[380px] md:h-[420px]"
    },
    {
      id: 5,
      title: "Crimson Botanica",
      category: "tattoos",
      subcategory: "featured",
      src: "/assets/media__1782481900360.png",
      placement: "Forearm",
      aspect: "aspect-[1/1] h-[280px] md:h-[350px]"
    },
    {
      id: 6,
      title: "Triple Lobe Piercing",
      category: "piercings",
      subcategory: "featured",
      src: "/assets/media__1782481731065.png",
      placement: "Ear",
      aspect: "aspect-[3/4] h-[380px] md:h-[460px]"
    },
    {
      id: 7,
      title: "Sovereign Dragon",
      category: "tattoos",
      subcategory: "recent",
      src: "/assets/media__1782481875936.jpg",
      placement: "Ankle / Lower Leg",
      aspect: "aspect-[3/4] h-[380px] md:h-[480px]"
    },
    {
      id: 8,
      title: "Nine-Tails Spirit (Kurama)",
      category: "tattoos",
      subcategory: "recent",
      src: "/assets/media__1782481888671.png",
      placement: "Calf",
      aspect: "aspect-[1/1] h-[280px] md:h-[340px]"
    },
    {
      id: 9,
      title: "Spartan Valor",
      category: "tattoos",
      subcategory: "featured",
      src: "/assets/media__1782481960530.jpg",
      placement: "Shoulder",
      aspect: "aspect-[3/4] h-[380px] md:h-[480px]"
    },
    {
      id: 10,
      title: "Ink & Vision Sketch",
      category: "tattoos",
      subcategory: "recent",
      src: "/assets/media__1782481942378.png",
      placement: "Forearm",
      aspect: "aspect-[3/4] h-[380px] md:h-[420px]"
    },
    {
      id: 11,
      title: "Angel Wings & Halo",
      category: "tattoos",
      subcategory: "recent",
      src: "/assets/media__1782482003979.png",
      placement: "Nape of Neck",
      aspect: "aspect-[3/4] h-[380px] md:h-[450px]"
    },
    {
      id: 12,
      title: "Mechanical Spark Plug",
      category: "tattoos",
      subcategory: "recent",
      src: "/assets/media__1782481991198.jpg",
      placement: "Upper Arm",
      aspect: "aspect-[1/1] h-[280px] md:h-[320px]"
    }
  ];

  // Filter logic
  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "tattoos") return item.category === "tattoos";
    if (activeTab === "piercings") return item.category === "piercings";
    if (activeTab === "recent") return item.subcategory === "recent";
    if (activeTab === "featured") return item.subcategory === "featured";
    return true;
  });

  const openLightbox = (id: number) => {
    const idx = galleryItems.findIndex((item) => item.id === id);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryItems.length));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length));
  };

  const tabs = [
    { key: "all", label: "All Portfolio" },
    { key: "tattoos", label: "Tattoos" },
    { key: "piercings", label: "Piercings" },
    { key: "featured", label: "Featured Masterpieces" },
    { key: "recent", label: "Recent Work" },
  ];

  return (
    <section
      id="gallery"
      className="relative w-full py-24 md:py-36 bg-matte-black text-zinc-100 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-xs font-bold tracking-[0.4em] text-gold-accent uppercase mb-4">
              01 <span className="text-red-500">//</span> GALLERY EXHIBITION
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
              THE PORTFOLIO <br />
              <span className="font-serif italic font-light text-gold-accent tracking-wide">OF PERMANENT</span> COLLECTIVES
            </h2>
          </div>

          {/* Luxury Filtering Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0 scroll-smooth border-b border-zinc-900">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-5 py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full border transition-all duration-500 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-gold-accent border-gold-accent text-black font-extrabold shadow-[0_4px_20px_rgba(221,177,30,0.25)]"
                    : "border-zinc-800 text-zinc-400 hover:text-gold-accent hover:border-gold-accent/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Editorial Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="break-inside-avoid mb-4 md:mb-8 relative overflow-hidden rounded-xl border border-zinc-900/60 bg-zinc-950/40 cursor-pointer group shadow-lg"
              data-cursor-text="VIEW"
            >
              {/* Image Container */}
              <div className={`relative w-full ${item.aspect} overflow-hidden bg-zinc-900`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-100"
                  loading="lazy"
                />
                
                {/* Dark Vignette Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-75 lg:opacity-60 lg:group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />

                {/* Subtle light reflections */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              </div>

              {/* Hover Metadata Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col justify-end opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-red-500 uppercase block mb-1">
                      {item.category.slice(0, -1)} • {item.placement}
                    </span>
                    <h3 className="font-display text-lg font-black uppercase text-zinc-100 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Floating Action Circle */}
                  <div className="p-2.5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md scale-75 lg:scale-75 lg:group-hover:scale-100 transition-transform duration-500">
                    <ZoomIn size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* LUXURY LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8 select-none transition-all duration-500 animate-fade-in"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="absolute top-6 left-0 w-full px-6 md:px-12 flex items-center justify-between text-zinc-400 z-55">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">
                BLACKHOLE ART EXHIBITION
              </span>
              <span className="text-sm font-serif italic text-zinc-300 mt-0.5">
                {galleryItems[lightboxIndex].title} ({galleryItems[lightboxIndex].placement})
              </span>
            </div>
            
            <button
              onClick={closeLightbox}
              className="p-3 rounded-full border border-zinc-800 bg-zinc-950/80 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={18} />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-10 hidden md:flex items-center justify-center p-4 rounded-full border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors z-55 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Main Image Viewport */}
          <div 
            className="relative max-w-5xl w-full h-[60vh] md:h-[75vh] flex items-center justify-center z-50"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          >
            <div className="relative w-full h-full select-none">
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].title}
                fill
                sizes="80vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-10 hidden md:flex items-center justify-center p-4 rounded-full border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors z-55 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Details Bar Bottom */}
          <div className="absolute bottom-6 z-55 text-center flex flex-col items-center">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              IMAGE {lightboxIndex + 1} OF {galleryItems.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
