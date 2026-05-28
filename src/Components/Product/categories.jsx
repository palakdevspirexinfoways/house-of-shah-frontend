import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const categoriesData = [
  {
    id: "necklaces",
    name: "Necklaces",
    thumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300&auto=format&fit=crop",
    items: [
      {
        id: "sp-n1",
        title: "Royal Rajkot Queen Choker",
        weight: "92.5g",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sp-n2",
        title: "Empress Antique Collar Set",
        weight: "74.0g",
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sp-n3",
        title: "Symmetric Geometric Collar",
        weight: "58.4g",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "earrings",
    name: "Earrings",
    thumbnail: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=300&auto=format&fit=crop",
    items: [
      {
        id: "sp-e1",
        title: "Heritage Handcrafted Chandbalis",
        weight: "28.2g",
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sp-e2",
        title: "Modernist Drop Studs",
        weight: "12.5g",
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sp-e3",
        title: "Classic Kundan Hanging Drops",
        weight: "20.1g",
        image: "https://images.unsplash.com/photo-1588444839799-eb0c991a16a7?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "rings",
    name: "Rings",
    thumbnail: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&auto=format&fit=crop",
    items: [
      {
        id: "sp-r1",
        title: "Crown Filigree Ring",
        weight: "6.4g",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sp-r2",
        title: "Majestic Rajputana Gokhru Ring",
        weight: "15.2g",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sp-r3",
        title: "Geometric Symmetric Band",
        weight: "9.8g",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "bracelets",
    name: "Bracelets",
    thumbnail: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&auto=format&fit=crop",
    items: [
      {
        id: "sp-b1",
        title: "Regal Nakshi Elephant Kada",
        weight: "52.5g",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sp-b2",
        title: "Victorian Openwork Cuff",
        weight: "30.4g",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sp-b3",
        title: "Symmetric Heavy Kada Pair",
        weight: "48.0g",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop"
      }
    ]
  }
];

const SignaturePieces = () => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const scrollContainerRef = useRef(null);

  const activeCategory = categoriesData[activeCategoryIdx];

  // Horizontal Scroll Function
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 349; // Sweet spot card width (325) + gap (24)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // WhatsApp Inquiry Link Generator
  const handleInquiry = (item) => {
    const phoneNumber = "919000000000"; // Dummy WhatsApp Number, can be edited
    const message = encodeURIComponent(
      `Hi House of Shah, I would like to inquire about this exquisite Signature Piece:\n\n` +
      `• Category: ${activeCategory.name}\n` +
      `• Name: ${item.title}\n` +
      `• Weight: ${item.weight}\n\nPlease share more details and pricing.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="py-24 bg-white text-[#1a4173] font-outfit overflow-hidden relative" id="pieces">
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid-light-pieces" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a4173" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-light-pieces)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-100 pb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block mb-3">
              Elite Individual Masterpieces
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase text-[#1a4173]">
              Signature Pieces
            </h2>
          </div>
          
          {/* Scroll Navigation */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-none border border-gray-200 hover:border-[#1a4173] flex items-center justify-center text-[#1a4173]/70 hover:text-[#1a4173] transition-all bg-white shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-none border border-gray-200 hover:border-[#1a4173] flex items-center justify-center text-[#1a4173]/70 hover:text-[#1a4173] transition-all bg-white shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Brand Acronym Visual Categories Layer (Image-based Luxury Circular buttons) */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 mb-12">
          {categoriesData.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryIdx(idx)}
              className="flex flex-col items-center gap-3 group outline-none"
            >
              {/* Circular Thumbnail Wrapper */}
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden p-[3px] transition-all duration-500 bg-gradient-to-tr ${
                activeCategoryIdx === idx 
                  ? 'from-[#1a4173] to-[#40689c] scale-105 shadow-lg shadow-[#1a4173]/10' 
                  : 'from-transparent to-transparent border border-gray-150 hover:border-[#1a4173]/45'
              }`}>
                <img 
                  src={cat.thumbnail} 
                  alt={cat.name} 
                  className="w-full h-full object-cover rounded-full filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Category Name */}
              <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                activeCategoryIdx === idx ? 'text-[#1a4173]' : 'text-[#1a4173]/60 group-hover:text-[#1a4173]'
              }`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Horizontal Left-to-Right Swipeable List */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-2 snap-x snap-mandatory touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {activeCategory.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 w-[285px] md:w-[325px] bg-[#fafafa] rounded-none overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 snap-start flex flex-col justify-between"
                >
                  {/* Image Container with Luxury Overlay */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-none">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 rounded-none"
                    />
                    
                    {/* Subtle dark gradient bottom mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Category Label at bottom inside image */}
                    <span className="absolute bottom-4 left-4 text-[9px] font-black uppercase tracking-widest text-white bg-[#1a4173] px-3 py-1">
                      {activeCategory.name}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow rounded-none">
                    <h4 className="text-base font-bold text-[#1a4173] leading-snug mb-4">
                      {item.title}
                    </h4>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      {/* Weight Display */}
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-[#1a4173]/40">Net Weight</span>
                        <span className="text-sm font-extrabold text-[#1a4173]">{item.weight}</span>
                      </div>

                      {/* Inquiry Button */}
                      <button
                        onClick={() => handleInquiry(item)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#1a4173] text-white hover:bg-[#1a4173]/90 transition-all font-bold text-[10px] uppercase tracking-wider shadow-sm hover:shadow"
                      >
                        <MessageCircle size={12} />
                        Inquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SignaturePieces;
