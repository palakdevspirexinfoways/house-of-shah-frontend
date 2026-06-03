import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, Search, X, TrendingUp, ArrowUpRight } from 'lucide-react';

const SignatureCollections = ({
  products = [],
  isLoadingData = false,
  searchQuery = '',
  setSearchQuery,
  showSuggestions = false,
  setShowSuggestions,
  suggestions = [],
  activeCollection = 'All',
  setActiveCollection,
  collections = [],
  activeCategory = 'All',
  setActiveCategory,
  categories = [],
  setSelectedDetailProduct
}) => {
  const scrollContainerRef = useRef(null);

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
      `Hi House of Shah, I would like to inquire about this masterpiece from the ${item.collection || 'Exclusive'} Collection:\n\n` +
      `• Section: Signature Collections\n` +
      `• Name: ${item.title}\n` +
      `• Collection: ${item.collection || 'N/A'}\n` +
      `• Weight: ${item.weight || 'N/A'}\n\nPlease share more details and pricing.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  if (isLoadingData) {
    return (
      <div className="py-32 bg-white text-[#1a4173] font-outfit text-center">
        <div className="animate-pulse space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block">BESPOKE COLLECTIONS</span>
          <h3 className="text-3xl font-light uppercase tracking-widest text-gray-400">Loading Collections...</h3>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white text-[#1a4173] font-outfit overflow-hidden border-b border-gray-100 relative" id="collections">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-150 pb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block mb-3">
              Atelier Masterpieces
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase text-[#1a4173]">
              Signature Collections
            </h2>
          </div>

        </div>

        {/* ── Unified Search & Filter Control Center (Rendered inside Signature Collections) ── */}
        <div className="container mb-12 space-y-8">

          {/* 1. High-End Search Bar */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center p-[2px] rounded-2xl bg-gradient-to-r from-[#1a4173]/5 via-white/5 to-[#1a4173]/5 shadow-[0_10px_30px_rgba(26,65,115,0.04)] backdrop-blur-xl border border-[#1a4173]/8 focus-within:border-[#1a4173]/30 focus-within:shadow-[0_15px_35px_rgba(26,65,115,0.08)] transition-all duration-500 group"
            >
              <div className="absolute left-5 text-[#1a4173]/30 group-focus-within:text-[#1a4173] group-hover:scale-110 transition-all duration-300">
                <Search size={18} strokeWidth={1.8} />
              </div>
              <input
                type="text"
                placeholder="Search collections & masterpieces..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-14 pr-12 py-4 bg-transparent outline-none text-sm tracking-wide text-[#1a4173] placeholder:text-[#1a4173]/30 font-medium font-outfit border-none"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-5 p-1 rounded-full text-[#1a4173]/30 hover:text-[#1a4173] hover:bg-[#1a4173]/5 transition-all duration-300"
                  aria-label="Clear search"
                >
                  <X size={14} strokeWidth={2} className="rotate-0 hover:rotate-90 transition-transform duration-300" />
                </button>
              )}
            </motion.div>

            {/* Autocomplete Search suggestions dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <>
                  <div className="fixed inset-0 z-[8]" onClick={() => setShowSuggestions(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#1a4173]/10 shadow-[0_25px_50px_-12px_rgba(26,65,115,0.25)] p-4 z-20 font-outfit rounded-2xl backdrop-blur-xl"
                  >
                    <div className="text-[9px] font-bold text-[#1a4173]/30 uppercase tracking-[0.2em] mb-2 px-1">Masterpiece Matches</div>
                    <div className="space-y-1.5 max-h-64 overflow-y-auto no-scrollbar">
                      {suggestions.map((prod) => (
                        <div
                          key={prod.id || prod._id}
                          onClick={() => {
                            setSelectedDetailProduct(prod);
                            setShowSuggestions(false);
                          }}
                          className="flex items-center gap-3 p-2 bg-[#f8f9fa] border border-[#1a4173]/5 hover:border-[#1a4173]/20 hover:bg-white cursor-pointer transition-all duration-300 rounded-xl group"
                        >
                          <div className="w-8 h-10 bg-gray-150 border border-[#1a4173]/5 overflow-hidden shrink-0 rounded-lg">
                            <img src={prod.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={prod.title} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-[#1a4173] uppercase tracking-wide block truncate group-hover:text-[#1a4173]/70 transition-colors">{prod.title}</span>
                            <div className="flex gap-2 items-center mt-0.5">
                              <span className="text-[8px] font-bold text-[#1a4173]/40 uppercase tracking-widest">{prod.collection || 'Collection'}</span>
                              <span className="w-1 h-1 bg-[#1a4173]/20 rounded-full" />
                              <span className="text-[8px] font-bold text-[#1a4173]/40 uppercase tracking-widest">{prod.category}</span>
                            </div>
                          </div>
                          <ArrowUpRight size={14} className="text-[#1a4173]/30 group-hover:text-[#1a4173] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Trending Searches tags */}
          <div className="flex flex-wrap gap-2 items-center pl-2">
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#1a4173]/35 mr-1 flex items-center gap-1">
              <TrendingUp size={10} /> Trending:
            </span>
            {["Choker", "Earrings", "Kada", "Ring", "Silverware"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  setShowSuggestions(true);
                }}
                className="px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#1a4173]/60 bg-[#f8f9fa] border border-[#1a4173]/5 hover:border-[#1a4173]/20 hover:text-[#1a4173] hover:-translate-y-[1px] rounded-full transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 3. Collection Filter Row */}
          <div className="pt-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1a4173]/40 block mb-3">Filter By Collection:</span>
            <div className="flex flex-wrap gap-2 items-center">
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`px-4 py-1.5 md:py-2 md:px-5 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${activeCollection === col
                    ? 'bg-[#1a4173] text-white border-[#1a4173] shadow-md'
                    : 'bg-white text-[#1a4173]/50 border border-gray-150 hover:text-[#1a4173] hover:border-gray-200'
                    }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>



          {/* 4. Sub-category Filter Row */}
          <div className="pt-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1a4173]/40 block mb-3">Filter By category:</span>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-wrap gap-2 items-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 md:py-2 md:px-5 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                      ? 'bg-[#1a4173] text-white border-[#1a4173] shadow-md'
                      : 'bg-white text-[#1a4173]/50 border border-gray-150 hover:text-[#1a4173] hover:border-gray-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            <div className="flex items-center gap-2 lg:gap-3 shrink-0 justify-end">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 hover:border-[#1a4173] flex items-center justify-center text-[#1a4173]/70 hover:text-[#1a4173] transition-all bg-white shadow-sm active:scale-95 hover:shadow-md cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 hover:border-[#1a4173] flex items-center justify-center text-[#1a4173]/70 hover:text-[#1a4173] transition-all bg-white shadow-sm active:scale-95 hover:shadow-md cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            </div>
          </div>

      
        </div>


        {/* Dynamic Items Counter & Collection Description */}
        <div className="mb-8 flex flex-col gap-5">
          {products.length > 0 && products[0].dynamicText && (
            <p className="text-[10px] md:text-xs text-[#1a4173]/70 font-bold leading-[2] tracking-widest max-w-5xl uppercase">
              {products[0].dynamicText}
            </p>
          )}
         
        </div>

        {/* Left-to-Right Swipeable Product Carousel */}
        <div className="relative z-10">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-2 snap-x snap-mandatory touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {products.length > 0 ? (
                products.map((item) => (
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

                      {/* Floating Collection Tag - Square/Sharp */}
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1a4173] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none shadow-sm">
                        {item.collection || 'Exclusive'}
                      </span>
                    </div>

                    {/* Content Section: Collection Name + Category + Weight + Inquiry Button */}
                    <div className="p-6 flex flex-col justify-between flex-grow rounded-none">
                      <div>
                        {/* Collection Name & Category */}
                        <div className="flex gap-2 items-center mb-1">
                          <span className="text-[9px] font-bold tracking-[0.2em] text-[#1a4173]/40 uppercase">
                            {item.collection || 'Signature'}
                          </span>
                          <span className="w-1 h-1 bg-[#1a4173]/20 rounded-full" />
                          <span className="text-[9px] font-bold tracking-[0.2em] text-[#1a4173]/40 uppercase">
                            {item.category || 'Jewellery'}
                          </span>
                        </div>

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
                  No masterpieces match the active filters.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SignatureCollections;