import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Compass, History } from 'lucide-react';

const credentials = [
  {
    id: 1,
    icon: <History size={32} strokeWidth={1} />,
    title: "Established 2011",
    tagline: "EST. 2011",
    desc: "Over a decade of architectural-grade precision and unmatched silver jewellery artistry."
  },
  {
    id: 2,
    icon: <Award size={32} strokeWidth={1} />,
    title: "BIS Hallmarked",
    tagline: "100% CERTIFIED PURITY",
    desc: "Every single creation carries the stamp of absolute trust and authentic purity certification."
  },
  {
    id: 3,
    icon: <Globe size={32} strokeWidth={1} />,
    title: "Global Shipping",
    tagline: "WORLDWIDE LUXURY EXPRESS",
    desc: "Delivering Rajkot's finest silver craft to discerning patrons across the globe safely."
  },
  {
    id: 4,
    icon: <Compass size={32} strokeWidth={1} />,
    title: "Bespoke Design",
    tagline: "INDIVIDUALIZED ATELIER",
    desc: "Our collaborative design lab converts your unique imagination into physical 3D silver reality."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[var(--white)] font-outfit overflow-hidden border-t border-[var(--primary-blue)]/5">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--primary-blue)]/60 font-bold tracking-[0.5em] uppercase text-[10px] block mb-4"
          >
            Brand Credentials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[var(--primary-blue)] tracking-tighter leading-tight"
          >
            Pillars of <span className="font-light italic text-[var(--primary-blue)]/50">Trust & Legacy</span>
          </motion.h2>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {credentials.map((cred, index) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[var(--silver-bg)] p-10 rounded-[2.5rem] border border-[var(--primary-blue)]/5 flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--primary-blue)]/5 hover:bg-white group"
            >
              {/* Top Section: Icon and Tagline */}
              <div>
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[var(--primary-blue)] border border-[var(--primary-blue)]/5 mb-8 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-[var(--primary-blue)] group-hover:text-white">
                  {cred.icon}
                </div>
                <span className="text-[9px] font-bold text-[var(--primary-blue)]/40 uppercase tracking-[0.3em] block mb-3">
                  {cred.tagline}
                </span>
                <h3 className="text-2xl font-bold text-[var(--primary-blue)] tracking-tight mb-4">
                  {cred.title}
                </h3>
              </div>

              {/* Bottom Section: Description */}
              <p className="text-xs sm:text-sm text-[var(--primary-blue)]/70 font-light leading-relaxed">
                {cred.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;