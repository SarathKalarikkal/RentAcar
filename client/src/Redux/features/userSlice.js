import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
            state.isAuthenticated = false;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
        },
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;