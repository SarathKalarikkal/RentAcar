import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../config/axiosInstance';
import { setUserInfo } from '../../../Redux/features/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../math/formatDate';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./style.css"

const UserProfile = () => {
  const [activeEdit, setActiveEdit] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const userReservationList = useSelector((state) => state.reservation.userReservationList);
  const navigate = useNavigate();

  const Createdate = user?.updatedAt;
  const formattedDate = formatDate(Createdate);

  console.log("ghafsdghsafdgh",user);
  

  const fetchUserData =async()=>{
     const response = await axiosInstance.get(`/profile`)
     console.log("The res", response)
  }

  // Set form values on load for editing
  React.useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('mobile', user.phone);
      setValue('location', user.location);
      setValue('profilePic', user.profilePic); 
      setValue('about', user.about); 
    }
    fetchUserData()
  }, [user, setValue]);

  const handleEditProfile = () => {
    setActiveEdit(true);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== '') {
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
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleClose = () => {
    setActiveEdit(false);
  };

  const userLogout = async () => {
    try {
      const response = await axiosInstance.get('/user/logout');
      if (response.data.success) {
        Cookies.remove('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="container my-5 user-pro">
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
              <p>{user?.about}</p>
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
                      <p><strong>Name:</strong> {user?.name}</p>
                      <p><strong>Email:</strong> {user?.email}</p>
                      <p><strong>Mobile:</strong> {user?.phone}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Address:</strong> {user?.location}</p>
                      <p><strong>Role:</strong> {user?.role}</p>
                      <p><strong>Account Created:</strong> {formattedDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Rented Cars</h5>
                  <div className="rented-cars">
                    {
                      userReservationList?.map((reservation) => (
                        <div className="car-item" key={reservation._id}>
                          <img src={reservation?.car?.image} alt="Car Name" />
                          <div className="car-inform">
                            <h6>{reservation?.car?.make} {reservation?.car?.model}</h6>
                            <p>Status: {reservation?.status}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeEdit && (
        <div className=" profile-edit-wrapper">
          <form onSubmit={handleSubmit(onSubmit)} className="dealer-edit-form">
          <button type="button" className="btn close-btn-user" onClick={handleClose}><i className="bi bi-x-circle"></i></button>
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
                  <input id="location" {...register('location')} className="form-control" placeholder="Enter your location" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label htmlFor="about" className="form-label">About</label>
                  <textarea id="about" {...register('about')} className="form-control" placeholder="Enter about yourself" />
                </div>
              </div>

              {/* <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="profilePic" className="form-label">Profile Picture</label>
                  <input type="file" id="profilePic" accept="image/*" className="form-control" {...register('profilePic')} />
                </div>
              </div> */}

              <div className="col-md-12 mb-3">
                <button type="submit" className="main-btn p-2">Update Profile</button>
                
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UserProfile;
