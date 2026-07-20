import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const defaultSlides = [
  {
    id: 1,
    title: "",
    subtitle: "",
    tagline: "",
    bg: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "",
    subtitle: "",
    tagline: "",
    bg: "https://images.unsplash.com/photo-1610014763116-3e82717906d4?q=80&w=1920&auto=format&fit=crop",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  const [heroMode, setHeroMode] = useState('video');
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [heroVideoTagline, setHeroVideoTagline] = useState('');
  const [heroVideoTitle, setHeroVideoTitle] = useState('');

  useEffect(() => {
    // Fetch Slides
    fetch(`${import.meta.env.VITE_API_BASE_URL}/slides?page=home`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map((item, idx) => ({
            id: item.id || idx,
            title: item.title,
            subtitle: item.desc || '',
            tagline: item.tagline || '',
            bg: item.image,
          }));
          setSlides(mapped);
          setCurrent(0); // Reset current to avoid out-of-bounds
        }
      })
      .catch((err) => console.error('[Hero Slider Connection Error]', err));

    // Fetch Settings
    fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          if (data.data.hero_mode !== undefined) setHeroMode(data.data.hero_mode);
          if (data.data.hero_video_url !== undefined) setHeroVideoUrl(data.data.hero_video_url);
          if (data.data.hero_video_tagline !== undefined) setHeroVideoTagline(data.data.hero_video_tagline);
          if (data.data.hero_video_title !== undefined) setHeroVideoTitle(data.data.hero_video_title);
        }
      })
      .catch((err) => console.error('[Hero Settings Connection Error]', err));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  const handleScrollToCollections = (e) => {
    e.preventDefault();
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  if (heroMode === 'video') {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-black font-outfit">
        {heroVideoUrl && (
          <video 
            src={heroVideoUrl} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}
        {/* Subtle radial overlay for center text focus */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          {heroVideoTitle && (
            <>
              {heroVideoTagline && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-white drop-shadow-md tracking-[0.6em] uppercase text-[10px] md:text-xs mb-6 font-bold"
                >
                  {heroVideoTagline}
                </motion.p>
              )}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-white drop-shadow-2xl text-4xl sm:text-5xl md:text-6xl lg:text-[7.5rem] font-bold mb-4 tracking-tighter leading-[0.9] uppercase"
              >
                {heroVideoTitle}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="mt-12"
              >
                <button 
                  onClick={handleScrollToCollections}
                  className="px-12 py-5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-[var(--primary-blue)] hover:text-white transition-all duration-500 shadow-2xl"
                >
                  Explore Collections
                </button>
              </motion.div>
            </>
          )}
        </div>
      </section>
    );
  }

  const currentSlideData = slides[current] || defaultSlides[0];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-outfit">
      
      <div className="relative h-full w-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full"
          >
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={currentSlideData.bg} 
                className="w-full h-full object-cover" 
                alt="Slide Background" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-black/5" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
              {currentSlideData.title && (
                <>
                  {currentSlideData.tagline && (
                    <motion.p
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-white drop-shadow-md tracking-[0.6em] uppercase text-[10px] md:text-xs mb-6 font-bold flex items-center justify-center gap-4"
                    >
                      <div className="w-6 h-[1px] bg-white/40" />
                      {currentSlideData.tagline}
                      <div className="w-6 h-[1px] bg-white/40" />
                    </motion.p>
                  )}

                  <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-white drop-shadow-2xl text-4xl sm:text-5xl md:text-6xl lg:text-[7.5rem] font-bold mb-4 tracking-tighter leading-[0.9] uppercase"
                  >
                    {currentSlideData.title}
                  </motion.h1>

                  {currentSlideData.subtitle && (
                    <motion.p
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-gray-100 text-sm sm:text-base md:text-xl font-light italic max-w-2xl mb-12"
                    >
                      {currentSlideData.subtitle}
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                  >
                    <button 
                      onClick={handleScrollToCollections}
                      className="px-12 py-5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-[var(--primary-blue)] hover:text-white transition-all duration-500 shadow-2xl"
                    >
                      Explore Collections
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-[100px] right-4 md:right-12 flex gap-4 z-30">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full backdrop-blur-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-14 h-14 flex items-center justify-center border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full backdrop-blur-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute left-12 bottom-12 hidden md:flex flex-col gap-6 z-30">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)} className="group flex items-center gap-4 outline-none">
            <div className={`h-16 w-[2px] transition-all duration-700 ${index === current ? 'bg-white' : 'bg-white/30 group-hover:bg-white/50'}`} />
            <span className={`text-[10px] font-bold tracking-[0.3em] transition-all duration-500 ${index === current ? 'text-white opacity-100 translate-x-0' : 'text-white opacity-0 -translate-x-4'}`}>
              
            </span>
          </button>
        ))}
      </div>

    </section>
  );
};

export default HeroSlider;