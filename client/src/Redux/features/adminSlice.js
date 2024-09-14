import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
       adminInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
    reducers: {
        setAdminInfo: (state, action) => {
            state.adminInfo = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearAdminInfo: (state) => {
            state.adminInfo = null;
            state.isAuthenticated = false;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
        },
    },
});

export const {adminInfo,isAuthenticated, setAdminInfo, clearAdminInfo } = adminSlice.actions;
export default adminSlice.reducer;