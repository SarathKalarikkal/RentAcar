import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const InventoryCard = ({ car, handleDeleteCar }) => {
  const [deletePopup, setDeletePopup] = useState(false);


  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const maxDescriptionLength = 120; // Customize the length as needed

  return (
    <>
      <div className="col-md-6" key={car._id}>
        <div className="inventory-car-box row">
          <div className="left col-12 col-md-12 col-lg-4 p-0">
            <img className='inve-img' src={car.image} alt={car.make} />
          </div>
          <div className="right inventory col-12 col-md-12 col-lg-8">
            <div className="car-list-content">
              <h6 className="title">{car.make}</h6>
              <h5 className="head">{car.name}</h5>
              <p>{ truncateText(car.description, maxDescriptionLength)}</p>
              
            </div>
            <div className="inventory-btns">
              <button className='edit-btn'>
                <Link to={`/dealer/car/edit/${car._id}`}>Edit</Link>
              </button>
              <button className='delete-btn' onClick={() => setDeletePopup(!deletePopup)}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {deletePopup && 
        <div className='delete-popup'>
          <div>
            <p>Are you sure you want to delete the car?</p>
            <button className='yes' onClick={() => handleDeleteCar(car._id)}>Yes</button>
            <button className='no' onClick={() => setDeletePopup(false)}>No</button>
          </div>
        </div>
      }
    </>
  );
};
