import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        make: {
            type: String,
            required: true
        },
        model: {
            type: Number,
            required: true
        },
        fuelType: {
            type: String,
            required: true
        },
        transmission: { 
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        seating: {
            type: Number,  
            required: true
        },
        mileage: {
            type: Number, 
            required: true
        },
        type: {
            type: String, 
            required: true
        },
        availableStatus: {
            type: String, 
            required: false,
            default : "Available",
        },
        reviews: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Review"
        }],
        dealer: { 
            type:mongoose.Schema.Types.ObjectId, 
            ref: "Dealer",
            required: true 
        },
        bookedTimeSlots: [
            {
                from: { type: Date, required: true },
                to: { type: Date, required: true }
            }
        ],
        rentPerHour: {  
            type: Number,  
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Car = mongoose.model('Car', carSchema);
