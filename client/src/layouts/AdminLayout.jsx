import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

import ThemeChanger from '../components/Theme/ThemeChanger'
import AdminHeader from '../components/Admin/AdminSidebar'


export const AdminLayout = () => {
  return (
    <div style={{height : '100vh'}}>
        <ThemeChanger />
       <div className='d-flex'>
       <AdminHeader/>
       <Outlet />
       </div>
    </div>
  )
}
