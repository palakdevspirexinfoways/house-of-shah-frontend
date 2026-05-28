import { useEffect, useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { LuLanguages } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSelector = () => {
  const defaultLanguage = "English";
  const defaultLanguageCode = "en";

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // Expanded language list with common languages
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
    { code: "ar", name: "Arabic", flag: "🇦🇪" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "af", name: "Afrikaans", flag: "🇿🇦" }, // Added African Language
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" },
  ];

  // Filtered languages based on search query
  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Focus search input when dropdown opens
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Clear Google Translate cookies on page load
    const clearTranslateCookies = () => {
      const cookieNames = ['googtrans', '_ga', '_gid', 'googtrans'];
      cookieNames.forEach(name => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
      });

      localStorage.removeItem('googtrans');
      sessionStorage.removeItem('googtrans');
    };

    clearTranslateCookies();

    const resetPageTranslation = () => {
      const elements = document.querySelectorAll('[lang]');
      elements.forEach(el => {
        if (el.getAttribute('lang') !== 'en') {
          el.removeAttribute('lang');
        }
      });

      document.querySelectorAll('[translate]').forEach(el => {
        el.removeAttribute('translate');
      });

      document.documentElement.lang = 'en';
    };

    resetPageTranslation();

    const initGoogleTranslate = () => {
      if (document.querySelector(".goog-te-combo")) return; // Already initialized

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
          includedLanguages: languages.map(l => l.code).join(',')
        },
        "google_translate_element"
      );

      setTimeout(() => {
        removeGoogleTranslatePopups();
        forceDefaultLanguage();
      }, 1000);
    };

    window.googleTranslateInit = initGoogleTranslate;

    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        script.async = true;
        document.body.appendChild(script);
      } else if (window.google && window.google.translate) {
        // Script loaded but component re-mounted
        initGoogleTranslate();
      }
    };

    // Delay slightly to ensure DOM is ready
    setTimeout(addGoogleTranslateScript, 500);

    const forceDefaultLanguage = () => {
      const selectEl = document.querySelector(".goog-te-combo");
      if (selectEl) {
        if (selectEl.value !== defaultLanguageCode) {
          selectEl.value = defaultLanguageCode;
          selectEl.dispatchEvent(new Event("change"));
          setSelectedLanguage(defaultLanguage);

          setTimeout(() => {
            document.querySelectorAll("[lang]").forEach(el => el.removeAttribute("lang"));
            document.body.classList.remove("translated-ltr", "translated-rtl");
            document.body.style.top = "0px";
          }, 500);
        } else {
          setSelectedLanguage(defaultLanguage);
          document.body.style.top = "0px";
        }
      }
    };

    const removeGoogleTranslatePopups = () => {
      const css = `
        .goog-te-banner-frame,
        .skiptranslate {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0 !important;
          position: static !important;
        }
        .goog-tooltip, 
        .goog-tooltip:hover,
        #goog-gt-tt,
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
        }
        .goog-text-highlight {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-gadget {
          height: 0px !important;
          overflow: hidden !important;
        }
      `;

      let style = document.getElementById("google-translate-style-fixes");
      if (!style) {
        style = document.createElement("style");
        style.id = "google-translate-style-fixes";
        document.head.appendChild(style);
      }
      style.innerHTML = css;

      const removeTopBanner = () => {
        const bannerFrame = document.querySelector(".goog-te-banner-frame");
        if (bannerFrame) bannerFrame.remove();
        if (document.body.style.top && document.body.style.top !== "0px") {
          document.body.style.top = "0px";
        }
        document.querySelectorAll(".goog-tooltip").forEach(el => el.remove());
      };

      const intervalId = setInterval(removeTopBanner, 300);
      return () => clearInterval(intervalId);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-selector-container')) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (langCode, langName) => {
    setSelectedLanguage(langName);
    setIsOpen(false);
    setSearchQuery("");

    const selectEl = document.querySelector(".goog-te-combo");
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event("change"));

      setTimeout(() => {
        const bannerFrame = document.querySelector(".goog-te-banner-frame");
        if (bannerFrame) bannerFrame.remove();
        document.body.style.top = "0px";
      }, 1000);
    }
  };

  return (
    <div className="relative language-selector-container z-[9999]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-10 h-10 rounded-full 
          bg-(--primary-blue)
          border border-white/20 
          text-white 
          flex justify-center items-center 
          cursor-pointer 
         
        "
        aria-label="Select Language"
      >
        <LuLanguages size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute right-0 mt-3 
              w-[280px] max-h-[400px] 
              bg-black/80 backdrop-blur-xl 
              border border-white/10 
              rounded-2xl 
              shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
              overflow-hidden 
              flex flex-col
            "
          >
            {/* Search Bar */}
            <div className="p-3 border-b border-white/10 bg-white/5">
              <div className="relative">
                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    w-full pl-10 pr-4 py-2 
                    bg-white/10 
                    border border-white/10 
                    rounded-xl 
                    text-sm text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-(--primary-blue)/50 
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Language List */}
            <div className="overflow-y-auto flex-grow custom-scrollbar p-2 space-y-1">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => (
                  <motion.div
                    key={lang.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => changeLanguage(lang.code, lang.name)}
                    className={`
                      px-4 py-3 rounded-xl 
                      flex items-center gap-3 
                      cursor-pointer transition-all duration-200 
                      hover:bg-white/10 
                      notranslate
                      ${selectedLanguage === lang.name ? "bg-(--primary-blue)/20 border border-(--primary-blue)/30" : "border border-transparent"}
                    `}
                  >
                    <span className="text-xl filter drop-shadow-md text-white">{lang.flag}</span>
                    <span className={`text-sm font-medium ${selectedLanguage === lang.name ? "text-(--primary-blue)" : "text-white"}`}>
                      {lang.name}
                    </span>
                    {selectedLanguage === lang.name && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-(--primary-blue) shadow-[0_0_10px_#FF3B30]" />
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500 italic text-sm">
                  No languages found
                </div>
              )}
            </div>

            {/* Footer gradient */}
            <div className="h-6 bg-gradient-to-t from-black/50 to-transparent pointer-events-none absolute bottom-0 w-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <div id="google_translate_element" className="hidden"></div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;
