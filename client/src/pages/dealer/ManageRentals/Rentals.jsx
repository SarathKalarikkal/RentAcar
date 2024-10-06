import React, { useEffect, useState } from 'react'
import "./style.css"
import car from "../../../assets/car.png"
import ManageRentalCard from './ManageRentalCard'
import axiosInstance from '../../../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { setDealerReservationList } from '../../../Redux/features/reservationSlice'
import Loader from '../../../components/Loader/Loader'

const Rentals = () => {
  const [loading, setLoading] = useState(true);

  const {dealerReservationList}= useSelector((state)=>state.reservation)


  const dispatch = useDispatch()

  const fetchDealerReservation =async()=>{
   const response = await axiosInstance.get('/reservation/dealer-reservations')
   const resevationData =  response.data.data
   dispatch(setDealerReservationList(resevationData))
   setLoading(false)
  }

useEffect(()=>{
   fetchDealerReservation()
},[])


if (loading) {
  return <Loader/>;
}

  return (
    <>
     <section className='manageRental-header'>
      <div className="container">
         <h1>MANAGE RENTALS</h1>
      </div>
     </section>

     <section className='manageRentals py-5'>
   <div className="container mt-5">
       <div className="row g-5">
         {

          dealerReservationList.length > 0 ? (
            dealerReservationList?.map((reservation)=>{
              return(
                <ManageRentalCard key={reservation._id}  reservation={reservation}/>
              )
            })
          ) : (
            <p className='no-inventory'>Currently No reservation found..!</p>
          )
          
         }
         
       </div>
    </div>
</section>

    </>
  )
}

export default Rentals