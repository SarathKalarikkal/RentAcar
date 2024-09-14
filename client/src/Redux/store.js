import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import carReducer from './features/carSlice';
import dealerReducer from './features/dealerSlice';
import reservationReducer from './features/reservationSlice';
import adminReducer from './features/adminSlice';
import notificationReducer from './features/notificationSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        dealer: dealerReducer,
        car: carReducer,
        reservation: reservationReducer,
        admin : adminReducer,
        notifications : notificationReducer,
    },
});

export default store;