"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Upload, Calendar, Clock, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  style: string;
  placement: string;
  size: string;
  date: string;
  time: string;
  notes: string;
};

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      service: "tattoo",
      style: "fine-line",
      placement: "forearm",
      size: "medium",
      time: "11:00",
    },
  });

  const selectedService = watch("service");

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerConfetti = () => {
    // Left burst
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#bf0a0a", "#eaac08", "#ffffff"],
    });
    // Right burst
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#bf0a0a", "#eaac08", "#ffffff"],
    });
  };

  const onSubmit = async (data: FormData) => {
    console.log("Booking submitted: ", { ...data, file: selectedFile });
    
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    let uploadedImageUrl = "";
    if (selectedFile) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        
        if (cloudName && uploadPreset) {
          // Cloudinary Unsigned Upload (Permanent Storage)
          formData.append("upload_preset", uploadPreset);
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
          });
          
          if (response.ok) {
            const resData = await response.json();
            if (resData?.secure_url) {
              uploadedImageUrl = resData.secure_url;
            }
          } else {
            console.error("Cloudinary upload failed: ", await response.text());
          }
        } else {
          // Fallback to tmpfiles.org for local testing
          console.warn("Cloudinary credentials not configured. Falling back to tmpfiles.org temporary hosting.");
          
          const response = await fetch("https://tmpfiles.org/api/v1/upload", {
            method: "POST",
            body: formData,
          });
          
          if (response.ok) {
            const resData = await response.json();
            if (resData?.data?.url) {
              uploadedImageUrl = resData.data.url.replace("https://tmpfiles.org/", "https://tmpfiles.org/dl/");
            }
          }
        }
      } catch (err) {
        console.error("Failed to upload image:", err);
      } finally {
        setIsUploading(false);
      }
    }

    const getServiceLabel = (val: string) => {
      switch(val) {
        case "tattoo": return "Custom Tattooing";
        case "piercing": return "Precision Piercing";
        default: return val;
      }
    };
    const getStyleLabel = (val: string) => {
      switch(val) {
        case "fine-line": return "Fine Line / Micro-realism";
        case "realism": return "Shaded Realism";
        case "biomech": return "Bio-Mechanical / Heavy Ink";
        case "traditional": return "Traditional / Neo-Trad";
        case "tribal": return "Tribal / Blackwork";
        case "geometry": return "Geometric / Mandala";
        case "other": return "Other / Custom Concept";
        default: return val;
      }
    };
    const getPlacementLabel = (val: string) => {
      switch(val) {
        case "forearm": return "Forearm";
        case "upper-arm": return "Upper Arm / Shoulder";
        case "sleeve": return "Full Arm Sleeve";
        case "chest-back": return "Chest / Back";
        case "leg-calf": return "Leg / Calf / Thigh";
        case "neck-nape": return "Neck / Nape";
        case "hand-wrist": return "Hand / Wrist";
        case "other": return "Other";
        default: return val;
      }
    };
    const getSizeLabel = (val: string) => {
      switch(val) {
        case "small": return "Small (under 3 inches)";
        case "medium": return "Medium (3 - 6 inches)";
        case "large": return "Large (6 - 10 inches)";
        case "sleeve-project": return "Multi-session / Large Scale";
        default: return val;
      }
    };

    const serviceLabel = getServiceLabel(data.service);
    let message = `*BLACKHOLE TATTOO STUDIO - BOOKING REQUEST*\n\n`;
    message += `\uD83D\uDC64 *Client:* ${data.name}\n`;
    message += `\uD83D\uDCDE *Phone:* ${data.phone}\n`;
    message += `\uD83D\uDCE7 *Email:* ${data.email}\n`;
    message += `\u2728 *Service:* ${serviceLabel}\n`;
    
    if (data.service === "tattoo") {
      message += `\uD83C\uDFA8 *Style:* ${getStyleLabel(data.style)}\n`;
      message += `\uD83D\uDCCD *Placement:* ${getPlacementLabel(data.placement)}\n`;
      message += `\uD83D\uDCCF *Size:* ${getSizeLabel(data.size)}\n`;
    }
    
    message += `\uD83D\uDCC5 *Preferred Date:* ${data.date}\n`;
    message += `\u23F0 *Preferred Time Slot:* ${data.time}\n`;
    
    if (uploadedImageUrl) {
      message += `\uD83D\uDDBC\uFE0F *Reference Image:* ${uploadedImageUrl}\n`;
    } else if (selectedFile) {
      message += `\uD83D\uDDBC\uFE0F *Reference Image:* Attached (Ready to share)\n`;
    }
    
    if (data.notes) {
      message += `\uD83D\uDCDD *Project Brief:* ${data.notes}\n`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=916235456525&text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");

    // Trigger premium success screen
    setSubmitted(true);
    triggerConfetti();

    // Reset Form
    reset();
    setSelectedFile(null);
    setFilePreview(null);
  };

  return (
    <section
      id="booking"
      className="relative w-full py-24 md:py-36 bg-warm-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500"
    >
      {/* Background blur effects */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-bold tracking-[0.4em] text-gold-accent uppercase mb-4">
            06 <span className="text-red-500">//</span> RESERVATIONS & CONSULTATION
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight">
            SECURE YOUR <br />
            <span className="font-serif italic font-light text-gold-accent tracking-wide">CREATIVE CONSPIRACY</span>
          </h2>
          <p className="mt-4 font-sans text-zinc-600 dark:text-zinc-400 font-light max-w-lg mx-auto">
            Ready to immortalize your vision? Fill out our luxury briefing form. We will match you with the artist best suited for your project.
          </p>
        </div>

        {/* Form Box */}
        <div className="glass-premium bg-white/90 dark:bg-zinc-900/90 p-8 md:p-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
          
          {submitted ? (
            /* Elegant Success Animation */
            <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-red-950/35 border border-red-500/30 flex items-center justify-center text-red-500 mb-8 shadow-[0_0_25px_rgba(191,10,10,0.2)] animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                CONSULTATION SECURED
              </h3>
              <p className="font-sans text-sm font-light text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed mb-8">
                Your briefing file has been submitted. Our Creative Director is reviewing your request. A styling consultant will reach out via WhatsApp (+91 97466 95575) within 24 hours to confirm your scheduling options.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 text-xs font-bold tracking-widest text-zinc-750 dark:text-zinc-300 border border-zinc-250 dark:border-zinc-700 hover:border-red-600 hover:text-white rounded-full uppercase transition-all duration-300 bg-transparent cursor-pointer"
              >
                Book Another Session
              </button>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* SECTION 1: Personal Coordinates */}
              <div className="space-y-6">
                <h3 className="font-display text-xs font-bold tracking-[0.25em] text-gold-accent uppercase pb-2 border-b border-zinc-200 dark:border-zinc-800/60">
                  SECTION 1 <span className="text-red-500">//</span> INDIVIDUAL COORDINATES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Adithya Nair"
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-5 py-3.5 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={10} /> {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\+?[0-9\s\-()]{10,15}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      className="w-full px-5 py-3.5 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={10} /> {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. adithya@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className="w-full px-5 py-3.5 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1.5 mt-1">
                      <AlertCircle size={10} /> {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* SECTION 2: Project Specifications */}
              <div className="space-y-6">
                <h3 className="font-display text-xs font-bold tracking-[0.25em] text-gold-accent uppercase pb-2 border-b border-zinc-200 dark:border-zinc-800/60">
                  SECTION 2 <span className="text-red-500">//</span> PROJECT SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Preferred Service *
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        {...register("service")}
                        className="w-full px-5 py-3.5 pr-10 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all appearance-none cursor-pointer"
                      >
                        <option value="tattoo">Custom Tattooing</option>
                        <option value="piercing">Precision Piercing</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-600">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <input
                        id="date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        {...register("date", { required: "Date is required" })}
                        className="w-full px-5 py-3.5 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all cursor-pointer"
                      />
                    </div>
                    {errors.date && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={10} /> {errors.date.message}
                      </span>
                    )}
                  </div>
                </div>

                {selectedService === "tattoo" && (
                  /* Tattoo Specific Details */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                    {/* Style */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="style" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                        Tattoo Style *
                      </label>
                      <div className="relative">
                        <select
                          id="style"
                          {...register("style")}
                          className="w-full px-5 py-3.5 pr-10 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all appearance-none cursor-pointer"
                        >
                          <option value="fine-line">Fine Line / Micro-realism</option>
                          <option value="realism">Shaded Realism</option>
                          <option value="biomech">Bio-Mechanical / Heavy Ink</option>
                          <option value="traditional">Traditional / Neo-Trad</option>
                          <option value="tribal">Tribal / Blackwork</option>
                          <option value="geometry">Geometric / Mandala</option>
                          <option value="other">Other / Custom Concept</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-600">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Placement */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="placement" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                        Placement Area *
                      </label>
                      <div className="relative">
                        <select
                          id="placement"
                          {...register("placement")}
                          className="w-full px-5 py-3.5 pr-10 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all appearance-none cursor-pointer"
                        >
                          <option value="forearm">Forearm</option>
                          <option value="upper-arm">Upper Arm / Shoulder</option>
                          <option value="sleeve">Full Arm Sleeve</option>
                          <option value="chest-back">Chest / Back</option>
                          <option value="leg-calf">Leg / Calf / Thigh</option>
                          <option value="neck-nape">Neck / Nape</option>
                          <option value="hand-wrist">Hand / Wrist</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-600">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Size */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="size" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                        Approximate Size *
                      </label>
                      <div className="relative">
                        <select
                          id="size"
                          {...register("size")}
                          className="w-full px-5 py-3.5 pr-10 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all appearance-none cursor-pointer"
                        >
                          <option value="small">Small (under 3 inches)</option>
                          <option value="medium">Medium (3 - 6 inches)</option>
                          <option value="large">Large (6 - 10 inches)</option>
                          <option value="sleeve-project">Multi-session / Large Scale</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-600">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 3: Visual References & Notes */}
              <div className="space-y-6">
                <h3 className="font-display text-xs font-bold tracking-[0.25em] text-gold-accent uppercase pb-2 border-b border-zinc-200 dark:border-zinc-800/60">
                  SECTION 3 <span className="text-red-500">//</span> BRIEFING DOSSIER
                </h3>

                {/* Reference Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                    Reference Visual / Design Sketch
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`${
                      isDragActive
                        ? "border-gold-accent bg-gold-accent/5"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 bg-zinc-50 dark:bg-zinc-950/20"
                    } border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {filePreview ? (
                      <div className="relative w-28 h-28 rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-md">
                        <img src={filePreview} alt="Reference preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-bold uppercase text-white">Change File</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-300" />
                        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-light">
                          Drag and drop your reference image here, or{" "}
                          <span className="text-gold-accent font-semibold underline">browse files</span>
                        </span>
                        <span className="text-[9px] text-zinc-500 dark:text-zinc-600 uppercase">
                          Supports PNG, JPG (Max 5MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="notes" className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                    Detailed Project Briefing
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    placeholder="Describe your design concept, symbolism, placement details, and any background styling preferences..."
                    {...register("notes")}
                    className="w-full px-5 py-3.5 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-4 text-xs font-black tracking-[0.3em] bg-gold-accent hover:bg-gold-accent/90 disabled:bg-zinc-800 text-black uppercase rounded-lg transition-all duration-300 shadow-[0_4px_30px_rgba(221,177,30,0.25)] hover:scale-[1.01] relative overflow-hidden group disabled:cursor-not-allowed cursor-pointer"
                  data-cursor-text={isUploading ? "UPLOADING" : "CONFIRM"}
                >
                  <span className="relative z-10 font-bold">
                    {isUploading ? "UPLOADING REFERENCE..." : "BOOK CONSULTATION SESSION"}
                  </span>
                  {!isUploading && (
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
