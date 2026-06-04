import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Hexagon, Rocket } from 'lucide-react';

const CraftsmanshipUnique = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--silver-bg)] text-[var(--primary-blue)] font-outfit overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* --- LEFT: ARCHITECTURAL IMAGE LAYERING --- */}
          <div className="lg:col-span-6 relative h-[400px] md:h-[600px]">
            
            {/* Background Image: The Raw Process (Cleaned up - No Overlay) */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute top-0 left-0 w-4/5 h-4/5 rounded-2xl overflow-hidden border border-[var(--primary-blue)]/5 shadow-sm"
            >
              <img 
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover grayscale brightness-110" // Brightness adjusted for clarity without the white wash
                alt="Silver Raw Process"
              />
            </motion.div>

            {/* Foreground Image: The Finished Jewel Quality (Floating with Border) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(26,65,115,0.12)] border-4 border-[var(--white)] z-10"
            >
              <img 
                src="https://jewelrydesigns.com/wp-content/uploads/ER1-Shop-Diamond-Engagement-Rings-1080X1080.jpg" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                alt="Finished Silver Detail"
              />
            </motion.div>
          </div>

          {/* --- RIGHT: BOLD TYPOGRAPHY & SPECS --- */}
          <div className="lg:col-span-6 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[var(--primary-blue)]/40 mb-6 block">
                02 / Engineering Soul
              </span>
              
              <h2 className="text-4xl md:text-7xl font-bold leading-[0.9] tracking-tighter mb-8 text-[var(--primary-blue)]">
                CRAFTING <br /> 
                <span className="text-[var(--primary-blue)]/30 italic font-light">
                  THE RADIANCE
                </span>
              </h2>

              <p className="text-[var(--primary-blue)]/70 text-lg font-light leading-relaxed mb-12 max-w-md border-l border-[var(--primary-blue)]/10 pl-6">
                We apply the same rigor to silver artifacts that a jeweler applies to diamonds. Our "Mirror-Engineered" finish ensures every surface reflects perfection.
              </p>

              {/* Grid Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[var(--primary-blue)] font-bold tracking-widest text-[10px] uppercase">
                    <Hexagon size={14} className="text-[var(--primary-blue)]" /> Architectural Logic
                  </div>
                  <p className="text-[var(--primary-blue)]/50 text-xs leading-relaxed">Structural integrity met with mathematical symmetry.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[var(--primary-blue)] font-bold tracking-widest text-[10px] uppercase">
                    <Rocket size={14} className="text-[var(--primary-blue)]" /> Jewel-Standard
                  </div>
                  <p className="text-[var(--primary-blue)]/50 text-xs leading-relaxed">Hand-buffed to a zero-visible-pore mirror finish.</p>
                </div>
              </div>

              {/* CTA / Trust Mark */}
              <div className="mt-16 pt-8 border-t border-[var(--primary-blue)]/10 flex items-center gap-6">
                <div className="text-3xl font-black text-[var(--primary-blue)]/10 select-none tracking-tighter">HOS</div>
                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--primary-blue)]/40 leading-snug">
                  100% BIS Hallmarked <br /> Pure Silver Traceability
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Background Decor: Fine Grid Lines in Primary Blue */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <pattern id="grid-blue" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--primary-blue)" strokeWidth="0.1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-blue)" />
        </svg>
      </div>
    </section>
  );
};

export default CraftsmanshipUnique;