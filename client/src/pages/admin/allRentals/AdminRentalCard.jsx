import React from 'react'


const AdminRentalCard = ({reservation}) => {

 
  
  return (
    <>
     <div className="col-12 col-md-6 col-lg-4 col-xl-3">
     <div className="reservation-card">
  <img src={reservation?.car?.image || "https://via.placeholder.com/300x200"} alt="Car Photo" />
  <h3>Reservation Details</h3>
  <p>
    Reservation Done By: <strong>{reservation?.user?.name}</strong>
  </p>
  <p>
   Owned By Dealer: <strong>{reservation?.dealer?.name}</strong>
  </p>
  <p>
    Rent Per Hour: <strong>{reservation?.rentPerHour}</strong>
  </p>
  {/* <a href="#" className="view-button">
    View
  </a> */}
  <span className='rs-status'>Status : <small>{reservation?.status}</small></span>
</div>
    
     </div>
   </>
  )
}

export default AdminRentalCard