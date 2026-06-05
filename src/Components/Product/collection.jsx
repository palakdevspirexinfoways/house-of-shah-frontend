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
  const scrollContainerRef = React.useRef(null);
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);

  // Fetch data from backend
  const fetchProducts = async (currentPage, isReset = false) => {
    if (isLoadingData) return;
    setIsLoadingData(true);
    try {
      let url = `${import.meta.env.VITE_API_BASE_URL}/products?limit=10&page=${currentPage}`;
      if (searchQuery && searchQuery.trim() !== '') {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      if (activeCategory && activeCategory !== 'All') {
        url += `&category=${encodeURIComponent(activeCategory)}`;
      }
      if (activeCollection && activeCollection !== 'All') {
        url += `&collection=${encodeURIComponent(activeCollection)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.success && data.data) {
        if (isReset) {
          setProducts(data.data);
        } else {
          setProducts(prev => [...prev, ...data.data]);
        }
        setTotalCount(data.totalCount || 0);
        setHasMore(currentPage < (data.totalPages || 1));
      }
    } catch (err) {
      console.error('[Collections Fetch Error]', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  React.useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [activeCategory, activeCollection, searchQuery]);

  // Handle Horizontal Infinite Scroll
  const handleScrollEvent = () => {
    if (scrollContainerRef.current && hasMore && !isLoadingData) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth * 0.8) {
        setPage(prev => {
          const nextPage = prev + 1;
          fetchProducts(nextPage);
          return nextPage;
        });
      }
    }
  };

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

        {/* ── Unified Search & Filter Control Center ── */}
        <div className="container mb-12 space-y-8">
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
                placeholder="Search collections & masterpieces..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                className="w-full pl-14 pr-12 py-4 bg-transparent outline-none text-sm tracking-wide text-[#1a4173] placeholder:text-[#1a4173]/30 font-medium font-outfit border-none"
              />
            </motion.div>

            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <>
                  <div className="fixed inset-0 z-[8]" onClick={() => setShowSuggestions(false)} />
                  <motion.div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#1a4173]/10 shadow-xl p-4 z-20 font-outfit rounded-2xl">
                    <div className="space-y-1.5 max-h-64 overflow-y-auto">
                      {suggestions.map((prod) => (
                        <div key={prod.id || prod._id} onClick={() => { setSelectedDetailProduct(prod); setShowSuggestions(false); }} className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-xl">
                          <img src={prod.image} className="w-8 h-10 object-cover rounded-lg" alt={prod.title} />
                          <span className="text-xs font-bold uppercase">{prod.title}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1a4173]/40 block mb-3">Filter By Collection:</span>
            <div className="flex flex-wrap gap-2 items-center">
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest border ${activeCollection === col ? 'bg-[#1a4173] text-white' : 'bg-white text-[#1a4173]/50'}`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1a4173]/40 block mb-3">Filter By category:</span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
              <div className="flex flex-wrap gap-2 items-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest border ${activeCategory === cat ? 'bg-[#1a4173] text-white' : 'bg-white text-[#1a4173]/50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 lg:gap-3 shrink-0 justify-end">
                <button type="button" onClick={() => handleScroll('left')} className="w-10 h-10 rounded-full border flex items-center justify-center hover:text-[#1a4173]"><ChevronLeft size={16} /></button>
                <button type="button" onClick={() => handleScroll('right')} className="w-10 h-10 rounded-full border flex items-center justify-center hover:text-[#1a4173]"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a4173]/35">
            {totalCount} {totalCount === 1 ? 'piece' : 'pieces'} matching active category filters
          </span>
          {products.length > 0 && products[0].dynamicText && (
            <p className="text-[10px] md:text-xs text-[#1a4173]/70 font-bold leading-[2] tracking-widest max-w-5xl uppercase">
              {products[0].dynamicText}
            </p>
          )}
        </div>

        <div className="relative z-10">
          <div className="flex flex-col gap-8">
            <div
              ref={scrollContainerRef}
              onScroll={handleScrollEvent}
              className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-2 snap-x snap-mandatory"
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
                      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-4 left-4 bg-white/90 text-[#1a4173] text-[9px] font-black uppercase tracking-widest px-3 py-1.5">{item.collection || 'Exclusive'}</span>
                      </div>
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex gap-2 items-center mb-1">
                            <span className="text-[9px] font-bold tracking-[0.2em] text-[#1a4173]/40 uppercase">{item.collection || 'Signature'}</span>
                          </div>
                          <h4 className="text-base font-bold text-[#1a4173] leading-snug mb-3">{item.title}</h4>
                        </div>
                        <div className="pt-4 border-t flex items-center justify-between mt-auto">
                          <span className="text-sm font-extrabold text-[#1a4173]">{item.weight || 'N/A'}</span>
                          <button onClick={() => handleInquiry(item)} className="px-4 py-2.5 bg-[#1a4173] text-white text-[10px] uppercase font-bold">Inquire</button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  !isLoadingData && <div className="w-full py-16 text-center text-[#1a4173]/50">No masterpieces found.</div>
                )}
              </AnimatePresence>

              {isLoadingData && hasMore && (
                <div className="flex-shrink-0 w-[285px] md:w-[325px] flex items-center justify-center bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50">Loading More...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureCollections;