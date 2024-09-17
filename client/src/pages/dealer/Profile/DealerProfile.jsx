import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../math/formatDate';
import axiosInstance from '../../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { clearDealerInfo, setDealerInfo } from '../../../Redux/features/dealerSlice';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const DealerProfile = () => {
  const [carList, setCarList] = useState([]);
  const [activeEdit, setActiveEdit] = useState(false);
  const { dealerInfo } = useSelector((state) => state.dealer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    if (dealerInfo) {
      reset(dealerInfo);
    }
  }, [dealerInfo, reset]);

  const fetchInventory = async () => {
    try {
      const response = await axiosInstance.get('/dealer/inventory');
      setCarList(response.data.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const dealerLogout = async () => {
    try {
      dispatch(clearDealerInfo());
      toast.success('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };

  const handleEditProfile = () => {
    setActiveEdit(true);
  };

  const handleClose = () => {
    setActiveEdit(false);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('location', data.location);
      formData.append('about', data.about);

      if (data.profilePic[0]) {
        formData.append('profilePic', data.profilePic[0]);
      }

      const response = await axiosInstance.put(`/dealer/update/${dealerInfo._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch(setDealerInfo(response.data));
      toast.success('Profile updated successfully');
      setActiveEdit(false);
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Update failed');
    }
  };

  const updatedAt = formatDate(dealerInfo?.updatedAt);

  return (
    <div className="container my-5">
      <Toaster />
      <div className="row">
        {/* Profile Sidebar */}
        <div className="col-md-4">
          <div className="profile-sidebar">
            <div className="profile-userpic">
              <img
                src={dealerInfo?.profilePic || 'https://via.placeholder.com/150'}
                className="img-fluid rounded-circle"
                alt="Profile Picture"
              />
            </div>
            <div className="profile-usertitle">
              <div className="profile-usertitle-name">{dealerInfo?.name}</div>
              <div className="profile-usertitle-email">{dealerInfo?.email}</div>
            </div>
            <div className="profile-userbuttons">
              <button onClick={handleEditProfile} className="btn btn-outline-primary btn-sm">
                Edit Profile
              </button>
              <a href="#" className="btn btn-outline-danger btn-sm" onClick={dealerLogout}>
                Logout
              </a>
            </div>
          </div>
          <div className="user-about">
            <h3>About Me</h3>
            <p>{dealerInfo?.about}</p>
          </div>
        </div>
        {/* Profile Content */}
        <div className="col-md-8">
          <div className="profile-content">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Information</h5>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Name:</strong> {dealerInfo?.name}</p>
                    <p><strong>Email:</strong> {dealerInfo?.email}</p>
                    <p><strong>Mobile:</strong> {dealerInfo?.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Address:</strong> {dealerInfo?.location}</p>
                    <p><strong>Role:</strong> Dealer</p>
                    <p><strong>Account Created:</strong> {updatedAt}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Owned Cars</h5>
                <div className="rented-cars">
                  {carList.length > 0 && carList.map((car) => (
                    <div className="car-item" key={car._id}>
                      <img src={car?.image || 'https://via.placeholder.com/100x60'} alt={car?.name} />
                      <div className="car-info-dealer">
                        <h6>{car?.name}</h6>
                         <div className='d-flex gap-3'> 
                           <p>{car?.make}</p>
                           <p>{car?.model}</p>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeEdit && (
        <div className="dealer-edit-form-wrapper">
          <div className="profile-edit-wrapper mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="dealer-edit-form">
            <button type="button" className="btn close-btn-user" onClick={handleClose}><i className="bi bi-x-circle"></i></button>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Mobile</label>
                    <input
                      type="text"
                      id="phone"
                      {...register('phone')}
                      className="form-control"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                      id="location"
                      {...register('location')}
                      className="form-control"
                      placeholder="Enter your Location"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="about" className="form-label">About</label>
                    <input
                      id="about"
                      {...register('about')}
                      className="form-control"
                      placeholder="Enter about yourself"
                    />
                  </div>
                </div>

                {/* <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="profilePic" className="form-label">Profile Picture</label>
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      {...register('profilePic')}
                      className="form-control"
                    />
                  </div>
                </div> */}

                <div className="col-md-12 mb-3">
                <button type="submit" className="main-btn p-2">Update Profile</button>
              </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealerProfile;
