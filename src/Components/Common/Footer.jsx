import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, MessageSquare, Globe } from 'lucide-react';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { LiaLinkedinIn } from 'react-icons/lia';
import logo from '../../aasets/HOS_Logo_V.2-removebg-preview.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Collections', href: '#collection' },
      { name: 'Our Heritage', href: '#about' },
      { name: 'Manufacturing', href: '#why' },
      { name: 'Curation', href: '#gallery' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ]
  };

  return (
    <footer className="relative bg-[var(--primary-blue)] text-[var(--white)] pt-24 pb-12 overflow-hidden font-outfit">

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* TOP SECTION: BRAND & LINKS */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group cursor-pointer mb-5"
            >
              {/* Subtle Background architectural grid effect (Optional - adds depth) */}
              <div className="absolute -inset-2 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex items-center gap-4">
                {/* Logo Image Wrapper with precise borders */}
                <div className="relative flex items-center border-white/20 transition-all duration-500 group-hover:border-[var(--primary-blue)]">
                  <img 
                    src={logo} 
                    alt="House of Shah Logo" 
                    className="h-12 md:h-16 w-auto object-contain scale-[1.5] md:scale-[2.0] transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
            <p className="text-[var(--white)]/60 text-sm leading-relaxed font-light tracking-wide italic">
              "Where silver finds its form, and craftsmanship finds its legacy."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
            {/* Quick Links */}
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 text-[var(--white)]/30">Navigation</h4>
              <ul className="space-y-4">
                {footerLinks.navigation.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="group flex items-center text-[11px] font-bold tracking-widest text-[var(--white)]/70 hover:text-[var(--white)] transition-all uppercase">
                      {link.name}
                      <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[var(--white)]/50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Connect */}
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 text-[var(--white)]/30">Presence</h4>
              <div className="flex flex-col gap-4">
                {[
                  { icon: BsInstagram, label: 'Instagram' },
                  { icon: LiaLinkedinIn, label: 'LinkedIn' },
                  { icon: FaFacebookF, label: 'Facebook' }
                ].map((social, i) => (
                  <a key={i} href="#" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full border border-[var(--white)]/20 flex items-center justify-center group-hover:bg-[var(--white)] group-hover:text-[var(--primary-blue)] transition-all duration-500">
                      <social.icon size={14} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--white)]/40 group-hover:text-[var(--white)] transition-colors">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="hidden sm:block">
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 text-[var(--white)]/30">Legal</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[11px] font-bold tracking-widest text-[var(--white)]/40 hover:text-[var(--white)] transition-all uppercase">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: CONTACT BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-[var(--white)]/10 py-12 mb-16 gap-8 items-center justify-center">

          {/* Item 1: Manufacturing HQ */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 justify-self-center">
             <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[var(--white)]/5 rounded-full group-hover:bg-[var(--white)] group-hover:text-[var(--primary-blue)] transition-all">
              <Globe size={18} className="text-[var(--white)]/50" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--white)]/30 font-bold">Manufacturing HQ</p>
              <p className="text-xs font-bold tracking-widest uppercase">Rajkot, Gujarat, India</p>
            </div>
          </div>

          {/* Item 2: Concierge Line */}
          <a
            href="tel:+919510806869"
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4   transition-colors p-4 rounded group justify-self-center"
          >
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[var(--white)]/5 rounded-full group-hover:bg-[var(--white)] group-hover:text-[var(--primary-blue)] transition-all">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--white)]/30 font-bold">Concierge Line</p>
              <p className="text-xs font-bold tracking-widest uppercase">+91 95108 06869</p>
            </div>
          </a>

          {/* Item 3: Instant Inquiry */}
          <a
            href="https://wa.me/919510806869"
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4   transition-colors p-4 rounded group justify-self-center"
          >
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[var(--white)]/5 rounded-full group-hover:bg-[var(--white)] group-hover:text-[var(--primary-blue)] transition-all">
              <MessageSquare size={18} />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--white)]/30 font-bold">Instant Inquiry</p>
              <p className="text-xs font-bold tracking-widest uppercase text-[var(--white)]/80">WhatsApp Support</p>
            </div>
          </a>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT & SIGNATURE */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 font-outfit">
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-bold tracking-[0.4em] opacity-30 uppercase whitespace-nowrap">
              © {currentYear} House of Shah
            </p>
            <div className="hidden md:block w-24 h-[1px] bg-[var(--white)]/10"></div>
            <p className="text-[9px] font-medium tracking-[0.2em] opacity-30 italic hidden lg:block uppercase">
              Where heritage inspires innovation.
            </p>
          </div>

          <div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex flex-col items-end leading-tight text-right">
              <span className="text-[8px] font-bold tracking-[0.4em] opacity-20 uppercase">Strategy & Design</span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase transition-all group-hover:tracking-[0.3em]">Spirex Infoway</span>
            </div>
            <div className="h-8 w-[1px] bg-[var(--white)]/20 group-hover:h-10 transition-all duration-500"></div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;