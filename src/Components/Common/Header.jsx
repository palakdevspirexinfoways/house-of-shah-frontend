import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Search, Heart, Trash2, ArrowUpRight, User } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useCart } from '../../context/CartContext';
import LoginSignupModal from './LoginSignupModal';
import logo from '../../aasets/HOS_Logo_V.1-removebg-preview.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [exhibitionMode, setExhibitionMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, totalPrice } = useCart();

  const [userSessionActive, setUserSessionActive] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Search state variables
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [selectedSearchProduct, setSelectedSearchProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllProducts(data.data || []);
        }
      })
      .catch((err) => console.error('[Header Search Products Fetch Error]', err));
  }, []);

  const filteredSuggestions = searchQuery.trim() === ''
    ? []
    : allProducts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  useEffect(() => {
    const checkSession = () => {
      const active = localStorage.getItem('hos_user_session') === 'active';
      setUserSessionActive(active);
      setUserName(localStorage.getItem('hos_user_name') || '');
      if (active) {
        setIsAuthOpen(false);
      }
    };
    checkSession();

    window.addEventListener('userSessionChange', checkSession);
    return () => {
      window.removeEventListener('userSessionChange', checkSession);
    };
  }, []);

  const handleUserLogout = () => {
    localStorage.removeItem('hos_user_session');
    localStorage.removeItem('hos_user_token');
    localStorage.removeItem('hos_user_name');
    setUserSessionActive(false);
    setUserName('');
    setShowUserDropdown(false);
    window.dispatchEvent(new Event('userSessionChange'));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    let timer;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const popupEnabled = data.data.popupEnabled !== false;
          const isExhibit = data.data.exhibitionMode === true;
          setExhibitionMode(isExhibit);
          const userSession = localStorage.getItem('hos_user_session');
          
          if (userSession !== 'active') {
            if (isExhibit) {
              setIsAuthOpen(true); // Open immediately
            } else if (popupEnabled) {
              timer = setTimeout(() => {
                setIsAuthOpen(true);
              }, 5000);
            }
          }
        }
      })
      .catch((err) => {
        console.error('[Header Settings Connection Error]', err);
        // Graceful fallback to localStorage state
        const popupEnabled = localStorage.getItem('hos_popup_enabled') !== 'false';
        const userSession = localStorage.getItem('hos_user_session');
        if (popupEnabled && userSession !== 'active') {
          timer = setTimeout(() => {
            setIsAuthOpen(true);
          }, 5000);
        }
      });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Jewellery', href: '/product' },
    { name: 'Digital Magazine', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Beyond Jewellery', href: '/womenempowerment'},
    { name: 'Contact', href: '/contact' },
  ];
 

  return (
    <>
      <header className="fixed top-0 w-full z-[100] font-outfit transition-all duration-500">

        <div className="w-full bg-gradient-to-b from-black/60 to-transparent ">
          <nav className={`w-full max-w-[1440px] mx-auto transition-all duration-500 px-4 lg:px-8 xl:px-12 py-5 flex items-center justify-between rounded-full
              ${scrolled 
                ? 'bg-[var(--primary-blue)]/95 backdrop-blur-xl shadow-2xl w-full max-w-full rounded-none' 
                : 'bg-transparent'}`}>
            
            {/* LEFT: LOGO */}
            <div className="flex-shrink-0 flex items-center mr-4 md:mr-8 lg:mr-16 xl:mr-24">
              <a href="/" className="group block">
                <img 
                  src={logo} 
                  alt="House of Shah Logo" 
                  className="h-10 md:h-16 w-auto object-contain scale-[2.0] md:scale-[2.9] lg:scale-[2.5] xl:scale-[3.0] origin-left transition-transform duration-500"
                />
              </a>
            </div>

            {/* CENTER: NAV LINKS */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-4 lg:gap-5 xl:gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[10px] xl:text-xs font-bold uppercase tracking-[0.15em] xl:tracking-[0.3em] text-[var(--white)]/70 hover:text-[var(--white)] transition-all relative group whitespace-nowrap">
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--white)] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* RIGHT: E-COMMERCE ACTIONS */}
            <div className="flex items-center gap-4 md:gap-6 lg:gap-5 xl:gap-7 flex-shrink-0">
              {/* INLINE EXPANDING SEARCH CONTROLLER */}
              {isSearchOpen ? (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 pl-3 pr-2 py-1.5 transition-all w-48 sm:w-64 relative font-outfit">
                  <Search size={14} className="text-white/50" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="bg-transparent outline-none text-[10px] font-bold uppercase tracking-wider text-white placeholder-white/30 w-full"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} 
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <X size={12} />
                  </button>
                  
                  {/* Suggestions Dropdown Card anchored to the inline input */}
                  <AnimatePresence>
                    {searchQuery.trim() !== '' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-64 sm:w-80 bg-black/95 border border-white/10 shadow-2xl p-3 z-50 font-outfit backdrop-blur-xl"
                      >
                        <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
                          {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((prod) => (
                              <div 
                                key={prod.id || prod._id}
                                onClick={() => {
                                  setSelectedSearchProduct(prod);
                                  setIsSearchOpen(false);
                                  setSearchQuery('');
                                }}
                                className="flex items-center gap-2 p-1.5 bg-white/[0.02] border border-white/5 hover:border-[var(--primary-blue)]/30 hover:bg-white/[0.05] cursor-pointer transition-all duration-300 group"
                              >
                                <div className="w-6 h-8 bg-gray-900 border border-white/5 overflow-hidden shrink-0">
                                  <img src={prod.image} className="w-full h-full object-cover" alt={prod.title} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[9px] font-bold text-white uppercase tracking-wider block truncate group-hover:text-[var(--primary-blue)] transition-colors">{prod.title}</span>
                                  <span className="text-[7px] font-mono text-gray-500 uppercase mt-0.5 block">{prod.category}</span>
                                </div>
                                <ArrowUpRight size={10} className="text-gray-500 group-hover:text-white transition-colors" />
                              </div>
                            ))
                          ) : (
                            <div className="py-2 text-center text-[8px] text-gray-500 uppercase tracking-widest font-bold">
                              No creations found.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-[var(--white)] hover:opacity-60 transition-opacity flex items-center justify-center"
                  aria-label="Toggle Search Panel"
                >
                  <Search size={18} strokeWidth={1.5} />
                </button>
              )}
              <div className="hidden lg:block"><LanguageSelector /></div>

              {/* USER PROFILE ICON */}
              <div className="relative">
                {userSessionActive ? (
                  <>
                    <button 
                      onClick={() => setShowUserDropdown(!showUserDropdown)} 
                      className="flex items-center gap-2 text-[var(--white)] hover:opacity-80 transition-opacity animate-fade-in"
                    >
                      <div className="w-6 h-6 rounded-full bg-white text-[#1a4173] flex items-center justify-center text-xs font-bold uppercase border border-white/20 shadow-sm hover:scale-105 transition-all shrink-0">
                        {userName ? userName.trim().charAt(0) : 'U'}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider max-w-[80px] truncate hidden md:inline">
                        {userName}
                      </span>
                    </button>
                    <AnimatePresence>
                      {showUserDropdown && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowUserDropdown(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 mt-3 w-48 bg-black/95 backdrop-blur-xl border border-white/10 p-4 shadow-2xl z-20 font-outfit"
                          >
                            <div className="pb-2 mb-2 border-b border-white/5">
                              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Welcome</span>
                              <span className="text-xs font-bold text-white uppercase tracking-wider block mt-0.5 truncate">{userName}</span>
                            </div>
                            <button 
                              onClick={handleUserLogout}
                              className="w-full text-left py-2 text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors"
                            >
                              Logout Session
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <button onClick={() => setIsAuthOpen(true)} className="relative text-[var(--white)] group hover:scale-110 transition-transform flex items-center justify-center">
                    <User size={19} strokeWidth={1.5} />
                  </button>
                )}
              </div>

              <button className="lg:hidden text-[var(--white)] flex flex-col gap-1.5 items-end justify-center group" onClick={() => setIsOpen(true)}>
                 <span className="w-6 h-[1px] bg-[var(--white)]"></span>
                 <span className="w-4 h-[1px] bg-[var(--white)]"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* --- CART SIDEBAR COMPONENT --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[1001] shadow-2xl flex flex-col font-outfit"
            >
              {/* Cart Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-xl font-bold text-[var(--primary-blue)] tracking-tighter uppercase">Your Bag</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{cartItems.length} Items Selected</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-300">
                  <X size={24} className="text-[var(--primary-blue)]" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                       <ShoppingBag size={32} className="text-gray-200" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Empty Selection</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="w-24 h-28 bg-gray-100 overflow-hidden shrink-0">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                      </div>
                      <div className="flex-1 py-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-bold text-[var(--primary-blue)] uppercase leading-relaxed tracking-wider max-w-[150px]">{item.title}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase">99.9 Pure Silver</p>
                        </div>
                        <div className="flex justify-between items-end">
                           <p className="text-[10px] font-bold border border-gray-100 px-2 py-1">QTY: {item.quantity}</p>
                           <p className="text-sm font-bold text-[var(--primary-blue)]">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="p-8 border-t border-gray-100 bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Total Amount</span>
                    <span className="text-2xl font-bold text-[var(--primary-blue)]">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-[var(--primary-blue)] text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-3 group">
                    Checkout Now <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginSignupModal isOpen={isAuthOpen} onClose={() => {
        setIsAuthOpen(false);
      }} isExhibitionMode={exhibitionMode} />

      {/* Visual Search Masterpiece Detail Modal */}
      <AnimatePresence>
        {selectedSearchProduct && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSearchProduct(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md fixed"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white w-full max-w-4xl shadow-2xl flex flex-col md:flex-row font-outfit z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedSearchProduct(null)}
                className="absolute top-6 right-6 z-50 p-2.5 bg-black/5 hover:bg-black hover:text-white transition-all text-black"
              >
                <X size={20} />
              </button>

              {/* Product Image */}
              <div className="w-full md:w-1/2 bg-[var(--silver-bg)] relative aspect-[4/5] md:aspect-auto overflow-hidden shrink-0">
                <img 
                  src={selectedSearchProduct.image} 
                  alt={selectedSearchProduct.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white text-[var(--primary-blue)]">
                <div className="mb-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary-blue)]/50 block mb-3">
                    {selectedSearchProduct.category}
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tighter uppercase text-[var(--primary-blue)] mb-4">
                    {selectedSearchProduct.title}
                  </h2>
                  <div className="w-8 h-[1px] bg-[var(--primary-blue)]/20 mb-6" />
                  
                  <div className="space-y-3.5">
                    {selectedSearchProduct.weight && (
                      <div className="flex justify-between text-xs border-b border-gray-100 pb-2">
                        <span className="text-gray-400 uppercase tracking-wider">Net Weight</span>
                        <span className="font-bold">{selectedSearchProduct.weight}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs border-b border-gray-100 pb-2">
                      <span className="text-gray-400 uppercase tracking-wider">Composition</span>
                      <span className="font-bold">99.9% Pure Silver Guaranteed</span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-gray-100 pb-2">
                      <span className="text-gray-400 uppercase tracking-wider">Certification</span>
                      <span className="font-bold">BIS Hallmarked</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const phoneNumber = "919510806869"; // WhatsApp Number
                    const message = encodeURIComponent(
                      `Hi House of Shah, I would like to inquire about this masterpiece discovered through the search gallery:\n\n` +
                      `• Category: ${selectedSearchProduct.category}\n` +
                      `• Name: ${selectedSearchProduct.title}\n` +
                      `• Weight: ${selectedSearchProduct.weight || 'N/A'}\n\nPlease share more details and pricing.`
                    );
                    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
                  }}
                  className="w-full bg-[var(--primary-blue)] text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black transition-colors"
                >
                  Send WhatsApp Inquiry <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col justify-center items-center gap-8"
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform p-2"
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--white)]/70 hover:text-[var(--white)] transition-colors text-center whitespace-nowrap"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex gap-6"
            >
              <LanguageSelector />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;