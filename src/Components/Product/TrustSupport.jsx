import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Headphones, Sparkles, MessageSquare, PhoneCall, Globe, Star, ArrowRight } from 'lucide-react';

const TrustSupport = () => {
  const trustPoints = [
    {
      icon: <ShieldCheck strokeWidth={1} size={32} />,
      title: "99.9% Pure Heritage",
      desc: "Every artifact and jewelry piece is a testament to 15 years of Rajkot's finest silversmithing, carrying the official BIS Hallmark of purity.",
      detail: "Certified Purity"
    },
    {
      icon: <Truck strokeWidth={1} size={32} />,
      title: "Luxe Express Delivery",
      desc: "Fully insured, tamper-proof premium packaging with white-glove express global delivery. Your investment arrives in immaculate state.",
      detail: "Global Logistics"
    },
    {
      icon: <Sparkles strokeWidth={1} size={32} />,
      title: "Bespoke Artistry",
      desc: "Our master craftsmen specialize in museum-grade artifacts and generational jewelry, tailored to your unique legacy requirements.",
      detail: "Custom Craft"
    }
  ];

  return (
    <section className="bg-[#fcfcfc] border-t border-gray-100 py-16 md:py-32 px-6 md:px-12 lg:px-24 font-outfit text-[#001f3f] overflow-hidden relative">
      {/* Background decorative element */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--primary-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--primary-blue)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid: Left is Trust, Right is Support */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-start">
          
          {/* LEFT COLUMN: THE HOUSE GUARANTEE (Trust) */}
          <div className="lg:col-span-7 space-y-16">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <Star size={12} className="text-[var(--primary-blue)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
                  The House Standards
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.9]">
                Pillars of <br /> <span className="text-[var(--primary-blue)]/40 italic font-light lowercase tracking-normal">Trust & Purity</span>
              </h2>
            </div>

            {/* Trust Cards Stack */}
            <div className="space-y-10">
              {trustPoints.map((point, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: "circOut" }}
                  viewport={{ once: true }}
                  key={index} 
                  className="flex gap-8 items-start group relative"
                >
                  <div className="relative">
                    <div className="p-5 bg-white border border-gray-100 text-[#001f3f] shadow-sm transition-all duration-700 group-hover:bg-[#001f3f] group-hover:text-white group-hover:scale-110 z-10 relative">
                      {point.icon}
                    </div>
                    <div className="absolute -inset-2 bg-[var(--primary-blue)]/5 scale-0 group-hover:scale-100 transition-transform duration-700 blur-xl" />
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold uppercase tracking-widest">{point.title}</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-[8px] font-bold uppercase tracking-tighter text-gray-400 rounded-full group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-colors">
                        {point.detail}
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-500 font-light leading-relaxed max-w-xl group-hover:text-gray-700 transition-colors">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: CONCIERGE CARE (Support) */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 p-6 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden"
            >
              {/* Luxury gold accent line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[var(--primary-blue)]/20 to-transparent" />
              
              <div className="relative z-10 space-y-10">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 block mb-3">
                    Exclusive Service
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase leading-none">
                    SHAH <br /> <span className="font-light text-[var(--primary-blue)]/40">Concierge</span>
                  </h3>
                  <p className="text-sm text-gray-400 font-light mt-6 leading-relaxed">
                    Experience personalized luxury assistance. Our Rajkot-based design experts are available for bespoke customizations, size consultations, and private acquisitions.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gray-100" />

                {/* Support Actions */}
                <div className="space-y-5">
                  {/* WhatsApp Chat */}
                  <a 
                    href="https://wa.me/919510806869" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-5 border border-gray-100 hover:border-[#001f3f] bg-gray-50/50 hover:bg-white transition-all duration-500 group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#001f3f] transition-all">
                        <MessageSquare strokeWidth={1.5} size={20} className="text-gray-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest group-hover:text-[#001f3f] transition-colors">Chat on WhatsApp</p>
                        <p className="text-[9px] text-gray-400 mt-1">Instant artisan response • 10 AM - 8 PM</p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-[#001f3f] group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Direct Call */}
                  <a 
                    href="tel:+919510806869" 
                    className="flex items-center justify-between p-5 border border-gray-100 hover:border-[#001f3f] bg-gray-50/50 hover:bg-white transition-all duration-500 group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#001f3f] transition-all">
                        <PhoneCall strokeWidth={1.5} size={20} className="text-gray-400 group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest group-hover:text-[#001f3f] transition-colors">Direct Concierge Line</p>
                        <p className="text-[9px] text-gray-400 mt-1">International: +91 95108 06869</p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-[#001f3f] group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                {/* Secure Checkout Banner */}
                <div className="pt-6 flex items-center justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                  <div className="flex flex-col items-center gap-1">
                    <Globe size={18} />
                    <span className="text-[7px] font-bold uppercase tracking-tighter">Global</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck size={18} />
                    <span className="text-[7px] font-bold uppercase tracking-tighter">Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Headphones size={18} />
                    <span className="text-[7px] font-bold uppercase tracking-tighter">Support</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSupport;
