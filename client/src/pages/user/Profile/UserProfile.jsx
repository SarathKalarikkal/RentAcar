import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../config/axiosInstance';
import { setUserInfo } from '../../../Redux/features/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../math/formatDate';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [activeEdit, setActiveEdit] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);

  const navigate = useNavigate();

  const Createdate = user?.updatedAt;
  const formattedDate = formatDate(Createdate);
  

  const handleEditProfile = () => {
    setActiveEdit(true);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axiosInstance.put(`/user/update/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(setUserInfo(response.data.data));
     
      
      toast.success("Profile updated successfully!");
      setActiveEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleClose = () => {
    setActiveEdit(false);
  };

  const userLogout = async () => {
    const response = await axiosInstance.get('/user/logout');
    if (response.data.success === true) {
      Cookies.remove('token');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <>
    <Toaster />
   <div className="container my-5">
  <div className="row">
    {/* Profile Sidebar */}
    <div className="col-md-4">
      <div className="profile-sidebar">
        <div className="profile-userpic">
          <img
            src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            className="img-fluid rounded-circle"
            alt="Profile Picture"
          />
        </div>
        <div className="profile-usertitle">
          <div className="profile-usertitle-name">{user?.name}</div>
          <div className="profile-usertitle-email">{user?.email}</div>
        </div>
        <div className="profile-userbuttons">
          <button onClick={handleEditProfile} className="btn btn-outline-primary btn-sm">
            Edit Profile
          </button>
          <a href="#" className="btn btn-outline-danger btn-sm" onClick={userLogout}>
            Logout
          </a>
        </div>
      </div>
      <div className="user-about">
         <h3>About Me</h3>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa non ex maiores maxime nobis esse repellat repudiandae, quasi quo eius id, velit omnis officiis dolore libero quibusdam saepe, aperiam ad.</p>
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
                <p>
                  <strong>Name:</strong> {user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {user?.mobile}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Address:</strong>  {user?.location}
                </p>
                <p>
                  <strong>Role:</strong>  {user?.role}
                </p>
                <p>
                  <strong>Account Created:</strong> {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Rented Cars</h5>
            <div className="rented-cars">
              <div className="car-item">
                <img src="https://via.placeholder.com/100x60" alt="BMW X5" />
                <div className="car-info">
                  <h6>BMW X5</h6>
                  <p>Status: Active</p>
                </div>
              </div>
              <div className="car-item">
                <img src="https://via.placeholder.com/100x60" alt="Audi Q7" />
                <div className="car-info">
                  <h6>Audi Q7</h6>
                  <p>Status: Returned</p>
                </div>
              </div>
              <div className="car-item">
                <img
                  src="https://via.placeholder.com/100x60"
                  alt="Mercedes GLC"
                />
                <div className="car-info">
                  <h6>Mercedes GLC</h6>
                  <p>Status: Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{
activeEdit && 

  <div className="container">
     <form onSubmit={handleSubmit(onSubmit)} className="dealer-edit-form">
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" id="name" {...register('name')} className="form-control" placeholder="Enter your name" />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" {...register('email')} className="form-control" placeholder="Enter your email" />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input type="text" id="mobile" {...register('mobile')} className="form-control" placeholder="Enter your mobile number" />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label htmlFor="location" className="form-label">Location</label>
            <input id="address" {...register('location')} className="form-control"  placeholder="Enter your Location"></input>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label htmlFor="profilePic" className="form-label">Profile Picture</label>
            <input type="file" id="profilePic" accept="image/*" className="form-control" {...register('profilePic')} />
          </div>
        </div>

        <div className="col-md-6 mb-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Update Profile</button>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
        </div>
      </div>
    </form>
  </div>
}

    </>
  )
}

export default UserProfile