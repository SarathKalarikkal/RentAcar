import React from 'react'
import './style.css'

const CarListView = ({car}) => {
  return (
    <div className="car-box-list-view">
    <div className="list-rating-wrap">
      <div className="list-rating">
        {/* <span className="rating me-2">
          <i className="bi bi-star-fill" /> 4.8
        </span> */}
        <span className={car.availableStatus === 'Available' ? 'available' : 'not-available'}>{car?.availableStatus}</span>
      </div>
      {/* <i className="bi bi-heart-fill heart" /> */}
    </div>
    <div className="left">
      <img src={car?.images[0]} alt="" />
    </div>
    <div className="right">
      <div className="car-list-content">
        <h6 className="title">{car?.make}</h6>
        <h5 className="head">{car?.name}</h5>
        <p>
         {car?.description}
        </p>
      </div>
      <div className="list-bottom">
        <div className="deatail">
          <div className="model-type">
            <img src={"../src/assets/car-model.png"} alt="" />
            <span>{car?.type}</span>
          </div>
          <div className="model-type">
            <img src={"../src/assets/gear.png"} alt="" />
            <span>{car?.transmission}</span>
          </div>
          <div className="model-type">
            <img src={"../src/assets/speed.png"} alt="" />
            <span>{car?.fuelType}</span>
          </div>
          <div className="model-type">
            <img src={"../src/assets/seat.png"} alt="" />
            <span>{car?.seating}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CarListView