import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, ChevronDown, Check } from 'lucide-react';

const SignaturePieces = ({
  activeCategory = 'All',
  setActiveCategory,
  categories = [],
  activeCollection = 'All',
  searchQuery = ''
}) => {
  const scrollRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const abortControllerRef = useRef(null);

  // Fetch data from backend
  const fetchProducts = async (currentPage, isReset = false, overrideCategory, overrideCollection, overrideSearch) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoadingData(true);
    const cat = overrideCategory !== undefined ? overrideCategory : activeCategory;
    const col = overrideCollection !== undefined ? overrideCollection : activeCollection;
    const search = overrideSearch !== undefined ? overrideSearch : searchQuery;

    try {
      let url = `${import.meta.env.VITE_API_BASE_URL}/products?limit=10&page=${currentPage}`;
      if (search && search.trim() !== '') {
        url += `&search=${encodeURIComponent(search)}`;
      }
      if (cat && cat !== 'All') {
        url += `&category=${encodeURIComponent(cat)}`;
      }
      if (col && col !== 'All') {
        url += `&collection=${encodeURIComponent(col)}`;
      }

      const res = await fetch(url, { signal: controller.signal });
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
      if (err.name !== 'AbortError') {
        console.error('[Products Fetch Error]', err);
      }
    } finally {
      setIsLoadingData(false);
    }
  };

  // Instant reset on category/collection change (no debounce)
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setProducts([]);
    fetchProducts(1, true, activeCategory, activeCollection, searchQuery);
  }, [activeCategory, activeCollection]);

  // Debounce only for search typing (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      setProducts([]);
      fetchProducts(1, true, activeCategory, activeCollection, searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingData) {
          setPage(prev => {
            const nextPage = prev + 1;
            fetchProducts(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingData]);

  // Horizontal Scroll Function (Arrow clicks)
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth < 640 ? clientWidth * 0.85 : clientWidth * 0.3;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // WhatsApp Inquiry Link Generator
  const handleInquiry = (item) => {
    const phoneNumber = "919510806869"; // WhatsApp Number
    const message = encodeURIComponent(
      `Hi House of Shah, I would like to inquire about this masterpiece from the Signature Pieces registry:\n\n` +
      `• Section: Signature Pieces\n` +
      `• Name: ${item.title}\n` +
      `• Category: ${item.category}\n` +
      `• Weight: ${item.weight || 'N/A'}\n\nPlease share more details and pricing.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="signature-pieces" className={`bg-[var(--white)] relative font-outfit overflow-x-hidden ${activeCollection === 'All' ? 'py-10 md:py-14' : 'pb-10 md:pb-14 pt-3 md:pt-5'}`}>
      <div className="container mx-auto px-6 lg:px-12">

        {/* ── Section Header ── */}
        {activeCollection === 'All' && (
          <div className="flex flex-row items-end justify-between mb-14 gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-10 h-[1px] bg-[var(--primary-blue)]" />
                <span className="text-[var(--primary-blue)] font-bold tracking-[0.4em] uppercase text-[10px]">
                  House of Shah Exclusives
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-7xl font-bold text-[var(--primary-blue)] tracking-tighter leading-none">
                Signature <span className="font-light italic text-[var(--primary-blue)]/40 lowercase tracking-normal">Pieces</span>
              </h2>
            </div>
          </div>
        )}

        {/* ── Category Dropdown for Filtering ── */}
        {activeCollection === 'All' && (
          <div className="mb-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a4173]/40 block mb-3">Filter By Category:</span>
            <div className='flex flex-row justify-between items-center gap-4'>

              {/* Custom Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  className="flex items-center gap-3 pl-5 pr-4 py-3 border border-[#1a4173]/20 bg-white text-[#1a4173] hover:border-[#1a4173]/60 transition-all duration-300 min-w-[220px] group"
                >
                  <span className="flex-1 text-left text-[10px] font-bold uppercase tracking-widest truncate">
                    {activeCategory}
                  </span>
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <ChevronDown size={14} strokeWidth={2} className="text-[#1a4173]/60 group-hover:text-[#1a4173] transition-colors" />
                  </motion.div>
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      style={{ transformOrigin: 'top' }}
                      className="absolute top-full left-0 mt-1 min-w-[220px] bg-white border border-[#1a4173]/15 shadow-xl z-50 overflow-hidden"
                    >
                      <div className="max-h-64 overflow-y-auto">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setActiveCategory(cat);
                              setDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest transition-all duration-200 border-b border-[#1a4173]/5 last:border-b-0 ${
                              activeCategory === cat
                                ? 'bg-[#1a4173] text-white'
                                : 'text-[#1a4173]/60 hover:bg-[#1a4173]/5 hover:text-[#1a4173]'
                            }`}
                          >
                            <span>{cat}</span>
                            {activeCategory === cat && (
                              <Check size={11} strokeWidth={3} />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Items Counter */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a4173]/35">
            {totalCount} {totalCount === 1 ? 'piece' : 'pieces'} matching active category filters
          </span>
        </div>

        {/* ── Product Slider ── */}
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

        {isLoadingData && products.length === 0 ? (
          /* ── Full Skeleton Row (shows immediately on category select) ── */
          <div
            className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={`skeleton-${i}`}
                className="flex-shrink-0 w-[285px] md:w-[325px] bg-[#fafafa] rounded-none overflow-hidden border border-gray-100 animate-pulse snap-start flex flex-col justify-between"
              >
                {/* Image placeholder */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-100" />

                {/* Body placeholder */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="h-2 bg-gray-200 rounded-none w-1/3 mb-3" />
                    <div className="h-4 bg-gray-200 rounded-none w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded-none w-2/4" />
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-6">
                    <div>
                      <div className="h-2 bg-gray-200 rounded-none w-16 mb-1" />
                      <div className="h-4 bg-gray-200 rounded-none w-12" />
                    </div>
                    <div className="h-9 bg-gray-200 rounded-none w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="flex flex-col gap-8">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={`${product.id || product._id}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 w-[285px] md:w-[325px] bg-[#fafafa] rounded-none overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 snap-start flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-none">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 rounded-none"
                    />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow rounded-none">
                    <div>
                      <span className="text-[9px] font-bold tracking-[0.2em] text-[#1a4173]/40 uppercase block mb-1">
                        {product.category || 'Jewellery'}
                      </span>
                      <h4 className="text-base font-bold text-[#1a4173] leading-snug mb-3">
                        {product.title}
                      </h4>
                    </div>

                    <div className="pt-4 border-t border-gray-150 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-[#1a4173]/30">Net Weight</span>
                        <span className="text-sm font-extrabold text-[#1a4173]">{product.weight || 'N/A'}</span>
                      </div>
                      <button
                        onClick={() => handleInquiry(product)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#1a4173] text-white hover:bg-[#1a4173]/90 transition-all font-bold text-[10px] uppercase tracking-wider shadow-sm hover:shadow"
                      >
                        <MessageCircle size={12} />
                        Inquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Inline skeleton for infinite scroll loading */}
              {isLoadingData && (
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={`inline-skeleton-${i}`} className="flex-shrink-0 w-[285px] md:w-[325px] bg-[#fafafa] rounded-none overflow-hidden border border-gray-100 animate-pulse snap-start flex flex-col justify-between">
                      <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-100" />
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div className="h-2 bg-gray-200 rounded w-1/3 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                        <div className="pt-4 border-t border-gray-150 flex items-center justify-between mt-auto">
                          <div className="h-6 bg-gray-200 rounded w-1/4" />
                          <div className="h-8 bg-gray-200 rounded w-1/3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Infinite Scroll Trigger */}
              <div ref={observerTarget} className="shrink-0 w-[1px]" />
            </div>
          </div>
        ) : (
          !isLoadingData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 flex flex-col items-center justify-center text-center"
            >
              <MessageCircle size={40} className="text-[var(--primary-blue)]/10 mb-5" />
              <h3 className="text-xl font-bold text-[var(--primary-blue)] mb-2">No pieces found</h3>
              <p className="text-[var(--primary-blue)]/40 text-sm max-w-xs mx-auto">
                Try a different filter or search term.
              </p>
            </motion.div>
          )
        )}
        </div>
      </div>
    </section>
  );
};

export default SignaturePieces;
