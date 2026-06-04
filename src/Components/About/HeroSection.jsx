import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutHeroCenter = () => {
  const [slide, setSlide] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/slides?page=about`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setSlide(data.data[0]);
        }
      })
      .catch(err => console.error('[About Hero Fetch Error]', err));
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-outfit">
      
      {/* --- Background Image with Slow Zoom & Minor Overlay --- */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={slide?.image || "https://png.pngtree.com/thumb_back/fw800/background/20251123/pngtree-minimalist-triangle-silver-necklace-on-gray-surface-image_20550704.webp"} 
          alt={slide?.title || "Premium Silver Craft"} 
          className="w-full h-full object-cover"
        />
        {/* Minor Dark Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </motion.div>

      {/* --- CENTERED CONTENT --- */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-white/60 tracking-[0.6em] uppercase text-[10px] md:text-xs font-bold border-b border-white/20 pb-2">
            {slide?.tagline || "A Legacy of Precision"}
          </span>
        </motion.div>

        {/* Main Title: ABOUT US */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative"
        >
          <h1 className="text-white text-5xl md:text-8xl lg:text-[11rem] font-bold tracking-tighter leading-none mb-4">
            {slide?.title || "ABOUT US"}
          </h1>
          {/* Subtle architectural line under title */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white/40" />
        </motion.div>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/70 text-lg md:text-2xl font-light italic max-w-2xl mt-8 leading-relaxed"
        >
          {slide?.desc || ""}
        </motion.p>

 

      </div>

      {/* --- Aesthetic Corner Elements (Architectural Look) --- */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-white/10 hidden md:block" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-white/10 hidden md:block" />

      {/* --- Vertical Indicator Line --- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[9px] text-white/30 tracking-widest uppercase mb-4">Scroll</span>
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </div>

    </section>
  );
};

export default AboutHeroCenter;