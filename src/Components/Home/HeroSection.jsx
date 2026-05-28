import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const defaultSlides = [
  {
    id: 1,
    title: "India's Journey to",
    subtitle: "Global Manufacturing Leadership",
    tagline: "CRAFTING SILVER SYMPHONY",
    bg: "",
  },
  {
    id: 2,
    title: "Exquisite Artistry",
    subtitle: "Premium Silver Collection",
    tagline: "HOUSE OF SHAH EXCLUSIVES",
    bg: "",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/slides`)
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
        }
      })
      .catch((err) => console.error('[Hero Slider Connection Error]', err));
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

  if (slides.length === 0) {
    return (
      <section className="relative h-screen w-full bg-[#080b11] flex items-center justify-center text-center font-outfit">
        <div className="text-white space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold block">HOUSE OF SHAH EXCLUSIVES</span>
          <h1 className="text-3xl font-light uppercase tracking-widest text-gray-300">Exquisite Artistry</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white font-outfit">
      
      <div className="relative h-full w-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            {/* Background Image Container */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={slides[current].bg} 
                className="w-full h-full object-cover" 
                alt="Slide Background" 
              />
              {/* --- MINOR DARK OVERLAY: Adjusted for clarity --- */}
              {/* Bottom se light dark aur top se bilkul transparent rakha hai */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              
              {/* Subtle radial overlay for center text focus */}
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-white drop-shadow-md tracking-[0.6em] uppercase text-[10px] md:text-xs mb-6 font-bold"
              >
                {slides[current].tagline}
              </motion.p>

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-white drop-shadow-2xl text-5xl md:text-6xl lg:text-[7.5rem] font-bold mb-4 tracking-tighter leading-[0.9]"
              >
                {slides[current].title}
              </motion.h1>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-white/90 drop-shadow-lg text-2xl md:text-4xl lg:text-5xl font-light italic mb-12"
              >
                {slides[current].subtitle}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <a href="#collection">
                  <button className="px-12 py-5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-[var(--primary-blue)] hover:text-white transition-all duration-500 shadow-2xl">
                    Explore Collection
                  </button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-25 right-12 flex gap-4 z-30">
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
      <div className="absolute left-12 bottom-12 flex flex-col gap-6 z-30">
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