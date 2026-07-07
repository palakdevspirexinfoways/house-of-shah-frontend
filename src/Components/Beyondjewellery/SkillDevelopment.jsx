import React from 'react';
import { motion } from 'framer-motion';
import skillImg from '../../aasets/Skill Development 2.png';

const SkillDevelopment = () => {
  return (
    <section className="py-10 md:py-14 bg-white text-[var(--primary-blue)] font-outfit overflow-hidden relative">
      
      {/* Background Watermark */}
      {/* <div className="absolute top-10 right-10 text-[110px] font-black opacity-[0.02] select-none tracking-tighter leading-none pointer-events-none hidden lg:block">
        CRAFTSMANSHIP
      </div> */}

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER (Asymmetrical Layout) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 pb-8 border-b border-[var(--primary-blue)]/10">
          <div className="max-w-xl space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-[1.5px] bg-[var(--primary-blue)] opacity-30" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">02 / UPSKILLING TALENT</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase leading-none">
              Skill Development <br />
              <span className="opacity-30 font-light italic">Program</span>
            </h2>
          </div>
          {/* <div className="max-w-lg">
            <p className="text-sm opacity-60 font-light leading-relaxed text-left lg:text-right">
              Empowering local communities and building a self-reliant manufacturing ecosystem through structured training and craftsmanship.
            </p>
          </div> */}
        </div>

        {/* --- CONTENT LAYOUT (Split Screen with Image) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full aspect-square overflow-hidden shadow-md"
          >
            <img 
              src={skillImg} 
              alt="Skill Development Training"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Right Column: Premium Typographic Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="border-l-4 border-[var(--primary-blue)] pl-6 py-2">
              <h3 className="text-xl md:text-2xl font-bold leading-relaxed text-[var(--primary-blue)] tracking-tight">
                At HOS, we believe that skill development is the foundation of sustainable growth.
              </h3>
            </div>
            
            <div className="space-y-5 text-sm md:text-base font-light leading-relaxed text-[var(--primary-blue)]/80 pl-6">
              <p>
                We actively train individuals from nearby towns and local communities, equipping them with the technical skills required for silver jewellery manufacturing. Once trained, they become an integral part of our workforce, creating meaningful employment opportunities and long-term careers.
              </p>

              <p>
                By investing in people, we are strengthening India's rich legacy of craftsmanship while building a highly skilled manufacturing ecosystem. Our focus extends beyond creating exceptional jewellery to nurturing artisans who uphold the highest standards of quality, precision, and innovation.
              </p>

              <p>
                This commitment also supports the Make in India vision by developing indigenous talent, strengthening domestic manufacturing capabilities, and reducing reliance on imported production. We believe empowering local communities through skill development is key to building a stronger industry and positioning India as a global hub for fine jewellery manufacturing.
              </p>

              <p className="font-semibold text-[var(--primary-blue)]">
                For us, every artisan we train is an investment in India's future, its craftsmanship, and its manufacturing excellence.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default SkillDevelopment;
