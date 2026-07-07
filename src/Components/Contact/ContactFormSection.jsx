import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Check, AlertCircle } from 'lucide-react';
import hosLogo3 from '../../aasets/HOS Logo V.3.png';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    remarks: '',
    interestedProduct: ''
  });

  const [selectedBusiness, setSelectedBusiness] = useState([]);
  
  const [isOpenBusiness, setIsOpenBusiness] = useState(false);
  
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const businessDropdownRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target)) {
        setIsOpenBusiness(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const businessList = ["All", "Wholesale", "Retail", "Online"];

  const handleBusinessToggle = (option) => {
    setErrorMsg('');
    if (option === "All") {
      if (selectedBusiness.includes("All")) {
        setSelectedBusiness([]);
      } else {
        setSelectedBusiness(["All"]);
      }
    } else {
      let updated = [...selectedBusiness].filter(item => item !== "All");
      if (updated.includes(option)) {
        updated = updated.filter(item => item !== option);
      } else {
        updated.push(option);
      }
      setSelectedBusiness(updated);
    }
  };

  const handleInputChange = (e) => {
    setErrorMsg('');
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validations
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!formData.contact.trim()) {
      setErrorMsg('Please enter your contact number.');
      return;
    }
    if (!formData.interestedProduct.trim()) {
      setErrorMsg('Please enter your Interested Product.');
      return;
    }
    if (selectedBusiness.length === 0) {
      setErrorMsg('Please select your Nature of Business.');
      return;
    }

    // Success flow
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ name: '', company: '', contact: '', remarks: '', interestedProduct: '' });
    setSelectedBusiness([]);
    setSubmitted(false);
    setErrorMsg('');
  };

  return (
    <section className="py-16 md:py-24 bg-white font-outfit relative">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[var(--silver-bg)]/30 hidden lg:block" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* RIGHT: CONTENT & IMAGE */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-[var(--primary-blue)]" />
                <span className="text-[var(--primary-blue)] font-bold tracking-[0.4em] uppercase text-[10px]">Client Service</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--primary-blue)] tracking-tighter leading-none mb-6">
                Your Manufacturing <br />
                <span className="font-light italic text-[var(--primary-blue)]/40 tracking-normal"> Partner </span>
              </h2>
              <p className="text-[var(--primary-blue)]/60 leading-relaxed font-light text-sm md:text-base ">
               Whether you're building a private label, expanding an existing collection, or exploring new product ideas, our team is here to support you at every stage of the journey. From design development and manufacturing to finishing and quality assurance, House of Shah collaborates closely with its partners to transform their vision into thoughtfully crafted, market-ready jewellery collections.
              </p>
              <br />
              {/* <p className="text-[var(--primary-blue)]/60 leading-relaxed font-light text-sm md:text-base ">
                Whether you seek a bespoke creation tailored to your vision or require assistance with our curated museum-grade collections, our master artisans and consultants are here to guide you. Every piece we deliver is a testament to timeless luxury.
              </p> */}
            </div>

            <div className="relative w-full overflow-hidden group h-80 md:h-96 lg:h-[400px]">
              <img 
                src={hosLogo3} 
                alt="House of Shah Logo" 
                className="w-full h-full object-cover ease-out"
              />
            </div>
          </motion.div>
          
          {/* LEFT: FORM CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 md:p-12 border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden min-h-[580px] flex flex-col justify-center"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--primary-blue)]/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--primary-blue)]/30" />
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form-entry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <h3 className="text-3xl font-bold text-[var(--primary-blue)] tracking-tighter leading-none mb-2">Send an Inquiry</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">We usually respond within 24 hours</p>
                  
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--primary-blue)]/40">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        minLength={2}
                        maxLength={50}
                        pattern="^[A-Za-z\s]+$"
                        title="Name should only contain letters and spaces"
                        className="w-full bg-transparent px-2 py-2 outline-none text-sm font-medium text-[var(--primary-blue)] border-b border-gray-200 focus:border-[var(--primary-blue)] transition-colors rounded-none placeholder-gray-300" 
                        placeholder="Rahul Shah" 
                      />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--primary-blue)]/40">Company Name</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        maxLength={100}
                        className="w-full bg-transparent px-2 py-2 outline-none text-sm font-medium text-[var(--primary-blue)] border-b border-gray-200 focus:border-[var(--primary-blue)] transition-colors rounded-none placeholder-gray-300" 
                        placeholder="Shah Jewels Ltd. (Optional)" 
                      />
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--primary-blue)]/40">Contact Number *</label>
                      <input 
                        type="tel" 
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                        minLength={10}
                        maxLength={15}
                        pattern="^[0-9\+\-\s]+$"
                        title="Contact number should only contain numbers, spaces, +, or -"
                        className="w-full bg-transparent px-2 py-2 outline-none text-sm font-medium text-[var(--primary-blue)] border-b border-gray-200 focus:border-[var(--primary-blue)] transition-colors rounded-none placeholder-gray-300" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>

                    {/* Interested Product */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--primary-blue)]/40">Interested Product *</label>
                      <input 
                        type="text" 
                        name="interestedProduct"
                        value={formData.interestedProduct}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent px-2 py-2 outline-none text-sm font-medium text-[var(--primary-blue)] border-b border-gray-200 focus:border-[var(--primary-blue)] transition-colors rounded-none placeholder-gray-300" 
                        placeholder="e.g. Necklaces, Rings" 
                      />
                    </div>

                    {/* Custom Multi-select Dropdown: Nature of Business */}
                    <div className="space-y-1 relative" ref={businessDropdownRef}>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--primary-blue)]/40">Nature of Business *</label>
                      <div 
                        onClick={() => setIsOpenBusiness(!isOpenBusiness)}
                        className="w-full bg-transparent px-2 py-2.5 border-b border-gray-200 hover:border-[var(--primary-blue)] cursor-pointer flex justify-between items-center transition-colors text-sm text-[var(--primary-blue)] font-medium"
                      >
                        <span className={selectedBusiness.length === 0 ? "text-gray-300" : ""}>
                          {selectedBusiness.length === 0 
                            ? "Select Nature of Business" 
                            : selectedBusiness.join(", ")}
                        </span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpenBusiness ? 'rotate-180' : ''}`} />
                      </div>

                      {/* Dropdown Options */}
                      <AnimatePresence>
                        {isOpenBusiness && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute z-20 top-full left-0 w-full bg-white border border-gray-100 shadow-2xl p-4 space-y-2 mt-1 rounded-none max-h-56 overflow-y-auto"
                          >
                            {businessList.map((business) => {
                              const isChecked = selectedBusiness.includes(business);
                              return (
                                <div 
                                  key={business}
                                  onClick={() => handleBusinessToggle(business)}
                                  className="flex items-center gap-3 py-1.5 px-2 hover:bg-[var(--silver-bg)] cursor-pointer text-xs transition-colors font-medium"
                                >
                                  <div className={`w-3.5 h-3.5 border flex items-center justify-center rounded-none transition-all ${
                                    isChecked 
                                      ? 'bg-[var(--primary-blue)] border-[var(--primary-blue)] text-white' 
                                      : 'border-gray-300 bg-white'
                                  }`}>
                                    {isChecked && <Check size={10} strokeWidth={3} />}
                                  </div>
                                  <span className={isChecked ? "font-bold" : "opacity-75"}>{business}</span>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Additional Remarks */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--primary-blue)]/40">Additional Remarks</label>
                      <textarea 
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        rows="3" 
                        maxLength={500}
                        className="w-full bg-transparent px-2 py-2 outline-none text-sm resize-none text-[var(--primary-blue)] border-b border-gray-200 focus:border-[var(--primary-blue)] transition-colors rounded-none placeholder-gray-300" 
                        placeholder="Tell us more about your specific inquiry..." 
                      />
                    </div>

                    {/* Error Alerts */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-red-600 bg-red-50 p-3 text-xs rounded-none border-l-2 border-red-500"
                        >
                          <AlertCircle size={14} />
                          <span className="font-medium">{errorMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button className="w-full bg-[var(--primary-blue)] text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-3 group mt-8 relative overflow-hidden rounded-none">
                      <span className="relative z-10 flex items-center gap-2">
                        Send Inquiry <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-16 h-16 bg-[var(--silver-bg)] border border-[var(--primary-blue)]/10 flex items-center justify-center mx-auto rounded-none">
                    <Check size={28} className="text-[var(--primary-blue)]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-[var(--primary-blue)]">Inquiry Logged</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Atelier Code: HOS-{Math.floor(Math.random() * 9000 + 1000)}</p>
                  </div>

                  <p className="text-sm opacity-60 font-light leading-relaxed max-w-sm mx-auto">
                    Thank you, <span className="font-bold text-[var(--primary-blue)]">{formData.name}</span>. Your inquiry regarding our <span className="font-bold">{formData.interestedProduct}</span> collection is logged successfully under our client protocols. A specialist will contact you on <span className="font-bold">{formData.contact}</span> within 24 hours.
                  </p>

                  <button 
                    onClick={resetForm}
                    className="px-8 py-3 bg-[var(--silver-bg)] text-[var(--primary-blue)] border border-[var(--primary-blue)]/10 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary-blue)] hover:text-white transition-all rounded-none"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
