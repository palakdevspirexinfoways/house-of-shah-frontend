import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

const ContactDetails = () => {
  return (
    <section className="bg-[var(--white)] py-24 md:py-32 font-outfit relative">
      <div className="container mx-auto px-6 lg:px-12 ">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Details */}
          <div className="space-y-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-[var(--primary-blue)]" />
                <span className="text-[var(--primary-blue)] font-bold tracking-[0.4em] uppercase text-[10px]">Reach Out</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-[var(--primary-blue)] tracking-tighter leading-none mb-8">
                Let's Start a <br />
                <span className="font-light italic text-[var(--primary-blue)]/40 lowercase tracking-normal">Conversation</span>
              </h2>
              <p className="text-[var(--primary-blue)]/60 leading-relaxed font-light text-sm md:text-base max-w-md">
                Whether you have an inquiry about a bespoke piece or need assistance with your order, our master consultants are at your service.
              </p>
            </motion.div>

            <div className="space-y-10">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex gap-6 group">
                <div className="p-4 bg-gray-50 text-[var(--primary-blue)] border border-gray-100 group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-colors">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Our Atelier</h4>
                  <p className="text-[var(--primary-blue)] font-medium leading-relaxed">
                    House of Shah<br />
                    123, Silver Craft Avenue,<br />
                    Rajkot, Gujarat 360001, India
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex gap-6 group">
                <div className="p-4 bg-gray-50 text-[var(--primary-blue)] border border-gray-100 group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-colors">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Direct Line</h4>
                  <p className="text-[var(--primary-blue)] font-medium leading-relaxed">
                    +91 98765 43210
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex gap-6 group">
                <div className="p-4 bg-gray-50 text-[var(--primary-blue)] border border-gray-100 group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-colors">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Email</h4>
                  <p className="text-[var(--primary-blue)] font-medium leading-relaxed">
                    inquiries@houseofshah.com
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-50 p-8 md:p-12 border border-gray-100 shadow-2xl relative">
            {/* Aesthetic Corner Elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--primary-blue)]/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--primary-blue)]/20" />
            
            <h3 className="text-2xl font-bold text-[var(--primary-blue)] uppercase tracking-tight mb-8">Send an Inquiry</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                <input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 outline-none focus:border-[var(--primary-blue)] transition-colors text-sm" placeholder="John Doe" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                <input type="email" className="w-full bg-white border border-gray-200 px-4 py-3 outline-none focus:border-[var(--primary-blue)] transition-colors text-sm" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Message / Inquiry</label>
                <textarea rows="4" className="w-full bg-white border border-gray-200 px-4 py-3 outline-none focus:border-[var(--primary-blue)] transition-colors text-sm resize-none" placeholder="How can we assist you?"></textarea>
              </div>

              <button className="w-full bg-[var(--primary-blue)] text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-3 group mt-4">
                Submit Inquiry <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
