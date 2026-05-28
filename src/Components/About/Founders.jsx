import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

const foundersData = [
  {
    name: "Rahul Shah",
    role: "Co-Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    bio: "With a visionary approach to craftsmanship, Rahul brings decades of passion for fine silver jewelry, blending traditional artistry with modern elegance.",
  },
  {
    name: "Priya Shah",
    role: "Co-Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bio: "The creative soul of House of Shah, Priya meticulously curates designs that resonate with global aesthetics while honoring authentic Indian heritage.",
  }
];

const Founders = () => {
  return (
    <section className="bg-[#fafafa] py-20 font-outfit overflow-hidden text-[#1a4173]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Header Section (Matching the Blue/Silver Brand Theme and Screenshot Accents) */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a4173] tracking-widest uppercase inline-flex items-center justify-center gap-3 md:gap-4">
            <span className="w-[3px] h-7 md:h-9 bg-[#1a4173] inline-block rounded-full animate-pulse" />
            Meet Our Team
            <span className="w-[3px] h-7 md:h-9 bg-[#1a4173] inline-block rounded-full animate-pulse" />
          </h2>
          <p className="text-[#1a4173]/70 font-serif italic text-sm md:text-base mt-3 tracking-wide">
            We Are The Best Team
          </p>
        </div>

        {/* Founders Grid */}
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mx-auto">
          {foundersData.map((founder, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-white aspect-[3/4] w-full max-w-[360px] mx-auto shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-none border border-gray-100"
            >
              {/* Image */}
              <img 
                src={founder.image} 
                alt={founder.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              />

              {/* Hover sliding details box (matching the exact style in screenshot + website theme) */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10">
                <h3 className="text-lg font-bold text-[#1a4173] tracking-wider uppercase mb-1">
                  {founder.name}
                </h3>
                <p className="text-xs text-[#1a4173]/80 font-semibold mb-3 uppercase tracking-wider">
                  {founder.role}
                </p>
                
                {/* Bio text */}
                <p className="text-[#1a4173]/70 text-xs md:text-sm leading-relaxed mb-5 font-light">
                  {founder.bio}
                </p>

                {/* Social icons */}
                <div className="flex justify-center gap-4 text-[#1a4173]/40">
                  <a href="#" className="hover:text-[#1a4173] transition-colors duration-200">
                    <FaLinkedinIn size={16} />
                  </a>
                  <a href="#" className="hover:text-[#1a4173] transition-colors duration-200">
                    <FaTwitter size={16} />
                  </a>
                  <a href="#" className="hover:text-[#1a4173] transition-colors duration-200">
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Founders;