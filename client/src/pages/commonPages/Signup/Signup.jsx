import React, { useState } from 'react'; // Import useState
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../config/axiosInstance';
import Cookies from 'js-cookie'; // Ensure Cookies import is included
import { setUserInfo } from '../../../Redux/features/userSlice';
import { setDealerInfo } from '../../../Redux/features/dealerSlice';
import { setAdminInfo } from '../../../Redux/features/adminSlice';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(''); 
  const [showPassword, SetShowPassword] = useState(true); 

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('role', data.role);
      formData.append('phone', data.phone);
      formData.append('about', data.about);
      formData.append('location', data.location);
      if (data.profilePic[0]) {
        formData.append('profilePic', data.profilePic[0]);
      }
  
      let response;
      if (data.role === 'user') {
        response = await axiosInstance.post('/user/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else if (data.role === 'dealer') {
        response = await axiosInstance.post('/dealer/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
  
      const { token, userData } = response.data;
      Cookies.set('token', token, { expires: 1 });
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userData));
  
      if (data.role === 'user') {
        dispatch(setUserInfo(userData));
        toast.success('User Signup successful');
        setTimeout(() => navigate('/user'), 1000);
      } else if (data.role === 'dealer') {
        dispatch(setDealerInfo(userData));
        toast.success('Dealer Signup successful');
        setTimeout(() => navigate('/dealer'), 1000);
      } else {
        toast.error('Invalid role');
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      toast.error(`Signup failed: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div className='signup-wrapper'>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup</h2>
        <div className="form-grp row">
          <div className="inp-grp col-lg-6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder='Enter your name'
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="inp-grp col-lg-6">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
              placeholder='Enter your email'
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="inp-grp password col-lg-6">
            <label htmlFor="password">Password</label>
          
            <i className={`showBtn ${showPassword ? 'bi bi-eye-slash-fill' : 'bi  bi-eye-fill'}`} onClick={() => SetShowPassword(!showPassword)}></i>
            <input
          
              type={showPassword ? 'password' : 'text'}
              name="password"
              id="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              placeholder='Enter a password'
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
         
        
         
          <div className="inp-grp col-lg-6">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              {...register('location', { required: 'location is required', minLength: { value: 6, message: 'location is required' } })}
              placeholder='Enter location'
            />
            {errors.location && <p className="error">{errors.location.message}</p>}
          </div>
          <div className="inp-grp col-lg-6">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                {...register('phone', { required: 'Phone number is required' })}
                placeholder='Enter your phone number'
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
            <div className="inp-grp col-lg-6">
            <label htmlFor="profilepic">Profile Picture</label>
            <input
  type="file"
  name="profilePic"
  id="profilePic"
  {...register('profilePic')}
/>
            {errors.profilepic && <p className="error">{errors.profilepic.message}</p>}
          </div>
            <div className="inp-grp col-lg-12">
            <label htmlFor="about">About</label>
            
            <textarea
              type="text"
              name="about"
              id="about"
              {...register('about', { required: 'about is required', minLength: { value: 6, message: 'about is required' } })}
              placeholder='Write about yourself'
            ></textarea>
            {errors.about && <p className="error">{errors.about.message}</p>}
          </div>
          
          <div className="inp-grp col-lg-12 role">
            <label htmlFor="role">Role</label>
            <div className="rol-wrap">
              <input
                type="radio"
                name="role"
                id="user"
                value="user"
                {...register('role', { required: 'Role is required' })}
                onChange={(e) => setSelectedRole(e.target.value)} // Update role state
              />
              <label htmlFor="user">User</label>
            </div>
            <div className="rol-wrap">
              <input
                type="radio"
                name="role"
                id="dealer"
                value="dealer"
                {...register('role', { required: 'Role is required' })}
                onChange={(e) => setSelectedRole(e.target.value)} // Update role state
              />
              <label htmlFor="dealer">Dealer</label>
            </div>
          </div>

         

          <button type='submit'>Signup</button>
        </div>
        <p>Already a member? <Link to={'/common/login'}>Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
