import React, { useState } from 'react'
import { formatDate } from '../../math/formatDate';

const NotificationCard = ({ message, onDelete }) => {


    const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const deleteNotification = () => {
    onDelete(message._id);
    toast.success("Notification deleted");
  };
  
  const date = formatDate(message?.createdAt);

  return (
   <div className="col-lg-12">
      <div className="card notification-card">
          <div
            className="card-body"
            onClick={() => toggleAccordion(0)}
            style={{ cursor: 'pointer' }}
          >
            <p className="card-text notification-body">
             {message?.message}
            </p>
            <p className="notification-date">Approved on: {date}</p>
            {activeIndex === 0 && (
              <div className="notification-details">
                <p>
                  <strong>Reason:</strong> The dealer has confirmed availability and readiness of the vehicle.
                </p>
              </div>
            )}
            <button className="close-btn" onClick={deleteNotification}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
          </div>
        </div>
   </div>
  )
}

export default NotificationCard