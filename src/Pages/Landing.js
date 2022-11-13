import React from 'react'
import HomePage from './companents/HomePage'
import Properties from './companents/Properties'
import Contact from './companents/Contact'
import Navbar from './companents/Navbar'
import Footer from './companents/Footer'
import PendingModal from './companents/PendingModal'
import InformationModal from './companents/InformationModal'
import RegisterModal from './companents/Auth/RegisterModal'

const Landing = () => {
  return (
    <div className='bg-white'>
      <Navbar/>
       <HomePage />
        <Properties />
        <Contact />  
        <Footer />
        <PendingModal />
        <InformationModal />
        <RegisterModal />
    </div>
  )
}

export default Landing