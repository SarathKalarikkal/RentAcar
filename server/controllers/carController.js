

import {Car} from "../models/carModel.js"
import { Dealer } from "../models/dealerModel.js";
import { imageUploadCloudinary } from "../utils/cloudinary.js";






export const createCar = async (req, res, next) => {
  try {
    const {
      name, description, make, model, fuelType, type,
      transmission, color, seating, mileage, reviews,
      bookedTimeSlots, rentPerHour, location
    } = req.body;

    let imageUrl;

    // Validate mandatory fields
    if (!name || !description || !make || !model || !fuelType ||
        !transmission || !color || !seating || !mileage || !rentPerHour || !type || !location) {
      return res.status(400).json({ success: false, message: "All fields are mandatory" });
    }

    // Find the dealer by authenticated user ID
    const dealerDetail = await Dealer.findById(req.user.id);
    if (!dealerDetail) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }

    // Check if the dealer already created a car with the same name
    const carExists = await Car.findOne({ name: name, dealer: dealerDetail._id });
    if (carExists) {
      return res.status(409).json({ success: false, message: "You have already created a car with this name" });
    }

    // Upload an image
    if (req.file) {
      imageUrl = await imageUploadCloudinary(req.file.path);
      console.log(imageUrl);
      
  }

    console.log('IMAGE URLS', imageUrl);

    // Create new car
    const newCar = new Car({
      name, description, make, model, fuelType,
      transmission, color, seating, mileage, reviews, dealer: dealerDetail._id,
      bookedTimeSlots, rentPerHour, type, location,  image: imageUrl && imageUrl,
    });

    await newCar.save();

    // Add the new car to the dealer's profile
    dealerDetail.cars.push(newCar._id);
    await dealerDetail.save();

    res.status(201).json({ success: true, message: "Car created successfully", data: newCar });
  } catch (error) {
    console.error("Error creating car:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};





export const getACar = async (req, res, next) => {
    try {
        const { id } = req.params;

        const car = await Car.findById(id)
            .populate({
                path: 'reviews',  
                populate: {
                    path: 'user',  
                    select: 'name email'  
                }
            })
            .populate({
                path: 'dealer',  
                select: 'name location phone email'  
            })
            .exec();

        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        res.json({ success: true, message: "Car fetched successfully", data: car });
    } catch (error) {
        console.error("Error fetching car:", error.message);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};



//Get all cars
export const getCarsList = async (req, res, next) => {
    try {
        // Extract query parameters from the request
        const { sort, type, transmission } = req.query;

        // Build a query object for filtering
        let query = {};

        // Add filters based on query parameters
        if (type) {
            query.type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(); // Ensure consistent casing
        }
        if (transmission) {
            query.transmission = transmission.charAt(0).toUpperCase() + transmission.slice(1).toLowerCase();
        }

        // Build the sorting option
        let sortOption = {};
        if (sort === "lowToHigh") {
            sortOption.price = 1; // Sort by price in ascending order
        } else if (sort === "highToLow") {
            sortOption.price = -1; // Sort by price in descending order
        }

        // Fetch cars with filtering and sorting
        const cars = await Car.find(query)
            .sort(sortOption)
            .populate('reviews')
            .populate('dealer', 'name email phone location')
            .exec();

        res.json({ success: true, message: "Fetched cars list successfully", data: cars });
    } catch (error) {
        console.error("Error fetching cars list:", error.message);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};


// Update a car
export const updateCar = async (req, res, next) => {
  try {
      const { id } = req.params;

      // Find the car by ID
      const car = await Car.findById(id);
      if (!car) {
          return res.status(404).json({ success: false, message: "Car not found" });
      }

    

      // Extract other fields from the request body
      const {
          name, description, make, model, fuelType,
          transmission, color, seating, mileage, reviews, bookedTimeSlots, rentPerHour, dealer, image
      } = req.body;

      // Check if a car with the same name and dealer already exists (excluding current car)
      if (name && dealer) {
          const dealerDetail = await Dealer.findById(dealer._id);
          if (!dealerDetail) {
              return res.status(404).json({ success: false, message: "Dealer not found" });
          }
          const carExists = await Car.findOne({ name, dealer: dealerDetail._id, _id: { $ne: id } });
          if (carExists) {
              return res.status(409).json({ success: false, message: "Another car with the same name and dealer already exists" });
          }
      }

let imageUrl

      if (req.file) {
        imageUrl = await imageUploadCloudinary(req.file.path);
        console.log(imageUrl);
        
    }

      // Update the car with new data
      const updatedCar = await Car.findByIdAndUpdate(
          id,
          {
              name, image: imageUrl && imageUrl, description, make, model, fuelType,
              transmission, color, seating, mileage, reviews, bookedTimeSlots, rentPerHour,
              dealer: dealer ? dealer._id : car.dealer
          },
          { new: true }
      )
      .populate({
          path: 'reviews',
          populate: {
              path: 'user',
              select: 'name email'
          }
      })
      .populate({
          path: 'dealer',
          select: 'name location phone email'
      })
      .exec();

      res.json({ success: true, message: "Car updated successfully", data: updatedCar });
  } catch (error) {
      console.error("Error updating car:", error.message);
      res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};



//Delete a car
export const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the car by ID
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    // Find the dealer who owns the car
    const dealer = await Dealer.findById(car.dealer);
    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }

    // Remove the car ID from the dealer's `cars` array
    dealer.cars = dealer.cars.filter(carId => carId.toString() !== id);
    await dealer.save();

    // Delete the car from the database
    await car.deleteOne();

    res.status(200).json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};
