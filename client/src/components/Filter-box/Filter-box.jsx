import React, { useState } from 'react';
import './style.css';
import { setFilteredData } from '../../Redux/features/carSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Filterbox = ({ carList }) => {
  
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const dispatch = useDispatch()

const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'make':
        setSelectedMake(value);
        break;
      case 'model':
        setSelectedModel(value);
        break;
      case 'price':
        setSelectedPrice(value);
        break;
      case 'location':
        setSelectedLocation(value);
        break;
      default:
        break;
    }
  };


  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilteredData({
      make: selectedMake,
      model: selectedModel,
      price: selectedPrice,
      location: selectedLocation
    }));
    navigate('/carlist')
  };

  // Handle form reset
  const handleReset = () => {
    setSelectedMake('');
    setSelectedModel('');
    setSelectedPrice('');
    setSelectedLocation('');
  };


  const uniqueLocations = [...new Set(carList.map(car => car.location))];
  return (
    <div className="search-container">
      <h3>I'M LOOKING FOR</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-3 dropdown-wrapper">
            <label htmlFor="make" className="form-label">
              Make
            </label>
            <select id="make" className="form-select" value={selectedMake} onChange={handleChange}>
              <option value="" disabled>
                Make
              </option>
              {carList?.map((car) => (
                <option key={car.id} value={car.make}>
                  {car.make}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 dropdown-wrapper">
            <label htmlFor="model" className="form-label">
              Model
            </label>
            <select id="model" className="form-select" value={selectedModel} onChange={handleChange}>
              <option value="" disabled>
                Model
              </option>
              {carList?.map((car) => (
                <option key={car.id} value={car.name}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 dropdown-wrapper">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <select id="price" className="form-select" value={selectedPrice} onChange={handleChange}>
              <option value="" disabled>
                Price
              </option>
              {carList?.map((car) => (
                <option key={car.id} value={car.rentPerHour}>
                  {car.rentPerHour}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 dropdown-wrapper">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <select id="location" className="form-select" value={selectedLocation} onChange={handleChange}>
  <option value="" disabled>
    Location
  </option>
  {uniqueLocations.map(location => (
    <option key={location} value={location}>
      {location}
    </option>
  ))}
</select>
          </div>
          <button type="submit" className="btn-search main-btn small">
            SEARCH
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-lg-4 mt-2 bottom-sec">
          <span className="text-muted">Available {carList.length} cars</span>
          <div className="d-flex">
            <button type="submit" className="btn-search main-btn large" onClick={handleSubmit}>
              SEARCH
            </button>
            <button
              type="button"
              className="btn btn-link btn-reset ms-3"
              onClick={handleReset}
            >
              <i className="bi bi-arrow-clockwise me-1" />
              Reset all
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filterbox;
