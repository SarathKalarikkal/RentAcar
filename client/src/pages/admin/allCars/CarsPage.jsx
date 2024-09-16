import React, { useEffect, useState } from 'react';
import CarCardAdmin from './CarCardAdmin';
import { IoCarSharp } from 'react-icons/io5';
import axiosInstance from '../../../config/axiosInstance';

const CarsPage = () => {
    const [allCars, setAllCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState("");

    const fetchAllCars = async () => {
        try {
            const response = await axiosInstance.get('/admin/allcars');
            const carsData = response.data.data;
            console.log("all cars for admin", carsData);
            setAllCars(carsData);
            setFilteredCars(carsData); // Set initial filter to show all cars
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    useEffect(() => {
        fetchAllCars();
    }, []);

    useEffect(() => {
        filterCars();
    }, [filterCriteria, allCars]);

    const filterCars = () => {
        if (!filterCriteria) {
            setFilteredCars(allCars);
        } else {
            const filtered = allCars.filter(car =>
                car.make.toLowerCase().includes(filterCriteria.toLowerCase()) ||
                car.name.toLowerCase().includes(filterCriteria.toLowerCase())
            );
            setFilteredCars(filtered);
        }
    };

    const handleFilterChange = (event) => {
        setFilterCriteria(event.target.value);
    };

    const handleDeleteCar = async (deletedCarId) => {
        try {
            await axiosInstance.delete(`/admin/car/${deletedCarId}`);
            // Refetch the car list to get the updated data
            fetchAllCars();
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <>
            <div className='d-flex flex-column w-100'>
                <div className="admin-top">
                    <h5><IoCarSharp /> CARS</h5>
                    <div className='filter-wrap'>
                        <input
                            type="text"
                            placeholder="Filter cars by make or model"
                            value={filterCriteria}
                            onChange={handleFilterChange}
                        />
                        <i className="bi bi-funnel"></i>
                    </div>
                </div>
                <div className="admin-bottom">
                    <div className="container">
                        <div className="row">
                            {filteredCars.length > 0 ? (
                                filteredCars.map((car) => (
                                    <CarCardAdmin
                                        key={car._id}
                                        car={car}
                                        onDelete={handleDeleteCar} // Use the delete callback
                                    />
                                ))
                            ) : (
                                <p>No cars available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarsPage;
