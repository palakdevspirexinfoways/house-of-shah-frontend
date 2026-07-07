import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, Search, X, TrendingUp, ArrowUpRight } from 'lucide-react';

const SignatureCollections = ({
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

  return (
    <section className="pt-10 pb-3 md:pb-5 bg-white text-[#1a4173] font-outfit overflow-visible border-b border-gray-100 relative" id="collections">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-150 pb-8">
          <div>
            {activeCollection !== 'All' && (
              <button 
                onClick={() => setActiveCollection('All')}
                className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1a4173] bg-[#1a4173]/5 hover:bg-[#1a4173]/10 px-4 py-2 rounded-full transition-colors border border-[#1a4173]/10 hover:shadow-sm"
              >
                <ChevronLeft size={14} /> Back to All Collections
              </button>
            )}
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block mb-3">
              Atelier Masterpieces
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase text-[#1a4173]">
              {activeCollection === 'All' ? 'Signature Collections' : activeCollection}
            </h2>
          </div>
        </div>

        {/* ── Unified Search & Filter Control Center ── */}
        <div className="container space-y-8">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center p-[2px] rounded-2xl bg-gradient-to-r from-[#1a4173]/5 via-white/5 to-[#1a4173]/5 shadow-[0_10px_30px_rgba(26,65,115,0.04)] backdrop-blur-xl border border-[#1a4173]/8 focus-within:border-[#1a4173]/30 transition-all duration-500 group"
            >
              <div className="absolute left-5 text-[#1a4173]/30 group-focus-within:text-[#1a4173]"><Search size={18} strokeWidth={1.8} /></div>
              <input
                type="text"
                placeholder="Search by product name or masterpieces..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                className="w-full pl-14 pr-12 py-4 bg-transparent outline-none text-sm tracking-wide text-[#1a4173] placeholder:text-[#1a4173]/30 font-medium font-outfit border-none"
              />
            </motion.div>

            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setShowSuggestions(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.99 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 right-0 top-full mt-3 bg-white/95 backdrop-blur-xl border border-[#1a4173]/10 shadow-[0_20px_50px_rgba(26,65,115,0.12)] p-2.5 z-30 font-outfit rounded-2xl max-w-full overflow-hidden"
                  >
                    <div className="space-y-1 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                      {suggestions.map((prod) => (
                        <div 
                          key={prod.id || prod._id} 
                          onClick={() => { 
                            setSearchQuery(prod.title); 
                            setShowSuggestions(false); 
                            setTimeout(() => {
                              const element = document.getElementById('signature-pieces');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }, 100);
                          }} 
                          className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-[#1a4173]/5 rounded-xl transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-14 rounded-lg overflow-hidden border border-gray-150/70 bg-gray-50 shrink-0">
                              <img 
                                src={prod.image} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                alt={prod.title} 
                              />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-xs font-bold uppercase tracking-wider text-[#1a4173] group-hover:text-black transition-colors">
                                {prod.title}
                              </span>
                              <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
                                {prod.collection || 'Exclusive Collection'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-bold uppercase tracking-widest bg-[#1a4173]/5 text-[#1a4173] px-2.5 py-1 rounded-full group-hover:bg-[#1a4173] group-hover:text-white transition-all duration-300">
                              {prod.category}
                            </span>
                            <ArrowUpRight size={14} className="text-[#1a4173]/30 group-hover:text-[#1a4173] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SignatureCollections;