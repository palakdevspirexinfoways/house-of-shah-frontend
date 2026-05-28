import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Landmark } from 'lucide-react';

const StorySectionClean = () => {
  return (
    <section className="py-20 bg-[var(--silver-bg)] font-outfit overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* --- TOP: CLEAN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left: Text Content - Updated for English Emotional Connect */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-[1px] bg-[var(--primary-blue)]/30" />
               <span className="text-[var(--primary-blue)] font-bold tracking-[0.3em] uppercase text-[10px]">
                  A Legacy of Trust
               </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-blue)] leading-tight mb-6 tracking-tighter">
                Generations of Artistry, <br />
                <span className="font-light italic text-[var(--primary-blue)]/40">An Unbreakable Bond</span>
            </h2>
            
            <p className="text-[var(--primary-blue)]/70 leading-relaxed text-sm font-light max-w-xl">
              The foundation of House of Shah was laid in the heritage-rich lanes of Rajkot, where silver is more than just a metal—it is a symbol of prosperity and tradition. Since 2011, our journey has been driven by a single promise: to craft silver that mirrors your most precious moments with absolute purity and heartfelt devotion.
            </p>
          </motion.div>

          {/* Right: Clean Image Structure */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <img 
                src="https://jewelrydesigns.com/wp-content/uploads/ER1-Shop-Diamond-Engagement-Rings-1080X1080.jpg" 
                className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700 object-center" 
                alt="Silver Craft" 
              />
            </motion.div>

            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-50">
                <span className="text-[9px] font-bold uppercase tracking-widest text-center text-[var(--primary-blue)] leading-tight">
                  15 Years <br /> of Trust
                </span>
            </div>
          </div>
        </div>
        
        {/* --- BOTTOM: 3-COLUMN BADGES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Landmark size={20} />, 
              title: "Rajkot's Heritage", 
              desc: "Every creation is infused with the soul and meticulous skill of Rajkot’s master silversmiths." 
            },
            { 
              icon: <Award size={20} />, 
              title: "Promise of Purity", 
              desc: "100% BIS Hallmarked silver, ensuring your investment and trust remain forever secure." 
            },
            { 
              icon: <Target size={20} />, 
              title: "Crafted with Soul", 
              desc: "We don't just build artifacts; we shape every design as a vessel for your deepest emotions." 
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-gray-50 rounded-xl text-center border border-transparent hover:border-gray-200 transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-[var(--primary-blue)] mx-auto mb-4 shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 text-[var(--primary-blue)]">{item.title}</h4>
              <p className="text-[12px] text-[var(--primary-blue)]/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StorySectionClean;