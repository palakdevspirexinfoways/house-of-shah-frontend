import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const CounterItem = ({ value, title, suffix = "", index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    stiffness: 30, // Slow and smooth for premium feel
    damping: 15,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  );

  return (
    <div ref={ref} className="relative group p-12 flex flex-col items-center justify-center overflow-hidden">
     
      {/* Decorative vertical line (Modified for Rich Look) */}
      {index !== 3 && (
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-[var(--primary-blue)]/10 to-transparent" />
      )}
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-baseline gap-1">
          <motion.span className="text-6xl md:text-7xl font-bold text-[var(--primary-blue)] tracking-tighter leading-none">
            {displayValue}
          </motion.span>
          <span className="text-2xl md:text-3xl font-light text-[var(--primary-blue)]/30 italic">
            {suffix}
          </span>
        </div>
        
        <div className="mt-6 flex flex-col items-center">
          <div className="w-8 h-[1px] bg-[var(--primary-blue)]/20 mb-4 group-hover:w-16 transition-all duration-700" />
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-[var(--primary-blue)] font-black text-center leading-loose">
            {title}
          </p>
        </div>
      </div>

      {/* Aesthetic Border for Mobile Grid */}
      <div className="lg:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-blue)]/10 to-transparent absolute bottom-0" />
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 15, title: "Years of Mastery", suffix: "+" },
    { value: 500, title: "Bespoke Artifacts", suffix: "+" },
    { value: 99, title: "Purity Quotient", suffix: ".9%" },
    { value: 25, title: "Global Destinations", suffix: "" },
  ];

  return (
    <section className="py-32 bg-[var(--white)] relative overflow-hidden font-outfit">
      
    

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Main Stats Container - Floating Museum Style */}
        <div className="relative bg-[var(--white)] border border-[var(--primary-blue)]/5 rounded-[4rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.05)] overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <CounterItem 
                key={index}
                index={index}
                value={stat.value}
                title={stat.title}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
        
        {/* Quality Commitment Footer - Rich Styling */}
        <div className="mt-24 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-6 mb-10"
          >
            <div className="w-20 h-[1px] bg-gradient-to-l from-[var(--primary-blue)]/30 to-transparent" />
            <div className="w-2 h-2 rotate-45 border border-[var(--primary-blue)]/30" />
            <span className="text-[10px] font-bold tracking-[0.6em] text-[var(--primary-blue)]/40 uppercase">The Legacy  of <br className='sm:hidden' /> Excellence</span>
            <div className="w-2 h-2 rotate-45 border border-[var(--primary-blue)]/30" />
            <div className="w-20 h-[1px] bg-gradient-to-r from-[var(--primary-blue)]/30 to-transparent" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[var(--primary-blue)]/60 font-light italic text-2xl md:text-4xl tracking-tighter text-center max-w-3xl leading-tight"
          >
            "Engineering <span className="text-[var(--primary-blue)] font-normal not-italic">precision</span> into every gram, weaving <span className="text-[var(--primary-blue)] font-normal not-italic">trust</span> into every design."
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;