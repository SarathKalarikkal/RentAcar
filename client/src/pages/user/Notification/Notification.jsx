import React, { useEffect } from 'react';
import "./style.css";
import NotificationCard from '../../../components/user/NotificationCard';
import axiosInstance from '../../../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationList } from '../../../Redux/features/notificationSlice';

const UserNotification = () => {

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notificationList);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/user/notifications');
        dispatch(setNotificationList(response.data.data));
        console.log("notification", response.data)
      } catch (error) {
        console.error('Error fetching user notifications', error);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  const handleDeleteNotification = async (id) => {
    try {
      await axiosInstance.delete(`/user/notification/${id}`);
      
      // Update the notification list in Redux state
      dispatch(setNotificationList(notifications.filter(notification => notification._id !== id)));
    } catch (error) {
      console.error('Error deleting notification', error);
    }
  };

  return (
    <>
      <div className="notification-head">
        <h2 className="text-center mb-4">Notifications</h2>
      </div>

      <div className="container py-5">
        <div className="row">
          {notifications.length > 0 ? (
            notifications.map((message) => (
              <NotificationCard key={message._id} message={message} onDelete={handleDeleteNotification} />
            ))
          ) : (
            <p>No notifications available.</p> 
          )}
        </div>
      </div>
    </>
  );
};

export default UserNotification;
