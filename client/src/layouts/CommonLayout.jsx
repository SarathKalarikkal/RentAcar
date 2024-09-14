import React from 'react'
import { Outlet } from 'react-router-dom'

import ThemeChanger from '../components/Theme/ThemeChanger'

export const CommonLayout = () => {
  return (
    <div>
        <ThemeChanger />
        <Outlet />
    </div>
  )
}
