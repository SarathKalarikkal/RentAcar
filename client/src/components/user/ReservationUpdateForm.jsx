import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../config/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUserReservationList } from '../../Redux/features/reservationSlice';

const ReservationUpdateForm = ({ setFormActive, carDetail, reservation }) => {
    const { register, handleSubmit, setValue } = useForm();

    const dispatch = useDispatch()
    const userReservationList = useSelector((state) => state.reservation.userReservationList);

    React.useEffect(() => {
        if (carDetail) {
            // Pre-fill form fields
            setValue('car', carDetail.name || ''); 
            setValue('rentPerHour', carDetail.rentPerHour || ''); 
        }
    }, [carDetail, setValue]);

    const submitHandler = async (data) => {
        console.log("Form data:", data);
    
        try {
            const startDateISO = new Date(data.startDate).toISOString();
            const endDateISO = new Date(data.endDate).toISOString();
    
            console.log("Converted dates:", { startDateISO, endDateISO });
    
            // Send PUT request to update reservation
            const response = await axiosInstance.put(`/reservation/${reservation._id}`, {
                carId: carDetail._id, 
                startDate: startDateISO,
                endDate: endDateISO,
                rentPerHour: data.rentPerHour,
            });
    
            console.log(response.data.data);
    
            if (response.data.success) {
                toast.success('Reservation updated successfully');
    
                // Update Redux store
                dispatch(setUserReservationList(
                    userReservationList.map(
                        (res) => res._id === reservation._id ? response.data.data : res
                    )
                ));
    
                setTimeout(() => setFormActive(false), 1000);
            } else {
                toast.error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error updating reservation:', error);
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
                            <input 
                                type="date" 
                                name="startDate" 
                                id="startDate" 
                                {...register("startDate", { required: 'Start date is required' })} 
                            />
                        </div>
                        <div className="inp-group">
                            <label>End Date</label>
                            <input 
                                type="date" 
                                name="endDate" 
                                id="endDate" 
                                {...register("endDate", { required: 'End date is required' })} 
                            />
                        </div>
                    </div>
                    <div className="inp-group">
                        <label>Rent/hr</label>
                        <input 
                            type="number" 
                            name="rentPerHour" 
                            id="rentPerHour" 
                            {...register("rentPerHour")} 
                            disabled 
                        />
                    </div>
                    <button type="submit">Update Reservation</button>
                    <i className="bi bi-x-circle close-btn" onClick={closeForm}></i>
                </form>
            </div>
        </>
    );
};

export default ReservationUpdateForm;
