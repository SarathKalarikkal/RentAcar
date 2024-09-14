import React, { useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { HiMiniTicket } from "react-icons/hi2";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { clearAdminInfo } from "../../Redux/features/adminSlice";

const AdminHeader = () => {

  const location = useLocation()
  const navigate = useNavigate()
  
    
  const activeLink = (path)=>{
    return location.pathname === path
  }

const adminsignout = async()=>{
  const response = await axiosInstance.get('/admin/logout')

  if(response.data.success === true){
   Cookies.remove('token');
   localStorage.removeItem('userInfo');
   localStorage.removeItem('token');
   toast.success(response.data.message)
   setTimeout(()=>{
     navigate('/')
   },1000)   
  }
}




  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 adminSidebar"
        style={{ width: 280 }}
      >
        <Link
          to={"/admin"}
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="fs-4 logo">RentACar</span>
        </Link>
        <hr />
        <ul className="nav  flex-column mb-auto">
          <li className="nav-item">
            <Link to={'/admin'} className={`nav-link ${activeLink('/admin') ? 'active' : ''}`} aria-current="page">
                <div> 
                <MdOutlineDashboard />
                <span className="ms-2 sidebar-span">Dashboard</span>
                </div>
            </Link>
          </li>
          <li>
            <Link to={'/admin/alluser'} className={`nav-link ${activeLink('/admin/alluser') ? 'active' : ''}`}>
                <div>
                <FaRegUser />
                <span className="ms-2 sidebar-span">Users</span>
                </div>
            </Link>
          </li>
          <li>
            <Link to={'/admin/alldealers'} className={`nav-link ${activeLink('/admin/alldealers') ? 'active' : ''}`}>
               <div>
               <FaRegUser />
               <span className="ms-2 sidebar-span">Dealers</span>
               </div>
            </Link>
          </li>
          <li>
            <Link to={'/admin/allCars'} className={`nav-link ${activeLink('/admin/allCars') ? 'active' : ''}`}>
             
                <div>
                <IoCarSportOutline />
                <span className="ms-2 sidebar-span">Cars</span>
                </div>
            </Link>
          </li>
          <li>
            <Link to={'/admin/allrentals'} className={`nav-link ${activeLink('/admin/allrentals') ? 'active' : ''}`}>
              <div>
              <HiMiniTicket />
              <span className="ms-2 sidebar-span"> Rentals</span>
              </div>
            </Link>
          </li>
          
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width={32}
              height={32}
              className="rounded-circle me-2"
            />
            <strong>Admin</strong>
          </a>
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={adminsignout}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
