import toast from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";



export const dealerLogin = async (data) => {
    try {
        const response = await axiosInstance({
            url: "/dealer/login",
            method: "POST",
            data,
        });
        return response?.data;
    } catch (error) {
        toast.error("Log-in Success");
        console.log(error);
    }
};
export const dealerLogout = async () => {
    try {
        const response = await axiosInstance({
            url: "/dealer/logout",
            method: "POST",
        });
        return response?.data;
    } catch (error) {
        toast.error("Log-out Failed ");
        console.log(error);
    }
};

// export const fetchdealerProfile = async () => {
//     try {
//         const response = await axiosInstance({
//             url: "/dealer/profile",
//             method: "GET",
//         });

//         console.log(response, "====response");

//         return response?.data;
//     } catch (error) {
//         console.log("error fetching dealer data");
//         toast.error("error fetching dealer data");
//     }
// };

export const dealerCheck = async () => {
    try {
        const response = await axiosInstance({
            url: "/dealer/check-dealer",
            method: "GET",
        });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
};
