import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notificationList: [],
        dealerNotificationList: [],
    },
    reducers: {
        setNotificationList: (state, action) => {
            state.notificationList = action.payload;
        },
        setDealerNotificationList: (state, action) => {
            state.dealerNotificationList = action.payload;
        },
    },
});

export const { setNotificationList, setDealerNotificationList } = notificationSlice.actions; 
export default notificationSlice.reducer;