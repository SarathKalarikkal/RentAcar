import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader'
import Footer from '../components/footer/Footer'
import ThemeChanger from '../components/Theme/ThemeChanger'

export const UserLayout = () => {
  return (
    <div>
        <UserHeader />
        <ThemeChanger />
        <Outlet />
        <Footer />
    </div>
  )
}
