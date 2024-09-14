import React, { useState } from 'react'
import "./style.css"
import CarView from './CarView'

const CarCardAdmin = ({car}) => {

  const [carView, setCarView] = useState(false)
  const handleView =()=>{
    setCarView(true)
  }
  const closeView =()=>{
    setCarView(false)
  }


  return (
    <>
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
    <div className="car-card">
  <img src={car?.images[0]} alt="Car Photo" />
  <h3>{car?.make}</h3>

  <p>
    <strong>Car Model:</strong> {car?.name}
  </p>
  <p>
    <strong>Rent Per Hour:</strong>{car?.rentPerHour}.Rs
  </p>
  <button onClick={handleView}  className="view-button">
    View
  </button >
</div>
{
              carView &&  <CarView closeView={closeView} car={car}/>
}

    </div>
  </>
  )
}

export default CarCardAdmin