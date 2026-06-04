import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaCheckCircle } from 'react-icons/fa';

const Founders = () => {
  return (
    <section className="bg-white py-16 md:py-24 font-outfit overflow-hidden text-[#1a4173]">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-[#1a4173]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-60">House Of Shah</span>
            <div className="w-12 h-[2px] bg-[#1a4173]" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a4173] tracking-tighter uppercase">
            Meet The <span className="opacity-30 italic font-light">Founders</span>
          </h2>
        </div>

        {/* Founder 1: Hitanshu Shah */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-24">
          
          {/* Left: Image Box */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] relative"
          >
            <div className="bg-[#eef3f7] rounded-sm relative overflow-hidden aspect-[4/5] shadow-sm">
              <div className="absolute top-6 left-6 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#1a4173] z-10 shadow-sm rounded-sm">
                Co-Founder
              </div>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                alt="Hitanshu Shah"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] flex flex-col justify-center pt-4"
          >
            <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">
              Hitanshu Shah
            </h3>
            
            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-8 text-sm lg:text-base">
              Founded in 2023 by siblings Hitanshu and Heer Shah, House Of Shah was born from a shared vision to create high-finish 925 sterling silver jewellery that could stand alongside imported designs in both quality and craftsmanship.
            </p>

            <div className="flex gap-4 text-[#1a4173]/50 mb-12 border-b border-gray-100 pb-8">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a4173] hover:text-white transition-all duration-300">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a4173] hover:text-white transition-all duration-300">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a4173] hover:text-white transition-all duration-300">
                <FaInstagram size={14} />
              </a>
            </div>

            <h4 className="text-2xl font-bold tracking-tight mb-6">
              Our Legacy
            </h4>
            
            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-8 text-sm lg:text-base">
              The roots of House Of Shah trace back to 1944, when Shah Raichand Premchand & Co. was founded by Raichand Premchand Shah in Rajkot with a vision centered around silver craftsmanship.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#1a4173] mt-1 flex-shrink-0" size={16} />
                <span className="text-[#1a4173]/80 font-light text-sm lg:text-base leading-relaxed">
                  Over the decades, the business evolved through generations, each contributing new ideas and innovations to the industry.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#1a4173] mt-1 flex-shrink-0" size={16} />
                <span className="text-[#1a4173]/80 font-light text-sm lg:text-base leading-relaxed">
                  With the entry of Hitesh Arvind Shah, focus on capital expansion and semi in-house production helped the company scale steadily.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#1a4173] mt-1 flex-shrink-0" size={16} />
                <span className="text-[#1a4173]/80 font-light text-sm lg:text-base leading-relaxed">
                  Today, that same spirit of innovation continues through the fourth generation to carry the legacy forward.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-100 my-20" />

        {/* Founder 2: Heer Shah */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-start">
          
          {/* Right: Image Box */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] relative"
          >
            <div className="bg-[#fcf8f5] rounded-sm relative overflow-hidden aspect-[4/5] shadow-sm">
              <div className="absolute top-6 left-6 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#1a4173] z-10 shadow-sm rounded-sm">
                Co-Founder
              </div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                alt="Heer Shah"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] flex flex-col justify-center pt-4"
          >
            <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">
              Heer Shah
            </h3>
            
            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-8 text-sm lg:text-base">
              Specialising in lightweight silver jewellery, HOS focuses on creating fashion-forward collections designed for contemporary wearers while also catering to customised designs for domestic retailers, online brands, and boutiques. Today, the brand also works with corporate clients such as GIVA.
            </p>

            <div className="flex gap-4 text-[#1a4173]/50 mb-12 border-b border-gray-100 pb-8">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a4173] hover:text-white transition-all duration-300">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a4173] hover:text-white transition-all duration-300">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a4173] hover:text-white transition-all duration-300">
                <FaInstagram size={14} />
              </a>
            </div>

            <h4 className="text-2xl font-bold tracking-tight mb-6">
              Vision & Craftsmanship
            </h4>
            
            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-8 text-sm lg:text-base">
              With complete in-house control over designing, manufacturing, plating, and quality checks, the brand offers a wide range of finishing options including rhodium, gold, and rose gold plating.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#1a4173] mt-1 flex-shrink-0" size={16} />
                <span className="text-[#1a4173]/80 font-light text-sm lg:text-base leading-relaxed">
                  Every piece is crafted using premium-quality stones and undergoes multiple stages of stringent quality control.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#1a4173] mt-1 flex-shrink-0" size={16} />
                <span className="text-[#1a4173]/80 font-light text-sm lg:text-base leading-relaxed">
                  The brand actively trains and upskills local Gujarati workers, transforming raw talent into skilled artisans.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#1a4173] mt-1 flex-shrink-0" size={16} />
                <span className="text-[#1a4173]/80 font-light text-sm lg:text-base leading-relaxed">
                  Having participated in leading industry exhibitions including SSI and IIJS, HOS continues to grow its global vision.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Founders;