import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
    name: 'car',
    initialState: {
        carList: [],
        carDetails: null,
        filteredData: null
    },
    reducers: {
        setCarList: (state, action) => {
            state.carList = action.payload;
        },
        setCarDetails: (state, action) => {
            state.carDetails = action.payload;
        },
        setFilteredData: (state, action) => {
            state.filteredData = action.payload;
        },
    },
});

export const {filteredData,setFilteredData, carList,carDetails,  setCarList, setCarDetails } = carSlice.actions;
export default carSlice.reducer;