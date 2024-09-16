import React from 'react';
import './style.css'; 

const CarView = ({ closeView, car }) => {
  if (!car) return null;

  console.log("car", car);
  

  return (
    <div className="car-popup-overlay" onClick={closeView}>
      <div className="car-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeView}><i className="bi bi-x-circle"></i></button>
        
        <div className="car-details">
          
          
         <div className='d-flex'>
         <div className="car-images">
         <img
                 src={car?.image}
                  className="car-image"
                />
          </div>
          <div className='car-top-hd'>
            <h2 className="car-title">{car?.name}</h2>
            <div className='d-flex gap-4'>
               <p><strong>Make:</strong> {car?.make}</p>
               <p><strong>Model:</strong> {car?.model}</p>
            </div>
          </div>
         </div>
          
          <div className="car-info">            
            <p><strong>Fuel Type:</strong> {car?.fuelType}</p>
            <p><strong>Transmission:</strong> {car?.transmission}</p>
            <p><strong>Color:</strong> {car?.color}</p>
            <p><strong>Seating Capacity:</strong> {car?.seating}</p>
            <p><strong>Mileage:</strong> {car?.mileage} km</p>
            <p><strong>Rent Per Hour:</strong> ${car?.rentPerHour}</p>
            <p><strong>Location:</strong> {car?.location}</p>
            <p><strong>Dealer:</strong> {car?.dealer.name}</p>
            <p><strong>Email:</strong> {car?.dealer.email}</p>
            <p><strong>Phone:</strong> {car?.dealer.phone}</p>
            <p><strong>Description:</strong> {car?.description}</p>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default CarView;
