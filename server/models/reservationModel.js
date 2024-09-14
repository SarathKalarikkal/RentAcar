import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',  
    // required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    // required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled','rejected', 'completed', 'returned'],
    default: 'pending'
  },
  rentPerHour: {
    type: Number,
    required: true
  },
  totalRate: {
    type: Number,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},
{ timestamps: true }
);

export const Reservation = mongoose.model('Reservation', reservationSchema)