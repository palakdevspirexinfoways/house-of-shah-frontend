import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const InfoCards = () => {
  const cards = [
    {
      icon: <Phone size={32} strokeWidth={1} />,
      title: "Contact Info",
      details: ["+91 95108 06869", "inquiries@houseofshah.com"]
    },
    {
      icon: <MapPin size={32} strokeWidth={1} />,
      title: "Our Atelier",
      details: ["123, Silver Craft Avenue,", "Rajkot, Gujarat 360001, India"]
    },
    {
      icon: <Clock size={32} strokeWidth={1} />,
      title: "Working Hours",
      details: ["Mon - Sat: 8:30 AM - 6:30 PM", "Sunday: Closed"]
    }
  ];

  return (
    <section className="py-10 md:py-20 bg-white font-outfit relative z-20 ">
      <div className="container mx-auto px-6 lg:px-12 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white border border-gray-100 p-10 flex flex-col items-center text-center group hover:bg-[var(--primary-blue)] hover:border-[var(--primary-blue)] hover:-translate-y-2 transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)]"
            >
              <div className="mb-6 text-[var(--primary-blue)] group-hover:text-white transition-colors duration-500">
                {card.icon}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-[var(--primary-blue)] group-hover:text-white transition-colors duration-500">
                {card.title}
              </h3>
              <div className="space-y-2 text-gray-500 group-hover:text-white/80 transition-colors duration-500">
                {card.details.map((detail, idx) => (
                  <p key={idx} className="text-sm">{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
