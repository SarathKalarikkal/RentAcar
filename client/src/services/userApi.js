import toast from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";


export const userLogin = async (data) => {
    try {
        const response = await axiosInstance({
            url: "/user/login",
            method: "POST",
            data,
        });
        return response?.data;
    } catch (error) {
        toast.error("Log-in Success");
    }
};
export const userLogout = async () => {
    try {
        const response = await axiosInstance({
            url: "/user/logout",
            method: "POST",
        });
        return response?.data;
    } catch (error) {
        toast.error("Log-out Failed ");
    }
};

// export const fetchUserProfile = async () => {
//     try {
//         const response = await axiosInstance({
//             url: "/user/profile",
//             method: "GET",
//         });


//         return response?.data;
//     } catch (error) {
//         toast.error("error fetching user data");
//     }
// };

export const userCheck = async () => {
    try {
        const response = await axiosInstance({
            url: "/user/check-user",
            method: "GET",
        });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};
