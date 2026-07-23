import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, Search, X, TrendingUp } from 'lucide-react';

const trendingSearches = ["Choker", "Earrings", "Kada", "Ring", "Silverware"];

const SignaturePieces = () => {
  const [products, setProducts] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef(null);

  // Load products from backend
  useEffect(() => {
    setIsLoadingData(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
        setIsLoadingData(false);
      })
      .catch(err => {
        console.error('[Products Load Error]', err);
        setIsLoadingData(false);
      });
  }, []);

  // Dynamically build the categories list based on fetched products
  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [products]);

  // Filtering products for display
  const filteredItems = useMemo(() => {
    return products.filter(item => {
      return activeCategory === "All" ? true : item.category === activeCategory;
    });
  }, [products, activeCategory]);

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
    const phoneNumber = "919510806869"; // WhatsApp Number
    const message = encodeURIComponent(
      `Hi House of Shah, I would like to inquire about this masterpiece:\n\n` +
      `• Section: Signature Pieces\n` +
      `• Name: ${item.title}\n` +
      `• Category: ${item.category}\n` +
      `• Weight: ${item.weight || 'N/A'}\n\nPlease share more details and pricing.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  if (isLoadingData) {
    return (
      <div className="py-32 bg-white text-[#1a4173] font-outfit text-center">
        <div className="animate-pulse space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block">VISUAL CURED PORTFOLIO</span>
          <h3 className="text-3xl font-light uppercase tracking-widest text-gray-400">Loading Masterpieces...</h3>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-32 bg-white text-[#1a4173] font-outfit text-center" id="pieces">
        <div className="max-w-md mx-auto space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block">Elite Individual Masterpieces</span>
          <h3 className="text-3xl font-light uppercase tracking-widest text-gray-400">Signature Pieces</h3>
          <p className="text-xs text-gray-400 font-light max-w-xs mx-auto leading-relaxed">Only masterpieces registered by the atelier console are presented here. No entries available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white text-[#1a4173] font-outfit overflow-hidden border-t border-gray-100" id="pieces">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block mb-3">
              House of Shah Exclusives
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase text-[#1a4173]">
              Signature Pieces
            </h2>
          </div>
          
        </div>

        {/* Category Names for Filtering */}
        <div className="flex flex-wrap gap-2.5 mb-10 items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a4173]/40 mr-2">Filter By:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#1a4173] text-white border-[#1a4173] shadow-md'
                  : 'bg-white text-[#1a4173]/50 border border-gray-150 hover:text-[#1a4173] hover:border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Left-to-Right Swipeable Product Carousel */}
        <div className="relative">

          {/* Left Side Arrow */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white/95 backdrop-blur-md border border-[#1a4173]/15 text-[#1a4173] shadow-lg hover:shadow-xl rounded-full -translate-x-3 md:-translate-x-5 hover:bg-[#1a4173] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft size={18} strokeWidth={1.75} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Right Side Arrow */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white/95 backdrop-blur-md border border-[#1a4173]/15 text-[#1a4173] shadow-lg hover:shadow-xl rounded-full translate-x-3 md:translate-x-5 hover:bg-[#1a4173] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight size={18} strokeWidth={1.75} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.div
                    key={item.id || item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex-shrink-0 w-[285px] md:w-[325px] bg-[#fafafa] rounded-none overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 snap-start flex flex-col justify-between"
                  >
                    {/* Full-bleed Square Image with subtle hover zoom */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-none">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 rounded-none"
                      />
                    </div>

                    {/* Content Section: Category Name + Weight + Inquiry Button */}
                    <div className="p-6 flex flex-col justify-between flex-grow rounded-none">
                      <div>
                        {/* Category Name */}
                        <span className="text-[9px] font-bold tracking-[0.2em] text-[#1a4173]/40 uppercase block mb-1">
                          {item.category}
                        </span>
                        
                        {/* Title */}
                        <h4 className="text-base font-bold text-[#1a4173] leading-snug mb-3">
                          {item.title}
                        </h4>
                      </div>

                      <div className="pt-4 border-t border-gray-150 flex items-center justify-between mt-auto">
                        {/* Weight Display */}
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-[#1a4173]/30">Net Weight</span>
                          <span className="text-sm font-extrabold text-[#1a4173]">{item.weight || 'N/A'}</span>
                        </div>

                        {/* Inquiry Button - Square/Sharp */}
                        <button
                          onClick={() => handleInquiry(item)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#1a4173] text-white hover:bg-[#1a4173]/90 transition-all font-bold text-[10px] uppercase tracking-wider shadow-sm hover:shadow"
                        >
                          <MessageCircle size={12} />
                          Inquire
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="w-full py-16 text-center text-[#1a4173]/50 text-sm font-light">
                  No masterpieces found in this category.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SignaturePieces;
