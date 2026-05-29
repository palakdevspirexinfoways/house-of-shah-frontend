import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const reasons = [
  { id: "01", title: " Plating Options", desc: "Nickel-free plating options available in gold, rose gold, silver, and rhodium finishes for enhanced durability, comfort, and refined aesthetics." },
  { id: "02", title: "Screw Options", desc: "Custom jewellery screw options including Bombay screw, Push screw, and South screw fittings tailored for comfort, security, and varied retail preferences." },
  { id: "03", title: "Meticulous", desc: "Strict quality control checks are conducted at every stage of the manufacturing process, including wax, casting, filling, buffing, and plating. A final visual audit then ensures a pore-free mirror finish with exceptional detailing and consistency." },
  { id: "04", title: " CAD-CAM Development ", desc: "Advanced CAD-CAM development enables precise product visualization, accurate prototyping, and efficient design execution for contemporary jewellery manufacturing." },
  { id: "05", title: "Laser & CNC Machining", desc: "Precision laser cutting and CNC machining technology allow for intricate detailing, sharp finishes, lightweight construction, and superior accuracy across every jewellery piece." }
];

const WhyUs = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hum direct transform use karenge, mobile par iska impact CSS handles karegi
  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section ref={containerRef} id="why" className="relative h-auto lg:h-[300vh] bg-white font-outfit">
      
      {/* Container: Desktop par sticky, mobile par simple relative block */}
      <div className="relative lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden pt-12 lg:pt-0">
        <div className="container mx-auto h-full px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row h-full items-start lg:items-center gap-10 lg:gap-0">
            
            {/* LEFT SIDE: Heading */}
            <div className="w-full lg:w-1/2 lg:pr-20 lg:border-r border-[var(--primary-blue)]/5 z-20 bg-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-[1px] bg-[var(--primary-blue)]/30" />
                  <span className="text-[var(--primary-blue)]/60 font-bold tracking-[0.5em] uppercase text-[10px]">The Distinction</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--primary-blue)] leading-[1.1] mb-8 tracking-tighter">
               Precision  Silver Jewellery <br />
                   
                 Manufacturing
                </h2>

                <div className="relative w-full h-[30vh] lg:h-[35vh] rounded-[2rem] overflow-hidden shadow-sm border border-[var(--primary-blue)]/5 mb-8">
                  <img 
                    src="https://plus.unsplash.com/premium_photo-1678834778658-9862d9987dd3?auto=format&fit=crop&q=80" 
                    alt="Silver Craftsmanship" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-[var(--primary-blue)]/70 text-base lg:text-lg font-light leading-relaxed max-w-sm">
                  Advanced 925 sterling silver jewellery manufacturing solutions combining CAD-CAM development, precision engineering, customized finishing, and stringent quality control.

                </p>
              </motion.div>
            </div>

            {/* RIGHT SIDE: List */}
            <div className="w-full lg:w-1/2 h-auto lg:h-screen relative flex flex-col justify-start lg:pt-[20vh] lg:pl-20 pb-20 lg:pb-0">
              {/* Desktop par transform work karega, mobile par disable karne ke liye simple div use karenge agar window width kam hai */}
              <motion.div 
                style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? yTranslate : 0 }} 
                className="space-y-6"
              >
                {reasons.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-[var(--silver-bg)] hover:bg-white p-8 lg:p-14 rounded-[2rem] lg:rounded-[2.5rem] border border-[var(--primary-blue)]/5 hover:border-[var(--primary-blue)]/20 transition-all duration-500 hover:shadow-xl"
                  >
                    <div className="flex flex-col gap-4 relative z-10">
                      <span className="text-3xl lg:text-4xl font-bold text-[var(--primary-blue)]/5 absolute top-0 right-0">
                        {item.id}
                      </span>
                      <div className="w-8 h-[2px] bg-[var(--primary-blue)]/10 group-hover:w-16 group-hover:bg-[var(--primary-blue)] transition-all duration-500" />
                      <h3 className="text-xl lg:text-2xl font-bold text-[var(--primary-blue)] tracking-tight">{item.title}</h3>
                      <p className="text-[var(--primary-blue)]/60 text-sm lg:text-base font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;