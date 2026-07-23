import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowUpRight, Maximize2, Sparkles } from 'lucide-react';

const defaultGalleryItems = [
  {
    id: 1,
    title: "The Royal Throne Ganesha",
    category: "MUSEUM GRADE",
    size: "Large / Double Width",
    image: "https://claysphere.com/wp-content/uploads/2024/07/psx_20210816_221228.jpg",
    cols: "md:col-span-2",
    purity: "99.9% Pure Silver"
  },
  {
    id: 2,
    title: "Celestial Moon Silhouette",
    category: "FINE JEWELRY",
    size: "Classic Vertical",
    image: "https://kinclimg5.bluestone.com/f_jpg,c_scale,w_1024,q_80,b_rgb:f0f0f0/giproduct/BISK0368P03-POSTER-21068.jpg",
    cols: "md:col-span-1",
    purity: "Hallmarked Silver"
  },
  {
    id: 3,
    title: "Vedic Luxury Thali Layout",
    category: "HERITAGE ANTIQUES",
    size: "Standard Square",
    image: "https://houseofshah.in/wp-content/uploads/2024/05/thali.jpg",
    cols: "md:col-span-1",
    purity: "99.9% Pure Silver"
  },
  {
    id: 4,
    title: "Imperial Architectural Surahi",
    category: "MUSEUM GRADE",
    size: "Tall Portrait",
    image: "https://houseofshah.in/wp-content/uploads/2024/05/surahi.jpg",
    cols: "md:col-span-1 row-span-2",
    purity: "Custom Burnished"
  },
  {
    id: 5,
    title: "The Infinity Silver Band",
    category: "FINE JEWELRY",
    size: "Macro Detail Shot",
    image: "https://jewelrydesigns.com/wp-content/uploads/ER1-Shop-Diamond-Engagement-Rings-1080X1080.jpg",
    cols: "md:col-span-2",
    purity: "925 Sterling"
  },
  {
    id: 6,
    title: "Elite Forged Masterpiece",
    category: "BESPOKE",
    size: "Cinematic Horizontal",
    image: "https://artizanjoyeria.com/cdn/shop/files/One_image_12.webp?v=1761204542&width=1000",
    cols: "md:col-span-2",
    purity: "Handcrafted 1-of-1"
  },
  {
    id: 7,
    title: "Heritage Elephant Carving",
    category: "HERITAGE ANTIQUES",
    size: "Classic Vertical",
    image: "https://houseofshah.in/wp-content/uploads/2024/05/artifact1.jpg",
    cols: "md:col-span-1",
    purity: "99.9% Pure Silver"
  }
];

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  const categories = ['ALL', 'MUSEUM GRADE', 'FINE JEWELRY', 'HERITAGE ANTIQUES', 'BESPOKE'];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map((item, idx) => ({
            id: item.id || idx,
            title: item.title,
            category: item.category.toUpperCase().includes('ISSUE') ? 'MUSEUM GRADE' : item.category.toUpperCase(),
            size: "Archive Detail",
            image: item.image,
            cols: idx % 3 === 0 ? "md:col-span-2" : "md:col-span-1",
            purity: item.category,
          }));
          setGalleryItems(mapped);
        } else {
          setGalleryItems([]);
        }
      })
      .catch((err) => {
        console.error('[Gallery Section Connection Error]', err);
        setGalleryItems([]);
      });
  }, []);

  if (galleryItems.length === 0) {
    return null;
  }

  const filteredItems = activeFilter === 'ALL'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="bg-white py-16 md:py-32 px-6 md:px-12 lg:px-24 font-outfit overflow-hidden">
      <div className="max-w-[1600px] mx-auto">

        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-4">
              <span className="text-[var(--primary-blue)] font-bold tracking-[0.6em] text-[9px] uppercase">
                Visual Exhibition
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-[var(--primary-blue)] tracking-tighter leading-none uppercase">
              THE ARTISTRY <br />
              <span className="font-light italic text-[var(--primary-blue)]/30 lowercase tracking-normal font-serif block mt-2">
                archive
              </span>
            </h1>
          </div>

          <p className="text-gray-400 text-xs md:text-sm font-light max-w-xs leading-relaxed uppercase tracking-wider">
            A visual curation of 15 years of Rajkot’s high-purity silver engineering, immortalized through fine photography.
          </p>
        </div>

        {/* --- PREMIUM FILTER TABS --- */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-gray-100 pb-8 mb-16 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative text-[10px] font-bold uppercase tracking-[0.3em] pb-2 transition-all shrink-0
                ${activeFilter === cat ? 'text-[var(--primary-blue)]' : 'text-gray-300 hover:text-gray-600'}`}
            >
              {cat}
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeGalleryTab"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-blue)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* --- ASYMMETRIC MASONRY / EDITORIAL GRID --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                key={item.id}
                className="relative group overflow-hidden bg-gray-50 aspect-[4/5] cursor-pointer border border-gray-100"
                onClick={() => setSelectedImage(item)}
              >
                {/* Image Overlay/Cinematic Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 p-8 flex flex-col justify-between" />

                {/* Top Corner Badge on Hover */}
                <div className="absolute top-6 left-6 z-20 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 shadow-xl">
                  <Sparkles size={10} className="text-[var(--primary-blue)]" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--primary-blue)]">
                    {item.purity}
                  </span>
                </div>

                {/* Zooming Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />

                {/* Bottom Interactive Content on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-end">
                  <div className="text-white space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                      {item.category}
                    </p>
                    <h3 className="text-lg font-bold uppercase tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-3 bg-white text-[var(--primary-blue)] rounded-none shadow-2xl">
                    <Maximize2 size={16} strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- LIGHTBOX MODAL (Full Screen View) --- */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[2000] flex items-center justify-center p-4 md:p-12"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-8 right-8 text-white/50 hover:text-white p-2 text-xs uppercase tracking-widest flex items-center gap-2 border border-white/10 px-4 py-2"
                onClick={() => setSelectedImage(null)}
              >
                Close ESC
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="max-w-4xl w-full max-h-[85vh] flex justify-center items-center p-4"
                onClick={(e) => e.stopPropagation()} // Modal body click block karne ke liye
              >
                {/* Lightbox Image Only */}
                <div className="w-full flex items-center justify-center h-[80vh]">
                  <img
                    src={selectedImage.image}
                    alt="Gallery item"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default GallerySection;