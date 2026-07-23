import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShoppingBag, Star, Plus, X, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const defaultProducts = [
  {
    id: 1,
    title: "Celestial Moon Pendant",
    category: "Pendants",
    price: 4999,
    image: "https://kinclimg5.bluestone.com/f_jpg,c_scale,w_1024,q_80,b_rgb:f0f0f0/giproduct/BISK0368P03-POSTER-21068.jpg",
    tag: "Best Seller"
  },
  {
    id: 2,
    title: "Infinity Silver Necklace",
    category: "Necklaces",
    price: 12499,
    image: "https://diaidesigns.in/cdn/shop/collections/Celestial.jpg?v=1744959458",
    tag: "New Arrival"
  },
  {
    id: 3,
    title: "Royal Stud Earrings",
    category: "Earrings",
    price: 3299,
    image: "https://diaidesigns.in/cdn/shop/collections/Celestial.jpg?v=1744959458",
    tag: null
  },
  {
    id: 4,
    title: "Industrial Fusion Ring",
    category: "Rings",
    price: 2899,
    image: "https://jewelrydesigns.com/wp-content/uploads/ER1-Shop-Diamond-Engagement-Rings-1080X1080.jpg",
    tag: "Limited"
  },
  {
    id: 5,
    title: "Elite Forged Bracelet",
    category: "Bracelets",
    price: 8999,
    image: "https://artizanjoyeria.com/cdn/shop/files/One_image_12.webp?v=1761204542&width=1000",
    tag: null
  },
  {
    id: 6,
    title: "Sterling Silver Artifact",
    category: "Artifacts",
    price: 24999,
    image: "https://claysphere.com/wp-content/uploads/2024/07/psx_20210816_221228.jpg",
    tag: "Museum Grade"
  }
];

const ProductSection = () => {
  const scrollRef = useRef(null);
  const { cartItems, isCartOpen, setIsCartOpen, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (currentPage) => {
    if (isLoading || (!hasMore && currentPage > 1)) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products?homepageHighlight=Jewellery%20Design&limit=10&page=${currentPage}`);
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        const mapped = data.data.map((item, idx) => ({
          id: item.id || idx + Date.now(),
          title: item.title,
          category: item.category,
          weight: item.weight || null,
          price: item.weight ? parseFloat(item.weight) || 4999 : 4999,
          image: item.image,
          tag: null,
        }));
        
        if (currentPage === 1) {
          setProducts(mapped);
        } else {
          setProducts(prev => [...prev, ...mapped]);
        }
        
        if (currentPage >= data.totalPages) {
          setHasMore(false);
        }
      } else {
        if (currentPage === 1) setProducts([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error('[Products Section Connection Error]', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sectionRef = useRef(null);
  const observerTarget = useRef(null);
  const [hasFetchedInitial, setHasFetchedInitial] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFetchedInitial) {
          fetchProducts(1);
          setHasFetchedInitial(true);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasFetchedInitial]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && hasFetchedInitial) {
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
  }, [hasMore, isLoading, hasFetchedInitial]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth < 640 ? clientWidth * 0.8 : clientWidth * 0.3;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" ref={sectionRef} className="py-8 md:py-10 bg-[var(--white)] relative font-outfit overflow-x-hidden">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-[var(--primary-blue)]" />
              <span className="text-[var(--primary-blue)] font-bold tracking-[0.4em] uppercase text-[10px]">House of Shah Exclusives</span>
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-bold text-[var(--primary-blue)] tracking-tighter leading-none">
              Jewellery 
              <span className="font-light italic text-[var(--primary-blue)]/40 lowercase tracking-normal">Designs</span>
            </h2>
          </div>

          {/* View All Link */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 pb-2 sm:pb-3 shrink-0">
            <Link 
              to="/product" 
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--primary-blue)] hover:text-black transition-colors duration-300 flex items-center gap-2 group border-b border-[var(--primary-blue)]/20 hover:border-black pb-1 shrink-0"
            >
              View All
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Product Slider — wrapped with side arrows on mobile */}
        <div className="relative">

          {/* Left Side Arrow */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white/95 backdrop-blur-md border border-[var(--primary-blue)]/15 text-[var(--primary-blue)] shadow-lg hover:shadow-xl rounded-full -translate-x-3 md:-translate-x-5 hover:bg-[var(--primary-blue)] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft size={18} strokeWidth={1.75} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Right Side Arrow */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-white/95 backdrop-blur-md border border-[var(--primary-blue)]/15 text-[var(--primary-blue)] shadow-lg hover:shadow-xl rounded-full translate-x-3 md:translate-x-5 hover:bg-[var(--primary-blue)] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight size={18} strokeWidth={1.75} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

        {/* Product Slider (Smooth Horizontal Touch-Scroll) */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {products.map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer shrink-0 w-[85%] sm:w-[45%] lg:w-[23%] snap-center"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--silver-bg)] border border-transparent group-hover:border-[var(--primary-blue)]/10 transition-colors duration-500">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />

                <div className="absolute inset-0 bg-[var(--primary-blue)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0 sm:translate-y-8 sm:group-hover:translate-y-0 transition-all duration-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '/contact';
                    }}
                    className="w-full bg-[var(--primary-blue)] text-[var(--white)] px-4 sm:px-6 py-3.5 sm:py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl hover:bg-black transition-colors"
                  >
                    Inquiry
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[var(--primary-blue)]/40 font-bold tracking-widest text-[9px] uppercase mb-1">{product.category}</p>
                    <h3 className="text-xl font-bold text-[var(--primary-blue)] tracking-tight">{product.title}</h3>
                    {product.weight && (
                      <p className="text-[var(--primary-blue)]/50 text-[11px] font-medium mt-1.5 tracking-wider">
                        Weight: <span className="font-bold text-[var(--primary-blue)]/70">{product.weight}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={`skeleton-${i}`} className="shrink-0 w-[85%] sm:w-[45%] lg:w-[23%] snap-center animate-pulse">
                  <div className="relative aspect-[4/5] bg-gray-100" />
                  <div className="mt-6">
                    <div className="h-2 bg-gray-100 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-100 rounded w-1/4 mt-2" />
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Infinite Scroll Trigger */}
          <div ref={observerTarget} className="shrink-0 w-[1px]" />
        </div>
        </div>{/* end relative wrapper */}
      </div>
    </section>
  );
};

export default ProductSection;