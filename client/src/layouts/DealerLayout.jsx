import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import DealerHeader from '../components/dealer/DealerHeader'
import ThemeChanger from '../components/Theme/ThemeChanger'


export const DealerLayout = () => {
  return (
    <div>
        <DealerHeader/>
        <ThemeChanger />
        <Outlet />
        <Footer />
    </div>
  )
}
