import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import HeroSection from '../Components/Product/HeroSection'
import SignatureCollections from '../Components/Product/collection'
import SignaturePieces from '../Components/Product/Products'

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeCollection, setActiveCollection] = useState('All');
  const [collectionsCategory, setCollectionsCategory] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);

  // Fetch all products from database once
  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('[ProductPage Fetch Error]', err);
        setIsLoading(false);
      });
  }, []);

  // Dynamically extract collections and categories from the products list
  const collections = useMemo(() => {
    const cols = products.map(p => p.collection).filter(Boolean);
    return ['All', ...new Set(cols)];
  }, [products]);

  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [products]);

  // Handle Search Suggestions list (matches title, collection, or category)
  const suggestions = useMemo(() => {
    if (searchQuery.trim() === '') return [];
    return products.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.collection || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [products, searchQuery]);

  // Derived filtered products list for Collections (uses search, collection and collectionsCategory filter)
  const filteredCollections = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.collection || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCollection = activeCollection === 'All' || p.collection === activeCollection;
      const matchesCategory = collectionsCategory === 'All' || p.category === collectionsCategory;
      return matchesSearch && matchesCollection && matchesCategory;
    });
  }, [products, searchQuery, activeCollection, collectionsCategory]);

  // Derived filtered products list for Pieces (uses category filter only, completely decoupled)
  const filteredPieces = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesCategory;
    });
  }, [products, activeCategory]);

  return (
    <div className="bg-white min-h-screen font-outfit">
      <HeroSection />

      {/* Sliders rendering with passed states and filters */}
      <SignatureCollections 
        products={filteredCollections} 
        isLoadingData={isLoading} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        suggestions={suggestions}
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
        collections={collections}
        activeCategory={collectionsCategory}
        setActiveCategory={setCollectionsCategory}
        categories={categories}
        setSelectedDetailProduct={setSelectedDetailProduct}
      />

      <SignaturePieces 
        products={filteredPieces} 
        isLoadingData={isLoading} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />

      {/* Visual Search Masterpiece Detail Modal */}
      <AnimatePresence>
        {selectedDetailProduct && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetailProduct(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md fixed"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white w-full max-w-4xl shadow-2xl flex flex-col md:flex-row font-outfit z-[3001]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedDetailProduct(null)}
                className="absolute top-6 right-6 z-50 p-2.5 bg-black/5 hover:bg-black hover:text-white transition-all text-black"
              >
                <X size={20} />
              </button>

              {/* Product Image */}
              <div className="w-full md:w-1/2 bg-gray-50 relative aspect-[4/5] md:aspect-auto overflow-hidden shrink-0">
                <img 
                  src={selectedDetailProduct.image} 
                  alt={selectedDetailProduct.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white text-[#1a4173]">
                <div className="mb-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#1a4173]/50 block mb-3">
                    {selectedDetailProduct.category}
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tighter uppercase text-[#1a4173] mb-4">
                    {selectedDetailProduct.title}
                  </h2>
                  <div className="w-8 h-[1px] bg-[#1a4173]/20 mb-6" />
                  
                  <div className="space-y-3.5">
                    <div className="flex justify-between text-xs border-b border-gray-150 pb-2">
                      <span className="text-gray-400 uppercase tracking-wider">Collection</span>
                      <span className="font-bold">{selectedDetailProduct.collection || 'Exclusive'}</span>
                    </div>
                    {selectedDetailProduct.weight && (
                      <div className="flex justify-between text-xs border-b border-gray-150 pb-2">
                        <span className="text-gray-400 uppercase tracking-wider">Net Weight</span>
                        <span className="font-bold">{selectedDetailProduct.weight}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs border-b border-gray-150 pb-2">
                      <span className="text-gray-400 uppercase tracking-wider">Composition</span>
                      <span className="font-bold">99.9% Pure Silver Guaranteed</span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-gray-150 pb-2">
                      <span className="text-gray-400 uppercase tracking-wider">Certification</span>
                      <span className="font-bold">BIS Hallmarked</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const phoneNumber = "919510806869";
                    const message = encodeURIComponent(
                      `Hi House of Shah, I would like to inquire about this masterpiece discovered through the collection search registry:\n\n` +
                      `• Category: ${selectedDetailProduct.category}\n` +
                      `• Name: ${selectedDetailProduct.title}\n` +
                      `• Collection: ${selectedDetailProduct.collection || 'Exclusive'}\n` +
                      `• Weight: ${selectedDetailProduct.weight || 'N/A'}\n\nPlease share more details and pricing.`
                    );
                    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
                  }}
                  className="w-full bg-[#1a4173] text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black transition-colors"
                >
                  Send WhatsApp Inquiry <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default ProductPage
