import React from 'react';
import { motion } from 'framer-motion';
import makeInIndia1 from '../../aasets/Make in India 1.png';
import makeInIndia2 from '../../aasets/Make in India 2.png';

const MakeInIndia = () => {
  return (
    <section className="py-10 md:py-14 bg-white text-[var(--primary-blue)] font-outfit overflow-hidden relative">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Haute Couture Text & Editorial Layout (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Header Badge */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">03 / Manufacturing Excellence</span>
                <div className="w-12 h-[1px] bg-[var(--primary-blue)]/30" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                Make In India <br />
              </h2>
            </div>

            {/* Premium Editorial Quote Block */}
            <p className="text-base font-light italic leading-relaxed text-[var(--primary-blue)]/80 border-l-2 border-[var(--primary-blue)]/30 pl-6 max-w-2xl">
              "House of Shah is committed to building a stronger manufacturing ecosystem through in-house production, advanced technology, and a deep respect for Indian craftsmanship. By combining generations of jewellery expertise with modern manufacturing capabilities, we create contemporary 925 sterling silver jewellery that is proudly designed and manufactured in India.
              Our commitment to Make in India reflects a belief that world-class quality, innovation, and craftsmanship can be built at home and shared with the world."
            </p>

          </div>

          {/* Right Column: Premium Layout based on image aspect ratios (7 cols) */}
          <div className="lg:col-span-7 flex items-center gap-6 md:gap-8 h-auto">
            {/* Image 1: Left (Raw Silver Hand Forging) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-[55%] aspect-[1300/888] overflow-hidden border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white group"
            >
              <img 
                src={makeInIndia1} 
                alt="Make in India Silver Jewelry Logo" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Image 2: Right (Finished Luxury Silverware - Offset Vertically) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-[45%] aspect-square overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] group"
            >
              <img 
                src={makeInIndia2} 
                alt="Indian artisan crafting sterling silver jewelry" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MakeInIndia;
