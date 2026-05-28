import React, { useEffect } from 'react';
import HeroSection from '../Components/Contact/HeroSection';
import InfoCards from '../Components/Contact/InfoCards';
import ContactFormSection from '../Components/Contact/ContactFormSection';
import ContactMap from '../Components/Contact/ContactMap';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <ContactFormSection />
      <InfoCards />
      <ContactMap />
    </div>
  );
};

export default ContactPage;
