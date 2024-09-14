import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../config/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import { MdDeleteForever } from "react-icons/md";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    make: '',
    model: '',
    fuelType: '',
    type: '',
    location: '',
    color: '',
    transmission: '',
    seating: '',
    mileage: '',
    rentPerHour: '',
    description: ''
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(`/car/${id}`);
        setCarData(response.data.data);
        setFormData({
          name: response.data.data.name,
          make: response.data.data.make,
          model: response.data.data.model,
          fuelType: response.data.data.fuelType,
          type: response.data.data.type,
          location: response.data.data.location,
          color: response.data.data.color,
          transmission: response.data.data.transmission,
          seating: response.data.data.seating,
          mileage: response.data.data.mileage,
          rentPerHour: response.data.data.rentPerHour,
          description: response.data.data.description
        });
        setImagePreviews(response.data.data.images || []);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to fetch car details. Please try again.");
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImageFiles(files);
    setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
  };

  const handleRemoveImage = (index) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    setImagePreviews(newImagePreviews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
      
    console.log("form dataaaa",formData)
    // Append regular fields
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append files
    imageFiles.forEach(file => {
      formDataToSend.append('images', file);
    });

    try {
      const response = await axiosInstance.put(`/car/update/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);
      toast.success("Car updated successfully!");
      navigate(`/dealer/inventory`);
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car. Please try again.");
    }
  };

  if (!carData) return <p>Loading...</p>;

  return (
    <>
      <Toaster />
      <section className='addCar-header'>
        <div className="container">
          <h1>EDIT A CAR</h1>
        </div>
      </section>
      <section className='py-5'>
        <div className="container">
          <form id="edit-car-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                {/* Form fields for car details */}
                <div className="form-group">
                  <label htmlFor="name">Car Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter car name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="make">Make</label>
                  <input
                    type="text"
                    className="form-control"
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    placeholder="Enter car make"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="model">Model</label>
                  <input
                    type="text"
                    className="form-control"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="Enter car model"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fuelType">Fuel Type</label>
                  <input
                    className="form-control"
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    required
                  />
                  
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    className="form-control"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="Enter car color"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="Enter car type"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="transmission">Transmission</label>
                  <div className="transmission-options mt-2">
                    <label>
                      <input
                        type="radio"
                        id="transmission-automatic"
                        name="transmission"
                        value="Automatic"
                        checked={formData.transmission === 'Automatic'}
                        onChange={handleInputChange}
                      />
                      Automatic
                    </label>
                    <label className='ms-3'>
                      <input
                        type="radio"
                        id="transmission-manual"
                        name="transmission"
                        value="Manual"
                        checked={formData.transmission === 'Manual'}
                        onChange={handleInputChange}
                      />
                      Manual
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                {/* Additional form fields */}
                <div className="form-group">
                  <label htmlFor="seating">Seating Capacity</label>
                  <select
                    className="form-control"
                    id="seating"
                    name="seating"
                    value={formData.seating}
                    onChange={handleInputChange}
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
                    value={formData.mileage}
                    onChange={handleInputChange}
                    placeholder="Enter mileage"
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
                    value={formData.rentPerHour}
                    onChange={handleInputChange}
                    placeholder="Enter rent per hour"
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
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
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
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter a brief description"
                    required
                  />
                </div>
                <div className="form-group d-flex flex-column">
                  <label htmlFor="carImage">Car Images</label>
                  <input
                    type="file"
                    className="form-control-file mt-2"
                    id="carImage"
                    multiple
                    onChange={handleImageChange}
                  />
                  <div id="imagePreview" className='image-preview'>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={preview} alt={`Preview ${index}`} />
                        <button type="button" className='delete-btn' onClick={() => handleRemoveImage(index)}>
                          <MdDeleteForever />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="submit" className="addCar-btn main-btn">
                  Update Car
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditCar;
