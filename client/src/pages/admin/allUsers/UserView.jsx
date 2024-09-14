import React from 'react'
import "../style.css"

const UserView = ({user,closeView}) => {
  return (
    <div className="user-popup-overlay" onClick={closeView}>
      <div className="user-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeView}>Close</button>
        <div className="user-popup-header">
          <img src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="user-profile-pic" />
          <h2 className="user-name">{user.name}</h2>
        </div>
        <div className="user-popup-body">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
        </div>
      </div>
    </div>
  )
}

export default UserView