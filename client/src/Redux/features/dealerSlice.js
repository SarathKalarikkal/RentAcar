import { createSlice } from '@reduxjs/toolkit';


const dealerSlice = createSlice({
    name: 'dealer',
    initialState: {
        dealerInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
        isAuthenticated: !!localStorage.getItem('token')
    },
    reducers: {
        setDealerInfo: (state, action) => {
            state.dealerInfo = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearDealerInfo: (state) => {
            state.dealerInfo = null;
            state.isAuthenticated = true;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
        },
    },
});

export const {dealerInfo, isAuthenticated, setDealerInfo, clearDealerInfo } = dealerSlice.actions;
export default dealerSlice.reducer;