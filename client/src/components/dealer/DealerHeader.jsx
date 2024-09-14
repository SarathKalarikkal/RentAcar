import React, { useState } from 'react'
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axiosInstance'
import { HiMenuAlt2 } from "react-icons/hi";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearDealerInfo } from '../../Redux/features/dealerSlice';

const DealerHeader = () => {

    const [theme, setTheme] = useState(true)

    const dealerNotificationList = useSelector((state)=>state.notifications.dealerNotificationList)
    console.log("noti", dealerNotificationList.length)

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
  
    
    const activeLink = (path)=>{
      return location.pathname === path
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const dealerLogout = async()=>{

       dispatch(clearDealerInfo())
         toast.success(response.data.message)
         navigate('/')
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
   <span className="navbar-toggler-icon" ><HiMenuAlt2 /></span>
   
 </button>
 <div className="collapse navbar-collapse" id="navbarSupportedContent">
   <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
     {/* <li>
       <i className={theme ? 'bi bi-moon' : 'bi bi-sun'}onClick={handleTheme}></i>
     </li> */}
     <li className="nav-item">
       <Link className={`nav-link ${activeLink('/dealer') ? 'active' : ''}`} aria-current="page" to={'/dealer'}>Home</Link>
     </li>
     <li className="nav-item">
       <Link className={`nav-link ${activeLink('/dealer/carlist') ? 'active' : ''}`} to={'/dealer/carlist'}>Cars</Link>
     </li>
     <li className="nav-item">
       <Link className={`nav-link ${activeLink('/dealer/inventory') ? 'active' : ''}`} to={'/dealer/inventory'}>Inventory</Link>
     </li>
     <li className="nav-item">
       <Link className={`nav-link ${activeLink('/dealer/addcar') ? 'active' : ''}`} to={'/dealer/addcar'}>Add Car</Link>
     </li>
     <li className="nav-item">
       <Link className={`nav-link ${activeLink('/dealer/managerentals') ? 'active' : ''}`} to={'/dealer/managerentals'}>Manage Rentals</Link>
     </li>
     <li className="nav-item">
       <Link className={`nav-link ${activeLink('/dealer/profile') ? 'active' : ''}`} to={'/dealer/profile'}><i class="bi bi-person-circle dealer"></i></Link>
     </li>
     <li className="nav-item">
       <Link className={`nav-link  ${activeLink('/dealer/notification') ? 'active' : ''}`} to={'/dealer/notification'}>
       <i className="bi bi-bell dealer position-relative"></i>
       <span className={` notifi-span ${dealerNotificationList.length > 0 ? 'visible' : 'none'}`}>{dealerNotificationList.length}</span>
       </Link>
     </li>
     <li className="nav-item">
       <Link className={`nav-link logout-link ${activeLink('/') ? 'active' : ''}`}   onClick={dealerLogout}>Logout</Link>
     </li>
     
   </ul>
 </div>
</div>
</nav>

 </div>
  )
}

export default DealerHeader