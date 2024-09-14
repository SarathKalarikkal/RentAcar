import {User} from "../models/userModel.js"
import {Car} from "../models/carModel.js"
import {Reservation} from "../models/reservationModel.js"
import { Dealer } from "../models/dealerModel.js";
import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";



//get all users

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, message: "Users fetched successfully", data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};


// Delete a user
export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};

// Get all dealers
export const getAllDealers = async (req, res, next) => {
    try {
        const dealers = await Dealer.find().select('-password');
        res.json({ success: true, message: "Dealers fetched successfully", data: dealers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};
// Get all cars
export const getAllCars = async (req, res, next) => {
    try {
        const cars = await Car.find();
        res.json({ success: true, message: "Cars fetched successfully", data: cars });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};

// Add a new car
export const addCar = async (req, res, next) => {
    try {
        const { name, images, description, make, model, fuelType, transmission, color, seating, mileage, reviews, dealer, bookedTimeSlots, rentPerHour } = req.body;


        if (!name || !images || !description || !make || !model || !fuelType || !transmission  || !color || !seating || !mileage || !dealer || !rentPerHour ) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }


        const car = new Car({
           name, images, description, make, model, fuelType, transmission, color, seating, mileage, reviews, dealer, bookedTimeSlots, rentPerHour, available: available !== undefined ? available : true, 
        });

        await car.save();
        res.status(201).json({ success: true, message: "Car added successfully", data: car });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};

// Update a car
export const updateCar = async (req, res, next) => {
    try {
        const { carId } = req.params;
        const { name, images, description, make, model, fuelType, transmission, color, seating, mileage, reviews, dealer, bookedTimeSlots, rentPerHour } = req.body;

        const car = await Car.findByIdAndUpdate(
            carId,
            { name, images, description, make, model, fuelType, transmission, color, seating, mileage, reviews, dealer, bookedTimeSlots, rentPerHour },
            { new: true }
        );

        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        res.json({ success: true, message: "Car updated successfully", data: car });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};


// Delete a car
export const deleteCar = async (req, res, next) => {
    try {
        const { carId } = req.params;
        const car = await Car.findByIdAndDelete(carId);

        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        res.json({ success: true, message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};


// Get all reservations
export const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find().populate('car user');
        res.json({ success: true, message: "Reservations fetched successfully", data: reservations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};

// Delete a reservation
export const deleteReservation = async (req, res, next) => {
    try {
        const { reservationId } = req.params;
        const reservation = await Reservation.findByIdAndDelete(reservationId);

        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }

        res.json({ success: true, message: "Reservation deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};


//admin signup
export const adminSignup = async (req, res, next)=>{
    try {
     
     const {name, email, password} = req.body
    
     if(!name|| !email || !password) {
         return res.status(401).json({success : false, message : "All fields are mandatory"})
     }
 
     const adminExist = await Admin.findOne({email})
 
     if(adminExist){
         return res.status(404).json({ success: false, message: "Already one admin exist" });
     }
 
     // Hashing the password
     const salt = 10;
     const hashedPassword = bcrypt.hashSync(password, salt);
 
        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: "Admin"
        });
        await admin.save()
   

        const id = admin._id.toString();
        const role = admin.role;

          // Create token
          const token = generateToken(id, email, role);
 
 
          res.cookie("token", token);
        res.status(201).json({ success: true, message: "Admin created successfully", data: admin });
    
 
    } catch (error) {
     res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
 }

//Admin login

export const adminLogin = async (req, res, next)=>{
   try {
    
    const {email, password} = req.body
   
    if(!email || !password) {
        return res.status(401).json({success : false, message : "All fields are mandatory"})
    }

    const adminExist = await Admin.findOne({email})

    if(!adminExist){
        return res.status(404).json({ success: false, message: "You are not a admin" });
    }

    const isMatch = bcrypt.compareSync(password, adminExist.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const id = adminExist._id.toString();
        const role = adminExist.role;

         // Create token
         const token = generateToken(id, email, role);

         res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

         res.status(200).json({ success: true, message: "Admin logged in successfully", token : token,role:adminExist.role, userData:adminExist});


   } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
   }
}


//logout
export const adminLogout = async (req, res, next)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Admin logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}


// Admin Auth
export const checkAdmin = async(req, res, next) => {
    try {
        const user = req.user;

        console.log(user);
        

        if (!user) {
            return res.status(400).json({ success: false, message: "Admin not authenticated" });
        }
        res.status(200).json({ success: true, message: "admin authenticated" });
    } catch (error) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
    }
}
