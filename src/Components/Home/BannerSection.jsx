import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    // Height ko 80vh kiya hai taaki neeche ka content jaldi dikhe
    <section className="relative h-[80vh] w-full overflow-hidden bg-[#02060d] font-outfit flex items-center">

      {/* --- BACKGROUND LAYER: Cinematic & Deep --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://investingnews.com/media-library/silver-bars-on-shiny-metallic-surface.jpg?id=33569116&width=2000&height=1500&coordinates=138%2C0%2C139%2C0"
            alt="Silver Texture"
            className="w-full h-full object-cover grayscale brightness-70"
          />
        </motion.div>

        {/* Dynamic Light Stroke */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--primary-blue)/15,transparent_50%)]" />

        {/* Bottom Fade for Smooth Section Merging */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02060d]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Headline */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[var(--primary-blue)]" />
                <span className="text-[var(--primary-blue)] font-bold tracking-[0.6em] uppercase text-[10px]">
                  ESTABLISHED 2011 • RAJKOT
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white leading-[0.85] tracking-tighter mb-8">
                ULTRA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20 italic font-light">
                  Silver
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Right Column: Narrative & Action */}
          <div className="lg:col-span-4 lg:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative lg:pl-8 border-l border-white/10"
            >
              <p className="text-white/60 text-lg font-light leading-relaxed mb-10 tracking-wide">
                Where <span className="text-white">Architectural Precision</span> meets
                <span className="italic"> 99.9% Purity.</span> We engineer silver artifacts
                for global leaders who demand nothing less than perfection.
              </p>

              <div className="flex flex-col gap-6">
                <Link to="/womenempowerment">
                  <motion.button
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 text-white group"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Explore Products</span>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </motion.button>
                </Link>

              </div>
            </motion.div>
          </div>

        </div>
      </div>



    </section>
  );
};

export default HeroBanner;