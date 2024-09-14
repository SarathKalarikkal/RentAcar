import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CarCard = ({car}) => {

const {userInfo} = useSelector((state)=>state.user)
console.log("usersssss", userInfo)

  return (
    
          <Link to={userInfo? (`/user/car-detail/${car?._id}`) : ('/common/login')}>
              <div className="car-box">

                <div className="mid">
                <span className={car.availableStatus === 'Available' ? 'available' : 'not-available'}>{car.availableStatus}</span>

                  <img src={car?.images[0]} alt="" />
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