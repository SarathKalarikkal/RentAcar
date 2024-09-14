import React, { useEffect, useState } from 'react';
import "./style.css";
import DealerNotifiactionCard from '../../../components/dealer/DealerNotifiactionCard';
import axiosInstance from '../../../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setDealerNotificationList } from '../../../Redux/features/notificationSlice';

const DealerNotification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.dealerNotificationList);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/dealer/notifications');
        dispatch(setDealerNotificationList(response.data.data))
        
      } catch (error) {
        console.error('Error fetching dealer notifications', error);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  const handleDeleteNotification = async (id) => {
    try {
      await axiosInstance.delete(`/dealer/notification/${id}`);
      dispatch(setDealerNotificationList(notifications.filter(notification => notification._id !== id)));
    } catch (error) {
      console.error('Error deleting notification', error);
    }
  };

  return (
    <>
      <div className="notification-head">
        <h2 className="text-center mb-4">Dealer Notifications</h2>
      </div>
      <div className="container py-5">
        <div className="row">
          {notifications.length > 0 ? (
            notifications.map((message) => (
              <DealerNotifiactionCard key={message._id} message={message} onDelete={handleDeleteNotification} />
            ))
          ) : (
            <p>No notifications available.</p> 
          )}
        </div>
      </div>
    </>
  );
};

export default DealerNotification;
