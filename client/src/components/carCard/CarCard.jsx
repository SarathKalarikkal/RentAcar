import React from 'react'
import './style.css'
import { Link  } from 'react-router-dom'
import carModel from '../../assets/car-model.png'
import gear from '../../assets/gear.png'
import speed from '../../assets/speed.png'
import seat from '../../assets/seat.png'


const CarCard = ({car}) => {


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
              <div className="car-box">   

                <div className="mid">
                <span className={car.availableStatus === 'Available' ? 'available' : 'not-available'}>{car.availableStatus}</span>

                  <img src={car?.image} alt="" />
                </div>
                <div className="bottom">
                  <div className="model">
                    <span>{car?.make}</span>
                    <div>
                      <p>{car?.name}</p>
                      <p className="rate">
                      {car?.rentPerHour} <span>/hr</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="deatail">
                    <div className="model-type">
                      <img src={carModel} alt="" />
                      <span>{car.type}</span>
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
              </Link>
  )
}

export default CarCard