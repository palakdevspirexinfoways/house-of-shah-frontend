import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="relative h-auto pt-24 pb-32 lg:py-0 lg:h-[80vh] w-full overflow-hidden bg-[var(--white)] font-outfit flex items-center">

      {/* --- BACKGROUND LAYER: Clean & Premium --- */}
      <div className="absolute inset-0 z-0 bg-[var(--white)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--primary-blue)/10,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary-blue)/5,transparent_60%)]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Headline */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[var(--primary-blue)]" />
                <span className="text-[var(--primary-blue)] font-bold tracking-[0.6em] uppercase text-[10px]">
                  ESTABLISHED 2023 • RAJKOT
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-[var(--primary-blue)] leading-[0.9] tracking-tighter mb-8">
                HOS <br />
                Values and <br />
                <span className="text-[var(--primary-blue)]/40 italic font-light lowercase">
                    Initiatives
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Right Column: Narrative & Action */}
          <div className="lg:col-span-5 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative lg:pl-10"
            >
              <p className="text-[var(--primary-blue)]/70 text-lg md:text-xl font-light leading-relaxed mb-10 tracking-wide">
                At HOS, <span className="font-semibold text-[var(--primary-blue)]">our vision extends beyond jewellery manufacturing. Through initiatives focused on women empowerment, skill development, and the promotion of Make in India manufacturing, </span> 
                 we are committed to creating meaningful impact alongside timeless craftsmanship. 
              </p>

              <div className="flex flex-col gap-6">
                <Link to="/womenempowerment" className="inline-block">
                  <motion.button
                    whileHover={{ x: 10 }}
                    className="flex flex-row items-center gap-4 sm:gap-6 group w-fit"
                  >
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest sm:tracking-[0.4em] text-[var(--primary-blue)] group-hover:text-black transition-colors text-left leading-relaxed">Discover Our Initiatives</span>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[var(--primary-blue)]/20 flex items-center justify-center text-[var(--primary-blue)] group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-all duration-500 shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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