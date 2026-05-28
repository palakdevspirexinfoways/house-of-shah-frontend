import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden bg-black font-outfit">
      {/* Background Image with Slow Zoom & Overlay */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80" 
          alt="Silver Raw Crafting" 
          className="w-full h-full object-cover grayscale opacity-75"
        />
        {/* Elegant dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/75" />
      </motion.div>

      {/* Centered Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-white/60 tracking-[0.6em] uppercase text-[10px] md:text-xs font-bold border-b border-white/20 pb-2">
            Beyond Jewellery
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative"
        >
          <h1 className="text-white text-5xl md:text-7xl lg:text-[9rem] font-bold tracking-tighter leading-none mb-4 uppercase">
            Beyound Jewellery
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white/40" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/70 text-base md:text-2xl font-light italic max-w-2xl mt-8 leading-relaxed"
        >
          "Nurturing ancestral craftsmanship, certifying unmatched skill, and <br className="hidden md:block" /> 
          empowering communities to shape a self-reliant nation."
        </motion.p>
      </div>

      {/* Aesthetic Corner Accents */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-white/10 hidden md:block" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-white/10 hidden md:block" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[8px] text-white/30 tracking-widest uppercase mb-4">Scroll</span>
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </div>
    </section>
  );
};

export default HeroSection;
