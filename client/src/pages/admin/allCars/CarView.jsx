import React from 'react';
import './style.css'; 

const CarView = ({ closeView, car }) => {
  if (!car) return null;

  return (
    <div className="car-popup-overlay" onClick={closeView}>
      <div className="car-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeView}>Close</button>
        
        <div className="car-details">
          <h2 className="car-title">{car?.name}</h2>
          
          <div className="car-images">
            {car?.images && car?.images.length > 0 ? (
              car?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Car Image ${index + 1}`}
                  className="car-image"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          
          <div className="car-info">
            <p><strong>Make:</strong> {car?.make}</p>
            <p><strong>Model:</strong> {car?.model}</p>
            <p><strong>Fuel Type:</strong> {car?.fuelType}</p>
            <p><strong>Transmission:</strong> {car?.transmission}</p>
            <p><strong>Color:</strong> {car?.color}</p>
            <p><strong>Seating Capacity:</strong> {car?.seating}</p>
            <p><strong>Mileage:</strong> {car?.mileage} km</p>
            <p><strong>Rent Per Hour:</strong> ${car?.rentPerHour}</p>
            <p><strong>Description:</strong> {car?.description}</p>
            <p><strong>Location:</strong> {car?.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarView;
