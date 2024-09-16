import React, { useState } from 'react';
import "./style.css";
import CarView from './CarView';
import axiosInstance from '../../../config/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const CarCardAdmin = ({ car, onDelete }) => { // Use onDelete from props
    const [carView, setCarView] = useState(false);
    const [carDeleteView, setDeleteCarView] = useState(false);

    const handleView = () => {
        setCarView(true);
    };

    const closeView = () => {
        setCarView(false);
    };



    return (
        <>
            <Toaster />
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                <div className="car-card">
                    <img className='card-image' src={car?.image} alt="Car Photo" />
                    <h3>{car?.make}</h3>
                    <p><strong>Car Model:</strong> {car?.name}</p>
                    <p><strong>Rent Per Hour:</strong>{car?.rentPerHour}.Rs</p>
                    <div className='d-flex gap-2'>
                        <button onClick={handleView} className="main-btn">View</button>
                        <button onClick={() => setDeleteCarView(true)} className="delete-btn">Delete</button>
                    </div>
                </div>
                {carView && <CarView closeView={closeView} car={car} />}
                {carDeleteView && (
                    <div className='car-dlt-wrapper'>
                        <div className='dlt-wrap'>
                            <p>Are you sure, you want to delete <strong>{car?.name}</strong>?</p>
                            <small>(It will be also deleted from the owner's garage..! )</small>
                            <div className='d-flex gap-2'>
                                <button className='yes-btn' onClick={()=> onDelete(car._id)}>Yes</button>
                                <button className='no-btn' onClick={() => setDeleteCarView(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CarCardAdmin;
