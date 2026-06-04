import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Briefcase, ShieldCheck } from 'lucide-react';

const SkillDevelopment = () => {
  const skills = [
    {
      icon: <Compass size={24} />,
      title: "Ancestral Artistry",
      desc: "We match experienced veteran silversmiths with the younger generation to pass down rare Rajkot metalworking secrets and delicate filigree techniques.",
      code: "HOS ACADEMY // DEPT 01"
    },
    {
      icon: <Briefcase size={24} />,
      title: "CAD & Tech Mastery",
      desc: "Artisans are trained in specialized computer-aided design (CAD) software and 3D precision layout methods to engineer perfect symmetry.",
      code: "HOS ACADEMY // DEPT 02"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Purity QA Auditing",
      desc: "We train our staff in standard BIS 925 Hallmark certification, quality control checks, and modern metal analysis to ensure absolute trust.",
      code: "HOS ACADEMY // DEPT 03"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white text-[var(--primary-blue)] font-outfit overflow-hidden relative">
      
      {/* Background Decor */}
      {/* <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="gridPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="60" y2="0" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div> */}

      <div className="container mx-auto px-6  relative z-10">
        
        {/* --- HEADER (Asymmetrical Layout) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-xl space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-[1.5px] bg-[var(--primary-blue)] opacity-30" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">02 / SKILL DEVELOPMENT</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase leading-none">
              Skill Development <br />
              <span className="opacity-30 font-light italic">Program</span>
            </h2>
          </div>
          <div className="max-w-lg md:text-right">
            <p className="text-sm opacity-60 font-light leading-relaxed md:text-justify md:text-right">
              At House of Shah, we believe that exceptional craftsmanship begins with skilled hands. As part of our commitment to strengthening Indian manufacturing, we actively invest in training and upskilling local talent, equipping artisans with modern jewellery production techniques, precision manufacturing skills, and evolving industry knowledge. By nurturing talent within our own communities, we aim to preserve craftsmanship, create sustainable employment opportunities, and contribute to the growth of a stronger, more self-reliant jewellery manufacturing ecosystem.
            </p>
          </div>
        </div>

        {/* --- 3-COLUMN SHARP CARD BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative p-6 md:p-10 bg-white border border-[var(--primary-blue)]/5 rounded-none hover:border-[var(--primary-blue)]/20 hover:shadow-[0_30px_60px_-15px_rgba(26,65,115,0.06)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Icon Box with Sharp Borders */}
                <div className="mb-10 inline-flex p-4 border border-[var(--primary-blue)]/10 rounded-none bg-[var(--silver-bg)] text-[var(--primary-blue)] group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-all duration-500 group-hover:scale-105">
                  {skill.icon}
                </div>
                
                <h3 className="text-lg font-bold tracking-tight mb-4 uppercase">
                  {skill.title}
                </h3>
                
                <p className="text-xs opacity-60 font-light leading-relaxed mb-8">
                  {skill.desc}
                </p>
              </div>

              {/* Card Footer Code Accent */}
              <div className="pt-6 border-t border-[var(--primary-blue)]/5 flex justify-between items-center text-[9px] font-black uppercase tracking-wider opacity-40 group-hover:opacity-85 transition-opacity">
                <span>{skill.code}</span>
                <span className="w-1.5 h-1.5 bg-[var(--primary-blue)]" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillDevelopment;
