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
  const [selectedRole, setSelectedRole] = useState(''); // State to track selected role

  const onSubmit = async (data) => {
    try {
      const { name, email, password, role, phone } = data;
      const signupData = { name, email, password, role, phone };
       console.log('dealerdata', signupData);
       
      let response;
      if (role === 'user') {
        response = await axiosInstance.post('/user/create', signupData);
      } else if (role === 'dealer') {
        response = await axiosInstance.post('/dealer/create', signupData);
      }

      const { token, userData } = response.data;
      Cookies.set('token', token, { expires: 1 });
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userData));

      if (role === 'user') {
        dispatch(setUserInfo(userData));
        toast.success('User Signup successful');
        setTimeout(() => navigate('/user'), 1000);
      } else if (role === 'dealer') {
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
        <div className="form-grp">
          <div className="inp-grp">
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
          <div className="inp-grp">
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
          <div className="inp-grp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              placeholder='Enter a password'
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          {selectedRole === 'dealer' && (
            <div className="inp-grp">
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
          )}
          <div className="inp-grp role">
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
