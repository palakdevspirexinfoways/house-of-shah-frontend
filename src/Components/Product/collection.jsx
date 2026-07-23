import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Search, X, ArrowUpRight, Tag, Layers } from 'lucide-react';

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
  setSelectedDetailProduct,
  collectionsData = []
}) => {
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
            {activeCollection !== 'All' && collectionsData?.find(c => c.name === activeCollection)?.description && (
              <p className="mt-4 text-sm text-[#1a4173]/80 max-w-2xl font-medium tracking-wide">
                {collectionsData.find(c => c.name === activeCollection).description}
              </p>
            )}
          </div>
        </div>

        {/* ── Unified Search & Filter Control Center ── */}
        <div className="container space-y-8">
          <div className="relative z-10">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setShowSuggestions(false);
                setTimeout(() => {
                  const element = document.getElementById('signature-pieces');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="relative flex items-center p-[3px] rounded-2xl bg-gradient-to-r from-[#1a4173]/5 via-white/5 to-[#1a4173]/5 shadow-[0_10px_30px_rgba(26,65,115,0.04)] backdrop-blur-xl border border-[#1a4173]/12 focus-within:border-[#1a4173]/40 transition-all duration-500 group"
            >
              <div className="absolute left-5 text-[#1a4173]/40 group-focus-within:text-[#1a4173]"><Search size={18} strokeWidth={1.8} /></div>
              <input
                type="text"
                placeholder="Search by product name or categories (e.g. Earrings, Pendants)..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                className="w-full pl-14 pr-28 sm:pr-36 py-4 bg-transparent outline-none text-sm tracking-wide text-[#1a4173] placeholder:text-[#1a4173]/30 font-medium font-outfit border-none"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => { 
                      setSearchQuery(''); 
                      if (setActiveCategory) setActiveCategory('All');
                      if (setActiveCollection) setActiveCollection('All');
                      setShowSuggestions(false); 
                    }}
                    className="text-gray-400 hover:text-[#1a4173] p-2 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                    aria-label="Clear Search"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#1a4173] text-white px-4 sm:px-6 py-2.5 rounded-xl font-bold uppercase text-[10px] sm:text-[11px] tracking-widest hover:bg-[#0f2848] transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer shrink-0"
                >
                  <Search size={14} />
                  <span>Search</span>
                </button>
              </div>
            </form>

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
                    <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                      {suggestions.map((item) => {
                        const isCategory = item.type === 'category' || item.isCategory;
                        const isCollection = item.type === 'collection' || item.isCollection;

                        const handleClick = () => {
                          if (isCategory) {
                            if (setActiveCategory) setActiveCategory(item.title);
                            setSearchQuery(item.title);
                          } else if (isCollection) {
                            if (setActiveCollection) setActiveCollection(item.title);
                            setSearchQuery('');
                          } else {
                            setSearchQuery(item.title);
                          }
                          setShowSuggestions(false);
                          setTimeout(() => {
                            const element = document.getElementById('signature-pieces');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        };

                        return (
                          <div 
                            key={item.id || item._id} 
                            onClick={handleClick} 
                            className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#1a4173]/5 rounded-xl transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-4">
                              {isCategory ? (
                                <div className="w-11 h-11 rounded-xl bg-[#1a4173]/10 text-[#1a4173] flex items-center justify-center shrink-0 group-hover:bg-[#1a4173] group-hover:text-white transition-all">
                                  <Tag size={18} />
                                </div>
                              ) : isCollection ? (
                                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all">
                                  <Layers size={18} />
                                </div>
                              ) : (
                                <div className="w-11 h-14 rounded-lg overflow-hidden border border-gray-150/70 bg-gray-50 shrink-0">
                                  <img 
                                    src={item.image} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    alt={item.title} 
                                  />
                                </div>
                              )}
                              
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#1a4173] group-hover:text-black transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
                                  {isCategory 
                                    ? 'Product Category • Click to view designs' 
                                    : isCollection 
                                    ? 'Signature Collection • Click to view' 
                                    : item.collection || 'Exclusive Collection'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-300 ${
                                isCategory 
                                  ? 'bg-[#1a4173] text-white' 
                                  : isCollection 
                                  ? 'bg-amber-600 text-white' 
                                  : 'bg-[#1a4173]/5 text-[#1a4173] group-hover:bg-[#1a4173] group-hover:text-white'
                              }`}>
                                {isCategory ? 'Category' : isCollection ? 'Collection' : item.category}
                              </span>
                              <ArrowUpRight size={14} className="text-[#1a4173]/30 group-hover:text-[#1a4173] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                            </div>
                          </div>
                        );
                      })}
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