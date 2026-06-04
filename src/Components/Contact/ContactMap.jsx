import React from 'react';
import { motion } from 'framer-motion';

const ContactMap = () => {
  return (
    <section className=" container mx-auto rounded-2xl overflow-hidden bg-white relative mb-20">
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full h-[50vh] md:h-[60vh] transition-all duration-1000"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3691.8677524395!2d70.7853983!3d22.2829989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDE2JzU4LjgiTiA3MMKwNDcnMDcuNCJF!5e0!3m2!1sen!2sin!4v1780464368161!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="House of Shah Location"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default ContactMap;
