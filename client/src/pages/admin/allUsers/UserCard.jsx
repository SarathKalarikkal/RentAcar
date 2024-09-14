import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import UserView from './UserView';


const UserCard = ({user}) => {

  const [userView, setUserView] = useState(false)

  const handleView =()=>{
    setUserView(true)
  }
  const closeView =()=>{
    setUserView(false)
  }

  return (
   <>
     <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div className="user-card">
                <div className="profile-pic">
                  <img src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile Picture" />
                </div>
                <div className="user-info">
                  <h2 className="name">{user?.name}</h2>
                  <p className="email">{user?.email}</p>
                  <p className="address">{user?.location}</p>
                  <div className='userInfo-btns'>
                  <button className="view-button" onClick={handleView}><FaEye /> View</button>
                  </div>
                </div>
              </div>
              </div>

             {
              userView &&  <UserView closeView={closeView} user={user}/>
             }
   </>
  )
}

export default UserCard