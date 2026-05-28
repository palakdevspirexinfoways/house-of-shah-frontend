import React from 'react'
import HeroSection from '../Components/About/HeroSection'
import AboutHOS from '../Components/About/AboutHOS'
import OurStory from '../Components/About/OurStory'
import OurCraftsmanship from '../Components/About/OurCraftsmanship'
import Achievement from '../Components/About/Achievement'
import Founders from '../Components/About/Founders'

const AboutPage = () => {
  return (
    <div>
      <HeroSection />
      <AboutHOS />
      <OurStory />
      <OurCraftsmanship />
      <Achievement />
      <Founders />
    </div>
  )
}

export default AboutPage
