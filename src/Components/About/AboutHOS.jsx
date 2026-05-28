import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Compass } from 'lucide-react';

const AboutHOS = () => {
  const hosPillars = [
    {
      letter: "H",
      title: "Honored Heritage",
      subtitle: "The Rajkot Artistry",
      desc: "Deeply rooted in the ancestral silver metalwork legacy of Rajkot, we collaborate with generations of master karigars. Every curve and hammer strike preserves centuries of rich Indian silver heritage, made relevant for the modern world.",
      icon: <Compass className="w-6 h-6 text-[#1a4173]" />
    },
    {
      letter: "O",
      title: "Omnipresent Purity",
      subtitle: "BIS 925 Hallmark",
      desc: "At House of Shah, trust is our most valuable metal. We assure 100% absolute traceability and BIS Hallmark purity certification on every single creation. Our commitment guarantees a pristine legacy that lasts generations.",
      icon: <Shield className="w-6 h-6 text-[#1a4173]" />
    },
    {
      letter: "S",
      title: "Symmetric Design",
      subtitle: "Mathematical Precision",
      desc: "Our design DNA blends fine art with architectural logic. We engineer each piece with strict geometric symmetry, resulting in structural balance and a hand-polished, mirror-engineered finish that reflects flawless luxury.",
      icon: <Sparkles className="w-6 h-6 text-[#1a4173]" />
    }
  ];

  return (
    <section className="py-24 bg-white text-[#1a4173] font-outfit overflow-hidden relative">
      
      {/* Decorative Brand Text Background */}
      <div className="absolute top-10 left-10 text-[120px] font-black opacity-[0.02] select-none tracking-tighter leading-none pointer-events-none hidden lg:block">
        HOUSE OF SHAH
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-[#1a4173]/30" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">The Brand Philosophy</span>
            <div className="w-8 h-[1px] bg-[#1a4173]/30" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase leading-none mb-6"
          >
            Defining The <br />
            <span className="opacity-30 italic font-light">H.O.S Signature</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#1a4173]/70 font-light text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            House of Shah (HOS) represents more than just exquisite silver jewelry. It is a philosophy where raw silver is refined through heritage, guaranteed with absolute purity, and sculpted with creative geometry.
          </motion.p>
        </div>

        {/* Dynamic H-O-S Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {hosPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative bg-[#fafafa] rounded-[2rem] p-8 md:p-10 border border-gray-100 hover:bg-white hover:border-[#1a4173]/10 hover:shadow-2xl transition-all duration-700 flex flex-col justify-between overflow-hidden"
            >
              {/* Massive watermarked letter in background of card */}
              <div className="absolute -top-10 -right-6 text-[150px] font-black text-[#1a4173]/[0.03] group-hover:text-[#1a4173]/[0.05] transition-colors select-none pointer-events-none">
                {pillar.letter}
              </div>

              <div>
                {/* Icon Circle */}
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 mb-8 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                  {pillar.icon}
                </div>

                {/* Subtitle Accent */}
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#1a4173]/50 uppercase block mb-1">
                  {pillar.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight text-[#1a4173] mb-4">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#1a4173]/70 font-light leading-relaxed mb-6">
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom Card Footer Accent */}
              <div className="pt-4 border-t border-gray-100/50 flex justify-between items-center mt-auto">
                <span className="text-[10px] font-bold tracking-widest text-[#1a4173]/40 group-hover:text-[#1a4173] transition-colors">
                  HOS // 0{idx + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#1a4173]/10 group-hover:bg-[#1a4173] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutHOS;
