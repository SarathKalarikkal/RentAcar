import { Dealer } from "../models/dealerModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import {Car} from "../models/carModel.js"
import { Notification } from "../models/notificatioModel.js";



// Create Dealer
export const createDealer = async (req, res, next) => {
    try {
        const { name, email, phone, role, password, cars } = req.body;

        // const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error)=>{
        //     console.log(error);
            
        // })

        if (!name || !email || !password || !role || !phone ) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const dealerExist = await Dealer.findOne({ email });
        if (dealerExist) {
            return res.status(409).json({ success: false, message: "Dealer already exists" });
        }

        // Hashing the password
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Handle profile picture upload
        let profilePicUrl = '';
        if (req.file) {
            profilePicUrl = req.file.path; // Cloudinary URL
        }

        // Create new dealer
        // const newDealer = new Dealer({
        //     name,
        //     email,
        //     password: hashedPassword,
        //     role,
        //     profilePic: uploadResult.url,
        //     cars,
        //     phone,

        // });
        // Create new dealer
        const newDealer = new Dealer({
            name,
            email,
            password: hashedPassword,
            role,
            phone
        });

        await newDealer.save();

        const id = newDealer._id.toString();

        // Create token
        const token = generateToken(id, email, role);

        res.cookie("token", token);
        res.status(201).json({ success: true, message: "Dealer created successfully", userData: newDealer, token:token });
    } catch (error) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
    }
};

// Dealer login
export const dealerLogin = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(401).json({ success: false, message: "All fields are mandatory" });
        }

        const dealerExist = await Dealer.findOne({ email });

        if (!dealerExist) {
            return res.status(404).json({ success: false, message: "Dealer does not exist" });
        }

        const isMatch = bcrypt.compareSync(password, dealerExist.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const id = dealerExist._id.toString();
        const role = dealerExist.role;

        // Create token
        const token = generateToken(id, email, role);

        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });
        console.log(token)
        res.status(200).json({ success: true, message: "Dealer logged in successfully", role:dealerExist.role, userData:dealerExist, token : token });
    } catch (error) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
    }
}

// Dealer logout
export const dealerLogout = async(req, res, next) => {
    try {
        res.clearCookie("token");
        console.log(token)
        res.status(200).json({ success: true, message: "Dealer logged out successfully" });
    } catch (error) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
    }
}

// Dealer profile
export const dealerProfile = async(req, res, next) => {
    try {
        const { id } = req.params;
        const dealerData = await Dealer.findById(id).select("-password");

        if (!dealerData) {
            return res.status(404).json({ success: false, message: "Dealer not found" });
        }

        res.status(200).json({ success: true, message: "Dealer data fetched", data: dealerData });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
}

// Dealer Auth
export const checkDealer = async(req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ success: false, message: "User not authenticated" });
        }
        res.status(200).json({ success: true, message: "User authenticated" });
    } catch (error) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
    }
}

// Dealer update
export const dealerUpdate = async (req, res, next) => {
    try {
        const { name, email, phone, location } = req.body;
        const { id } = req.params;

        const dealerExist = await Dealer.findById(id);
        if (!dealerExist) {
            return res.status(404).json({ success: false, message: "Dealer not found" });
        }

        // Prepare update data while excluding fields that should not be changed
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (location) updateData.location = location;

        const updatedDealer = await Dealer.findByIdAndUpdate(
            id,
            { ...updateData },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Dealer updated successfully", data: updatedDealer });
    } catch (error) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
    }
};


// Get all dealers
export const getAllDealers = async(req, res, next) => {
    try {
        const dealers = await Dealer.find();
        res.status(200).json({ success: true, message: "Successfully fetched all dealers", data: dealers });
    } catch (error) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
    }
}


export const getDealerInventory = async(req, res, next)=>{
    try {

       
        const id = req.user.id
        console.log("dealerssssss",req.user)

        const cars = await Car.find({ dealer: id })
        .populate('dealer', 'name location phone email') 
        .populate('reviews', 'user rating comment') 
        .exec();

        if (!cars || cars.length === 0) {
            return res.status(404).json({ success: false, message: "No cars found for this dealer" });
        }

        res.json({ success: true, data: cars });

    } catch (error) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
    }
}

export const getDealerNotifications = async (req, res) => {
    try {
      const dealerId = req.user.id; 
      console.log(dealerId)
      const notifications = await Notification.find({ dealer: dealerId }).sort({ createdAt: -1 }).populate('reservedby', 'name email');
      res.json({ success: true, data: notifications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
  };
  

  export const deleteDealerNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dealerId = req.user.id; // Assuming you have dealer authentication in place

        // Find the notification by ID and ensure it belongs to the authenticated dealer
        const notification = await Notification.findOne({ _id: id, dealer: dealerId });

        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found or not authorized" });
        }

        // Delete the notification
        await notification.deleteOne();

        res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (error) {
        console.error("Error deleting notification:", error.message);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};

