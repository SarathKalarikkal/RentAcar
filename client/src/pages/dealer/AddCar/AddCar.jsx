import React, { useState } from 'react';
import axiosInstance from '../../../config/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const [formData, setFormData] = useState({
    name: '',
    make: '',
    model: '',
    fuelType: '',
    color: '',
    type: '',
    transmission: 'Automatic', 
    seating: '',
    mileage: '',
    rentPerHour: '',
    location: '',
    description: '',
  });

  const navigate = useNavigate()

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Only accept a single file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please upload an image.');
      return;
    }

    try {
      const data = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      
      // Append file input
      data.append('image', image);
  
      const response = await axiosInstance.post('/car/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success(response.data.message);

      setTimeout(()=>{
        navigate(`/dealer/inventory`);
       },1000)
      
      // Reset form
      setFormData({
        name: '',
        make: '',
        model: '',
        fuelType: '',
        color: '',
        type: '',
        transmission: 'Automatic',
        seating: '',
        mileage: '',
        rentPerHour: '',
        location: '',
        description: '',
      });
      setImage(null);
    } catch (error) {
      toast.error('Failed to add car. Please try again.');
      console.error('There was an error uploading the car details:', error);
    }
  };

  return (
    <>
    <Toaster />
      <section className="addCar-header">
        <div className="container">
          <h1>ADD A CAR</h1>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <form id="add-car-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                {/* Input Fields */}
                {['name', 'make', 'model', 'color', 'type'].map((field) => (
                  <div className="form-group" key={field}>
                    <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type="text"
                      className="form-control"
                      id={field}
                      name={field}
                      placeholder={`Enter car ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
                <div className="form-group">
                  <label htmlFor="fuelType">Fuel Type</label>
                  <select
                    className="form-control"
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="transmission">Transmission</label>
                  <div className="transmission-options">
                    <label>
                      <input
                        type="radio"
                        id="transmission-automatic"
                        name="transmission"
                        value="Automatic"
                        checked={formData.transmission === 'Automatic'}
                        onChange={handleChange}
                      />
                      Automatic
                    </label>
                    <label>
                      <input
                        type="radio"
                        id="transmission-manual"
                        name="transmission"
                        value="Manual"
                        checked={formData.transmission === 'Manual'}
                        onChange={handleChange}
                      />
                      Manual
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                {/* Additional Input Fields */}
                <div className="form-group">
                  <label htmlFor="seating">Seating Capacity</label>
                  <select
                    className="form-control"
                    id="seating"
                    name="seating"
                    value={formData.seating}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Seating Capacity</option>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="mileage">Mileage</label>
                  <input
                    type="number"
                    className="form-control"
                    id="mileage"
                    name="mileage"
                    placeholder="Enter mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rentPerHour">Rent Per Hour</label>
                  <input
                    type="number"
                    className="form-control"
                    id="rentPerHour"
                    name="rentPerHour"
                    placeholder="Enter rent per hour"
                    value={formData.rentPerHour}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Enter a brief description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="carImage">
                    Car Image (Upload a single image)
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="carImage"
                    name="image"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              
                <button type="submit" className="addCar-btn main-btn">
                  Add Car
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddCar;
