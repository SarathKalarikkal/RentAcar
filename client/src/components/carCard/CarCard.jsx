import React from 'react'
import './style.css'
import { Link  } from 'react-router-dom'


const CarCard = ({car}) => {



const userInfo = JSON.parse(localStorage.getItem('userInfo'))

console.log("usersssss", userInfo?.role)
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
                      <img src={'../src/assets/car-model.png'} alt="" />
                      <span>{car.type}</span>
                    </div>
                    <div className="model-type">
                      <img src={'../src/assets/gear.png'} alt="" />
                      <span>{car?.transmission}</span>
                    </div>
                    <div className="model-type">
                      <img src={'../src/assets/speed.png'} alt="" />
                      <span>{car?.fuelType}</span>
                    </div>
                    <div className="model-type">
                      <img src={"../src/assets/seat.png"} alt="" />
                      <span>{car?.seating}</span>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
  )
}

export default CarCard