import React, { useEffect, useState } from 'react'
import CarCardAdmin from './CarCardAdmin'
import { IoCarSharp } from "react-icons/io5";
import axiosInstance from '../../../config/axiosInstance';

const CarsPage = () => {

  const [allCars, setAllCars]= useState(null)

  const fetchAlldealers = async()=>{
      const response = await axiosInstance.get('/admin/allcars')
      const carsData = response.data.data
      console.log("all dealers for admin",carsData);
      setAllCars(carsData)
  }
  
  useEffect(()=>{
    fetchAlldealers()
  },[])


  return (
    <>
    <div className='d-flex flex-column w-100 '>
      <div className="admin-top">
        <h5 ><IoCarSharp /> CARS</h5>
      </div>
      <div className="admin-bottom">
           <div className="container">
          <div className="row">
            {
              allCars?.map((car)=>{
                return(
                  <CarCardAdmin car={car}/>
                )
              })
            }
          </div>
           </div>
      </div>
    </div>
  </>
  )
}

export default CarsPage