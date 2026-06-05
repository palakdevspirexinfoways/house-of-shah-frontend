import React, { useEffect } from 'react';
import HeroSection from '../Components/Beyondjewellery/HeroSection';
import MakeInIndia from '../Components/Beyondjewellery/MakeInIndia';
import SkillDevelopment from '../Components/Beyondjewellery/SkillDevelopment';
import WomenEmpowerment from '../Components/Beyondjewellery/WomenEmpowerment';

const BeyondJewellery = () => {
  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <WomenEmpowerment />
      <SkillDevelopment />
      <MakeInIndia />
    </div>
  );
};

export default BeyondJewellery;