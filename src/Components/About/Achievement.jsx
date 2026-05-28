import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Box, Globe, Star } from 'lucide-react';

const LegacyBlueprint = () => {
  const milestones = [
    {
      year: "2011",
      value: "15+",
      label: "Years of Mastery",
      desc: "Started with a vision to redefine Rajkot's silver craftsmanship through architectural logic.",
      icon: <Box size={18} />
    },
    {
      year: "2018",
      value: "500+",
      label: "Global Clients",
      desc: "Expanding footprints across borders, delivering engineered elegance to luxury homes.",
      icon: <Globe size={18} />
    },
    {
      year: "2024",
      value: "1.2k",
      label: "Masterpieces",
      desc: "A portfolio of unique artifacts, each carrying a story of mathematical symmetry.",
      icon: <MousePointer2 size={18} />
    },
    {
      year: "2026",
      value: "100%",
      label: "Purity Legacy",
      desc: "Setting the gold standard for silver with 100% BIS Hallmarked traceability.",
      icon: <Star size={18} />
    }
  ];

  return (
    <section className="py-32 bg-[var(--silver-bg)] text-[var(--primary-blue)] font-outfit overflow-hidden relative">
      
     
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-2xl mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-[1px] bg-[var(--primary-blue)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">The Journey of Precision</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
            Engineering <br />
            <span className="opacity-30 italic font-light">Success Since 2011.</span>
          </h2>
        </div>

        {/* Timeline Path Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[var(--primary-blue)]/10">
          {milestones.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="relative pt-12 pb-20 group hover:bg-[var(--white)] transition-all duration-700 px-8"
            >
              {/* Animated Connector Line */}
              <div className="absolute top-0 left-0 w-[1px] h-0 group-hover:h-full bg-[var(--primary-blue)]/10 transition-all duration-1000" />
              
              {/* Year & Icon Label */}
              <div className="flex items-center justify-between mb-16">
                <span className="text-[10px] font-black tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
                  {item.year}
                </span>
                <div className="p-2 rounded-full border border-[var(--primary-blue)]/10 opacity-20 group-hover:opacity-100 transition-all">
                  {item.icon}
                </div>
              </div>

              {/* Big Value */}
              <div className="mb-6 relative">
                <motion.h3 
                  className="text-7xl font-bold tracking-tighter leading-none"
                >
                  {item.value}
                </motion.h3>
                <div className="absolute -bottom-2 left-0 w-0 group-hover:w-12 h-[2px] bg-[var(--primary-blue)] transition-all duration-500" />
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest">{item.label}</h4>
                <p className="text-sm opacity-40 font-light leading-relaxed group-hover:opacity-70 transition-opacity">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Decorative Number */}
              <div className="absolute bottom-6 right-8 text-[40px] font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity italic">
                {idx + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA / Status */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-12 border-t border-[var(--primary-blue)]/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
            Precision Built Legacy // Rajkot, India
          </p>
          <div className="flex gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black opacity-20 uppercase">Crafting Jewellery of</span>
              <span className="text-xs font-bold tracking-tighter">Global Stature</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LegacyBlueprint;