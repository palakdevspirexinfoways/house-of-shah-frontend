import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919510806869"; // apna number
  const message = "Hello,\n\nI'm interested in learning more about your jewellery collections and manufacturing services.";

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600"
    >
      <FaWhatsapp className="text-2xl md:text-3xl" />
    </motion.a>
  );
};

export default WhatsAppButton;