import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const InventoryCard = ({car, handleDeleteCar}) => {

const [deletePopup, setDeletepopup] = useState(false)

  return (
    <>
    <div className="col-md-6" key={car._id}>
                  <div className="car-box-list-view">
                    <div className="left">
                      <img src={car.image} alt={car.make} />
                    </div>
                    <div className="right inventory">
                      <div className="car-list-content ">
                        <h6 className="title">{car.make}</h6>
                        <h5 className="head">{car.name}</h5>
                        <p>{car.description}</p>
                      </div>
                      <div className="inventory-btns">
                        <button className='edit-btn'>
                          <Link to={`/dealer/car/edit/${car._id}`}>Edit</Link>
                        </button>
                        <button className='delete-btn' onClick={()=>setDeletepopup(!deletePopup)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                {
                  deletePopup && 
                  <>
                   <div className='delete-popup'>
                         <div>
                            <p>Are you sure, you want to delete the car?</p>
                            <button className='yes' onClick={()=>handleDeleteCar(car._id)}>Yes</button>
                            <button className='no' onClick={()=>setDeletepopup(!deletePopup)}>No</button>
                         </div>
                   </div>
                  </>
                }
    </>
  )
}

