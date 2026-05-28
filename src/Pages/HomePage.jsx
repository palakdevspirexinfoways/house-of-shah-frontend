import React from 'react'
import HeroSection from '../Components/Home/HeroSection'
import AboutSection from '../Components/Home/AboutSection'
import WhyChooseUs from '../Components/Home/WhyChooseUs'
import Testimonials from '../Components/Home/Testimonials'
 
import StatsSection from '../Components/Home/StatsSection'
import BannerSection from '../Components/Home/BannerSection'
import ProductSection from '../Components/Home/ProductSection'
import BestSellerSection from '../Components/Home/BestSellerSection'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection /> 
      <ProductSection/>
      <BestSellerSection />
      <WhyChooseUs />
      {/* <StatsSection /> */}
      <BannerSection />
      <Testimonials />
   
    </div>
  )
}

export default HomePage
