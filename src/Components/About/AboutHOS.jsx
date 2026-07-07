import React from 'react';
import { motion } from 'framer-motion';
import rpLogoImg from '../../aasets/RP Logo.jpg (2).jpeg';

const AboutHOS = () => {
  return (
    <section className="py-10 md:py-14 bg-white text-[#1a4173] font-outfit overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* About HOS Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-32">
          {/* Left: Sticky Title */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#1a4173]/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">The Brand</span>
              </div>
              <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-[0.9]">
                About <br/><span className="text-[#1a4173]/30 font-light italic">HOS</span>
              </h2>
              <div className="w-24 h-1 bg-[#1a4173] mt-8 mb-8" />
            </motion.div>
          </div>

          {/* Right: Paragraphs */}
          <div className="lg:col-span-7 space-y-8 text-base md:text-lg font-light leading-relaxed text-[#1a4173]/80">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <strong className="font-semibold text-[#1a4173]">Founded in 2023</strong> by siblings Hitanshu and Heer Shah, House Of Shah was born from a shared vision to create high-finish 925 sterling silver jewellery that could stand alongside imported designs in both quality and craftsmanship.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
             Specialising in lightweight silver jewellery, HOS focuses on creating fashion-forward collections for contemporary wearers while partnering with retailers, online brands, and boutiques to develop customised designs. Today, the brand is a trusted manufacturing partner to leading jewellery brands across India.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              With complete in-house control over designing, manufacturing, plating, and quality checks, the brand offers a wide range of finishing options including rhodium, gold, and rose gold plating. Every piece is crafted using premium-quality stones and undergoes multiple stages of stringent quality control to ensure hallmarked jewellery that meets the highest standards.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Beyond jewellery, HOS strongly believes in building opportunities through craftsmanship. The brand actively trains and upskills local Gujarati workers, transforming raw talent into skilled artisans while maintaining complete control over production quality and finishing.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Having participated in leading industry exhibitions including Silver Show of India (SSI) and India International Jewellery Show (IIJS), HOS continues to grow with the vision of taking Indian-designed sterling silver jewellery to the global market.
            </motion.p>
          </div>
        </div>

        {/* Our Legacy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start bg-[#fafafa] rounded-[2rem] p-8 md:p-16 border border-gray-100 relative overflow-hidden">

          {/* Background Decorative Letter */}
          <div className="absolute top-10 right-10 text-[200px] font-black text-[#1a4173]/[0.02] select-none pointer-events-none leading-none">
            1944
          </div>

          {/* Left: Sticky Title */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:order-last z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Image replacing the title */}
              <div className="rounded-[2rem] overflow-hidden shadow-md border border-[#1a4173]/10 bg-white p-2">
                <img
                  src={rpLogoImg}
                  alt="Raichand Premchand Logo"
                  className="w-full h-auto object-cover rounded-[1.5rem] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>

          {/* Right: Paragraphs */}
          <div className="lg:col-span-7 space-y-8 text-base md:text-lg font-light leading-relaxed text-[#1a4173]/80 z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              The roots of House Of Shah trace back to 1944, when <strong className="font-semibold text-[#1a4173]">Shah Raichand Premchand & Co.</strong> was founded by Raichand Premchand Shah in Rajkot with a vision centered around silver craftsmanship.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Over the decades, the business evolved through generations, each contributing new ideas and innovations to the industry. Under the leadership of Arvind Raichand Shah, the company played a pioneering role in introducing casting silver jewellery in India, helping set new benchmarks for manufacturing and craftsmanship.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              With the entry of Hitesh Arvind Shah, the business further diversified into multiple departments beyond silver. His focus on capital expansion and semi in-house production helped the company scale steadily while strengthening its manufacturing capabilities and operational foundation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Today, that same spirit of innovation and adaptability continues through the fourth generation, as siblings Heer and Hitanshu Shah carry the legacy forward with HOS.
            </motion.p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutHOS;
