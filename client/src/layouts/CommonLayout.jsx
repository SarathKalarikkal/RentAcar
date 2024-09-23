import React from 'react'
import { Outlet } from 'react-router-dom'

import ThemeChanger from '../components/Theme/ThemeChanger'
import ScrollToTop from '../hook/ScrollToTop'

export const CommonLayout = () => {
  return (
    <div>
      <ScrollToTop/>
        <ThemeChanger />
        <Outlet />
    </div>
  )
}
