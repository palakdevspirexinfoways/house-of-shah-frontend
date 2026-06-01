import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Microscope, ScanText, FileSpreadsheet, Scale, Zap } from 'lucide-react';

const QualityAssurancePremium = () => {
  const protocols = [
    {
      icon: <Scale size={24} />,
      title: "Atomic Purity Scan",
      desc: "Every milligram of silver undergoes rigorous XRF analysis to ensure it meets our 99.9% purity benchmark before crafting begins.",
      stat: "99.9% Pure"
    },
    {
      icon: <ScanText size={24} />,
      title: "Architectural QC",
      desc: "Verification of structural integrity and mathematical symmetry to ensure zero micro-fissures in every geometric form we engineer.",
      stat: "Zero Defects"
    },
    {
      icon: <Microscope size={24} />,
      title: "10x Magnification",
      desc: "A final visual audit under high-magnification lenses, ensuring a flawless, pore-free mirror surface that reflects perfection.",
      stat: "Hand-Buffed"
    },
    {
      icon: <FileSpreadsheet size={24} />,
      title: "Hallmark Traceability",
      desc: "Full transparency logs documenting the artifact's journey—from raw silver ingot to the official government hallmark seal.",
      stat: "BIS Hallmark"
    }
  ];

  return (
    <section className="py-24 bg-[var(--silver-bg)] text-[var(--primary-blue)] font-outfit overflow-hidden relative">
      
      {/* Background Decor (Subtle Geometric Pattern) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[1.5px] bg-[var(--primary-blue)] opacity-30" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">The HOS Protocol</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
              Clinical Precision <br />
              <span className="opacity-20 font-light italic">as a Standard.</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-50 max-w-xs ml-auto font-light leading-relaxed">
              At House of Shah, we don't just inspect; we engineer trust through a rigorous multi-stage validation protocol.
            </p>
          </div>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocols.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 bg-[var(--white)] border border-[var(--primary-blue)]/5 rounded-3xl hover:border-[var(--primary-blue)]/20 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(26,65,115,0.08)]"
            >
              {/* Top Accent Icon */}
              <div className="mb-12 inline-flex p-4 rounded-2xl bg-[var(--silver-bg)] text-[var(--primary-blue)] group-hover:bg-[var(--primary-blue)] group-hover:text-[var(--white)] transition-all duration-500">
                {item.icon}
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest">
                  {item.title}
                </h3>
                <p className="opacity-50 text-sm font-light leading-relaxed h-20">
                  {item.desc}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 pt-6 border-t border-[var(--primary-blue)]/5 flex justify-between items-center">
                <span className="text-[10px] font-bold opacity-20 uppercase tracking-tighter italic">Precision Log</span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{item.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM TRUST BAR (Solid Brand Block) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 p-8 rounded-[2.5rem] bg-[var(--primary-blue)] text-[var(--white)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Glow Decor */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--white)]/5 rounded-full blur-3xl" />
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-14 h-14 rounded-full border border-[var(--white)]/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="opacity-80" />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight">BIS Hallmark Traceability</h4>
              <p className="opacity-50 text-[11px] font-light uppercase tracking-widest">The Gold Standard of Silver Purity since 2023.</p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="px-7 py-3.5 rounded-full border border-[var(--white)]/10 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--white)] hover:text-[var(--primary-blue)] transition-all cursor-default">
              ISO Certified
            </div>
            <div className="px-7 py-3.5 rounded-full border border-[var(--white)]/10 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--white)] hover:text-[var(--primary-blue)] transition-all cursor-default">
              Pure Silver 999
            </div>
          </div>
        </motion.div>

        {/* Sub-Footer Signature */}
        <div className="mt-12 text-center opacity-10">
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-[var(--primary-blue)]">Perfecting the Soul of Silver</span>
        </div>

      </div>
    </section>
  );
};

export default QualityAssurancePremium;