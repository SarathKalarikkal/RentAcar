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
        <div className="rent-card">
          <div className="rent-left">
            <img src={reservation?.car.images[0]} alt="" className='img-fluid' />
          </div>
          <div className="rent-right">
            <h3>{reservation?.car.make} {reservation?.car.name}</h3>
            <p>Rented By : <span>{reservation?.user.name}</span></p>
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
