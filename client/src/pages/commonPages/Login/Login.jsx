import React from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../Redux/features/userSlice';
import { setDealerInfo } from '../../../Redux/features/dealerSlice';
import { setAdminInfo } from '../../../Redux/features/adminSlice';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../config/axiosInstance';
import Cookies from 'js-cookie';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    try {
      let response;
      const { email, password, role } = data;
      const loginData = { email, password };

      // Determining the endpoint based on role
      if (role === 'user') {
        response = await axiosInstance.post('/user/login', loginData);
      } else if (role === 'dealer') {
        response = await axiosInstance.post('/dealer/login', loginData);
      } else if (role === 'admin') {
        response = await axiosInstance.post('/admin/login', loginData);
      }

      // Store token and user data
      const { token, userData } = response.data;
      Cookies.set('token', token, { expires: 1 });
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userData));
      

      // Dispatching user data to Redux store based on role
      if (role === 'user') {
        dispatch(setUserInfo(userData));
        toast.success('User Login successful');
        setTimeout(()=>{
          navigate('/user');
        },1000)
      } else if (role === 'dealer') {
        dispatch(setDealerInfo(userData));
        toast.success('Dealer Login successful');
        setTimeout(()=>{
          navigate('/dealer');
        },1000)
      } else if (role === 'admin') {
        dispatch(setAdminInfo(userData));
        toast.success('Admin Login successful');
        setTimeout(()=>{
          navigate('/admin');
        },1000)
      } else {
        toast.error('Invalid role');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      toast.error(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className='login-wrapper'>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="form-grp">
          <div className="inp-grp">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              {...register('email')}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className="inp-grp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register('password')}
              placeholder='Enter your password'
              required
            />
          </div>
          <div className="inp-grp role">
            <label htmlFor="role">Role</label>
            <div className="rol-wrap">
              <input
                type="radio"
                name="role"
                id="user"
                value="user"
                {...register('role')}
                required
              />
              <label htmlFor="user">User</label>
            </div>
            <div className="rol-wrap">
              <input
                type="radio"
                name="role"
                id="dealer"
                value="dealer"
                {...register('role')}
                required
              />
              <label htmlFor="dealer">Dealer</label>
            </div>
            <div className="rol-wrap">
              <input
                type="radio"
                name="role"
                id="admin"
                value="admin"
                {...register('role')}
                required
              />
              <label htmlFor="admin">Admin</label>
            </div>
          </div>
          <button type='submit'>Login</button>
        </div>
        <p>Not a member? <Link to={'/common/signup'}>Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
