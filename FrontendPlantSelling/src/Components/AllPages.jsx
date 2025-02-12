import React from 'react'
import HeroSection from './HeroSection'
import ScrollingBanner from './ScrollingBanner'
import AboutUs from './AboutUs.'
import ShopBundle from './ShopBundle'
import ContactPage from './ContactForm'
import ComeVisitStore from './ComeVisitStore'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingCart from './FloatingCart'

const AllPages = () => {
  return (
      <>
          <Navbar/>
          <HeroSection />
          <ScrollingBanner />
          <AboutUs />
          <ShopBundle />
          <ComeVisitStore/>
      <ContactPage />
       <FloatingCart />
          <Footer/>
          
      </>
  )
}

export default AllPages