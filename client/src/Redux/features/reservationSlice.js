import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
    name: 'reservation',
    initialState: {
        userReservationList: [],
        dealerReservationList: [],
    },
    reducers: {
        setUserReservationList: (state, action) => {
            state.userReservationList = action.payload;
        },
        deleteUserReservation(state, action) {
            state.userReservationList = state.userReservationList.filter(
              (reservation) => reservation._id !== action.payload
            );
          },
        setDealerReservationList: (state, action) => {
            state.dealerReservationList = action.payload;
        },

        
    },
});

export const { deleteUserReservation, setUserReservationList, setDealerReservationList } = reservationSlice.actions;
export default reservationSlice.reducer;