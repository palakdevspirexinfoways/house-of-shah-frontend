import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Landmark, ShieldCheck, Cpu } from 'lucide-react';

const MakeInIndia = () => {
  const phases = [
    {
      step: "01",
      name: "Raw Vaulting",
      desc: "99.9% pure silver ingots sourced from certified standard vaults, scanned for base metal trace elimination."
    },
    {
      step: "02",
      name: "CAD Symmetry",
      desc: "Translating heritage shapes into 3D blueprints with zero-tolerance math to guide handcrafting karigars."
    },
    {
      step: "03",
      name: "Karigar Filigree",
      desc: "Delicate Rajkot wirework soldered under high magnification, hand-polished to a clean mirror finish."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--silver-bg)] text-[var(--primary-blue)] font-outfit overflow-hidden relative">
      
      {/* Decorative Blueprint Grid Background */}
      {/* <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="blueprintGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="40" cy="40" r="1.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprintGrid)" />
        </svg>
      </div> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Haute Couture Text & Editorial Layout (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Badge */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">01 / NATIONAL VALUE CHAIN</span>
                <div className="w-12 h-[1px] bg-[var(--primary-blue)]/30" />
                <span className="text-[9px] font-mono tracking-widest opacity-40">COORD. [22.3039° N, 70.8022° E]</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                Make In India <br />
                <span className="opacity-20 font-light italic text-3xl md:text-5xl">Clinical Atelier</span>
              </h2>
            </div>

            {/* Premium Editorial Quote Block */}
            <p className="text-base font-light italic leading-relaxed text-[var(--primary-blue)]/80 border-l-2 border-[var(--primary-blue)]/30 pl-6 max-w-2xl">
              "House of Shah is committed to building a stronger manufacturing ecosystem through in-house production, advanced technology, and a deep respect for Indian craftsmanship. By combining generations of jewellery expertise with modern manufacturing capabilities, we create contemporary 925 sterling silver jewellery that is proudly designed and manufactured in India.
              Our commitment to Make in India reflects a belief that world-class quality, innovation, and craftsmanship can be built at home and shared with the world.
"
            </p>

            {/* Atelier Phase Timeline (Blueprint Panels) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[var(--primary-blue)]/10">
              {phases.map((phase, idx) => (
                <div key={idx} className="space-y-3 relative group">
                  {/* Subtle top index bar */}
                  <div className="flex justify-between items-center text-[9px] font-black tracking-widest opacity-35 group-hover:opacity-100 transition-opacity">
                    <span>PHASE // {phase.step}</span>
                    <span className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-none" />
                  </div>
                  <div className="w-full h-[1px] bg-[var(--primary-blue)]/10 group-hover:bg-[var(--primary-blue)]/40 transition-colors" />
                  <h3 className="text-xs font-black uppercase tracking-wider">{phase.name}</h3>
                  <p className="text-[11px] opacity-60 font-light leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Layered 3D Overlapping Collage (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-[380px] md:h-[460px] flex items-center justify-center">
            
            {/* Blueprint Grid Crosshair Accent */}
            <div className="absolute top-10 left-10 w-8 h-8 border-l border-t border-[var(--primary-blue)]/15 pointer-events-none hidden sm:block" />
            <div className="absolute bottom-10 right-10 w-8 h-8 border-r border-b border-[var(--primary-blue)]/15 pointer-events-none hidden sm:block" />

            {/* Structural Outline Frame */}
            <div className="absolute -inset-4  rounded-none pointer-events-none hidden sm:block" />

            {/* Back Card: Raw Crafting Process */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 0.85, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute w-[200px] md:w-[240px] aspect-square left-0 top-6 bg-white p-3 border border-[var(--primary-blue)]/5 shadow-md rounded-none group z-10"
            >
              <div className="w-full h-full overflow-hidden bg-[var(--silver-bg)] rounded-none">
                <img 
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500&auto=format&fit=crop" 
                  alt="Raw silver hand forging" 
                  className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Front Card: Finished Premium Piece */}
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute w-[200px] md:w-[240px] aspect-square right-2 bottom-6 bg-white p-3 border border-[var(--primary-blue)]/10 shadow-2xl rounded-none group z-20"
            >
              <div className="w-full h-full overflow-hidden bg-[var(--silver-bg)] rounded-none">
                <img 
                  src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80" 
                  alt="Finished luxury silver silverware" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Floating Blueprint Stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--primary-blue)] text-white p-5 shadow-2xl rounded-none w-[170px] z-30 flex flex-col justify-between border border-white/10"
            >
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[7px] font-black tracking-widest text-white/50">
                  <span>BLUEPRINT ORIGIN</span>
                  <Compass size={8} className="animate-spin-slow" />
                </div>
                <span className="text-xs font-black tracking-tight block">RAJKOT, GUJ</span>
              </div>
              <div className="w-full h-[1px] bg-white/20 my-2.5" />
              <div className="flex justify-between items-center">
                <span className="text-[7px] font-bold tracking-widest opacity-60 uppercase">100% HOMESPUN</span>
                <span className="text-[7px] font-mono opacity-50">[IN]</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MakeInIndia;
