import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './style.css'
import { HiMenuAlt2 } from "react-icons/hi";

const Header = () => {

  const [theme, setTheme] = useState(true)

const handleTheme =()=>{
 const body =  document.querySelector('body')
 if(body.classList.contains('dark')){
    body.classList.remove('dark')
    body.classList.add('light')
 }else{
    body.classList.remove('light')
    body.classList.add('dark')
 }
   setTheme(!theme)
}

const location = useLocation()
console.log(location.pathname);

const activeLink = (path)=>{
  return location.pathname === path
}




  return (
    <div className='navbar-sec'>
       <nav className="navbar navbar-expand-lg">
  <div className="container">
    <Link className="navbar-brand" to='/'>
     RentACar
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"><HiMenuAlt2 /></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {/* <li>
          <i className={theme ? 'bi bi-moon' : 'bi bi-sun'}onClick={handleTheme}></i>
        </li> */}
        <li className="nav-item">
          <Link className={`nav-link ${activeLink('/') ? 'active' : ''}`} aria-current="page" to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink('/about') ? 'active' : ''}`} to={"/about"}>About Us</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink('/carlist') ? 'active' : ''}`} to={"/carlist"}>Cars</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink('/contact') ? 'active' : ''}`} to={"/contact"}>Contact</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link join-us ${activeLink('/common/login') ? 'active' : ''}`} to={"/common/login"}>Join Us</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Header