import React from 'react';
import { motion } from 'framer-motion';
import empowerImg from '../../aasets/Women Empowerment.png';

const WomenEmpowerment = () => {
  return (
    <section className="py-10 md:py-14 bg-[var(--silver-bg)] text-[var(--primary-blue)] font-outfit overflow-hidden relative">
      
      {/* Subtle Background Watermark */}
      <div className="absolute bottom-10 right-10 text-[110px] font-black opacity-[0.02] select-none tracking-tighter leading-none pointer-events-none hidden lg:block">
        EMPOWERMENT
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Image Frame (5 cols - Rendered first on desktop for alternate layout) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full order-2 lg:order-1 overflow-hidden shadow-md rounded-none"
          >
            <img 
              src={empowerImg} 
              alt="Women Empowerment Crafting"
              className="w-full h-auto block transition-transform duration-700 hover:scale-105"
            />
            
            {/* Corner Badge */}
            {/* <div className="absolute top-6 right-6 bg-[var(--primary-blue)] text-white p-4 shadow-lg rounded-none">
              <span className="text-[8px] font-bold tracking-widest uppercase block mb-1">Grassroots</span>
              <span className="text-sm font-bold tracking-tighter block leading-none">Social Change</span>
            </div> */}
          </motion.div>

          {/* Right Column: Text Content & Stats (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 order-1 lg:order-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--primary-blue)]/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">01 / SOCIAL UPLIFTMENT</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase leading-tight">
              Women <br />
              <span className="opacity-30 italic font-light">Empowerment</span>
            </h2>

            <div className="w-20 h-[2px] bg-[var(--primary-blue)]" />

            <p className="text-sm opacity-70 font-light leading-relaxed border-l-2 border-[var(--primary-blue)]/10 pl-6">
             While women form a significant part of the jewellery industry's consumer base, their representation within jewellery manufacturing remains limited. At House of Shah, we are committed to helping bridge this gap.

<br/><br/>
             To support this vision, HOS launched a dedicated initiative, training women from nearby villages and small towns in jewellery manufacturing processes. Beyond vocational training, the program also supports continued education, offering opportunities for women to pursue further education through evening schooling if they choose.

<br/><br/>
             Today, 85+ women are part of the HOS workforce, contributing their skills, dedication, and craftsmanship to the brand's journey. Their growth and success remain an important part of our purpose beyond jewellery.
            </p>

            {/* Custom High-Contrast Stats Block */}
            {/* <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[var(--primary-blue)]/10">
              <div className="relative">
                <div className="absolute top-0 left-0 w-[1px] h-10 bg-[var(--primary-blue)]/20" />
                <div className="pl-4">
                  <span className="text-4xl font-black block tracking-tight text-[var(--primary-blue)]">60%+</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest opacity-50 block mt-1">Artisan Workforce</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-0 w-[1px] h-10 bg-[var(--primary-blue)]/20" />
                <div className="pl-4">
                  <span className="text-4xl font-black block tracking-tight text-[var(--primary-blue)]">450+</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest opacity-50 block mt-1">Women Certified</span>
                </div>
              </div>
            </div> */}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WomenEmpowerment;
