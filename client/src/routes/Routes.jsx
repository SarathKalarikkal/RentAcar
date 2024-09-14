import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { UserLayout } from "../layouts/UserLayout";
import AboutPage from "../pages/commonPages/About/AboutPage";
import Login from "../pages/commonPages/Login/Login";
import Signup from "../pages/commonPages/Signup/Signup";
import CarList from "../pages/commonPages/CarList/CarList";
import Contact from "../pages/commonPages/Contact/Contact";
import HomePage from "../pages/commonPages/Home/HomePage";
import { CommonLayout } from "../layouts/CommonLayout";
import UserProfile from "../pages/user/Profile/UserProfile";
import MyRentals from "../pages/user/MyRentals/MyRentals";
import UserNotification from "../pages/user/Notification/Notification";
import CarDetailPage from "../pages/user/Car-detail/CarDetailPage";
import { DealerLayout } from "../layouts/DealerLayout";
import DealerProfile from "../pages/dealer/Profile/DealerProfile";
import DealerNotification from "../pages/dealer/Notifications/Notification";
import Rentals from "../pages/dealer/ManageRentals/Rentals";
import Inventory from "../pages/dealer/Inventory/Inventory";
import { AdminLayout } from "../layouts/AdminLayout";

import AddCar from "../pages/dealer/AddCar/AddCar";

import AdminHomePage from "../pages/admin/AdminHomePage/AdminHomePage";
import EditCar from "../pages/dealer/EditCar.jsx/EditCar";
import { UserAuth } from "./ProtectedRoute/UserAuth";
// import { DealerAuth } from "./ProtectedRoute/dealerAuth";
import UsersPage from "../pages/admin/allUsers/UsersPage";
import DealersPage from "../pages/admin/allDealers/DealersPage";
import CarsPage from "../pages/admin/allCars/CarsPage";
import AllRentalsPage from "../pages/admin/allRentals/AllRentalsPage";
import { AdminAuth } from "./ProtectedRoute/AdminAuth";
import Success from "../pages/user/Success";
import Cancel from "../pages/user/Cancel";
import { DealerAuth } from "./ProtectedRoute/DealerAuth";





export const router = createBrowserRouter([
    {
        path : 'common',
        element : <CommonLayout />,
        children : [
            { path : 'login', element : <Login /> },
            { path : 'signup', element : <Signup /> },
        ]
      },
      {
        path: "/",
        element: <RootLayout />,
        children : [
            { path : '', element : <HomePage /> },
            { path : 'about', element : <AboutPage /> },
            { path : 'carlist', element : <CarList /> },
            { path : 'contact', element : <Contact /> },
        ]
      },
      {
        path : 'user',
        element : <UserAuth><UserLayout /></UserAuth>,
        children : [
            { path : '', element : <HomePage /> },
            { path : "carlist", element: <CarList /> },
            {
              path : "car-detail/:id",
              element: <UserAuth><CarDetailPage /></UserAuth>
            },
            { path : "profile", element: <UserProfile /> },
            { path : "myrentals", element: <MyRentals /> },
            { path : "notification", element: <UserNotification /> },
            { path : "contact", element: <Contact /> },
            { path : "payment/success", element: <Success/>},
            { path : "payment/cancel", element: <Cancel/>},
        ]
      },
      {
        path : 'dealer',
        element : <DealerAuth><DealerLayout /></DealerAuth>,
        children : [
            { path : '', element : <HomePage /> },
            { path : "carlist", element: <CarList /> },
            // {
            //   path : "car-detail/:id",
            //   element: <DealerAuth><CarDetailPage /></DealerAuth>
            // },
            { path : "car/edit/:id", element: <EditCar /> },
            { path : "profile", element: <DealerProfile /> },
            { path : "managerentals", element: <Rentals /> },
            { path : "inventory", element: <Inventory /> },
            { path : "addcar", element: <AddCar /> },
            { path : "notification", element: <DealerNotification /> },
            { path : "contact", element: <Contact /> },
        ]
      },
    {
        path : 'admin',
        element :<AdminAuth> <AdminLayout /></AdminAuth>,

        children : [
            {
                path : '',
                element : <AdminHomePage />
            },
           
            {
                path : "alluser",
                element: <UsersPage />
            },
            {
                path : "alldealers",
                element: <DealersPage />
            },
            {
                path : "allCars",
                element: <CarsPage />
            },
            {
                path : "allrentals",
                element: <AllRentalsPage />
            },

           

        ]
    },
   
  ]);
