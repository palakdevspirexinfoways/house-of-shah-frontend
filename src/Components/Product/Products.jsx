import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const SignaturePieces = ({
  products = [],
  isLoadingData = false,
  activeCategory = 'All',
  setActiveCategory,
  categories = []
}) => {
  const scrollRef = useRef(null);

  // Horizontal Scroll Function
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

  if (isLoadingData) {
    return (
      <div className="py-32 bg-white text-[#1a4173] font-outfit text-center">
        <div className="animate-pulse space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block">EXCLUSIVE PIECES</span>
          <h3 className="text-3xl font-light uppercase tracking-widest text-gray-400">Loading Pieces...</h3>
        </div>
      </div>
    );
  }

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
            <h2 className="text-5xl md:text-7xl font-bold text-[var(--primary-blue)] tracking-tighter leading-none">
              Signature <br />
              <span className="font-light italic text-[var(--primary-blue)]/40 lowercase tracking-normal">Pieces</span>
            </h2>
          </div>

          {/* Scroll Arrows */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 lg:p-4 border border-[var(--primary-blue)]/10 text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white transition-all rounded-full hover:scale-105 active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 lg:p-4 border border-[var(--primary-blue)]/10 text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white transition-all rounded-full hover:scale-105 active:scale-95"
              aria-label="Next"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ── Category Names for Filtering (Rendered directly in Signature Pieces section) ── */}
        <div className="flex flex-wrap gap-2.5 mb-10 items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a4173]/40 mr-2">Filter By Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                  ? 'bg-[#1a4173] text-white border-[#1a4173] shadow-md'
                  : 'bg-white text-[#1a4173]/50 border border-gray-150 hover:text-[#1a4173] hover:border-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Items Counter */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a4173]/35">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'} matching active category filters
          </span>
        </div>

        {/* ── Product Slider ── */}
        {products.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide py-4 px-2 snap-x snap-mandatory touch-pan-x"
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
                {/* Full-bleed Square Image with subtle hover zoom */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-none">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 rounded-none"
                  />

                  {/* Floating Collection Tag - Square/Sharp */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1a4173] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none shadow-sm">
                    {product.collection || 'Exclusive'}
                  </span>
                </div>

                {/* Content Section: Category Name + Weight + Inquiry Button */}
                <div className="p-6 flex flex-col justify-between flex-grow rounded-none">
                  <div>
                    {/* Category Name */}
                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#1a4173]/40 uppercase block mb-1">
                      {product.category || 'Jewellery'}
                    </span>

                    {/* Title */}
                    <h4 className="text-base font-bold text-[#1a4173] leading-snug mb-3">
                      {product.title}
                    </h4>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex items-center justify-between mt-auto">
                    {/* Weight Display */}
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-[#1a4173]/30">Net Weight</span>
                      <span className="text-sm font-extrabold text-[#1a4173]">{product.weight || 'N/A'}</span>
                    </div>

                    {/* Inquiry Button - Square/Sharp */}
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
          </div>
        ) : (
          /* Empty filtered state */
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
        )}

      </div>
    </section>
  );
};

export default SignaturePieces;
