import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

export default axiosInstance;
console.log()