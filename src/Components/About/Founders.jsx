import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import hitanshuImg from '../../aasets/Hitanshu Shah.jpg.jpeg';
import heerImg from '../../aasets/Heer Shah.jpeg';


const Founders = () => {
  return (
    <section className="bg-white py-10 md:py-14 font-outfit overflow-hidden text-[#1a4173]">
      <div className="container mx-auto px-6 lg:px-12 ">
        
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
                Director
              </div>
              <img 
                src={hitanshuImg} 
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
            
            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-4 text-sm lg:text-base">
              A fourth-generation jeweller and Director of House Of Shah, Hitanshu brings together tradition, technology, and modern design thinking through his creations. 
            </p>

            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-4 text-sm lg:text-base">
              In 2018, he entered the industry by launching SLG, a 68% purity silver jewellery brand, gaining hands-on business and manufacturing experience at an early stage. As his interest in jewellery design and production deepened, he went on to study Jewellery Designing and Manufacturing at Lorenzo de’ Medici in Florence, Italy, one of the world’s renowned institutes for jewellery design and craftsmanship. 
            </p>

            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-4 text-sm lg:text-base">
              In 2023, Hitanshu co-founded House Of Shah alongside Heer, with a shared vision of creating import-quality 925 sterling silver jewellery reimagined for a new generation. Deeply inspired by patterns, modern architecture, geometrical forms, and contemporary art, his design philosophy reflects a balance between precision and creativity. 
            </p>

            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-8 text-sm lg:text-base">
             At HOS, Hitanshu oversees manufacturing, product development, and production strategy, leveraging his technical expertise to drive innovation and uphold the brand's commitment to quality and precision craftsmanship.
            </p>

            <div className="flex gap-4 text-[#1a4173]/50 border-t border-gray-100 pt-8 mt-auto">
              <a href="https://www.linkedin.com/in/hitanshu-shah-42a6b1230/" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a4173] hover:text-white transition-all duration-300" target='_blank'>
                <FaLinkedinIn size={14} />
              </a>
            </div>
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
                Director
              </div>
              <img 
                src={heerImg} 
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
            
            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-4 text-sm lg:text-base">
              A fourth-generation jeweller and Director of House Of Shah, Heer grew up surrounded by the language of gems, diamonds, craftsmanship, and design. What began as a childhood fascination soon evolved into a desire to carry forward her family’s legacy.
            </p>

            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-4 text-sm lg:text-base">
              Heer pursued Entrepreneurship at the University of Delaware before earning her Bachelor’s degree from the Indian Institute of Gems and Jewellery, Mumbai. Her education, along with her internship experience at Kiran Diamonds - Surat, gave her a deep understanding of the jewellery-making journey, from manual designing and sourcing to production and final merchandising.
            </p>

            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-4 text-sm lg:text-base">
              After returning to Rajkot, Heer realized that while traditional jewellery carried a rich legacy, there was room for jewellery that felt more aligned with the tastes of modern wearers like herself. For her, this idea eventually became the foundation of House Of Shah.
            </p>

            <p className="text-[#1a4173]/70 leading-relaxed font-light mb-4 text-sm lg:text-base">
              As she built the brand alongside her brother, Heer also became increasingly aware of the gender imbalance within the jewellery manufacturing industry. In a space where the end consumers were largely women, female representation behind the scenes remained limited. This realization inspired HOS’s larger purpose beyond jewellery itself, leading to initiatives focused on women empowerment and skill development.
            </p>

            <div className="mb-4 mt-2">
              <Link to="/womenempowerment" className="inline-flex items-center gap-2 text-[#1a4173] font-medium text-sm lg:text-base hover:opacity-80 transition-opacity">
                Explore Beyond Jewellery <span className="text-lg">→</span>
              </Link>
            </div>

            <div className="flex gap-4 text-[#1a4173]/50 border-t border-gray-100 pt-8 mt-auto">
              <a href="https://www.linkedin.com/in/heer-shah-084863333/" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a4173] hover:text-white transition-all duration-300" target='_blank'>
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Founders;