import React from 'react'
import './style.css'
import { Link  } from 'react-router-dom'
import carModel from '../../assets/car-model.png'
import gear from '../../assets/gear.png'
import speed from '../../assets/speed.png'
import seat from '../../assets/seat.png'

const CarListView = ({car}) => {


  const userInfo = JSON.parse(localStorage.getItem('userInfo'))


  let url
  
  if(userInfo?.role === 'user'){
      url = `/user/car-detail/${car?._id}`
  }else if(userInfo?.role === 'dealer'){
    url = `/dealer/car-detail/${car?._id}`
  }else{
     url = `/common/login`
  }


  return (
    <Link to={url}>
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
      <img className='car-img' src={car?.image} alt="" />
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
            <img src={carModel} alt="" />
            <span>{car?.type}</span>
          </div>
          <div className="model-type">
            <img src={gear} alt="" />
            <span>{car?.transmission}</span>
          </div>
          <div className="model-type">
            <img src={speed} alt="" />
            <span>{car?.fuelType}</span>
          </div>
          <div className="model-type">
            <img src={seat} alt="" />
            <span>{car?.seating}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Link>
  )
  
}

export default CarListView