import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import DealerHeader from '../components/dealer/DealerHeader'
import ThemeChanger from '../components/Theme/ThemeChanger'
import ScrollToTop from '../hook/ScrollToTop'


export const DealerLayout = () => {
  return (
    <div>
      <ScrollToTop/>
        <DealerHeader/>
        <ThemeChanger />
        <Outlet />
        <Footer />
    </div>
  )
}
