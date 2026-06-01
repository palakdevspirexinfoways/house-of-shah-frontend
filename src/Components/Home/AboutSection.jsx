import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Gem, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  // Stats removed, Core Values reverted as per previous premium version
  const coreValues = [
    { icon: <Gem size={18} strokeWidth={1.5} />, label: "Premium Quality", detail: "92.5% Sterling Silver" },
    { icon: <Award size={18} strokeWidth={1.5} />, label: "Clinical Precision", detail: "Laser & CNC Machining" },
    { icon: <ShieldCheck size={18} strokeWidth={1.5} />, label: "Trust", detail: "Hallmarked Jewellery" },
    { icon: <Users size={18} strokeWidth={1.5} />, label: "Legacy", detail: "Decades of Craft" },
  ];

  return (
    <section id="about" className="py-24 bg-[var(--white)] overflow-hidden font-outfit relative">


      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* --- LEFT COLUMN: THE ICONIC BIG ARCH --- */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-t-full overflow-hidden border border-[var(--primary-blue)]/10 aspect-[4/5] bg-neutral-100"
            >
              {/* Circular Text Path - High-End Aesthetic */}


              <img
                src="https://i.pinimg.com/736x/bf/32/74/bf32740c33ecc88ab52afc6817b72064.jpg"
                className="w-full h-full object-cover"
                alt="Main Silver Piece"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-blue)]/20 to-transparent pointer-events-none" />

              {/* Know More Floating Circle Button */}

            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: REVERTED CONTENT & CORE VALUES --- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-[var(--primary-blue)]" />
                <span className="text-[var(--primary-blue)] font-bold tracking-[0.5em] uppercase text-[10px]">
                  SINCE 2023 • RAJKOT
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-[var(--primary-blue)] leading-[0.95] mb-10 tracking-tighter">
                Built On Legacy Crafted<br />
                <span className="font-light italic text-[var(--primary-blue)]/40">  With Purpose.
</span>
              </h2>

              <p className="text-[var(--primary-blue)]/70 leading-relaxed mb-12 text-lg font-light max-w-xl">
                <span className="font-semibold text-[var(--primary-blue)]">House of Shah</span>  is a new-age 925 sterling silver jewellery manufacturing house rooted in generations of expertise. Combining contemporary design sensibilities with advanced production techniques, we create refined collections tailored for evolving retail <span className="text-[var(--primary-blue)] italic">brands and modern consumers.</span>
              </p>

              {/* Core Values Grid (Instead of numeric stats) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-16">
                {coreValues.map((stat, index) => (
                  <div key={index} className="group/item flex items-start gap-5">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[var(--silver-bg)] rounded-lg text-[var(--primary-blue)] group-hover/item:bg-[var(--primary-blue)] group-hover/item:text-white transition-all duration-500">
                      {stat.icon}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--primary-blue)] mb-1">
                        {stat.label}
                      </h4>
                      <p className="text-[13px] font-light text-[var(--primary-blue)]/50 tracking-tight">{stat.detail}</p>
                    </div>
                  </div>
                ))}
              </div>


              <Link to="/about">
                <motion.button
                  whileHover={{ gap: '2rem' }}
                  className="group flex items-center gap-6 px-2 py-2 pr-8 bg-transparent border border-[var(--primary-blue)]/10 rounded-full transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-[var(--primary-blue)] rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--primary-blue)]">
                    Discover Our Legacy
                  </span>
                </motion.button>
              </Link>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;