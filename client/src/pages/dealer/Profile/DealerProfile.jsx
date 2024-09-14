import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../../math/formatDate'
import axiosInstance from '../../../config/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { clearDealerInfo, setDealerInfo } from '../../../Redux/features/dealerSlice'
import { useForm } from 'react-hook-form'

const DealerProfile = () => {

  const [carList, setCarList] = useState([])
  const [activeEdit, setActiveEdit] = useState(false)

const {dealerInfo} = useSelector((state)=>state.dealer)

console.log(dealerInfo)

const navigate = useNavigate()
const dispatch = useDispatch()

const updatedAt = formatDate(dealerInfo?.updatedAt)
const { register, handleSubmit, reset } = useForm();

const dealerLogout = async()=>{
  dispatch(clearDealerInfo())
  toast.success(response.data.message)
  navigate('/')
}

const fetchInventory = async () => {
  try {
    const response = await axiosInstance.get('/dealer/inventory');
    setCarList(response.data.data);
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
}
useEffect(()=>{
  fetchInventory()
},[])

const handleEditProfile = ()=>{
  setActiveEdit(true)
}

const onSubmit = async (data) => {
  console.log(data)

try {
   const response = await axiosInstance.put(`/dealer/update/${dealerInfo._id}`, data)
   console.log(response.data)
   dispatch(setDealerInfo(response.data));
} catch (error) {
  console.log(error)
}

 
}

const handleClose =  () => {
  setActiveEdit(false)
}

  return (
    <div className="container my-5">
    <div className="row">
      {/* Profile Sidebar */}
      <div className="col-md-4">
        <div className="profile-sidebar">
          <div className="profile-userpic">
            <img
              src="https://via.placeholder.com/150"
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
                    <strong>Name:</strong> {dealerInfo?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {dealerInfo?.email}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {dealerInfo?.phone}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Address:</strong> {dealerInfo?.location}
                  </p>
                  <p>
                    <strong>Role:</strong> Dealer
                  </p>
                  <p>
                    <strong>Account Created:</strong> {updatedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Owned Cars</h5>
              <div className="rented-cars">
                {
                  carList.length > 0 && carList.map((car)=>{
                    return (
                      <div className="car-item">
                      <img src={car?.images[0] || "https://via.placeholder.com/100x60"} alt="BMW X5" />
                      <div className="car-info">
                        <h6>{car?.name}</h6>
                        <p>{car?.make}</p>
                      </div>
                    </div>
                    )
                  })
                }
               
               
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {
      activeEdit && 
      <div className="dealer-edit-form-wrapper">
  <div className="container mt-5">
    <h2>Edit Dealer Profile</h2>
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
            <input type="file" id="profilePic" accept="image/*" className="form-control" />
          </div>
        </div>

        <div className="col-md-6 mb-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Update Profile</button>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
        </div>
      </div>
    </form>
  </div>
</div>


    }
  </div>
  


  )
}

export default DealerProfile