import React, { useEffect, useState } from 'react'
import { HiTicket } from "react-icons/hi2";
import AdminRentalCard from './AdminRentalCard';
import "./style.css"
import axiosInstance from '../../../config/axiosInstance';
import AdminLoader from '../../../components/Loader/AdminLoader';

const AllRentalsPage = () => {
  const [allReservations, setAllReservations]= useState(null)
  const [loading, setLoading] = useState(true);

  const fetchAllreservations = async()=>{
      const response = await axiosInstance.get('/admin/reservations')
      const reservationData = response.data.data
      console.log("all dealers for admin",reservationData);
      setAllReservations(reservationData)
      setLoading(false)
  }
  
  useEffect(()=>{
    fetchAllreservations()
  },[])
  if (loading) {
    return <AdminLoader/>;
  }

  return (
    <>
    <div className='d-flex flex-column w-100 all-user-wrapper'>
      <div className="admin-top">
        <h5 ><HiTicket /> RENTALS</h5>
      </div>
      <div className="admin-bottom">
           <div className="container">
          <div className="row">
          {
            allReservations?.length > 0 ? (
              <>
              {allReservations?.map((reservation) => (
                <AdminRentalCard key={reservation.id} reservation={reservation} />
              ))}
              </>
            )
            :
            (
              <p className='sample-text'>No reservations Found</p>
            )
          }
          </div>
           </div>
      </div>
    </div>
  </>
  )
}

export default AllRentalsPage