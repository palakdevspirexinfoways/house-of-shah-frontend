import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ContactHero = () => {
    const [slide, setSlide] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/slides?page=contact`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.data && data.data.length > 0) {
              setSlide(data.data[0]);
            }
          })
          .catch(err => console.error('[Contact Hero Fetch Error]', err));
    }, []);

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const springMouseX = useSpring(mousePos.x, { stiffness: 50, damping: 20 });
    const springMouseY = useSpring(mousePos.y, { stiffness: 50, damping: 20 });

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] font-outfit ">

            {/* --- Background Image with Parallax & Mouse Follow --- */}
            <motion.div
                style={{ y: y1, scale }}
                className="absolute inset-0 w-full h-full"
            >
                {slide?.image && (
                  <motion.img
                      style={{ x: springMouseX, y: springMouseY }}
                      src={slide.image}
                      alt={slide?.title || "Premium Silver Craft"}
                      className="w-full h-full object-cover scale-110"
                  />
                )}
                {/* Sophisticated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#0a0a0a]" />
            </motion.div>

            {/* --- CENTERED CONTENT --- */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
            >

                {/* Tagline */}
                {slide?.tagline && (
                  <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className="mb-8"
                  >
                      <span className="text-white/40 tracking-[0.2em] md:tracking-[0.8em] uppercase text-[9px] md:text-xs font-bold flex items-center gap-4">
                          <div className="w-8 h-[1px] bg-white/20" />
                          {slide.tagline}
                          <div className="w-8 h-[1px] bg-white/20" />
                      </span>
                  </motion.div>
                )}

                {/* Main Title: PRODUCTS */}
                {(slide?.title !== undefined ? slide.title : "Contact Us") && (
                  <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="relative"
                  >
                      <h1 className="text-white text-5xl md:text-9xl lg:text-[13rem] uppercase font-bold leading-none mb-4 mix-blend-difference">
                          {slide?.title !== undefined ? slide.title : "Contact Us"}
                      </h1>
                      {/* Luxury Floating Element */}
                      <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                          className="absolute -top-12 -right-8 md:-top-20 md:-right-20"
                      >
                          {/* <span className="text-[10px] md:text-xs text-white/20 font-light italic tracking-widest vertical-text uppercase">
                              Rajkot • India
                          </span> */}
                      </motion.div>
                  </motion.div>
                )}

                {/* Subtitle / Description */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="max-w-3xl mt-12 space-y-8"
                >
                    <p className="text-white/70 text-lg md:text-2xl font-light leading-relaxed tracking-wide px-4">
                        Curating <span className="text-white font-medium italic">Museum-Grade</span> artifacts
                        and <span className="text-white font-medium">Hallmarked</span> jewelry—where
                        every piece is a 99.9% pure testament to timeless luxury.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-6 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white cursor-pointer group transition-all"
                        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Explore Collection</span>
                        <div className="w-12 h-[1px] bg-white/30 group-hover:w-16 transition-all" />
                    </motion.div>
                </motion.div> */}

            </motion.div>

            {/* --- Corner Embellishments --- */}
            <div className="absolute top-12 left-12 w-32 h-[1px] bg-white/5 hidden lg:block" />
            <div className="absolute top-12 left-12 w-[1px] h-32 bg-white/5 hidden lg:block" />

            <div className="absolute bottom-12 right-12 w-32 h-[1px] bg-white/5 hidden lg:block" />
            <div className="absolute bottom-12 right-12 w-[1px] h-32 bg-white/5 hidden lg:block" />

        </section>
    );
};

export default ContactHero;
