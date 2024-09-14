import React, { useEffect, useState } from 'react';
import "./style.css";
import CarCard from '../../../components/carCard/CarCard';
import CarListView from '../../../components/carListView/CarListView';
import axiosInstance from '../../../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setCarList } from '../../../Redux/features/carSlice';
import { useForm } from 'react-hook-form';

const CarList = () => {
  const [boxView, setBoxView] = useState(true);
  const dispatch = useDispatch();
  const {carList, filteredData} = useSelector((state) => state.car);

  console.log("home fikter", filteredData)

  const handleViewMod = () => {
    setBoxView(!boxView);
  };

  const fetchCarlist = async () => {
    try {
      const response = await axiosInstance.get('/car/list');
      const cars = response.data;
      dispatch(setCarList(cars.data));
    } catch (err) {
      console.error('Error fetching car list:', err);
    }
  };

  useEffect(() => {
    fetchCarlist();
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const queryString = new URLSearchParams(data).toString();
      const response = await axiosInstance.get(`/car/list?${queryString}`);
      const filteredCars = response.data;
      dispatch(setCarList(filteredCars.data));
      console.log("Filtered data:", filteredCars);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    reset(); 
    fetchCarlist(); 
  }

  return (
    <>
      <section className="carList-header">
        <div className="container">
          <h1>Cars</h1>
          <div className="CarList-contact">
            <span>
              <i className="bi bi-geo-fill me-3"></i>All over Kerala
            </span>
            <span>
              <i className="bi bi-telephone-fill me-3"></i>+91 9876543210
            </span>
            <span>
              <i className="bi bi-clock-fill me-3"></i>Mon - Sat : 24hrs
            </span>
          </div>
        </div>
      </section>

      <section className="carlist-sec">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <div className="car-list">
                <div className="row">
                  <div className="row top-controls mb-4">
                    <form className="d-flex align-items-center gap-3 col-md-8" onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-md-3">
                        <select className="form-select" {...register("sort")}>
                          <option value="">SORT</option>
                          <option value="lowToHigh">Low to high</option>
                          <option value="highToLow">High to low</option>
                        </select>
                      </div>

                      <div className="col-md-3">
                        <select className="form-select" {...register("type")}>
                          <option value="">Type</option>
                          {[...new Set(carList.map((car) => car.type.toLowerCase()))].map((type) => (
                            <option key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-3">
                        <select className="form-select" {...register("transmission")}>
                          <option value="">Transmission</option>
                          {[...new Set(carList.map((car) => car.transmission.toLowerCase()))].map((transmission) => (
                            <option key={transmission} value={transmission}>
                              {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='col'>
                        <button type="submit" className="filter-btn ">
                          Filter
                        </button>
                      </div>

                      <div className='col'>
                      <button type="button" className="reset-btn" onClick={handleReset}>
                        <i className="bi bi-arrow-clockwise me-1" />
                        
                      </button>
                      </div>
                    </form>

                    <div className="col-md-4 text-end view-switcher-wrap">
                      <div className="view-switcher">
                        <button
                          className={`btn ${boxView ? "" : "active"}`}
                          onClick={handleViewMod}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="List View"
                        >
                          <i className="bi bi-list" />
                        </button>
                        <button
                          className={`btn ${boxView ? "active" : ""}`}
                          onClick={handleViewMod}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Box view"
                        >
                          <i className="bi bi-grid-3x3-gap-fill" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />

                  {boxView ? (
                    <div className="row">
                      {carList.map((car) => (
                        <div className="col-12 col-md-6 col-lg-4" key={car.id}>
                          <CarCard car={car} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="row">
                      {carList.map((car) => (
                        <div className="col-md-12" key={car.id}>
                          <CarListView car={car} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CarList;
