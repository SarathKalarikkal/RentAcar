import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import ThemeChanger from '../components/Theme/ThemeChanger'

export const RootLayout = () => {
  return (
    <div>
        <Header />
        <ThemeChanger />
        <Outlet />
        <Footer />
    </div>
  )
}

