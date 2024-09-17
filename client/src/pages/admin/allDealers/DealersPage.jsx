import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import DealerCard from './DealerCard';
import axiosInstance from '../../../config/axiosInstance';
import AdminLoader from '../../../components/Loader/AdminLoader';

const DealersPage = () => {

  const [allDealer, setAllDealers]= useState(null)
  const [loading, setLoading] = useState(true);

  const fetchAlldealers = async()=>{
      const response = await axiosInstance.get('/admin/dealers')
      const dealersData = response.data.data
      console.log("all dealers for admin",dealersData);
      setAllDealers(dealersData)
      setLoading(false)
  }
  
  useEffect(()=>{
    fetchAlldealers()
  },[])
  if (loading) {
    return <AdminLoader/>;
  }

  return (
    <>
    <div className='d-flex flex-column w-100 '>
      <div className="admin-top">
        <h5 > <FaUsers /> DEALERS</h5>
      </div>
      <div className="admin-bottom">
           <div className="container">
          <div className="row">
             {
              allDealer?.map((dealer)=>{
                return(
                      <DealerCard dealer={dealer}/>
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

export default DealersPage