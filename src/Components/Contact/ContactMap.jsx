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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4542.208058594368!2d70.8213955!3d22.298993499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959b509fef49b7d%3A0xa601d117119f7bc0!2sHOUSE%20OF%20SHAH!5e1!3m2!1sen!2sin!4v1782797966701!5m2!1sen!2sin" 
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
