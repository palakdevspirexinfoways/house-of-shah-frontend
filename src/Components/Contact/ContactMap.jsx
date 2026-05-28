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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.70010221669!2d70.73003058882897!3d22.30516629995574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cbd81%3A0x41ed57a097367453!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716301321046!5m2!1sen!2sin" 
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
