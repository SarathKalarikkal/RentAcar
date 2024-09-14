import React, { useState } from 'react';
import { formatDate } from '../../math/formatDate';
import toast, { Toaster } from 'react-hot-toast';

const DealerNotifiactionCard = ({ message, onDelete }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const date = formatDate(message?.createdAt);

  const deleteNotification = () => {
    onDelete(message._id);
    toast.success("Notification deleted");
  };

  return (
    <>
      <Toaster />
      <div className="col-lg-12">
        <div className="card notification-card">
          <div className="card-body" onClick={() => handleToggle(0)}>
            <h5 className="card-title notification-header">
              Car Reservation Request
            </h5>
            <p className="card-text notification-body">
              {message?.message} by <strong>Mr.{message?.reservedby?.name}</strong>
            </p>
            <p className="notification-date">Requested on: {date}</p>
          </div>
          {activeIndex === 0 && (
            <div className="card-body notification-details">
              <p><strong>User:</strong> {message?.reservedby?.name}</p>
              <p><strong>Email:</strong> {message?.reservedby?.email}</p>
              <p><strong>Phone:</strong> {message?.reservedby?.phone}</p>
              <p><strong>Message:</strong> {message?.message}</p>
            </div>
          )}
          <button className="close-btn" onClick={deleteNotification}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default DealerNotifiactionCard;
