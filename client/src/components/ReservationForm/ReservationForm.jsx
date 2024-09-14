import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../config/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';

const ReservationForm = ({ setFormActive, carDetail }) => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [totalRate, setTotalRate] = React.useState(0);
    const rentPerHour = watch('rentPerHour');
    const startDate = watch('startDate');
    const endDate = watch('endDate');

    React.useEffect(() => {
        if (carDetail) {
            setValue('car', carDetail.name || '');
            setValue('rentPerHour', carDetail.rentPerHour || '');
        }
    }, [carDetail, setValue]);

    React.useEffect(() => {
        if (startDate && endDate && rentPerHour) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const hours = Math.ceil((end - start) / (1000 * 60 * 60)); 
            const total = hours * rentPerHour;
            setTotalRate(total);
        } else {
            setTotalRate(0); 
        }
    }, [startDate, endDate, rentPerHour]);

    const submitHandler = async (data) => {
        try {
            const response = await axiosInstance.post('/reservation/create', {
                carId: carDetail._id,
                startDate: data.startDate,
                endDate: data.endDate,
                rentPerHour: data.rentPerHour,
                totalRate 
            });

            if (response.data.success) {
                toast.success('Reservation created successfully');
                setTimeout(() => setFormActive(false), 1000);
            } else {
                toast.error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error creating reservation:', error);
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    const closeForm = () => {
        setFormActive(false);
    };

    return (
        <>
            <Toaster />
            <div className="reservation-form-modal">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="inp-group">
                        <label>Car</label>
                        <input type="text" name="car" id="car" {...register("car")} disabled />
                    </div>
                    <div className="date-grp">
                        <div className="inp-group">
                            <label>Start Date</label>
                            <input type="date" name="startDate" id="startDate" {...register("startDate", { required: 'Start date is required' })} />
                        </div>
                        <div className="inp-group">
                            <label>End Date</label>
                            <input type="date" name="endDate" id="endDate" {...register("endDate", { required: 'End date is required' })} />
                        </div>
                    </div>
                    <div className="inp-group">
                        <label>Rent/hr</label>
                        <input type="number" name="rentPerHour" id="rentPerHour" {...register("rentPerHour")} disabled />
                    </div>
                    <div className="total-rate">
                        <label>Total Rate</label>
                        <input type="text" value={`Rs.${totalRate.toFixed(2)}`} disabled />
                    </div>
                    <button type="submit">Reserve</button>
                    <i className="bi bi-x-circle close-btn" onClick={closeForm}></i>
                </form>
            </div>
        </>
    );
};

export default ReservationForm;
