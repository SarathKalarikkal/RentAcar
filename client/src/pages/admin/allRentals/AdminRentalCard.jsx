import React from 'react'


const AdminRentalCard = ({reservation}) => {

  console.log();

  
  
  return (
    <>
     <div className="col-12 col-md-6 col-lg-4 col-xl-3">
     <div className="reservation-card">
  <img src={reservation?.car?.images[0] || "https://via.placeholder.com/300x200"} alt="Car Photo" />
  <h3>Reservation Details</h3>
  <p>
    <strong>Reservation Done By:</strong> {reservation?.user?.name}
  </p>
  <p>
    <strong>Owned By Dealer:</strong>
  </p>
  <p>
    <strong>Rent Per Hour:</strong> {reservation?.rentPerHour}
  </p>
  <a href="#" className="view-button">
    View
  </a>
</div>
    
     </div>
   </>
  )
}

export default AdminRentalCard