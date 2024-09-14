import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import DealerView from './DealerView';


const DealerCard = ({dealer}) => {

  const [dealerView, setDealerView] = useState(false)

  const handleView =()=>{
    setDealerView(true)
  }
  const closeView =()=>{
    setDealerView(false)
  }
  return (
    <>
    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
              <div className="user-card">
                <div className="profile-pic">
                  <img src={dealer?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile Picture" />
                </div>
                <div className="user-info">
                  <h2 className="name">{dealer?.name}</h2>
                  <p className="email">{dealer?.email}</p>

                  <div className='userInfo-btns'>
                  <button className="view-button" onClick={handleView}><FaEye /> View</button>
                  </div>
                </div>
              </div>
              </div>

              {
              dealerView &&  <DealerView closeView={closeView} dealer={dealer}/>
             }
    </>
  )
}

export default DealerCard