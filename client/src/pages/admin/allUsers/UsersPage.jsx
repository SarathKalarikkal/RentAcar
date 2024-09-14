import React, { useEffect, useState } from 'react'
import "../style.css"
import UserCard from './UserCard'
import { FaUsers } from "react-icons/fa";
import axiosInstance from '../../../config/axiosInstance';

const UsersPage = () => {

  const [allUsers, setAllUsers]= useState(null)

const fetchAllUsers = async()=>{
    const response = await axiosInstance.get('/admin/allusers')
    const usersData = response.data.data
    console.log("all users for admin",usersData);
    setAllUsers(usersData)
}

useEffect(()=>{
  fetchAllUsers()
},[])

  return (
    <>
      <div className='d-flex flex-column w-100 all-user-wrapper'>
        <div className="admin-top">
          <h5 > <FaUsers /> USERS</h5>
        </div>
        <div className="admin-bottom">
             <div className="container">
            <div className="row">
              {
                allUsers?.map((user)=>{
                  return(
                    <UserCard user={user}/>
                  )
                })
              }
           
            </div>
             </div>
        </div>
      </div>
    </>
  )
}

export default UsersPage