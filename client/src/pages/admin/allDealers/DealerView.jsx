import React from 'react'
import "../style.css"

const DealerView = ({closeView, dealer}) => {

  console.log(dealer)
  return (
    <div className="dealer-popup-overlay" onClick={closeView}>
    <div className="dealer-popup-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={closeView}>Close</button>
      <div className="dealer-popup-header">
        <img src={dealer?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="dealer-profile-pic" />
        <h2 className="dealer-name">{dealer?.name}</h2>
      </div>
      <div className="dealer-popup-body">
        <p><strong>Email:</strong> {dealer?.email}</p>
        <p><strong>Address:</strong> {dealer?.location}</p>
        <p><strong>Mobile:</strong> {dealer?.phone}</p>
      </div>
      <p><strong>Cars:</strong> {dealer?.cars.length}</p>
    </div>
  </div>
  )
}

export default DealerView