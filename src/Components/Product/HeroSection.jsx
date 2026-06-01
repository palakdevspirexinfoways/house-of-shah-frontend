import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slidesData = [
  {
    tagline: "A 15-Year Legacy of Precision",
    title: "Products",
    desc: "Curating Museum-Grade artifacts and Hallmarked jewelry—where every piece is a 99.9% pure testament to timeless luxury.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1920&auto=format&fit=crop"
  },
  {
    tagline: "Crafted with Master Artistry",
    title: "Artistry",
    desc: "Experience handcrafted silver masterpieces sculpted with Rajkot's finest techniques and mathematical precision.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1920&auto=format&fit=crop"
  },
  {
    tagline: "100% BIS Hallmarked Purity",
    title: "Purity",
    desc: "An unbreakable promise of trust. Every creation is certified for ultimate value, absolute tracing, and lifelong beauty.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1920&auto=format&fit=crop"
  },
  {
    tagline: "Bespoke Royal Collections",
    title: "Legacy",
    desc: "Reimagined heritage shapes designed to elevate luxury spaces and celebrate modern royalty with timeless symmetry.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1920&auto=format&fit=crop"
  }
];

const ProductHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleDotClick = (idx) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 1.05
    }),
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-[#0a0a0a] font-outfit">

      {/* --- Slider Background with Cross-fade --- */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slidesData[currentSlide].image}
              alt="Premium Silver Craft"
              className="w-full h-full object-cover"
            />
            {/* Elegant dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/30 to-[#0a0a0a]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- SLIDER CONTENT --- */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl flex flex-col items-center"
          >
            {/* Tagline */}
            <motion.div variants={contentVariants} className="mb-6 md:mb-8">
              <span className="text-white/40 tracking-[0.8em] uppercase text-[9px] md:text-xs font-bold flex items-center gap-4">
                <div className="w-8 h-[1px] bg-white/20" />
                {slidesData[currentSlide].tagline}
                <div className="w-8 h-[1px] bg-white/20" />
              </span>
            </motion.div>

            {/* Title */}
            <motion.div variants={contentVariants} className="relative mb-6">
              <h1 className="text-white text-5xl md:text-8xl lg:text-[9rem] uppercase font-bold tracking-tighter leading-none mix-blend-difference">
                {slidesData[currentSlide].title}
              </h1>
              {/* Luxury Floating Element */}
              <div className="absolute -top-10 -right-8 md:-top-16 md:-right-16">
                <span className="text-[8px] md:text-[10px] text-white/20 font-light italic tracking-widest vertical-text uppercase">
                  HOS • EST. 2023
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={contentVariants} 
              className="text-white/70 text-base md:text-2xl font-light leading-relaxed tracking-wide px-4 max-w-3xl mb-10"
            >
              {slidesData[currentSlide].desc}
            </motion.p>
            
            {/* Button */}
            <motion.div 
              variants={contentVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-6 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white cursor-pointer group transition-all"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Explore Collection</span>
              <div className="w-12 h-[1px] bg-white/30 group-hover:w-16 transition-all" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Manual Slider Controls --- */}
      <button 
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* --- Paginated Dots (Bottom Right) --- */}
      <div className="absolute bottom-12 right-12 z-20 flex items-center gap-4">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className="group relative flex items-center justify-center p-2"
            aria-label={`Go to slide ${idx + 1}`}
          >
            {/* Inner Dot */}
            <div className={`h-[2px] transition-all duration-500 bg-white ${
              currentSlide === idx ? 'w-8' : 'w-4 opacity-30 group-hover:opacity-60'
            }`} />
            
            {/* Number tool-tip on hover */}
            <span className="absolute -top-6 text-[9px] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest font-bold">
              0{idx + 1}
            </span>
          </button>
        ))}
      </div>

      {/* --- Corner Embellishments --- */}
      <div className="absolute top-12 left-12 w-32 h-[1px] bg-white/5 hidden lg:block" />
      <div className="absolute top-12 left-12 w-[1px] h-32 bg-white/5 hidden lg:block" />
      
      <div className="absolute bottom-12 left-12 w-32 h-[1px] bg-white/5 hidden lg:block" />
      <div className="absolute bottom-12 left-12 w-[1px] h-32 bg-white/5 hidden lg:block" />

      {/* --- Slide Index Counter (Bottom Left) --- */}
      <div className="absolute bottom-12 left-12 z-20 hidden lg:flex items-baseline gap-1 text-white">
        <span className="text-xl font-bold tracking-tighter">0{currentSlide + 1}</span>
        <span className="text-xs text-white/30">/ 0{slidesData.length}</span>
      </div>

    </section>
  );
};

export default ProductHero;
