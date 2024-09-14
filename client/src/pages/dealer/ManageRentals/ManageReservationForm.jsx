import React from 'react';
import { formatDate } from "../../../math/formatDate";
import axiosInstance from '../../../config/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const ManageReservationForm = ({ reservation, setFormActive }) => {
  
  const startDate = formatDate(reservation?.startDate);
  const endDate = formatDate(reservation?.endDate);

  const closeForm = () => {
    setFormActive(false);
  };


  const approveReservation = async () => {
    try {
      const response = await axiosInstance.put(`/reservation/approve/${reservation._id}`);
      toast.success(response.data.message);
      setTimeout(()=>{
        setFormActive(false); 
      },1000)
    } catch (error) {
     
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };


  const rejectReservation = async () => {
    try {
      const response = await axiosInstance.put(`/reservation/reject/${reservation._id}`);
      toast.success(response.data.message);
      setTimeout(()=>{
        setFormActive(false); 
      },1000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };




  return (
   <>
   <Toaster/>
    <div className='manage-reservation-form-modal'>
      <div className="manage-card-box">
        <button className='close-btn' onClick={closeForm}><i className="bi bi-x-circle-fill"></i></button>
        <div className="img-sec">
          <img src={reservation?.car.images[0]} alt="" />
        </div>
        <div className="detail-sec">
          <h3>{reservation?.car.make} {reservation?.car.name}</h3>
          <p>Rented By : <span>{reservation?.user.name}</span></p>
          <p>Email : <span>{reservation?.user.email}</span></p>
          <span className='re-status-pending-manage'>{reservation?.status}</span>
          <div className='d-flex justify-content-between my-3'>
            <p className='mb-0 fw-bold'>Start Date : <span>{startDate}</span></p>
            <p className='mb-0 fw-bold'>End Date : <span>{endDate}</span></p>
          </div>
          <div className="rent-btns">
            <button className='approve' onClick={approveReservation}>Approve</button>
            <button className='reject' onClick={rejectReservation}>Reject</button>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default ManageReservationForm;
