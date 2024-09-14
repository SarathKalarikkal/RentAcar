import axios from 'axios';


// Create an Axios instance with default configurations
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

export default axiosInstance;
console.log()