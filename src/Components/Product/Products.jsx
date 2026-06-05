import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const SignaturePieces = ({
  activeCategory = 'All',
  setActiveCategory,
  categories = []
}) => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch data from backend
  const fetchProducts = async (currentPage, isReset = false) => {
    if (isLoadingData) return;
    setIsLoadingData(true);
    try {
      let url = `${import.meta.env.VITE_API_BASE_URL}/products?limit=10&page=${currentPage}`;
      if (activeCategory && activeCategory !== 'All') {
        url += `&category=${encodeURIComponent(activeCategory)}`;
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
      console.error('[Products Fetch Error]', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Reset and fetch on filter change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [activeCategory]);

  // Handle Horizontal Infinite Scroll
  const handleScrollEvent = () => {
    if (scrollRef.current && hasMore && !isLoadingData) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Trigger fetch when user is 80% through the scroll
      if (scrollLeft + clientWidth >= scrollWidth * 0.8) {
        setPage(prev => {
          const nextPage = prev + 1;
          fetchProducts(nextPage);
          return nextPage;
        });
      }
    }
  };

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
    <section id="signature-pieces" className="py-16 bg-white relative font-outfit overflow-x-hidden">
      <div className="container mx-auto px-6 lg:px-12">

        {/* ── Section Header ── */}
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
              Signature <br />
              <span className="font-light italic text-[var(--primary-blue)]/40 lowercase tracking-normal">Pieces</span>
            </h2>
          </div>
        </div>

        {/* ── Category Names for Filtering ── */}
        <div className="mb-10">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a4173]/40 block mb-3">Filter By Category:</span>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0'>
            <div className="flex flex-wrap gap-2.5 items-center">
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
            {/* Scroll Arrows */}
            <div className="flex gap-2 lg:gap-3 shrink-0">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-[var(--primary-blue)]/10 text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white transition-all rounded-full hover:scale-105 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-[var(--primary-blue)]/10 text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white transition-all rounded-full hover:scale-105 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Items Counter */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a4173]/35">
            {totalCount} {totalCount === 1 ? 'piece' : 'pieces'} matching active category filters
          </span>
        </div>

        {/* ── Product Slider ── */}
        {products.length > 0 ? (
          <div className="flex flex-col gap-8">
            <div
              ref={scrollRef}
              onScroll={handleScrollEvent}
              className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id || product._id}
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
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1a4173] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none shadow-sm">
                      {product.collection || 'Exclusive'}
                    </span>
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

              {/* Loading Indicator inside slider */}
              {isLoadingData && hasMore && (
                <div className="flex-shrink-0 w-[285px] md:w-[325px] flex items-center justify-center bg-[#fafafa]/50 border border-gray-100/50">
                  <div className="animate-pulse space-y-4 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block">Loading More</span>
                  </div>
                </div>
              )}
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
    </section>
  );
};

export default SignaturePieces;
