import React, { useState } from 'react';
import ManageReservationForm from './ManageReservationForm';
import './style.css';

const ManageRentalCard = ({ reservation }) => {
  const [formActive, setFormActive] = useState(false);

  const handleForm = () => {
    setFormActive(true);
  };

  

  return (
    <>
      <div className="col-md-6 reser-car-d" onClick={handleForm}>
        <div className="rent-card row">
          <div className="col-12 col-md-12 col-lg-4 p-0 ">
            <img src={reservation?.car.image} alt="" className='img-fluid' />
          </div>
          <div className="rent-right col-12 col-md-12 col-lg-8 ">
            <h3>{reservation?.car.make} {reservation?.car.name}</h3>
            <p>Reserved By : <span>{reservation?.user.name}</span></p>
            <p>Email : <span>{reservation?.user.email}</span></p>
            <span className='re-status-pending'>{reservation?.status}</span>
          </div>
        </div>
      </div>
      {formActive && <ManageReservationForm reservation={reservation} setFormActive={setFormActive} />}
    </>
  );
};

export default ManageRentalCard;
